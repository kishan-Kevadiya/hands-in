
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
import Table from "@components/table";
import Loader from "@components/Loader";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormFields } from "@components/form";
import { rolesApis } from "@apis/roles";
import { KobalteCombobox } from "@components/kobalte/combobox";

const UserList = () => {
  const [pagination, setPagination] = createSignal({ pageIndex: 1, limit: 10 });
  const [search, setSearch] = createSignal("");
  const [filter, setFilter] = createSignal("");

  const [value, setValue] = createSignal<{ value: string, label: string } | null>(null);


  // RxJS Subject for search input
  const searchSubject = new Subject<string>();
  const filterSubject = new Subject<string>();

  // RxJS subscription for debounced search
  let searchSubscription: any;
  let filterSubscription: any;

  onMount(() => {
    searchSubscription = searchSubject
      .pipe(debounceTime(300))
      .subscribe((value) => {
        startTransition(() => {
          setSearch(value);
          setPagination((p) => ({ ...p, pageIndex: 1 }));
        });
      });

    filterSubscription = filterSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        startTransition(() => {
          setFilter(value);
        });
      });
  });

  onCleanup(() => {
    searchSubscription?.unsubscribe();
    filterSubscription?.unsubscribe();
  });

  const query = useQuery(() => ({
    queryKey: [
      QUERY_KEYS.USER.ALL,
      pagination().pageIndex,
      pagination().limit,
      search(),
      value(),
    ],
    queryFn: () =>
      usersApis.getAll({
        page: pagination().pageIndex,
        limit: pagination().limit,
        search: search(),
        roleId: value()?.value ?? null
      }),
    suspense: false,
    keepPreviousData: true,
  }));

  const rolesQuery = useQuery(() => ({
    queryKey: [
      QUERY_KEYS.ROLES_TITLE.ALL, filter()
    ],
    queryFn: () =>
      rolesApis.searchRoles({
        search: filter()
      }),
    keepPreviousData: true,
  }));

  function handleSearchInput(e: Event) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    searchSubject.next(value);
  }

  function handleFilterInput(value: string) {
    // Ensure the value is a string
    const stringValue = typeof value === 'string' ? value : '';
    filterSubject.next(stringValue);

    startTransition(() => {
      setFilter(stringValue);
    });
  }

  const tableData = createMemo(() => query.data?.data ?? []);
  const totalUsers = createMemo(() => query.data?.totalCount ?? 0);

  function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({ pageIndex, limit: pageSize });
  }

  const rolesData = createMemo(() => {
    const data = rolesQuery.data;

    if (!data) return [];

    if (Array.isArray(data)) {
      const mappedData = data.map((item) => ({
        value: item.id || item._id,
        label: item.title || item.name,
      }));
      return mappedData;
    }
    return [];
  }, [rolesQuery.data?.length, filter()]);

  return (
    <div class="card">
      <div class="d-flex justify-between align-center ">
        <h3>Candidates ({totalUsers()})</h3>
        <div class="d-flex gap-1">
          <KobalteCombobox
            key={"roles-filter"}
            ariaLabel="Roles"
            placeholder="Search for roles"
            options={rolesData}
            virtualized={false}
            onInputChange={handleFilterInput}
            value={value()?.label}
            onChange={setValue}
          />

          <FormFields.Input
            type="search"
            placeholder="Search candidates..."
            value={search()}
            onInput={handleSearchInput}
            // Disable the input while a search is in progress
            disabled={query.isFetching && !query.isLoading}
          />
        </div>

      </div>

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