import CompanyOnboarding from "@components/charts/CompanyOboarding";
import UserOnboarding from "@components/charts/UserOnboarding";
import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { companyApis } from "@apis/company";

import RevenueCards from "./RevenueCards";
import { CandidateIcon, CompanyIcon } from "@icons/index";

import "./styles.css";


function Dashboard(_props: any) {
  const dashboardDataQuery = useQuery(() => ({
    queryKey: ["dashboardDataCount"],
    queryFn: () => companyApis.getDaashboardDataCount(),
  }));

  return (
    <>
      <RevenueCards />
      <Show
        when={dashboardDataQuery.data}
        fallback={<p>Loading dashboard data...</p>}
      >
        <div class="dashboard-counts card">
          <div class="count-card" data-card="1">
            <h3 class="text-primary">Recuiters</h3>
            <p class="count">{dashboardDataQuery.data?.company || 0}</p>

            <span class="icon">
              <CompanyIcon />
            </span>
          </div>
          <div class="count-card" data-card="2">
            <h3 class="text-secondary">Candidates</h3>
            <p class="count">{dashboardDataQuery.data?.user || 0}</p>
               <span class="icon">
            <CandidateIcon />

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
    </>

  );
}

export default Dashboard;
