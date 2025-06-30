import { Show } from "solid-js";
import type { useModal } from "@helpers/contexts/Modal";
import DeleteIcon from "@icons/Delete";
import type { ColumnDef } from "@tanstack/solid-table";
import { getDateTime } from "@utils/index";
import { useAuth } from "@helpers/contexts/Auth";
import { ACTIONS } from "@utils/constants";

export type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  role: {
    name: string;
    id: string;
  };
  createdAt: string;
};

// Move columns definition outside the component
export const userColumns = (
  setSelectedRoleId: (id: string) => void,
  modalContext: ReturnType<typeof useModal>,
): ColumnDef<User>[] => {
  const { hasPermission } = useAuth();

  return [
  {
    id: "name",
    header: "Name",
    cell: (info) => {
      const { name, email } = info.row.original; 
      return (
        <div class="text-nowrap">
          <span class="fw-800">{name}</span>
          <small class="text-light d-block">{email}</small>
        </div>
      );  
    }
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role.name",
    header: "Role",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => getDateTime(info.getValue() as string),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Show when={hasPermission(ACTIONS.adminUser.delete)}>
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
        </Show>
      );
    },
  },
]};
