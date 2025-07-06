import { createMemo, Show } from "solid-js";
import { DefaultChart } from "solid-chartjs";
import { useQuery } from "@tanstack/solid-query";
import { jobApis } from "@apis/jobs";
import { QUERY_KEYS } from "@utils/constants";
import ChartRegister from "./ChartRegister";

type JobData = { count: number; title: string };

const JobsBarChart = () => {
    const jobsCountQuery = useQuery(() => ({
        queryKey: [QUERY_KEYS.JOBS.COUNT_BY_TITLE],
        queryFn: () => jobApis.getCountByTitle(),
    }));

    const chartData = createMemo(() => {
        const jobData = jobsCountQuery.data;
        if (!jobData) {
            return {
                labels: [],
                datasets: [],
            };
        }

        const colors = [
            { background: 'rgba(0, 99, 132, 0.6)', border: 'rgb(0, 99, 132)' },          // Deep Blue
            { background: 'rgba(0, 158, 179, 0.6)', border: 'rgb(0, 158, 179)' },        // Teal
            { background: 'rgba(108, 117, 125, 0.6)', border: 'rgb(108, 117, 125)' },    // Steel Grey
            { background: 'rgba(204, 102, 0, 0.6)', border: 'rgb(204, 102, 0)' },        // Terracotta
            { background: 'rgba(85, 139, 47, 0.6)', border: 'rgb(85, 139, 47)' },        // Olive Green
            { background: 'rgba(92, 53, 106, 0.6)', border: 'rgb(92, 53, 106)' },        // Muted Purple
            { background: 'rgba(217, 217, 217, 0.6)', border: 'rgb(217, 217, 217)' },    // Light Grey
            { background: 'rgba(46, 82, 168, 0.6)', border: 'rgb(46, 82, 168)' },        // Royal Blue
            { background: 'rgba(242, 184, 121, 0.6)', border: 'rgb(242, 184, 121)' },    // Sand
            { background: 'rgba(140, 57, 57, 0.6)', border: 'rgb(140, 57, 57)' },
        ];

        return {
            labels: jobData.map((item: JobData) => item.title),
            datasets: [
                {
                    label: "Jobs Count",
                    data: jobData.map((item: JobData) => item.count),
                    backgroundColor: jobData.map(
                        (_: JobData, i: number) => colors[i % colors.length].border,
                    ),
                    borderColor: jobData.map(
                        (_: JobData, i: number) => colors[i % colors.length].background,
                    ),
                    borderWidth: {
                        left: 10
                    },
                    borderRadius: 10,
                    barThickness: 50,
                },
            ],
        };
    });

    const chartOptions = createMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                bottom: 70
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Jobs Posted By Title",
            },
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                ticks: {
                    display: true,
                    callback: function (_tickValue: string | number, index: number): string {
                        const labels = chartData().labels;
                        if (labels && labels[index]) {
                            const label = labels[index] as string;
                            return label.slice(0, 10) + "..."
                        }
                        return "NA";
                    },
                },
                grid: {
                    offset: true,
                    display: true,
                },
            },
            y: {
                min: 0,
                max: (jobsCountQuery.data && jobsCountQuery.data.length > 0) ? jobsCountQuery.data[0].count + 2 : 5,
                beginAtZero: true,
                grid: {
                    display: true,
                },
                ticks: {
                    precision: 0,
                    stepSize: 1
                },
            },
        },
    }));

    return (
        <ChartRegister>
            <div class="jobs-bar-chart">
                <div class="d-flex align-center gap-2 justify-between mb-4">
                    <h2 class="mb-1 text-primary">Jobs by title</h2>
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
                        type="bar"
                        data={chartData()}
                        options={chartOptions()}
                        height={500}
                        width={1200}
                    />
                </Show>
            </div>
        </ChartRegister>
    );
};

export default JobsBarChart;