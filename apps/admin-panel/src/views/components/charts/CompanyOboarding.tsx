import { createMemo, Show } from "solid-js";
import { DefaultChart } from "solid-chartjs";
import { useQuery } from "@tanstack/solid-query";
import { companyApis } from "@apis/company";
import { QUERY_KEYS } from "@utils/constants";
import ChartRegister from "./ChartRegister";

type CompanyData = { count: number; date: string };

const CompanyOnboarding = () => {
  const startDate = "2025-05-01";
  const endDate = new Date().toISOString();

  const companyCountQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.RECRUITER.COUNT, { startDate, endDate }],
    queryFn: () => companyApis.getCountByDate({ startDate, endDate }),
  }));

  // Prepare Chart.js data and options
  const chartData = createMemo(() => {
    if (companyCountQuery.data) {
      const labels = companyCountQuery.data.result.map(
        (item: CompanyData) => item.date,
      );
      const data = companyCountQuery.data.result.map(
        (item: CompanyData) => item.count,
      );
      return {
        labels,
        datasets: [
          {
            label: "Count",
            data,
            backgroundColor: "rgba(111, 41, 171, 0.2)",
            borderColor: "#6f29ab",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#6f29ab",
            pointBorderColor: "#fff",
            // No 'type' property for line chart dataset
          },
        ],
      };
    } 
  });

  const chartOptions = createMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Recuiters Over Time",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  }));

  return (
    <ChartRegister>
      <div class="company-onboarding-chart">
        <h2 class="mb-1 text-primary">Recuiters Onboarding</h2>
        <Show
          when={!companyCountQuery.isLoading && !companyCountQuery.error}
          fallback={
            companyCountQuery.isLoading ? (
              <div>Loading...</div>
            ) : companyCountQuery.error ? (
              <div>Error loading data</div>
            ) : null
          }
        >
          <DefaultChart
            type="line"
            data={chartData()}
            options={chartOptions()}
            height={300}
            width={600}
          />
        </Show>
      </div>
    </ChartRegister>
  );
};

export default CompanyOnboarding;
