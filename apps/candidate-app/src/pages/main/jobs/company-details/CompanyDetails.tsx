import { NoProfile } from "@/assets/images";
import LinkedInIcon from "@/assets/svg/LinkedInIcon";
import MailIcon from "@/assets/svg/MailIcon";
import WebsiteIcon from "@/assets/svg/WebsiteIcon";
import JobCard from "@/components/ui/cards/JobCard";
import Loader from "@/components/ui/loader/Loader";
import { getJobDetails, getJobs } from "@/helpers/apis/jobs";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { JOBS } from "@/routes";
import { JobData } from "@/types/jobs.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";

const CompanyDetails: React.FC = () => {
    const { id } = useParams();

    const OneJobDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_JOB_DETAILS],
        queryFn: async () => await getJobDetails(id!),
    });

    const companyId = OneJobDetails.data?.company?.id;

    const GetJobs = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_JOBS],
        queryFn: () => getJobs({ page: 1, pageSize: 2, companyId: companyId }),
        enabled: !!OneJobDetails.data?.company?.id,
    });

    return OneJobDetails.isLoading ? (
        <Loader isVisible />
    ) : OneJobDetails?.data ? (
        <div className="flex flex-col items-center justify-start gap-4 w-full h-full bg-white overflow-y-auto scrollbar-hidden">
            <div className="w-full bg-white rounded-2xl p-4 border border-[#E9E9E9]">
                {/* Close Button */}
                <Link
                    to={JOBS + "/" + OneJobDetails.data?.job?.id}
                    replace
                    className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
                >
                    <i className="pi pi-times"></i>
                </Link>

                <div className="flex flex-col gap-6 pt-8">
                    <div className="flex md:flex-row flex-col items-center md:gap-0 gap-4 justify-between">
                        <div className=" flex items-center gap-6 w-full">
                            <div className="shrink-0 lg:w-24 lg:h-24 md:w-20 md:h-20 w-14 h-14 text-xs text-center rounded-full border border-primary bg-[#F7FAFF]">
                                <img
                                    src={
                                        OneJobDetails.data?.company.logo ||
                                        NoProfile
                                    }
                                    alt="No Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <p className="lg:text-5xl md:text-3xl text-lg font-semibold w-11/12 md:line-clamp-1 break-words line-clamp-2 pb-1.5">
                                {OneJobDetails.data?.company.companyName}
                            </p>
                        </div>

                        {(OneJobDetails.data?.company.linkedin ||
                            OneJobDetails.data?.company.linkedin) && (
                            <div className="flex flex-row items-center md:justify-end gap-2 pr-4 md:w-auto w-full ml-auto">
                                {OneJobDetails.data?.company.linkedin && (
                                    <Link
                                        to={
                                            OneJobDetails.data?.company.linkedin
                                        }
                                        target="_blank"
                                        className="flex items-center justify-center md:w-9 w-6 md:h-9 h-6 border border-[#E7E7E7] rounded-full hover:bg-[#f4cbf8ad]"
                                    >
                                        <LinkedInIcon
                                            color="#0B69C7"
                                            background="transparent"
                                            width="40"
                                            height="40"
                                        />
                                    </Link>
                                )}
                                {OneJobDetails.data?.company.twitter && (
                                    <Link
                                        to={OneJobDetails.data?.company.twitter}
                                        target="_blank"
                                        className="flex items-center justify-center md:w-9 w-6 md:h-9 h-6 border border-[#E7E7E7] rounded-full p-2 hover:bg-[#f4cbf8ad]"
                                    >
                                        <i className="pi pi-twitter text-black md:text-base text-xs"></i>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="md:text-base text-xs text-[#393939]">
                        {OneJobDetails.data?.company.address}
                    </p>

                    {(OneJobDetails.data?.company.email ||
                        OneJobDetails.data?.company.website) && (
                        <div className="flex md:flex-row flex-col md:text-base text-xs lg:gap-0 gap-2 w-full">
                            {OneJobDetails.data?.company.email && (
                                <Link
                                    to={`mailto:${OneJobDetails.data?.company.email}`}
                                    target="_blank"
                                    className="flex gap-2 items-center md:max-w-2/5"
                                >
                                    <MailIcon />
                                    <p className="max-w-10/12 truncate break-words">
                                        {OneJobDetails.data?.company.email}
                                    </p>
                                </Link>
                            )}
                            {OneJobDetails.data?.company.website && (
                                <Link
                                    to={OneJobDetails.data?.company.website}
                                    target="_blank"
                                    className="flex gap-2 items-center md:max-w-1/2"
                                >
                                    <WebsiteIcon />
                                    <p className="max-w-10/12 truncate break-words">
                                        {OneJobDetails.data?.company.website}
                                    </p>
                                </Link>
                            )}
                        </div>
                    )}
                    <p className="font-medium leading-8 line-clamp-4 break-words md:text-base text-xs">
                        {OneJobDetails.data?.company.description}
                    </p>

                    <p className="md:text-lg text-xs text-black">
                        <span className="md:text-sm text-[10px]  text-[#626262]">
                            Employee Size{" "}
                        </span>
                        : {OneJobDetails.data?.company.employeeSize}
                    </p>

                    {OneJobDetails.data?.company.companyImages.length > 0 && (
                        <div className="flex flex-wrap items-start md:justify-start justify-center md:text-base text-xs gap-4 border-t border-[#E9E9E9] md:pt-8 pt-4">
                            {OneJobDetails.data?.company.companyImages.map(
                                (image: string, index) => (
                                    <div
                                        key={index}
                                        className="w-36 h-36"
                                    >
                                        <img
                                            src={image}
                                            alt="Company Images"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-start gap-4 pt-2">
                <p className="md:text-2xl text-lg font-semibold w-full">
                    Latest Job Posts
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {GetJobs.data?.data && GetJobs.data?.data?.length > 0 ? (
                        GetJobs.data?.data?.map((jobData: JobData) => (
                            <JobCard
                                key={jobData.job.id}
                                jobData={jobData}
                            />
                        ))
                    ) : (
                        <div className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
                            No Applied Applications Found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <p className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
            No data found
        </p>
    );
};

export default CompanyDetails;
