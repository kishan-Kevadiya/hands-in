import InfiniteScroll from '@/components/infinite-scroll';
import JobCard from "@/components/ui/cards/JobCard";
import Loader from '@/components/ui/loader/Loader';
import { useFilterContext } from '@/contexts/FilterContext';
import { getApplications } from "@/helpers/apis/application";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import useDebounce from '@/hooks/useDebounce';
import { ApplicationStatus, JobData } from "@/types/jobs.types";
import React from "react";

const AcceptedRejected: React.FC = () => {

    const { jobTitle, filterData } = useFilterContext();
    const debouncedJobTitle = useDebounce(jobTitle, 500);


    return (
        <InfiniteScroll<JobData, { page: number; pageSize: number }>
            queryKey={[USE_QUERY_KEYS.GET_APPLICATIONS, 'ACCEPTED_REJECTED',
                debouncedJobTitle,
            JSON.stringify(filterData),
            ]}
            fetchFn={async (params) => {
                const response = await getApplications({
                    ...params,
                    status: [ApplicationStatus.accepted, ApplicationStatus.rejected],
                    searchText: debouncedJobTitle,
                    experience: filterData?.experience,
                    minimumSalary: filterData?.salaryRange[0],
                    maximumSalary: filterData?.salaryRange[1],
                    workLocation: filterData?.workLocation,
                    workModel: filterData?.workModel,
                    workSchedule: filterData?.workSchedule,
                    qualification: filterData?.qualification,
                });
                return {
                    data: response?.data ?? [], // Provide an empty array as default value
                    hasMore:
                        (Number(response?.totalCount) || 0) > params.page * params.pageSize, // Ensure totalCount is a number
                    totalPages: Math.ceil((Number(response?.totalCount) || 0) / params.pageSize) || 0, // Avoid NaN
                };
            }} initialParams={{ page: 1, pageSize: 10 }}
            getDataFromResponse={(response) => response.data}
            hasMorePages={(lastPage, allPages) => allPages.length < lastPage.totalPages}
            renderItem={(jobData) => (
                <JobCard
                    key={jobData.job.id}
                    btnType="ACCEPTED_REJECTED"
                    jobData={jobData}
                />
            )}
            loadingComponent={<Loader isVisible={true} />}
            emptyComponent={
                <div className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">No Accepted or Rejected Applications Found.</div>
            }
            gridCols={2}
            direction="down"
            className="gap-4 md:h-[calc(100vh-250px)] h-[calc(100vh-200px)]"
            />
    )
};

export default AcceptedRejected;