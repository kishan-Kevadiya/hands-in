import { useQuery, useMutation } from "@tanstack/solid-query";
import { ACTIONS, QUERY_KEYS } from "@utils/constants";
import {
  createMemo,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Show,
  startTransition,
  Suspense,
  Switch,
} from "solid-js";
import { useAuth } from "@helpers/contexts/Auth";
import { adminUsersApis } from "@helpers/apis/admin_users";
import { userColumns, type User } from "../columns";
import { FormFields } from "@components/form";
import Table from "@components/table";
import Loader from "@components/Loader";
import { queryClient } from "@helpers/axios";
import { Modal } from "@components/modal";
import { useModal } from "@helpers/contexts/Modal";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { PAGE_SIZE } from "@utils/index";

const UserList = () => {
  const { hasPermission } = useAuth();
  const modalContext = useModal();
  const [selectedRoleId, setSelectedRoleId] = createSignal<string | null>(null);

  // Pagination and search state
  const [pagination, setPagination] = createSignal({
    pageIndex: 1,
    limit: PAGE_SIZE,
  });
  const [search, setSearch] = createSignal("");

  // RxJS Subject for search input
  const searchSubject = new Subject<string>();
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

  // Query for users with pagination and search
  const query = useQuery(() => ({
    queryKey: [
      QUERY_KEYS.ADMIN.USERS,
      pagination().pageIndex,
      pagination().limit,
      search(),
    ],
    queryFn: () =>
      adminUsersApis.getAllUsers({
        page: pagination().pageIndex,
        limit: pagination().limit,
        search: search(),
      }),
    suspense: false,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  }));

  // Mutation for deleting a user
  const deleteUserMutation = useMutation(() => ({
    mutationFn: (userId: string) => adminUsersApis.remove(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN.USERS] });
      modalContext.close();
    },
  }));

  function handleSearchInput(e: Event) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    searchSubject.next(value);
  }

  // Table data and total count
  const tableData = createMemo(() =>
    Array.isArray(query.data?.data) ? query.data.data : [],
  );
  const totalUsers = createMemo(() => query.data?.totalCount ?? 0);

  function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({ pageIndex, limit: pageSize });
  }

  return (
    <>
      <Modal.Delete
        open={modalContext.isOpen()}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onClose={() => modalContext.close()}
        onConfirm={() => {
          if (selectedRoleId()) {
            deleteUserMutation.mutate(selectedRoleId()!);
          }
        }}
      />

      <div class="admin-user-list card">
        <div class="d-flex align-center justify-between">
          <div class="d-flex align-center gap-1">
            <h3>Admin Users</h3>
            <Show when={hasPermission(ACTIONS.adminUser.create)}>
              <FormFields.CircleButton
                variant="primary"
                href="/admin-users/add"
              />
            </Show>
          </div>
          <div class="d-flex align-center" style={{ gap: "12px" }}>
            <FormFields.Input
              type="search"
              placeholder="Search user..."
              value={search()}
              onInput={handleSearchInput}
              disabled={query.isFetching && !query.isLoading}
            />
          </div>
        </div>
        <div>
          {query.isFetching && !query.isLoading && <Loader />}

          <Switch>
            <Match when={query.isLoading}>
              <Loader />
            </Match>
            <Match when={query.isError}>
              <div>Error loading users.</div>
            </Match>
            <Match when={!query.isLoading && !query.isError}>
              <Suspense fallback={<Loader />}>
                <Table<User>
                  columns={userColumns(setSelectedRoleId, modalContext)}
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
    </>
  );
};

export default UserList;
