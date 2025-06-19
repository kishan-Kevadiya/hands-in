import { A } from "@solidjs/router";
import { formatRupee, getDateTime } from "@utils";
import { createColumnHelper } from "@tanstack/solid-table";
import { DeleteIcon } from "@icons/index";
import type { useModal } from "@src/helpers/contexts/Modal";

export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  paymentProvider: string;
  paymentPlanId: string;
  isActive: boolean;
  createdAt: string;
  actions?: any;
}

const columnHelper = createColumnHelper<PricingPlan>();

export const packageColumns = (
  setSelectedRoleId: (id: number) => void,
  modalContext: ReturnType<typeof useModal>,
) => [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      const { name, id, isActive } = info.row.original;

      return (
        <div>
          <A href={`/settings/pricing/${id}/view`} class="fw-700">
            {name}
          </A>
          <br />
          {isActive ? (
            <span class="text-success fw-600">Active</span>
          ) : (
            <span class="text-danger fw-600">Inactive</span>
          )}
        </div>
      );
    },
  }),

  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <span class="fw-600 text-info">{formatRupee(info.getValue())}</span>
    ),
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
  }),
  columnHelper.accessor("paymentProvider", {
    header: "PaymentProvider",
  }),
  columnHelper.accessor("paymentPlanId", {
    header: "Payment Plan ID",
  }),

  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => getDateTime(info.getValue()),
  }),
  columnHelper.accessor("actions", {
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
          >
            <DeleteIcon />
          </span>
        </>
      );
    },
  }),
];

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discountValue: number;
  discountType: string;
  providerId: string;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  maxRedemptions: number;
  isOneTimePerUser: boolean;
  createdAt: string;
}

const couponColumnHelper = createColumnHelper<Coupon>();

export const couponColumns = [
  couponColumnHelper.accessor("code", {
    header: "Code",
    cell: (info) => {
      const { code, id } = info.row.original;

      return (
        <A href={`/settings/coupons/${id}/view`} class="fw-700">
          {code}
        </A>
      );
    },
  }),

  couponColumnHelper.accessor(
    (row) =>
      `${row.discountValue}${row.discountType === "percentage" ? "%" : ""}`,
    {
      id: "discount",
      header: "Discount",
      cell: (info) => <span class="fw-600 text-info">{info.getValue()}</span>,
    },
  ),

  couponColumnHelper.accessor("providerId", {
    header: "Provider ID",
  }),

  couponColumnHelper.accessor("isActive", {
    header: "Status",
    cell: (info) => (
      <span class={info.getValue() ? "text-green-500" : "text-red-500"}>
        {info.getValue() ? "Active" : "Inactive"}
      </span>
    ),
  }),

  couponColumnHelper.accessor("validFrom", {
    header: "Valid From",
    cell: (info) => getDateTime(info.getValue(), undefined, "utc"),
  }),

  couponColumnHelper.accessor("validUntil", {
    header: "Valid Until",
    cell: (info) => getDateTime(info.getValue(), undefined, "utc"),
  }),

  couponColumnHelper.accessor("maxRedemptions", {
    header: "Max Redemptions",
  }),

  couponColumnHelper.accessor("isOneTimePerUser", {
    header: "One-Time",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),

  couponColumnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => getDateTime(info.getValue()),
  }),
];
