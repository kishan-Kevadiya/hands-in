import { companyApis } from "@apis/company";
import { QUERY_KEYS } from "@utils/constants";
import { useQuery } from "@tanstack/solid-query";
import { createEffect, Match, Show, Switch } from "solid-js";
import { useParams } from "@solidjs/router";
import { JobCard } from "@components/common";
import { Index } from "solid-js";
import { FormFields } from "@components/form";

import "../styles.css";

const Jobs = () => {
  const params = useParams();
  const id = params.id;

  const jobsQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.RECRUITER.JOBS, id],
    queryFn: () => companyApis.getCompanyJobs(id),
    enabled: !!id,
  }));

  createEffect(() => {
    console.log(id);
  });

  return (
    <div class="jobs-page">
      <div class="d-flex gap-2 p-3 card">
        <FormFields.BackButton href="/recruiters" />
        <h3>Jobs List</h3>
      </div>
      <Show when={jobsQuery.isLoading}>
        <div class="py-4">Loading...</div>
      </Show>
      <Show when={jobsQuery.error}>
        <div class="text-red-500">Error: {jobsQuery.error?.message}</div>
      </Show>

      <div class="jobs-list card">
        <Switch>
          <Match when={jobsQuery.data?.length === 0}>
            <p>No jobs available</p>
          </Match>
          <Match when={jobsQuery.data?.length > 0}>
            <Index each={jobsQuery.data}>
              {(job) => <JobCard job={job()} />}
            </Index>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default Jobs;
