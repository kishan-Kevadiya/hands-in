import CompanyOnboarding from "@components/charts/CompanyOboarding";
import UserOnboarding from "@components/charts/UserOnboarding";
import JobsBarChart from "@components/charts/JobsBarChart";
import JobByTime from "@components/charts/JobByTime";

import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { companyApis } from "@apis/company";
import { CandidateIcon, CompanyIcon, JobIcon } from "@icons/index";

import "./styles.css";

function Dashboard(_props: any) {
  const dashboardDataQuery = useQuery(() => ({
    queryKey: ["dashboardDataCount"],
    queryFn: () => companyApis.getDaashboardDataCount(),
  }));

  return (
    <>
      <Show
        when={dashboardDataQuery.data}
        fallback={<p>Loading dashboard data...</p>}
      >
        <div class="dashboard-counts card">
          <div class="count-card" data-card="1">
            <h3>Recuiters</h3>
            <p class="count">{dashboardDataQuery.data?.company || 0}</p>

            <span class="icon">
              <CompanyIcon />
            </span>
          </div>
          <div class="count-card" data-card="2">
            <h3>Candidates</h3>
            <p class="count">{dashboardDataQuery.data?.user || 0}</p>
            <span class="icon">
              <CandidateIcon />
            </span>
          </div>
          <div class="count-card" data-card="3">
            <h3>Jobs</h3>
            <p class="count">{dashboardDataQuery.data?.jobs || 0}</p>
            <span class="icon">
              <JobIcon />
            </span>
          </div>
        </div>
      </Show>


      <div class="dashboard-page card">
        <div class="charts">
          <CompanyOnboarding />
          <UserOnboarding />
        </div>
      </div>


      <div class="dashboard-page card">
        <JobsBarChart />
      </div>

      <div class="dashboard-page card">
        <JobByTime />
      </div>
    </>

  );
}

export default Dashboard;
