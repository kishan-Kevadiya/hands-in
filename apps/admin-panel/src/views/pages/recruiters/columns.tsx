import { timeAgo } from "@utils/index";
import { createColumnHelper } from "@tanstack/solid-table";
import { Badge } from "@components/badge";
import { A } from "@solidjs/router";
import { DeleteIcon } from "@icons/index";
import { Subject } from "rxjs"; // Import Subject
import { Show } from "solid-js";
import { useAuth } from "@helpers/contexts/Auth";
import { ACTIONS } from "@utils/constants";

export type Company = {
  id: string;
  email: string;
  companyName?: string;
  phone?: string;
  countryCode?: string;
  address?: string;
  postalCode?: string;
  gst?: string;
  isEmailVerified: boolean;
  logo?: string;
  website?: string;
  employeeSize?: number;
  isOnboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  actions?: string
};

const columnHelper = createColumnHelper<Company>();

export const companyColumns = (
  deleteActionSubject: Subject<string>, // Accept deleteActionSubject
) => {
  const { hasPermission } = useAuth();
  return [
    columnHelper.accessor((row) => row, {
      id: "emailAndCompanyName",
      header: "Company Name",
      cell: (info) => {
        const row = info.getValue();
        return (
          <A href={`/recruiters/${row.id}/view?tab=details`}>
            <p class="font-bold">{row.companyName}</p>
            <p>
              {row.email}
              {row.isEmailVerified ? (
                <Badge.Success>Verified </Badge.Success>
              ) : null}
            </p>
            <p>
              {row.countryCode}-{row.phone}
            </p>
          </A>
        );
      },
    }),
    // Combine phone and countryCode with address and postalCode into a "Contact Info" column
    columnHelper.accessor((row) => row, {
      id: "contactInfo",
      header: "ContactInfo",
      cell: (info) => {
        const row = info.getValue();
        const address = row.address ?? "";
        const postalCode = row.postalCode ? `,(${row.postalCode})` : null;
        return (
          <p>
            {address} {postalCode}
          </p>
        );
      },
    }),
    // Combine GST and employeeSize into a "Company Details" column
    columnHelper.accessor((row) => row, {
      id: "companyDetails",
      header: "E_Size",
      cell: (info) => {
        const row = info.getValue();
        return <span>{row.employeeSize}</span>;
      },
    }),

    columnHelper.accessor("isOnboardingCompleted", {
      header: "Onboarding",
      cell: (info) => (
        <span>
          {info.getValue() ? <Badge.Success>Completed</Badge.Success> : "No"}
        </span>
      ),
    }),
    // Combine createdAt and updatedAt into a "Timestamps" column
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => <span>{timeAgo(info.getValue())}</span>,
    }),
    columnHelper.accessor("updatedAt", {
      header: "Updated At",
      cell: (info) => <span>{timeAgo(info.getValue())}</span>,
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => {
        const { id } = info.row.original;
        return <>
          <Show when={hasPermission(ACTIONS.recruiter.delete)} >
            <span
              class="delete-icon"
              onClick={() => {
                deleteActionSubject.next(id);
              }}
              style={{ cursor: "pointer" }}
            >
              <DeleteIcon />
            </span>
          </Show>
        </>
      }
    }
    ),
  ]
}


export type Recruiter = {
  id: number;
  name: string;
  email: string;
  description: string;
  address: string;
  requirementCount: number;
  createdAt: string;
  updatedAt: string;
};

const recruiterColumnHelper = createColumnHelper<Recruiter>();

export const recruiterColumns = [
  recruiterColumnHelper.accessor((row) => row, {
    id: "emailAndCompanyName",
    header: "Company Name",
    cell: (info) => {
      const row = info.getValue();
      return (
        <A href={`/manual-recruiter/${row.id}`}>
          <p class="font-bold">{row.name}</p>
          <p>
            {row.email}
          </p>
        </A>
      );
    },
  }),

  recruiterColumnHelper.accessor("description", {
    header: "Description",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  recruiterColumnHelper.accessor("address", {
    header: "Address",
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  recruiterColumnHelper.accessor("requirementCount", {
    header: "No. Requirements",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  recruiterColumnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => <span>{timeAgo(info.getValue())}</span>,
  })
];
