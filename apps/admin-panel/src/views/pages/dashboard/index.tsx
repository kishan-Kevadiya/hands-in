import CompanyOnboarding from "@components/charts/CompanyOboarding";
import UserOnboarding from "@components/charts/UserOnboarding";
import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { companyApis } from "@apis/company";

import "./styles.css";

function Dashboard(_props: any) {
  const dashboardDataQuery = useQuery(() => ({
    queryKey: ["dashboardDataCount"],
    queryFn: () => companyApis.getDaashboardDataCount(),
  }));

  return (
    <div class="dashboard-page card">
      <Show
        when={dashboardDataQuery.data}
        fallback={<p>Loading dashboard data...</p>}
      >
        <div class="dashboard-counts">
          <div class="count-card">
            <h3>Recuiters</h3>
            <p class="count">{dashboardDataQuery.data?.company || 0}</p>
          </div>
          <div class="count-card">
            <h3>Candidates</h3>
            <p class="count">{dashboardDataQuery.data?.user || 0}</p>
          </div>
        </div>
      </Show>
      <div class="charts">
        <CompanyOnboarding />
        <UserOnboarding />
      </div>
    </div>
  );
}

export default Dashboard;
