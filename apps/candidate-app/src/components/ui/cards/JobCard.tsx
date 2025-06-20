import { NoProfile } from "@/assets/images";
import CheckIcon from "@/assets/svg/CheckIcon";
import ExperienceIcon from "@/assets/svg/jobs/ExperienceIcon";
import FullTimeIcon from "@/assets/svg/jobs/FullTimeIcon";
import LocationIcon from "@/assets/svg/jobs/LocationIcon";
import OnsiteIcon from "@/assets/svg/jobs/OnsiteIcon";
import LinkedInIcon from "@/assets/svg/LinkedInIcon";
import { getUser } from "@/helpers/apis/auth";
import { saveJob } from "@/helpers/apis/jobs";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { JOBS, MESSAGES } from "@/routes";
import {
    ApplicationStatus,
    JobData,
    jobTypeObj,
    Language,
} from "@/types/jobs.types";
import { RoleTable } from "@/types/profileSetup.types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "../buttons/PrimaryButton";
import PreassessmentModal from "../modals/PreassessmentModal";
import ProfileComplitionModal from "../modals/ProfileComplitionModal";
import ResumeModal from "../modals/ResumeModal";

export type TabFooterBtnType =
    | "AI_RECOMMENDED"
    | "APPLIED"
    | "ACCEPTED_REJECTED"
    | "SAVED";
export type TabHeaderBtnType =
    | "AI_RECOMMENDED"
    | "APPLIED"
    | "ACCEPTED_REJECTED"
    | "SAVED";

export interface ApplicationCardProps {
    btnType?: TabFooterBtnType;
    jobData: JobData;
    refetchData?: () => void;
}

