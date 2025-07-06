import { createMemo, createSignal, Show } from "solid-js";
import { DefaultChart } from "solid-chartjs";
import { useQuery } from "@tanstack/solid-query";
import { companyApis } from "@apis/company";
import { QUERY_KEYS } from "@utils/constants";
import ChartRegister from "./ChartRegister";
import { CustomDateRangePicker } from "../date-picker";
import { getDateRange } from "@utils";
import type { PickerValue } from "@rnwonder/solid-date-picker";

type CompanyData = { count: number; date: string };

const CompanyOnboarding = () => {
  const dateRange = getDateRange();

  const [value, setValue] = createSignal<PickerValue>({
    label: '',
    value: {
      start: dateRange[0].toISOString(),
      end: dateRange[1].toISOString(),
    },
  });

  // 2. Handle date change
  const handleDateChange = (value: PickerValue) => {
    if (value && value.value.end && value.value.start) {
      console.log("Selected date range:", value);
      setValue(value);
    }
  };

  const companyCountQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.RECRUITER.COUNT, value().value.start, value().value.end],
    queryFn: () => companyApis.getCountByDate({ startDate: value().value.start || "", endDate: value().value.end || "" }),
  }));


  const Data = createMemo(() => {
    if (companyCountQuery.data) {
      return companyCountQuery.data.result.reduce(
        (acc: { labels: [], data: [] }, d: CompanyData) => {
          return {
            labels: [...acc.labels, d.date],
            data: [...acc.data, d.count],
          };
        },
        { labels: [], data: [] }
      );
    }

    return { labels: [], data: [] };
  });

  // Prepare Chart.js data and options
  const chartData = createMemo(() => {
    if (companyCountQuery.data) {
      return {
        labels: Data().labels,
        datasets: [
          {
            label: "Count",
            data: Data().data,
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
    layout: {
      padding: {
        bottom: 10
      }
    },
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
        min: 0,
        max: Math.max(...Data().data) + 2,
        ticks: {
          precision: 0,
          stepSize: 1
        },
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
        <div class="d-flex align-center gap-2 justify-between mb-4">
          <h2 class="mb-1 text-primary">Recuiters Onboarding</h2>
          <CustomDateRangePicker.RangePicker onChange={handleDateChange} value={value} placeholder="Please select a range" id="date-range-filter" />
        </div>
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
