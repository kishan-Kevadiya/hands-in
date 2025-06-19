import { createColumnHelper } from "@tanstack/solid-table";

import Table from "@components/table";
import { useQuery, useMutation } from "@tanstack/solid-query";
import { adminRolesApi } from "@apis/admin_roles";
import { QUERY_KEYS } from "@utils/constants";
import { Match, Switch, createMemo, createSignal } from "solid-js";
import { getDateTime } from "@utils/index";
import Loader from "@components/Loader";
import DeleteIcon from "@icons/Delete";
import { Modal } from "@components/modal";
import { useModal } from "@helpers/contexts/Modal";
import { queryClient } from "@helpers/axios";
import { FormFields } from "@components/form";

type Role = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<Role>();

export default function RolesTable() {
  const modalContext = useModal();
  const [selectedRoleId, setSelectedRoleId] = createSignal<string | null>(null);

  const [pagination, setPagination] = createSignal({
    page: 1,
    limit: 10,
  });

  const query = useQuery(() => ({
    queryKey: [QUERY_KEYS.ADMIN.ROLES, pagination().page, pagination().limit],
    queryFn: () =>
      adminRolesApi.getAll({
        page: pagination().page,
        limit: pagination().limit,
      }),
  }));

  const deleteMutation = useMutation(() => ({
    mutationFn: (id: string) => adminRolesApi.deleteRoles(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN.ROLES] });
      setSelectedRoleId(null);
      modalContext.close();
    },
  }));

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => {
        const { name } = info.row.original;
        return (
          <div class="text-nowrap">
            <span class="fw-600 text-default">{name}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => getDateTime(info.getValue()),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const row = info.row.original;
        return (
          <>
            <span
              class="delete-icon"
              onClick={() => {
                setSelectedRoleId(row.id);
                modalContext.open();
              }}
              style={{ cursor: "pointer" }}
            >
              <DeleteIcon />
            </span>
          </>
        );
      },
    }),
  ];

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
          if (selectedRoleId()) {
            deleteMutation.mutate(selectedRoleId()!);
          }
        }}
      />

      <div class="card">
        <div class="d-flex align-center">
          <h3>Roles List</h3>
          <FormFields.CircleButton variant="primary" href="/admin/roles/add" />
        </div>

        <Switch>
          <Match when={query.isLoading}>
            <Loader />
          </Match>
          <Match when={query.isError}>
            <div>Error loading users.</div>
          </Match>
          <Match when={!query.isLoading && !query.isError}>
            <Table<Role>
              columns={columns}
              data={tableData()}
              total_rms={totalRms()}
              itemsPerPage={pagination().limit}
              pageNumber={pagination().page}
              onPageChange={handleTablePageChange}
            />
          </Match>
        </Switch>
      </div>
    </>
  );
}
