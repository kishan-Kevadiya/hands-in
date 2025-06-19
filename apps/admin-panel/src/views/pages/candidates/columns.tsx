import { timeAgo } from "@utils/index";
import { createColumnHelper } from "@tanstack/solid-table";
import { Badge } from "@components/badge";
import { A } from "@solidjs/router";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // merged firstName and lastName
  email: string;
  gender: string;
  isEmailVerified: boolean;
  countryCode: string;
  phone: string;
  city: string;
  postalCode: string;
  last_logged_in_at: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.display({
    id: "details",
    header: "Details",
    cell: (info) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        countryCode,
        isEmailVerified,
        // @ts-ignore
        id,
      } = info.row.original;
      return (
        <div class="text-nowrap">
          <A class="font-bold" href={`/users/${info.row.original.id}`}>
            {firstName} {lastName}
          </A>
          <p>
            {email}
            {isEmailVerified ? <Badge.Success>Verified </Badge.Success> : null}
          </p>
          <p>
            {countryCode} {phone}
          </p>
        </div>
      );
    },
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => {
      const { city, postalCode } = info.row.original;
      return (
        <div>
          <p>
            {city} {postalCode ? `,(${postalCode})` : null}
          </p>
        </div>
      );
    },
  }),
  columnHelper.accessor("postalCode", {
    header: "PostalCode",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_logged_in_at", {
    header: "LastLoggedIn",
    cell: (info) => {
      return <p class="text-nowrap">{timeAgo(info.getValue())}</p>;
    },
  }),
  columnHelper.accessor("experience", {
    header: "Experience",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => {
      return <p class="text-nowrap">{timeAgo(info.getValue())}</p>;
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: (info) => {
      return <p class="text-nowrap">{timeAgo(info.getValue())}</p>;
    },
  }),
];

export type UserJob = {
  jobId: string;
  title: string;
  description: string;
  location: string;
  updatedAt: string;
};

const jobColumnHelper = createColumnHelper<UserJob>();

export const userJobColumns = [
  jobColumnHelper.display({
    id: "jobTitle",
    header: "Job Title",
    cell: (info) => {
      const { title, jobId } = info.row.original;
      return (
        <A class="font-semibold" href={`/jobs/${jobId}`}>
          {title}
        </A>
      );
    },
  }),
  jobColumnHelper.accessor("location", {
    header: "Location",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  jobColumnHelper.display({
    id: "jobDescription",
    header: "Description",
    cell: (info) => {
      const { description } = info.row.original;
      return <div class="line-clamp-4 text-sm" innerHTML={description}></div>;
    },
  }),
  jobColumnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: (info) => <span class="text-nowrap">{timeAgo(info.getValue())}</span>,
  }),
];
