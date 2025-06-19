import { createSignal, Suspense } from "solid-js";
import Tabs from "@components/tabs";
import { useSearchParams } from "@solidjs/router";
import { lazy } from "solid-js";

const DetailsPage = lazy(() => import("./DetailPage"));
const JobsPage = lazy(() => import("./Jobs"));
const SubscriptionPage = lazy(() => import("./Subscriptions"));

function CompanyView(_props: any) {
  const tabs = [
    { label: "Details", value: "details" },
    { label: "Jobs", value: "jobs" },
    { label: "Subscriptions", value: "subscriptions" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  // Ensure tab is always a string (not string[])
  const getTabValue = (
    tab: string | string[] | undefined,
  ): string | undefined => {
    if (Array.isArray(tab)) {
      return tab[0];
    }
    return tab;
  };

  const [selectedTab, setSelectedTab] = createSignal(
    getTabValue(searchParams.tab) || "all",
  );

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSearchParams({ ...searchParams, tab: value });
  };

  return (
    <Tabs
      tabs={tabs}
      defaultTab="jobs"
      selectedTab={selectedTab()}
      onTabChange={handleTabChange}
    >
      {selectedTab() === "details" && (
        <Suspense fallback={<div>Loading details...</div>}>
          <DetailsPage />
        </Suspense>
      )}

      {selectedTab() === "jobs" && (
        <Suspense fallback={<div>Loading jobs...</div>}>
          <JobsPage />
        </Suspense>
      )}

      {selectedTab() === "subscriptions" && (
        <Suspense fallback={<div>Loading jobs...</div>}>
          <SubscriptionPage />
        </Suspense>
      )}
    </Tabs>
  );
}

export default CompanyView;
