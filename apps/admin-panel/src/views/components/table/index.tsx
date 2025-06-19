import {
  createSolidTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/solid-table";
import { createSignal, For, Show, createMemo, Index } from "solid-js";

import { SortIcon } from "@icons/index";
import BackArrow from "@icons/BackArrow";

import "./index.css";

interface CommonTableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
  itemsPerPage?: number;
  total_rms: number;
  pageNumber: number;
  onPageChange?: (pageIndex: number, pageSize: number) => void; // pageIndex is 1-based
}

function Table<T extends object>(props: CommonTableProps<T>) {
  const [sorting, setSorting] = createSignal([]);
  const [pagination, setPagination] = createSignal({
    pageIndex: props.pageNumber - 1,
    pageSize: props.itemsPerPage ?? 10,
  });

  const reactiveColumns = createMemo(() => props.columns);

  const pagedData = createMemo(() => {
    if (!props.data) return [];
    return props.data;
  });

  const table = createSolidTable<T>({
    get data() {
      return pagedData();
    },
    get columns() {
      return reactiveColumns();
    },
    state: {
      get sorting() {
        return sorting();
      },
      get pagination() {
        return pagination();
      },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      let newPagination;
      if (typeof updater === "function") {
        newPagination = updater(pagination());
      } else {
        newPagination = updater;
      }

      setPagination(newPagination);
      if (props.onPageChange) {
        props.onPageChange(newPagination.pageIndex + 1, newPagination.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: false,
    get pageCount() {
      return Math.ceil(props.total_rms / pagination().pageSize);
    },
  });

  const pageCount = createMemo(() => table.getPageCount());

  function getPaginationRange(current: number, total: number, delta = 2) {
    const range: (number | string)[] = [];

    // Always include page 1
    range.push(1);

    let left = Math.max(2, current - delta);
    let right = Math.min(total - 1, current + delta);

    // Adjust left/right if close to start/end
    if (current - delta <= 2) {
      left = 2;
      right = Math.min(total - 1, left + delta * 2);
    }
    if (current + delta >= total - 1) {
      right = total - 1;
      left = Math.max(2, right - delta * 2);
    }

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push("...");
    }

    // Always show last page if more than one page and total > 1
    if (total > 1) {
      range.push(total);
    }

    return range;
  }

  const paginationRange = createMemo(() => {
    const total = pageCount();
    const current = table.getState().pagination.pageIndex + 1;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    return getPaginationRange(current, total);
  });

  function PaginationButton(props: { page: number; isActive: boolean }) {
    return (
      <button
        onClick={() => !props.isActive && table.setPageIndex(props.page - 1)} // Prevent unnecessary calls
        class={`pagination-page-number${props.isActive ? " active" : ""}`}
        disabled={props.isActive}
        aria-current={props.isActive ? "page" : undefined}
        tabIndex={props.isActive ? -1 : 0}
        title={
          props.isActive
            ? `Current page, ${props.page}`
            : `Go to page ${props.page}`
        }
      >
        {props.page}
      </button>
    );
  }

  return (
    <div class="table-container">
      {/* Table Container */}
      <div class="table">
        <table>
          <thead>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <tr id={headerGroup.id}>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th
                        id={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        class={header.column.getIsSorted() ? "sorted" : ""}
                        style={{
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : undefined,
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <Show when={header.column.getIsSorted()}>
                          <SortIcon />
                        </Show>
                      </th>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </thead>

          <tbody>
            <Show
              when={table.getRowModel().rows.length !== 0}
              fallback={
                <tr>
                  <td colSpan={props.columns.length} class="empty-state">
                    No data available
                  </td>
                </tr>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <tr>
                    <For each={row.getVisibleCells()}>
                      {(cell) => {
                        const renderedCell = flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        );
                        return (
                          <td class="table-cell">
                            <Show
                              when={
                                renderedCell !== null &&
                                renderedCell !== undefined &&
                                renderedCell !== ""
                              }
                              fallback={<span class="empty-cell">—</span>}
                            >
                              {renderedCell}
                            </Show>
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                )}
              </For>
            </Show>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Show when={props.total_rms > (props.itemsPerPage ?? 10)}>
        <div class="pagination-container">
          <div class="pagination">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              class="pagination-button"
            >
              <BackArrow />
            </button>
            <span class="pagination-pages">
              <Index each={paginationRange()}>
                {(item) => {
                  const index = Number(item());

                  if (isNaN(index)) {
                    return "...";
                  }

                  return (
                    <PaginationButton
                      page={index}
                      isActive={
                        table.getState().pagination.pageIndex + 1 === index
                      }
                    />
                  );
                }}
              </Index>
            </span>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              class="pagination-button"
            >
              <BackArrow />
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default Table;
