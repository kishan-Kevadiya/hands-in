import { useQuery } from "@tanstack/solid-query";
import { useParams } from "@solidjs/router";
import { createMemo, createSignal, Show, Suspense, For } from "solid-js";

import { userJobsApis } from "@apis/user_job";
import { usersApis } from "@apis/users";

// Import getDateTime utility
import { getDateTime, timeAgo } from "@utils/index";
import { QUERY_KEYS } from "@utils/constants";

import { JobCard, Divider } from "@components/common";
import { FormFields } from "@components/form";

import "../styles.css";

// Memoize static labels to avoid unnecessary re-renders
const userInfoFields = [
  { label: "Email", key: "email" },
  {
    label: "Email Verified",
    key: "isEmailVerified",
    render: (v: any) => (v ? "Yes" : "No"),
  },
  { label: "Gender", key: "gender", fallback: "-" },
  { label: "Phone", key: "phone", fallback: "-" },
  { label: "Country Code", key: "countryCode", fallback: "-" },
  { label: "City", key: "city", fallback: "-" },
  { label: "Postal Code", key: "postalCode", fallback: "-" },
  { label: "Bio", key: "bio", fallback: "-" },
  { label: "Experience", key: "experience", fallback: "-" },
  { label: "Website", key: "website", fallback: "-" },
  { label: "LinkedIn", key: "linkedIn", fallback: "-" },
  {
    label: "Last Logged In",
    key: "lastLoggedInAt",
    fallback: "-",
    render: (v: any) => (v ? timeAgo(v) : "-"),
  },
  {
    label: "Created At",
    key: "createdAt",
    fallback: "-",
    render: (v: any) => (v ? getDateTime(v) : "-"),
  },
];

const ViewUser = () => {
  const params = useParams();
  const userId = params.id ?? "";

  // Use a single signal for pagination state
  const [pagination, _setPagination] = createSignal({
    pageIndex: 1,
    limit: 10,
  });

  const userQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.USER.ONE, userId],
    queryFn: () => usersApis.getById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  }));

  const pageIndex = createMemo(() => pagination().pageIndex);
  const pageLimit = createMemo(() => pagination().limit);

  const userJobsQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.USER.JOBS, userId, pageIndex(), pageLimit()],
    queryFn: () =>
      userJobsApis.getByUserId({
        userId,
        page: pageIndex(),
        limit: pageLimit(),
      }),
    enabled: !!userId,
    keepPreviousData: true,
    staleTime: 1000 * 30,
  }));

  // Memoize jobs data and total count
  const jobsData = createMemo(() => userJobsQuery.data?.data ?? []);
  const totalJobs = createMemo(() => userJobsQuery.data?.totalCount ?? 0);

  return (
    <div class="user-view-page card">
      {/* User Info Section */}
      <Suspense fallback={<div>Loading user info...</div>}>
        <Show when={userQuery.isSuccess}>
          <div class="d-flex align-centr mb-3 gap-2">
            <FormFields.BackButton />
            <h2 class="mb-1">
              {userQuery.data.firstName} {userQuery.data.lastName}
            </h2>
          </div>

          {userQuery.data && (
            <div class="user-info text-light">
              <For each={userInfoFields}>
                {(field) => (
                  <div>
                    <strong>{field.label}:</strong>{" "}
                    {field.render
                      ? field.render(userQuery.data[field.key])
                      : (userQuery.data[field.key] ?? field.fallback ?? "")}
                  </div>
                )}
              </For>
              <div>
                <strong>Avatar:</strong>{" "}
                <Show when={userQuery.data.avatar} fallback="-">
                  <img
                    src={userQuery.data.avatar}
                    alt="Avatar"
                    loading="lazy"
                  />
                </Show>
              </div>
              <div>
                <strong>Resume:</strong>{" "}
                <Show when={userQuery.data.resume} fallback="-">
                  <a
                    href={userQuery.data.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </Show>
              </div>
              <div>
                <strong>Other Documents:</strong>{" "}
                <Show
                  when={
                    Array.isArray(userQuery.data.otherDocuments) &&
                    userQuery.data.otherDocuments.length > 0
                  }
                  fallback="-"
                >
                  <ul>
                    <For each={userQuery.data.otherDocuments}>
                      {(doc: string, idx) => (
                        <li>
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Document {idx() + 1}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
              </div>
            </div>
          )}
        </Show>
      </Suspense>

      {/* Jobs Section */}

      <Suspense fallback={<div class="table-loader">Loader....</div>}>
        <Show when={userJobsQuery.isError}>
          <div>Error loading user jobs.</div>
        </Show>

        <Show when={!userJobsQuery.isLoading && !userJobsQuery.isError}>
          <Divider
            text={`Total Applied Jobs(${totalJobs()})`}
            variant="light"
          />
          <Show
            when={totalJobs() > 0}
            fallback={
              <div class="no-jobs-fallback">
                <p>No jobs applied yet.</p>
              </div>
            }
          >
            <div class="job-cards-list">
              <For each={jobsData()}>{(job: any) => <JobCard job={job} />}</For>
            </div>
          </Show>
        </Show>
      </Suspense>
    </div>
  );
};

export default ViewUser;
