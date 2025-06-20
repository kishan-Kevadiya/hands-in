import { NoProfile } from "@/assets/images";
import CheckIcon from "@/assets/svg/CheckIcon";
import ExperienceIcon from "@/assets/svg/jobs/ExperienceIcon";
import FullTimeIcon from "@/assets/svg/jobs/FullTimeIcon";
import GenderIcon from "@/assets/svg/jobs/GenderIcon";
import JobDescriptionIcon from "@/assets/svg/jobs/JobDescriptionIcon";
import LanguageIcon from "@/assets/svg/jobs/LanguageIcon";
import LocationIcon from "@/assets/svg/jobs/LocationIcon";
import OnsiteIcon from "@/assets/svg/jobs/OnsiteIcon";
import QualificationIcon from "@/assets/svg/jobs/QualificationIcon";
import SkillIcon from "@/assets/svg/jobs/SkillIcon";
import VacancyIcon from "@/assets/svg/jobs/VacancyIcon";
import LinkedInIcon from "@/assets/svg/LinkedInIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Loader from "@/components/ui/loader/Loader";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import PreassessmentModal from "@/components/ui/modals/PreassessmentModal";
import ProfileComplitionModal from "@/components/ui/modals/ProfileComplitionModal";
import ResumeModal from "@/components/ui/modals/ResumeModal";
import { getUser } from "@/helpers/apis/auth";
import { getJobDetails, saveJob } from "@/helpers/apis/jobs";
import { getMessages, sendMessage } from "@/helpers/apis/message";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { getTimeOrDate } from "@/helpers/helper";
import queryClient from "@/helpers/query.config";
import { COMPANY_DETAILS, JOBS, LOGIN, PROFILE } from "@/routes";
import { ApplicationStatus, jobTypeObj, Language } from "@/types/jobs.types";
import { Message, UserType } from "@/types/message";
import { RoleTable } from "@/types/profileSetup.types";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Divider } from "primereact/divider";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const JobDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [preassessmentVisible, setPreassessmentVisible] = useState(false);
    const [isProfileComplitionModal, setIsProfileComplitionModal] =
        useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [selectRoleModal, setSelectRoleModal] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);
    const [copied, setCopied] = useState(false);

    const UserData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_USER],
        queryFn: async () => await getUser(),
    });

    const OneJobDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_JOB_DETAILS],
        queryFn: async () => await getJobDetails(id!),
    });

    const messagesFromServer = useQuery({
        queryKey: [OneJobDetails],
        queryFn: () =>
            getMessages({
                applicationId: OneJobDetails.data?.application?.id,
                page: 1,
                pageSize: 10,
            }),
        enabled: !!OneJobDetails.data?.application?.id,
    });

    const refetchData = () => {
        queryClient.invalidateQueries({
            queryKey: [USE_QUERY_KEYS.GET_JOB_DETAILS],
        });
    };

    const [isLiked, setIsLiked] = useState(OneJobDetails.data?.isSaved);

    const updateSaved = async () => {
        try {
            setIsLiked(!isLiked);
            await saveJob(id!);
            await refetchData();
        } catch (error) {
            setIsLiked(OneJobDetails.data?.isSaved);
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (OneJobDetails.data?.application?.id && inputMessage.trim() !== "") {
            const newMessage: Message = {
                message: inputMessage,
                sender: UserType.user,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            setMessages((prev) => [newMessage, ...prev]);
            await sendMessage({
                applicationId: OneJobDetails.data?.application?.id,
                message: inputMessage,
            });
            setInputMessage("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleCopy = () => {
        const urlToCopy = window.location.href;

        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy URL: ", err);
                alert("Failed to copy URL to clipboard");
            });
    };

    useEffect(() => {
        setMessages(messagesFromServer?.data?.messages || []);
    }, [messagesFromServer.data]);

    return OneJobDetails.isLoading ? (
        <Loader isVisible />
    ) : OneJobDetails?.data ? (
        <div className="flex flex-col items-center justify-start gap-4 w-full h-full bg-white overflow-y-auto scrollbar-hidden">
            <div className="w-full bg-white rounded-2xl p-4 border border-[#E9E9E9]">
                <div className="w-full flex flex-row md:items-center items-start justify-between md:gap-0 gap-2">
                    <h1 className="md:hidden lg:text-3xl md:text-2xl text-xl font-semibold line-clamp-2 pb-1">
                        {OneJobDetails.data?.job?.title}
                    </h1>

                    {/* Close Button */}
                    <Link
                        to={UserData?.data ? JOBS : LOGIN}
                        replace
                        className="shrink-0 w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
                    >
                        <i className="pi pi-times"></i>
                    </Link>

                    <div className="shrink-0 md:flex hidden flex-col w-full md:w-auto md:items-end items-start">
                        {OneJobDetails?.data?.job?.minimumSalary &&
                            OneJobDetails?.data?.job?.maximumSalary && (
                                <div className="text-sm flex items-center justify-end text-[#393939] md:w-auto w-full">
                                    Fixed &nbsp;&nbsp;
                                    <b>
                                        <span className="lg:text-2xl md:text-xl text-xs">
                                            ₹
                                            {OneJobDetails?.data?.job?.minimumSalary?.toLocaleString(
                                                "en-IN"
                                            )}{" "}
                                            - ₹
                                            {OneJobDetails?.data?.job?.maximumSalary?.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                        /month
                                    </b>
                                </div>
                            )}
                        {OneJobDetails?.data?.job?.incentiveAmount && (
                            <div className="text-sm flex items-center justify-end text-[#393939] md:w-auto w-full">
                                Incentive &nbsp;&nbsp;
                                <b>
                                    <span className="lg:text-2xl md:text-xl text-xs">
                                        ₹
                                        {OneJobDetails?.data?.job?.incentiveAmount?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                    /month
                                </b>
                            </div>
                        )}
                        {OneJobDetails?.data?.job?.minimumSalary === null &&
                            OneJobDetails?.data?.job?.maximumSalary === null &&
                            OneJobDetails?.data?.job?.incentiveAmount ===
                                null && (
                                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                                    Salary Not Disclosed
                                </p>
                            )}
                    </div>
                </div>

                {/* Job Details */}
                <div className="w-full flex md:flex-row flex-col items-start justify-between md:pt-4 pt-2">
                    <h1 className="md:block hidden lg:text-3xl md:text-2xl text-xl font-semibold line-clamp-2 pb-1">
                        {OneJobDetails.data?.job?.title}
                    </h1>
                    <div className="flex gap-4 w-full md:w-auto md:items-end items-start md:justify-end">
                        {OneJobDetails.data.application === null &&
                            UserData.data && (
                                <div
                                    onClick={updateSaved}
                                    className="bg-[#FFD0DE] lg:w-10 w-14 h-10 flex items-center justify-center rounded-lg cursor-pointer"
                                >
                                    {isLiked ? (
                                        <i className="pi pi-heart-fill text-primary"></i>
                                    ) : (
                                        <i className="pi pi-heart text-primary"></i>
                                    )}
                                </div>
                            )}
                        {OneJobDetails.data.job?.isExpired ? (
                            <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                                Expired
                            </p>
                        ) : OneJobDetails.data.application === null ? (
                            <PrimaryButton
                                labelStyle="text-xs lg:w-fit flex-none"
                                label="Apply"
                                icon={<CheckIcon />}
                                className="lg:w-[150px] h-[40px] bg-[#2F2F2F] flex items-center justify-center gap-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                        !UserData.data?.remainingProfileModules
                                            ?.isPersonalInfoCompleted ||
                                        !UserData.data?.remainingProfileModules
                                            ?.isResumeUploaded ||
                                        !UserData.data?.remainingProfileModules
                                            ?.isWorkExperienceCompleted ||
                                        !UserData.data?.remainingProfileModules
                                            ?.isEducationCompleted
                                    ) {
                                        setIsProfileComplitionModal(true);
                                    } else if (
                                        OneJobDetails?.data?.matchedRoles
                                            ?.length === 0
                                    ) {
                                        setSelectRoleModal(true);
                                    } else if (
                                        OneJobDetails.data &&
                                        OneJobDetails.data.matchedRoles?.filter(
                                            (role: RoleTable) =>
                                                role.isTestGiven === true
                                        ).length > 0
                                    ) {
                                        setIsResumeModalOpen(true);
                                    } else {
                                        setPreassessmentVisible(true);
                                    }
                                }}
                            />
                        ) : (
                            StatusTitle(
                                OneJobDetails?.data?.application
                                    ?.status as ApplicationStatus
                            )
                        )}
                    </div>
                </div>

                <div className="w-full flex flex-col md:gap-4 gap-3 md:pt-4 pt-2">
                    <div className="flex md:flex-row flex-col md:gap-x-8">
                        <p className="text-[#FF5C5C] md:text-base text-sm font-medium">
                            {OneJobDetails.data?.job?.isExpired
                                ? "Expired: "
                                : "Expiry: "}

                            <span className="text-black font-semibold">
                                :{" "}
                                {moment(
                                    OneJobDetails.data?.job?.expiry?.toString()
                                ).format("DD MMM, YYYY")}
                            </span>
                        </p>
                        {OneJobDetails.data?.totalApplicationCount > 0 && (
                            <p className="text-primary md:text-base text-sm md:pl-1 relative z-0 md:after:block after:hidden after:h-1.5 after:w-1.5 after:bg-black after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-4">
                                {OneJobDetails.data?.totalApplicationCount}{" "}
                                Applicants
                            </p>
                        )}
                    </div>

                    <div className="shrink-0 md:hidden flex flex-col w-full md:w-auto md:items-end items-start">
                        {OneJobDetails?.data?.job?.minimumSalary &&
                            OneJobDetails?.data?.job?.maximumSalary && (
                                <div className="text-sm flex items-center text-[#393939] md:w-auto w-full">
                                    Fixed &nbsp;&nbsp;
                                    <b>
                                        <span className="lg:text-2xl md:text-xl text-xs">
                                            ₹
                                            {OneJobDetails?.data?.job?.minimumSalary?.toLocaleString(
                                                "en-IN"
                                            )}{" "}
                                            - ₹
                                            {OneJobDetails?.data?.job?.maximumSalary?.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                        /month
                                    </b>
                                </div>
                            )}
                        {OneJobDetails?.data?.job?.incentiveAmount && (
                            <div className="text-sm flex items-center text-[#393939] md:w-auto w-full">
                                Incentive &nbsp;&nbsp;
                                <b>
                                    <span className="lg:text-2xl md:text-xl text-xs">
                                        ₹
                                        {OneJobDetails?.data?.job?.incentiveAmount?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                    /month
                                </b>
                            </div>
                        )}
                        {OneJobDetails?.data?.job?.minimumSalary === null &&
                            OneJobDetails?.data?.job?.maximumSalary === null &&
                            OneJobDetails?.data?.job?.incentiveAmount ===
                                null && (
                                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                                    Salary Not Disclosed
                                </p>
                            )}
                    </div>

                    <div className="flex lg:flex-row flex-col items-end justify-between w-full gap-6">
                        <div className="flex flex-col gap-4 lg:w-full w-full">
                            <div className="flex flex-wrap items-center justify-start lg:gap-4 gap-2 text-black md:text-base text-xs">
                                {OneJobDetails.data?.job?.jobType && (
                                    <div className="flex items-center gap-2">
                                        <FullTimeIcon />
                                        <p>
                                            {
                                                jobTypeObj[
                                                    OneJobDetails.data?.job
                                                        ?.jobType
                                                ]
                                            }
                                        </p>
                                    </div>
                                )}
                                {OneJobDetails.data?.job?.workModel && (
                                    <div className="flex items-center gap-2">
                                        <OnsiteIcon />
                                        <p>
                                            {OneJobDetails.data.job.workModel
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                OneJobDetails.data?.job?.workModel
                                                    ?.slice(1)
                                                    .toLowerCase()}
                                        </p>
                                    </div>
                                )}
                                {OneJobDetails.data?.job?.experience !== null &&
                                    OneJobDetails.data?.job?.experience !==
                                        undefined && (
                                        <div className="flex items-center gap-2">
                                            <ExperienceIcon />
                                            {OneJobDetails.data?.job
                                                ?.experience === 0 ? (
                                                <p>Fresher</p>
                                            ) : (
                                                <p>
                                                    {
                                                        OneJobDetails.data?.job
                                                            ?.experience
                                                    }
                                                    + Year Experience
                                                </p>
                                            )}
                                        </div>
                                    )}
                                <div className="flex items-center gap-2">
                                    <QualificationIcon />
                                    <p className="line-clamp-1">
                                        {OneJobDetails.data?.job?.requiredQualification
                                            ?.map((qualif: string) => qualif)
                                            .join(", ")}{" "}
                                        Required
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-start lg:gap-4 gap-2 text-black md:text-base text-xs">
                                <div className="flex items-center gap-2">
                                    <VacancyIcon />
                                    <p>
                                        {OneJobDetails.data?.job?.vacancy}{" "}
                                        Vacancies
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GenderIcon />
                                    <p>
                                        {OneJobDetails.data?.job?.gender ===
                                        null
                                            ? "Male or Female"
                                            : (
                                                  OneJobDetails.data.job
                                                      .gender as string
                                              )
                                                  ?.charAt(0)
                                                  ?.toUpperCase() +
                                              OneJobDetails.data.job.gender
                                                  ?.slice(1)
                                                  ?.toLowerCase()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LocationIcon />
                                    <p className="line-clamp-1">
                                        {OneJobDetails.data?.job?.location}
                                    </p>
                                </div>
                            </div>

                            {OneJobDetails.data?.job?.languages &&
                                OneJobDetails.data.job.languages.length > 0 && (
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="md:text-2xl text-lg font-semibold">
                                            <div className="flex items-center gap-2">
                                                <LanguageIcon />
                                                <h3>Languages</h3>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 md:text-base text-xs">
                                            {OneJobDetails.data?.job.languages.map(
                                                (
                                                    languages: Language,
                                                    index
                                                ) => (
                                                    <p
                                                        key={index}
                                                        className="text-black font-semibold relative z-0 after:md:h-1.5 after:h-1 after:md:w-1.5 after:w-1 after:bg-black after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-4 last:after:hidden"
                                                    >
                                                        {languages.language
                                                            ?.charAt(0)
                                                            ?.toUpperCase() +
                                                            languages.language
                                                                ?.slice(1)
                                                                ?.toLowerCase()}
                                                        :
                                                        <span className="text-[#393939] font-medium">
                                                            &nbsp;{" "}
                                                            {languages.proficiency
                                                                ?.charAt(0)
                                                                .toUpperCase() +
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

                        <div className="flex lg:flex-col gap-3 items-end justify-end lg:w-auto w-full shrink-0">
                            {OneJobDetails.data.application &&
                                OneJobDetails.data.application.status !==
                                    ApplicationStatus.pending && (
                                    <PrimaryButton
                                        label="Message"
                                        className="lg:w-[150px] w-fit md:h-[40px] h-[35px] bg-[#2F2F2F] md:text-sm text-xs"
                                        onClick={() => {
                                            const chat =
                                                document.getElementById(
                                                    "company-chat"
                                                );
                                            chat?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        }}
                                    />
                                )}

                            <div
                                className={`flex items-center gap-2 shrink-0 border px-3 py-2 md:text-sm text-xs rounded-lg cursor-pointer transition-colors duration-200 w-fit font-medium ${
                                    copied
                                        ? "border-green-500 bg-green-50 text-green-600"
                                        : "border-primary text-primary hover:bg-field"
                                }`}
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <>
                                        <i className="pi pi-check text-green-600"></i>
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="pi pi-copy text-primary"></i>
                                        <span>Copy job link</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Skill Requirements */}
                {[
                    ...OneJobDetails.data.job.hardSkills,
                    ...OneJobDetails.data.job.softSkills,
                ].length > 0 && (
                    <div className="w-full flex flex-col gap-3">
                        <div className="md:text-2xl text-lg font-semibold">
                            <div className="flex items-center gap-2">
                                <SkillIcon />
                                <h3>Skills Required</h3>
                            </div>
                        </div>

                        {/* Hard Skills */}
                        {OneJobDetails.data?.job.hardSkills.length > 0 && (
                            <div className="space-y-1">
                                <h5 className="text-[#222222] md:text-base text-sm font-medium">
                                    Hard Skills
                                </h5>
                                <div className="flex flex-wrap gap-2 md:text-base text-xs text-black font-medium">
                                    {OneJobDetails.data?.job.hardSkills &&
                                        OneJobDetails.data?.job.hardSkills.map(
                                            (hardSkill: string) => (
                                                <div
                                                    key={hardSkill}
                                                    className="bg-[#F3F3F3] rounded-lg md:px-4 px-2 md:py-2 py-1"
                                                >
                                                    {hardSkill}
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        )}

                        {/* Soft Skills */}
                        {OneJobDetails.data?.job.softSkills.length > 0 && (
                            <div className="space-y-1">
                                <h5 className="text-[#222222] md:text-base text-sm font-medium">
                                    Soft Skills
                                </h5>
                                <div className="flex flex-wrap gap-2 md:text-base text-xs text-black font-medium">
                                    {OneJobDetails.data?.job.softSkills &&
                                        OneJobDetails.data?.job.softSkills.map(
                                            (softSkill: string) => (
                                                <div
                                                    key={softSkill}
                                                    className="bg-[#F3F3F3] rounded-lg md:px-4 px-2 md:py-2 py-1"
                                                >
                                                    {softSkill}
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Job Description */}
                {OneJobDetails.data?.job?.description?.length > 0 && (
                    <div className="mt-6 w-full space-y-3">
                        <div className="md:text-2xl text-lg font-semibold">
                            <div className="flex items-center gap-2">
                                <JobDescriptionIcon />
                                <h3>Job Description</h3>
                            </div>
                        </div>
                        <div
                            className="text-[#393939] md:text-base text-xs font-medium view-job-editor"
                            dangerouslySetInnerHTML={{
                                __html: OneJobDetails.data?.job.description,
                            }}
                        />
                    </div>
                )}

                {/* Additional Perks  */}
                {OneJobDetails.data?.job?.perks?.length > 0 && (
                    <div className="mt-6 w-full space-y-3">
                        <div className="md:text-2xl text-lg font-semibold">
                            <h3>Additional Perks </h3>
                        </div>
                        <ul className="flex flex-col gap-2 md:text-base text-xs list-disc text-black font-medium list-inside">
                            {OneJobDetails.data?.job?.perks.map(
                                (perk: string) => (
                                    <li key={perk}>{perk}</li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className="w-full bg-white rounded-2xl p-4 border border-[#E9E9E9]">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="md:text-2xl text-lg font-semibold tracking-[-1px] text-black">
                            Company Details
                        </h1>

                        {UserData?.data && (
                            <p
                                onClick={() => {
                                    navigate(
                                        COMPANY_DETAILS +
                                            "/" +
                                            OneJobDetails.data?.job.id
                                    );
                                }}
                                className="font-semibold text-primary underline cursor-pointer md:text-base text-xs"
                            >
                                View more
                            </p>
                        )}
                    </div>
                    <div className="flex md:flex-row flex-col items-center md:gap-0 gap-4 justify-between">
                        <div className=" flex items-center gap-6 md:w-4/5 w-full">
                            <div className="shrink-0 lg:w-24 lg:h-24 md:w-20 md:h-20 w-14 h-14 text-xs text-center border border-primary rounded-full bg-[#F7FAFF]">
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
                            <div className="flex flex-row items-center md:justify-end gap-2 pr-4 md:w-auto w-full">
                                {OneJobDetails.data?.company.linkedin && (
                                    <Link
                                        to={
                                            OneJobDetails.data?.company.linkedin
                                        }
                                        target="_blank"
                                        className="flex items-center justify-center w-9 h-9 border border-[#E7E7E7] rounded-full hover:bg-[#f4cbf8ad]"
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
                                        className="flex items-center justify-center w-9 h-9 border border-[#E7E7E7] rounded-full p-2 hover:bg-[#f4cbf8ad]"
                                    >
                                        <i className="pi pi-twitter text-black"></i>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {OneJobDetails.data?.company.address && (
                        <p className="md:text-base text-xs text-[#393939]">
                            {OneJobDetails.data?.company.address}
                        </p>
                    )}

                    {OneJobDetails.data?.company.description && (
                        <p className="font-medium md:text-base text-xs leading-8 line-clamp-4">
                            {OneJobDetails.data?.company.description}
                        </p>
                    )}

                    {OneJobDetails.data?.company.companyImages.length > 0 && (
                        <div className="flex md:text-base text-xs flex-wrap items-start md:justify-start justify-center gap-4">
                            {OneJobDetails.data?.company.companyImages.map(
                                (image: string) => (
                                    <div
                                        key={image}
                                        className="w-36 h-36"
                                    >
                                        <img
                                            src={image}
                                            alt="Company Images"
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            {OneJobDetails.data?.application !== null &&
                OneJobDetails.data?.application.status !==
                    ApplicationStatus.pending && (
                    <div
                        id="company-chat"
                        className="w-full bg-white rounded-2xl border border-[#E9E9E9]"
                    >
                        {/* Chat Header */}
                        <div className="flex items-center justify-between gap-3 border-b border-[#E7E7E7] md:p-4 p-3">
                            <h2 className="md:text-xl text-base font-semibold">
                                {OneJobDetails.data.company.companyName}
                            </h2>
                        </div>

                        {/* Messages */}
                        <div className="flex flex-col-reverse h-[400px] overflow-auto p-4 gap-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex flex-col text-base ${
                                        message.sender === UserType.company
                                            ? "justify-start items-start"
                                            : "justify-end items-end"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 py-2 ${
                                            message.sender === UserType.company
                                                ? "bg-[#F6F8FA] md:ml-10 ml-8 rounded-r-xl rounded-tl-xl"
                                                : "bg-primary text-white md:mr-10 mr-8 rounded-s-xl rounded-tr-xl"
                                        }`}
                                    >
                                        <p className="break-words">
                                            {message.message}
                                        </p>
                                    </div>
                                    <div
                                        className={`flex ${
                                            message.sender === UserType.company
                                                ? "flex-row-reverse"
                                                : "flex-row"
                                        } items-end gap-2`}
                                    >
                                        {message.createdAt && (
                                            <p
                                                className={`text-xs text-[#797C7B] font-medium`}
                                            >
                                                {getTimeOrDate(
                                                    moment(message.createdAt)
                                                )}
                                            </p>
                                        )}
                                        <img
                                            src={
                                                message.sender ===
                                                UserType.company
                                                    ? OneJobDetails.data
                                                          ?.company.logo ||
                                                      NoProfile
                                                    : UserData.data?.avatar ||
                                                      NoProfile
                                            }
                                            alt="Profile"
                                            className="rounded-full aspect-square md:w-8 w-6 h-6 md:h-8"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}

                        <form className="flex items-center gap-4 w-full p-4">
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="w-full md:text-sm text-xs rounded-lg bg-[#F6F8FA] outline-none py-3 px-4"
                                value={inputMessage}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <AuthButton
                                type="submit"
                                icon={
                                    <i className="pi pi-send w-full text-center md:text-base text-sm"></i>
                                }
                                customStyle="md:w-16 w-12 md:py-3 py-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            />
                        </form>
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
                    UserData.data?.remainingProfileModules.isResumeUploaded ??
                    false
                }
                rolesSelected={
                    UserData.data?.remainingProfileModules.areRolesSelected ??
                    false
                }
                user={UserData.data ? true : false}
                visible={isProfileComplitionModal}
                setVisible={setIsProfileComplitionModal}
            />

            <ResumeModal
                jobId={OneJobDetails.data?.job?.id}
                role={OneJobDetails.data?.job?.title}
                logo={OneJobDetails.data?.company?.logo}
                companyName={OneJobDetails.data?.company?.companyName}
                visible={isResumeModalOpen}
                setVisible={setIsResumeModalOpen}
            />

            <PreassessmentModal
                visible={preassessmentVisible}
                roles={OneJobDetails.data?.matchedRoles.map((role) => ({
                    id: role.id,
                    title: role.title,
                }))}
                setVisible={setPreassessmentVisible}
            />

            <ConfirmationModal
                visible={selectRoleModal}
                setVisible={setSelectRoleModal}
                header="Action Needed"
                message="Please select the correct role and complete the pre-assessment to apply."
                onClick={() => {
                    navigate(PROFILE);
                }}
                buttonLabel="Complete Profile"
            />
        </div>
    ) : (
        <p className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
            No data found
        </p>
    );
};

export default JobDetails;

const StatusTitle = (status: ApplicationStatus) => {
    switch (status) {
        case ApplicationStatus.shortListed:
            return (
                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                    In Progress
                </p>
            );
        case ApplicationStatus.pending:
            return (
                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-primary bg-[#FFDBE5] text-nowrap h-fit">
                    Applied
                </p>
            );
        case ApplicationStatus.rejected:
            return (
                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-[#D60000] bg-[#FFE3E3] text-nowrap h-fit">
                    Rejected
                </p>
            );
        case ApplicationStatus.accepted:
            return (
                <p className="md:text-base text-xs font-semibold md:px-6 px-4 py-2 rounded-lg text-[#009C17] bg-[#E4FFE8] text-nowrap h-fit">
                    Accepted
                </p>
            );
        default:
            return "";
    }
};
