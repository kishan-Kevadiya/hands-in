import { useMutation, useQuery } from "@tanstack/solid-query";
import { Match, Switch, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { debounceTime, exhaustMap, Subject } from "rxjs";

import { companyApis } from "@apis/company";

import { Modal } from "@components/modal";
import Loader from "@components/Loader";
import { FormFields } from "@components/form";
import Table from "@components/table";

import { companyColumns, type Company } from "./columns";

import { useModal } from "@helpers/contexts/Modal";

import { QUERY_KEYS } from "@utils/constants";
import { queryClient } from "@helpers/axios";


export default function CompanyList() {
  const modalContext = useModal();

  const [selectedCompanyId, setSelectedCompanyId] = createSignal<string | null>(null);

  const [pagination, setPagination] = createSignal({
    page: 1,
    limit: 10,
  });

  const [search, setSearch] = createSignal("");

  // Rxjs Subject for search input
  const searchSubject = new Subject<string>();
  // Rxjs subscription for debounced search
  let searchSubscription: any;
  // Rxjs Subject for delete actions (setting ID and opening modal)
  const deleteActionSubject = new Subject<string>();
  let deleteActionSubscription: any;

  onMount(() => {
    searchSubscription = searchSubject
      .pipe(debounceTime(300))
      .subscribe((value) => {
        setSearch(value);
        // Reset pagination to the first page when search input changes
        setPagination((prev) => ({ ...prev, page: 1 }));
      });

      deleteActionSubscription = deleteActionSubject
        .pipe(
          exhaustMap(async (id) => {
            setSelectedCompanyId(id);
            modalContext.open();          
          })
        )
        .subscribe();
  });

  onCleanup(() => {
    searchSubscription?.unsubscribe();
    deleteActionSubscription?.unsubscribe();
  });

  function handleSearchInput(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    searchSubject.next(value);
  }

  const query = useQuery(() => ({
    queryKey: [QUERY_KEYS.RECRUITER.ALL, pagination().page, pagination().limit, search()],
    queryFn: () =>
      companyApis.getAll({
        page: pagination().page,
        limit: pagination().limit,
        search: search(),
      }),
    keepPreviousData: true,
  }));

  const deleteCompanyMutation = useMutation(() => ({
    mutationFn: (id: string) => companyApis.removeCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITER.ALL, pagination().page, pagination().limit, search()] });
      modalContext.close();
    },
  }))

  const tableData = createMemo(() => query.data?.data ?? []);
  const totalRms = createMemo(() => query.data?.totalCount ?? 0);

  function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({
      page: pageIndex,
      limit: pageSize,
    });
  }

  return (
    <>
      <Modal.Delete
        open={modalContext.isOpen()}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onClose={() => modalContext.close()}
        onConfirm={() => {
          if (selectedCompanyId()) {
            deleteCompanyMutation.mutate(selectedCompanyId()!);
          }
        }}
      />
      <div class="card">
        <div class="d-flex justify-between align-center ">
          <h2 class="section-title">Recuiters</h2>
          <FormFields.Input
            type="search"
            placeholder="Search recruiters..."
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
            <div>Error loading recruiters.</div>
          </Match>
          <Match when={!query.isLoading && !query.isError}>
            <Table<Company>
              columns={companyColumns(deleteActionSubject)}
              data={tableData()}
              total_rms={totalRms()}
              itemsPerPage={pagination().limit}
              pageNumber={pagination().page}
              onPageChange={handleTablePageChange}
            />
          </Match>
        </Switch>
      </div></>
  );
}
