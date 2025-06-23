import { createSignal } from "solid-js";
import Tabs from "@components/tabs";
import CompanyList from "./CompaniesList";
import { useSearchParams } from "@solidjs/router";

const AwaitingApprovalPage = () => {
  return (
    <div>
      <h2>Awaiting Approval</h2>
      <p>This is the content for the "Awaiting Approval" tab.</p>
    </div>
  );
};

const AwaitingReimbursementPage = () => {
  return (
    <div>
      <h2>Awaiting Reimbursement</h2>
      <p>This is the content for the "Awaiting Reimbursement" tab.</p>
    </div>
  );
};

const ReimbursedPage = () => {
  return (
    <div>
      <h2>Reimbursed</h2>
      <p>This is the content for the "Reimbursed" tab.</p>
    </div>
  );
};

function Recruiters(_props: any) {
  const tabs = [
    { label: "All", value: "all" },
    { label: "Awaiting Approval", value: "awaiting_approval" },
    { label: "Awaiting Reimbursement", value: "awaiting_reimbursement" },
    { label: "Reimbursed", value: "reimbursed" },
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
      defaultTab="all"
      selectedTab={selectedTab()}
      onTabChange={handleTabChange}
    >
      {selectedTab() === "all" && <CompanyList />}
      {selectedTab() === "awaiting_approval" && <AwaitingApprovalPage />}
      {selectedTab() === "awaiting_reimbursement" && (
        <AwaitingReimbursementPage />
      )}
      {selectedTab() === "reimbursed" && <ReimbursedPage />}
    </Tabs>
  );
}

export default Recruiters;
