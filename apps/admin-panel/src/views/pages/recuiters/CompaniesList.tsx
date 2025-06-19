import Table from "@components/table";
import { useQuery } from "@tanstack/solid-query";
import { QUERY_KEYS } from "@utils/constants";
import { Match, Switch, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import Loader from "@components/Loader";

import { companyApis } from "@apis/company";
import { companyColumns, type Company } from "./columns";
import { FormFields } from "@components/form";
import { debounceTime, Subject } from "rxjs";

export default function CompanyList() {
  const [pagination, setPagination] = createSignal({
    page: 1,
    limit: 10,
  });

  const [search, setSearch] = createSignal("");

  // Rxjs Subject for search input
  const searchSubject = new Subject<string>();
  // Rxjs subscription for debounced search
  let searchSubscription: any;  

  onMount(() => {
    searchSubscription = searchSubject
      .pipe(debounceTime(300))
      .subscribe((value) => {
        setSearch(value);
        // Reset pagination to the first page when search input changes
        setPagination((prev) => ({ ...prev, page: 1 }));
      });
  });

  onCleanup(() => {
    searchSubscription?.unsubscribe();
  });

  function handleSearchInput(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    searchSubject.next(value);
  }

  const query = useQuery(() => ({
    queryKey: [QUERY_KEYS.COMPANY.ALL, pagination().page, pagination().limit, search()],
    queryFn: () =>
      companyApis.getAll({
        page: pagination().page,
        limit: pagination().limit,
        search: search(),
      }),
    keepPreviousData: true,
  }));

  const tableData = createMemo(() => query.data?.data ?? []);
  const totalRms = createMemo(() => query.data?.totalCount ?? 0);

  function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({
      page: pageIndex,
      limit: pageSize,
    });
  }

  return (
    <div class="card">
      <div class="d-flex justify-between align-center ">
        <h2 class="section-title">Recuiters</h2>
        <FormFields.Input
          type="search"
          placeholder="Search recuiters..."
          value={search()}
          onInput={handleSearchInput}
          // Disable the input while a search is in progress
          disabled={query.isFetching && !query.isLoading}
        />
      </div>
      <Switch>
        <Match when={query.isLoading}>
          <Loader />
        </Match>
        <Match when={query.isError}>
          <div>Error loading recuiters.</div>
        </Match>
        <Match when={!query.isLoading && !query.isError}>
          <Table<Company>
            columns={companyColumns}
            data={tableData()}
            total_rms={totalRms()}
            itemsPerPage={pagination().limit}
            pageNumber={pagination().page}
            onPageChange={handleTablePageChange}
          />
        </Match>
      </Switch>
    </div>
  );
}
