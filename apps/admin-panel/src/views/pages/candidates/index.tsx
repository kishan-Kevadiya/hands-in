import { useQuery } from "@tanstack/solid-query";
import { QUERY_KEYS } from "@utils/constants";
import {
  createMemo,
  createSignal,
  Match,
  onCleanup,
  onMount,
  startTransition,
  Suspense,
  Switch, // We might want a small suspense for the table itself
} from "solid-js";
import { usersApis } from "@apis/users";
import { columns, type User } from "./columns";
import { FormFields } from "@components/form";
import Table from "@components/table";
import Loader from "@components/Loader";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

// Remove the old debounce function

const UserList = () => {
  const [pagination, setPagination] = createSignal({ pageIndex: 1, limit: 10 });
  const [search, setSearch] = createSignal("");

  // RxJS Subject for search input
  const searchSubject = new Subject<string>();

  // RxJS subscription for debounced search
  let searchSubscription: any;

  onMount(() => {
    searchSubscription = searchSubject
      .pipe(debounceTime(300))
      .subscribe((value) => {
        startTransition(() => {
          setSearch(value);
          setPagination((p) => ({ ...p, pageIndex: 1 }));
        });
      });
  });

  onCleanup(() => {
    searchSubscription?.unsubscribe();
  });

  const query = useQuery(() => ({
    queryKey: [
      QUERY_KEYS.USER.ALL,
      pagination().pageIndex,
      pagination().limit,
      search(),
    ],
    queryFn: () =>
      usersApis.getAll({
        page: pagination().pageIndex,
        limit: pagination().limit,
        search: search(),
      }),
    suspense: false,
    keepPreviousData: true,
  }));

  function handleSearchInput(e: Event) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    searchSubject.next(value);
  }

  const tableData = createMemo(() => query.data?.data ?? []);
  const totalUsers = createMemo(() => query.data?.totalCount ?? 0);

  function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({ pageIndex, limit: pageSize });
  }

  return (
    <div class="card">
      <div class="d-flex justify-between align-center ">
        <h3>Candidates</h3>
        <FormFields.Input
          type="search"
          placeholder="Search candidates..."
          value={search()}
          onInput={handleSearchInput}
          // Disable the input while a search is in progress
          disabled={query.isFetching && !query.isLoading}
        />
      </div>

      {/*
        This is our granular loading state handler.
        It does not unmount the whole component.
      */}
      <div>
        {query.isFetching && !query.isLoading && <Loader />}

        <Switch>
          <Match when={query.isLoading}>
            <div>Loading Initial Users...</div>
          </Match>
          <Match when={query.isError}>
            <div>Error loading users: {query.error?.message}</div>
          </Match>
          <Match when={!query.isLoading && !query.isError}>
            <Suspense fallback={<Loader />}>
              <Table<User>
                columns={columns}
                data={tableData()}
                total_rms={totalUsers()}
                itemsPerPage={pagination().limit}
                pageNumber={pagination().pageIndex}
                onPageChange={handleTablePageChange}
              />
            </Suspense>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default UserList;
