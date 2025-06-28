import { createMemo, createSignal, Show } from "solid-js";
import { DefaultChart } from "solid-chartjs";
import { useQuery } from "@tanstack/solid-query";
import { QUERY_KEYS } from "@utils/constants";
import { usersApis } from "@apis/users";
import ChartRegister from "./ChartRegister";
import { CustomDateRangePicker } from "../date-picker";
import type { PickerValue } from "@rnwonder/solid-date-picker";
import { getDateRange } from "@utils";

type UserData = { count: number; date: string };

const UserOnboarding = () => {
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

  const userCountQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.USER.COUNT, value().value.start, value().value.end],
    queryFn: () => usersApis.getCountByDate({ startDate: value().value.start || "", endDate: value().value.end || "" }),
  }));

  // Prepare Chart.js data and options
  const chartData = createMemo(() => {
    if (userCountQuery.data) {
      const labels = userCountQuery.data.result.map(
        (item: UserData) => item.date,
      );
      const data = userCountQuery.data.result.map(
        (item: UserData) => item.count,
      );
      return {
        labels,
        datasets: [
          {
            label: "User Count",
            data,
            backgroundColor: "rgba(190, 12, 199, 0.1)",
            borderColor: "pink",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "pink",
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
        text: "Users Over Time",
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        // Fix: mode should be one of the allowed string literals
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          drag: {
            enabled: true,
            backgroundColor: "rgba(225,225,225,0.3)",
            borderColor: "rgba(30,169,27,0.5)",
            borderWidth: 1,
          },
          mode: "xy",
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
        },
        limits: {
          x: { minRange: 1 },
          y: { minRange: 1 },
        },
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
          text: "User Count",
        },
        beginAtZero: true,
      },
    },
  }));

  return (
    <ChartRegister>
      <div class="user-onboarding-chart">
        <div class="d-flex align-center gap-2 justify-between mb-4">
          <h2 class="mb-1 text-secondary">Candidate Onboarding</h2>
          <CustomDateRangePicker.RangePicker onChange={handleDateChange} value={value} placeholder="Please select a range" id="date-range-filter" />
        </div>
        <Show
          when={!userCountQuery.isLoading && !userCountQuery.error}
          fallback={
            userCountQuery.isLoading ? (
              <div>Loading...</div>
            ) : userCountQuery.error ? (
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

export default UserOnboarding;