const JobCard: React.FC<ApplicationCardProps> = ({
    btnType = "AI_RECOMMENDED",
    jobData,
    refetchData = () => {},
}) => {
    const navigate = useNavigate();

    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [isPreassessmentModal, setIsPreassessmentModal] = useState(false);
    const [isProfileComplitionModal, setIsProfileComplitionModal] =
        useState(false);

    const UserData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_USER],
        queryFn: async () => await getUser(),
    });

    const [isLiked, setIsLiked] = useState(jobData?.isSaved);

    const updateSaved = async (jobId: string) => {
        try {
            setIsLiked(!isLiked);
            await saveJob(jobId);
            await refetchData();
        } catch (error) {
            setIsLiked(jobData?.isSaved);
            console.error(error);
        }
    };

    return (
        <Card
            pt={{
                root: {
                    className: `relative rounded-2xl font-manrope bg-[#F6F6F6] hover:bg-[#FFF1F5] shadow-none cursor-pointer transition-all duration-300 ease-in-out ${
                        jobData.messageCount > 0
                            ? "border-2 border-primary"
                            : ""
                    }`,
                },
                content: {
                    className: "p-0 h-full",
                },
                body: {
                    className: "h-full",
                },
            }}
            onClick={() => {
                navigate(JOBS + "/" + jobData.job?.id);
                queryClient.removeQueries({
                    queryKey: [USE_QUERY_KEYS.GET_JOB_DETAILS],
                });
            }}
        >
            <div className="w-full flex flex-col items-start justify-between gap-3 h-full">
                <div className="w-full flex flex-col items-start justify-start lg:gap-4 gap-2">
                    {/* Job Title */}
                    <div className="w-full flex items-start justify-between">
                        <div className="flex flex-col md:gap-2 gap-0.5 text-black w-full">
                            <div className="flex justify-between w-full">
                                <h3 className="lg:text-3xl md:text-2xl text-base font-semibold line-clamp-2 w-4/5">
                                    {jobData.job.title}
                                </h3>
                                {getHeaderBtns(
                                    btnType,
                                    isLiked,
                                    () => updateSaved(jobData.job?.id),
                                    jobData
                                )}{" "}
                            </div>
                            <div className="flex flex-wrap items-center md:text-base text-xs md:gap-x-3 gap-1.5 gap-y-1">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        label={jobData.company?.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                        image={
                                            jobData.company?.logo || NoProfile
                                        }
                                        size="normal"
                                        shape="circle"
                                        style={{
                                            backgroundColor:
                                                "var(--color-field)",
                                        }}
                                        pt={{
                                            image: {
                                                className: "rounded-full",
                                            },
                                        }}
                                        className="border border-primary shrink-0 !w-6 !h-6 !text-xs"
                                    />
                                    <p className="text-primary font-semibold break-words">
                                        {jobData.company?.name}
                                    </p>
                                </div>
                                {jobData.applicationCount > 0 && (
                                    <div className="flex items-center md:gap-3 gap-1.5">
                                        <span className="md:h-1.5 h-1 md:w-1.5 w-1 bg-primary rounded-full" />
                                        <small className="text-primary font-medium">
                                            {jobData.applicationCount}{" "}
                                            Applications
                                        </small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="w-full flex justify-between">
                        <div className="flex flex-wrap items-center justify-start lg:gap-x-4 gap-2 text-black md:text-base text-xs w-full">
                            {jobData?.job?.jobType && (
                                <div className="flex items-center gap-2">
                                    <FullTimeIcon />
                                    <p>{jobTypeObj[jobData.job?.jobType]}</p>
                                </div>
                            )}
                            {jobData?.job?.workModel && (
                                <div className="flex items-center gap-2">
                                    <OnsiteIcon />
                                    <p>
                                        {jobData.job?.workModel
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            jobData.job?.workModel
                                                ?.slice(1)
                                                .toLowerCase()}
                                    </p>
                                </div>
                            )}
                            {jobData?.job?.experience !== null &&
                                jobData?.job?.experience !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <ExperienceIcon />
                                        {jobData.job?.experience === 0 ? (
                                            <p>Fresher</p>
                                        ) : (
                                            <p>
                                                {jobData.job?.experience}+ Year
                                                Experience
                                            </p>
                                        )}
                                    </div>
                                )}
                            {jobData?.job?.location && (
                                <div className="flex items-center gap-2">
                                    <LocationIcon />
                                    <p className="line-clamp-1">
                                        {jobData.job?.location}
                                    </p>
                                </div>
                            )}
                        </div>

                        {jobData?.company?.linkedIn && (
                            <a
                                href={jobData.company?.linkedIn}
                                target="_blank"
                                className="lg:flex hidden items-center justify-center  rounded-full h-fit"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <LinkedInIcon
                                    color="#0B69C7"
                                    background="transparent"
                                    width="40"
                                    height="40"
                                />
                            </a>
                        )}
                    </div>

                    {/* Skills Required */}
                    {[...jobData.job.hardSkills, ...jobData.job.softSkills]
                        .length > 0 && (
                        <div className="w-full lg:block hidden">
                            <div className="text-black font-semibold mb-2">
                                Skills Required
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm text-black font-semibold">
                                {[
                                    ...jobData.job.hardSkills,
                                    ...jobData.job.softSkills,
                                ]
                                    .slice(0, 4)
                                    .map((skill: string) => (
                                        <div
                                            className="bg-white rounded-lg px-3 py-1"
                                            key={skill}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                {[
                                    ...jobData.job.hardSkills,
                                    ...jobData.job.softSkills,
                                ].length > 4 ? (
                                    <div className="bg-white rounded-lg px-3 py-1">
                                        +{" "}
                                        {[
                                            ...jobData.job.hardSkills,
                                            ...jobData.job.softSkills,
                                        ].length - 4}{" "}
                                        more
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {jobData.job?.languages &&
                        jobData.job?.languages.length > 0 && (
                            <div className="lg:flex hidden flex-col gap-1">
                                <h3 className="text-black font-semibold mb-1">
                                    Languages
                                </h3>
                                <div className="flex flex-wrap gap-x-6">
                                    {jobData.job?.languages.map(
                                        (languages: Language) => (
                                            <p
                                                key={languages.language}
                                                className="text-black font- relative z-0 after:h-1.5 after:w-1.5 after:bg-black after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-4 last:after:hidden"
                                            >
                                                {languages.language
                                                    ?.charAt(0)
                                                    ?.toUpperCase() +
                                                    languages.language
                                                        ?.slice(1)
                                                        ?.toLowerCase()}
                                                :
                                                <span className="text-[#393939] font-light">
                                                    &nbsp;{" "}
                                                    {languages.proficiency
                                                        ?.charAt(0)
                                                        ?.toUpperCase() +
                                                        languages.proficiency
                                                            ?.slice(1)
                                                            ?.toLowerCase()}
                                                </span>
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                </div>

                {jobData.job?.expiry && (
                    <div className="w-full flex flex-row lg:gap-0 gap-2 items-center justify-between">
                        <p className="text-[#FF5C5C] md:text-base text-xs font-medium lg:w-auto w-full">
                            {jobData.job?.isExpired ? "Expired: " : "Expiry: "}
                            <span className="text-black font-semibold">
                                {moment(jobData.job?.expiry?.toString()).format(
                                    "DD MMM, YYYY"
                                )}
                            </span>
                        </p>
                        {!jobData.job?.isExpired &&
                            getFooterBtns(
                                btnType,
                                !UserData.data?.remainingProfileModules
                                    ?.isPersonalInfoCompleted ||
                                    !UserData.data?.remainingProfileModules
                                        ?.isEducationCompleted ||
                                    !UserData.data?.remainingProfileModules
                                        ?.isWorkExperienceCompleted ||
                                    !UserData.data?.remainingProfileModules
                                        ?.isResumeUploaded
                                    ? setIsProfileComplitionModal
                                    : jobData.matchedRoles?.filter(
                                          (role: RoleTable) =>
                                              role.isTestGiven === true
                                      ).length > 0
                                    ? setIsResumeModalOpen
                                    : setIsPreassessmentModal,
                                jobData
                            )}
                    </div>
                )}

                {/* Profile Completion Modal */}
                <ProfileComplitionModal
                    personalInfoCompleted={
                        UserData.data?.remainingProfileModules
                            .isPersonalInfoCompleted ?? false
                    }
                    educationCompleted={
                        UserData.data?.remainingProfileModules
                            .isEducationCompleted ?? false
                    }
                    workExperienceCompleted={
                        UserData.data?.remainingProfileModules
                            .isWorkExperienceCompleted ?? false
                    }
                    resumeUploaded={
                        UserData.data?.remainingProfileModules
                            .isResumeUploaded ?? false
                    }
                    rolesSelected={
                        UserData.data?.remainingProfileModules
                            .areRolesSelected ?? false
                    }
                    visible={isProfileComplitionModal}
                    setVisible={setIsProfileComplitionModal}
                />

                {/* Preassessment Modal */}
                <PreassessmentModal
                    visible={isPreassessmentModal}
                    roles={jobData?.matchedRoles?.map((role) => ({
                        id: role.id,
                        title: role.title,
                    }))}
                    setVisible={setIsPreassessmentModal}
                />

                <ResumeModal
                    jobId={jobData.job?.id}
                    role={jobData.job?.title}
                    logo={jobData.company?.logo}
                    companyName={jobData.company?.name}
                    visible={isResumeModalOpen}
                    setVisible={setIsResumeModalOpen}
                />
            </div>
        </Card>
    );
};

export default JobCard;

/* Footer Buttons */
// Open Confirm Shortlist Modal
const AppliedBtns = ({
    setConfirmShortlist,
    jobData,
}: {
    setConfirmShortlist: (value: boolean) => void;
    jobData: JobData;
}) => {
    return (
        <>
            {jobData.application === null ? (
                <PrimaryButton
                    labelStyle="md:text-sm text-xs"
                    label="Apply"
                    icon={<CheckIcon />}
                    className="lg:w-[150px] w-1/2 md:h-[40px] h-[35px] bg-[#2F2F2F]"
                    onClick={(e) => {
                        e.stopPropagation();
                        setConfirmShortlist(true);
                    }}
                />
            ) : (
                <p className="md:text-base text-xs font-semibold px-6 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                    Applied
                    {/* {jobData.application?.status === ApplicationStatus.shortListed ? "In Progress" : "Applied"} */}
                </p>
            )}
        </>
    );
};

const MessagedBtns = () => {
    const navigate = useNavigate();

    return (
        <PrimaryButton
            label="Message"
            className="lg:w-[150px] w-1/2 h-[40px] bg-[#2F2F2F]"
            onClick={(e) => {
                e.stopPropagation();
                navigate(MESSAGES);
            }}
        />
    );
};

/* Header Buttons */

const AIRecommendedSaveBtns = ({
    jobData,
    isFilled,
    handleClick,
}: {
    jobData?: JobData;
    isFilled: boolean;
    handleClick: () => void;
}) => {
    return jobData && jobData?.messageCount > 0 ? (
        <div className="absolute top-0 right-0 bg-primary text-white md:text-sm text-xs px-4 py-2 rounded-tr-[14px] rounded-bl-lg ">
            <p>{jobData?.messageCount} Messages</p>
        </div>
    ) : (
        <div
            onClick={(e) => {
                e.stopPropagation();
                handleClick();
            }}
            className="bg-[#FFD0DE] md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
        >
            {isFilled ? (
                <i className="pi pi-heart-fill md:text-base text-sm text-primary"></i>
            ) : (
                <i className="pi pi-heart md:text-base text-sm text-primary"></i>
            )}
        </div>
    );
};

const AppiedMessagesBtns = ({ jobData }: { jobData: JobData }) => {
    return (
        <>
            {jobData?.messageCount > 0 ? (
                <div className="absolute top-0 right-0 bg-primary text-white text-sm px-4 py-2 rounded-tr-[14px] rounded-bl-lg ">
                    <p>{jobData?.messageCount} Messages</p>
                </div>
            ) : (
                jobData.application?.status ===
                    ApplicationStatus.shortListed && (
                    <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                        In Progress
                    </p>
                )
            )}
        </>
    );
};

const AcceptedRejectedBtn: React.FC<{ isAccepted?: boolean }> = ({
    isAccepted = false,
}) => {
    return (
        <p
            className={twMerge(
                "text-base font-semibold px-6 py-2 rounded-lg h-fit",
                isAccepted
                    ? "text-[#009C17] bg-[#E4FFE8]"
                    : "text-[#D60000] bg-[#FFE3E3]"
            )}
        >
            {isAccepted ? "Accepted" : "Rejected"}
        </p>
    );
};

const getHeaderBtns = (
    type: TabHeaderBtnType = "AI_RECOMMENDED",
    isFilled: boolean,
    onClick: () => void,
    job: JobData
) => {
    switch (type) {
        case "AI_RECOMMENDED":
            return (
                <AIRecommendedSaveBtns
                    jobData={job}
                    isFilled={isFilled}
                    handleClick={onClick}
                />
            );

        case "APPLIED":
            return <AppiedMessagesBtns jobData={job} />;

        case "ACCEPTED_REJECTED":
            return (
                <AcceptedRejectedBtn
                    isAccepted={
                        job.application?.status === ApplicationStatus.accepted
                    }
                />
            );

        case "SAVED":
            return (
                <AIRecommendedSaveBtns
                    isFilled={isFilled}
                    handleClick={onClick}
                />
            );

        default:
            break;
    }
};

const getFooterBtns = (
    type: TabFooterBtnType = "APPLIED",
    setConfirmShortlist: (value: boolean) => void,
    job: JobData
) => {
    switch (type) {
        case "ACCEPTED_REJECTED":
            return <MessagedBtns />;

        case "SAVED":
            return (
                <AppliedBtns
                    setConfirmShortlist={setConfirmShortlist}
                    jobData={job}
                />
            );

        case "APPLIED":
            return <></>;

        case "AI_RECOMMENDED":
            return (
                <AppliedBtns
                    setConfirmShortlist={setConfirmShortlist}
                    jobData={job}
                />
            );

        default:
            break;
    }
};
