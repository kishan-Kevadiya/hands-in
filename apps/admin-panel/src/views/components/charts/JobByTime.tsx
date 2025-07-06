import { createMemo, createSignal, Show } from "solid-js";
import { DefaultChart } from "solid-chartjs";
import { useQuery } from "@tanstack/solid-query";
import { QUERY_KEYS } from "@utils/constants";
import ChartRegister from "./ChartRegister";
import { CustomDateRangePicker } from "../date-picker";
import { getDateRange } from "@utils";
import type { PickerValue } from "@rnwonder/solid-date-picker";
import { jobApis } from "@helpers/apis/jobs";

type JobsData = { count: number; date: string };

const JobByTime = () => {
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
      setValue(value);
    }
  };

  const jobsCountQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.JOBS.COUNT_BY_DATE, value().value.start, value().value.end],
    queryFn: () => jobApis.getCountByDate({ startDate: value().value.start || "", endDate: value().value.end || "" }),
  }));

  const Data = createMemo(() => {
    if (jobsCountQuery.data) {
      return jobsCountQuery.data.result.reduce(
        (acc: { labels: [], data: [] }  , d: JobsData) => {
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
    if (jobsCountQuery.data) {

      return {
        labels: Data().labels,
        datasets: [
          {
            label: "Count",
            data: Data().data,
            backgroundColor: "rgba(0, 99, 132, 0.2)",
            borderColor: "rgb(0, 99, 132)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#6f29ab",
            pointBorderColor: "#fff",
          },
        ],
      };
    }
  });

  const chartOptions = createMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 50
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Jobs Over Time",
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
        title: {
          display: true,
          text: "Count",
        },
        ticks: {
          precision: 0,
          stepSize: 1
        },
        beginAtZero: true,
      },
    },
  }));

  return (
    <ChartRegister>
      <div class="jobs-posted-over-time-page">
        <div class="d-flex align-center gap-2 justify-between mb-4">
          <h2 class="mb-1 text-primary">Jobs Over Time</h2>
          <CustomDateRangePicker.RangePicker onChange={handleDateChange} value={value} placeholder="Please select a range" id="date-range-filter" />
        </div>
        <Show
          when={!jobsCountQuery.isLoading && !jobsCountQuery.error}
          fallback={
            jobsCountQuery.isLoading ? (
              <div>Loading...</div>
            ) : jobsCountQuery.error ? (
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

export default JobByTime;
