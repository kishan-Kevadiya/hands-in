import InfiniteScroll from '@/components/infinite-scroll';
import JobCard from '@/components/ui/cards/JobCard';
import Loader from '@/components/ui/loader/Loader';
import { useFilterContext } from '@/contexts/FilterContext';
import { getJobs } from '@/helpers/apis/jobs';
import { USE_QUERY_KEYS } from '@/helpers/constants';
import queryClient from '@/helpers/query.config';
import useDebounce from '@/hooks/useDebounce';
import { JobData } from '@/types/jobs.types';
import React from 'react';

const RecommendedJobs: React.FC = () => {

  const { jobTitle, filterData } = useFilterContext();
  const debouncedJobTitle = useDebounce(jobTitle, 500);

  const refetchData = () => {
    queryClient.invalidateQueries({
      queryKey: [USE_QUERY_KEYS.GET_JOBS, 'AI_RECOMMENDED'],
    })
  };

  return (
    <InfiniteScroll<JobData, { page: number; pageSize: number }>
      queryKey={[
        USE_QUERY_KEYS.GET_JOBS,
        'AI_RECOMMENDED',
        debouncedJobTitle,
        JSON.stringify(filterData),
      ]}
      fetchFn={async (params) => {
        const response = await getJobs({
          ...params,
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
          totalPages: Math?.ceil((Number(response?.totalCount) || 0) / params.pageSize) || 0, // Avoid NaN
        };
      }} initialParams={{ page: 1, pageSize: 10 }}
      getDataFromResponse={(response) => response.data}
      hasMorePages={(lastPage, allPages) => allPages.length < lastPage.totalPages}
      renderItem={(jobData) => (
        <JobCard
          key={jobData.job.id}
          btnType="AI_RECOMMENDED"
          jobData={jobData}
          refetchData={refetchData}
        />
      )}
      loadingComponent={<Loader isVisible={true} />}
      emptyComponent={
        <div className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
          No Recommended Jobs Found.
        </div>
      }
      gridCols={2}
      direction="down"
      className="gap-4 md:h-[calc(100vh-250px)] h-[calc(100vh-200px)]"
    />
  );
};

export default RecommendedJobs;
