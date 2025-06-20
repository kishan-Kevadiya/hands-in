import { NoProfile } from "@/assets/images";
import CertificateIcon from "@/assets/svg/Certificate";
import LinkedInIcon from "@/assets/svg/LinkedInIcon";
import VerticalLineIcon from "@/assets/svg/profile/VerticalLineIcon";
import ResumeIcon from "@/assets/svg/ResumeIcon";
import WebsiteIcon from "@/assets/svg/WebsiteIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import Loader from "@/components/ui/loader/Loader";
import PreassessmentModal from "@/components/ui/modals/PreassessmentModal";
import HeadScore from "@/components/ui/progressbar/HeadScore";
import TimeLineField from "@/components/ui/timeline/TimeLineField";
import { getProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { EDIT_PROFILE } from "@/routes";
import {
    EducationTable,
    WorkExperienceTable,
} from "@/types/accountSetup.types";
import { GetProfileResponse_Test } from "@/types/profileSetup.types";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const ProfilePreview: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("education");
    const [preassessmentVisible, setPreassessmentVisible] = useState(false);

    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
    });

    const customizedMarkerEducation = (item: EducationTable) => {
        return (
            <div className="flex flex-col gap-1.5">
                {item.startYear && (
                    <p className="text-[#525252] text-sm font-light">
                        {item.startYear} -{" "}
                        {item.endYear === null ? "Present" : item.endYear}
                    </p>
                )}
                {item.instituteName && (
                    <p className="font-semibold">{item.instituteName}</p>
                )}
                {item.course && (
                    <p className="text-[#525252] text-sm font-medium">
                        {item.course}
                    </p>
                )}
            </div>
        );
    };

    const customizedMarkerExperience = (item: WorkExperienceTable) => {
        return (
            <div className="flex flex-col gap-1.5">
                {item.startYear && (
                    <p className="text-[#525252] text-sm font-light">
                        {item.startYear} -{" "}
                        {item.endYear === null ? "Present" : item.endYear}
                    </p>
                )}
                {item.jobTitle && (
                    <p className="font-semibold">{item.jobTitle}</p>
                )}
                <ul className="flex list-disc gap-x-6">
                    {item.companyName && (
                        <li className="text-[#525252] text-sm first:list-none font-medium">
                            {item.companyName}
                        </li>
                    )}
                    {item.jobType && (
                        <li className="text-[#525252] text-sm font-medium">
                            {item.jobType.charAt(0).toUpperCase() +
                                item.jobType.slice(1).toLowerCase()}
                        </li>
                    )}
                </ul>
                {item.jobDescription && (
                    <p className="text-[#525252] text-sm line-clamp-3">
                        {item.jobDescription}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-2xl text-black font-semibold tracking-[-1px]">
                    My Profile
                </h1>

                <button
                    onClick={() => {
                        navigate(EDIT_PROFILE);
                    }}
                    className="flex border border-primary rounded-xl text-black font-semibold gap-2 items-center px-4 py-2"
                >
                    Edit Profile
                    <i className="pi pi-pen-to-square"></i>
                </button>
            </div>

            {ProfileDetails.isLoading ? (
                <Loader
                    className="h-[calc(100vh-200px)]"
                    isVisible
                />
            ) : (
                <div className="flex flex-col bg-white p-4 rounded-2xl shadow-md w-full gap-14 md:p-6">
                    {ProfileDetails.data ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col justify-between items-center lg:flex-row pb-4">
                                <div className="flex justify-start w-full gap-4 items-center lg:w-3/5 md:gap-10">
                                    <div className="bg-[#F7FAFF] h-22 rounded-full w-22 lg:h-40 lg:w-40 md:h-32 md:w-32">
                                        <img
                                            src={
                                                ProfileDetails.data?.user.avatar
                                                    ? ProfileDetails.data?.user
                                                          .avatar instanceof
                                                      File
                                                        ? URL.createObjectURL(
                                                              ProfileDetails
                                                                  .data?.user
                                                                  .avatar
                                                          )
                                                        : ProfileDetails.data
                                                              ?.user.avatar?.url
                                                    : NoProfile
                                            }
                                            alt="No Image"
                                            className="h-full rounded-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col w-3/5 lg:gap-2 md:gap-1">
                                        <p className="text-2xl font-semibold lg:text-4xl md:text-3xl break-words line-clamp-2">
                                            {ProfileDetails.data?.user.firstName
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                ProfileDetails.data?.user.firstName
                                                    ?.slice(1)
                                                    .toLowerCase()}{" "}
                                            {ProfileDetails.data?.user.lastName
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                ProfileDetails.data?.user.lastName
                                                    ?.slice(1)
                                                    .toLowerCase()}
                                        </p>
                                        <p className="text-[#393939] text-base break-words font-semibold line-clamp-2">
                                            {ProfileDetails.data?.user.bio}
                                        </p>
                                        <ul className="flex list-disc text-[#393939] text-base gap-x-6">
                                            {ProfileDetails.data.user
                                                .gender && (
                                                <li className="first:list-none">
                                                    {ProfileDetails.data.user.gender
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                        ProfileDetails.data.user.gender
                                                            ?.slice(1)
                                                            .toLowerCase()}
                                                </li>
                                            )}
                                            {ProfileDetails.data.user.city && (
                                                <li className="first:list-none">
                                                    {
                                                        ProfileDetails.data.user
                                                            .city
                                                    }
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col md:w-11/12 w-full md:gap-2 gap-4 items-end lg:w-2/5 mx-w-2/5">
                                    <div className="flex justify-end md:gap-2 gap-1 md:pt-0 pt-4 w-full">
                                        {ProfileDetails.data &&
                                            ProfileDetails.data.tests
                                                .slice(0, 3)
                                                .map(
                                                    (
                                                        test: GetProfileResponse_Test
                                                    ) => (
                                                        <div
                                                            key={test.roleId}
                                                            className="flex flex-col md:gap-2 items-center justify-between w-1/3"
                                                        >
                                                            <HeadScore
                                                                size={
                                                                    window.innerWidth <
                                                                    425
                                                                        ? 100
                                                                        : 120
                                                                }
                                                                value={
                                                                    test.obtainedMarks ===
                                                                    null
                                                                        ? null
                                                                        : test.obtainedMarks
                                                                }
                                                            />
                                                            <p className="text-center text-primary text-sm font-medium md:text-base text-wrap truncate w-full">
                                                                {test.roleName}
                                                            </p>
                                                            <p className="flex text-black text-xs font-medium gap-1 items-center md:text-sm">
                                                                <span className="text-[#666666]">
                                                                    Exp:
                                                                </span>
                                                                {
                                                                    test.experience
                                                                }{" "}
                                                                year
                                                                <Tooltip
                                                                    target=".custom-target-icon"
                                                                    pt={{
                                                                        root: {
                                                                            className:
                                                                                "rounded-2xl p-0",
                                                                        },
                                                                        text: {
                                                                            className:
                                                                                "text-sm text-[#5B5B5B] bg-white max-w-60 ",
                                                                        },
                                                                    }}
                                                                />
                                                                <i
                                                                    className="text-[#666666] cursor-pointer custom-target-icon pi pi-info-circle"
                                                                    data-pr-tooltip={`The assessment test has been given with ${test.experience} year of experience.`}
                                                                    data-pr-position="bottom"
                                                                    data-pr-at="right-5 bottom"
                                                                ></i>
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                    </div>
                                    {ProfileDetails.data.tests.length > 0 && (
                                        <AuthButton
                                            customStyle="w-fit px-6"
                                            label="Attempt test"
                                            type="button"
                                            onClick={() =>
                                                setPreassessmentVisible(true)
                                            }
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col border-[#F1F1F1] border-t justify-between gap-2 md:flex-row md:gap-8 pt-6">
                                <div className="flex flex-col justify-start md:gap-4 gap-2 md:items-center md:flex-row">
                                    {ProfileDetails.data.user.experience !==
                                        null &&
                                        ProfileDetails.data.user.experience !==
                                            undefined && (
                                            <>
                                                {ProfileDetails.data.user
                                                    .experience === 0 ? (
                                                    <p className="text-base font-bold">
                                                        Fresher
                                                    </p>
                                                ) : (
                                                    <div className="space-y-0.5">
                                                        <p className="text-xl font-bold">
                                                            {
                                                                ProfileDetails
                                                                    .data?.user
                                                                    .experience
                                                            }{" "}
                                                            <span className="text-base">
                                                                Years
                                                            </span>
                                                        </p>
                                                        <p className="text-[#393939] md:tracking-[-1px]">
                                                            Experience
                                                        </p>
                                                    </div>
                                                )}
                                                <VerticalLineIcon />
                                            </>
                                        )}
                                    {(ProfileDetails.data.user.email ||
                                        ProfileDetails.data.user.phone) && (
                                        <div className="space-y-0.5">
                                            {ProfileDetails.data.user.email && (
                                                <p className="md:tracking-[-1px]">
                                                    {
                                                        ProfileDetails.data
                                                            ?.user.email
                                                    }
                                                </p>
                                            )}
                                            {ProfileDetails.data.user.phone && (
                                                <p>
                                                    {
                                                        ProfileDetails.data
                                                            ?.user.countryCode
                                                    }{" "}
                                                    {
                                                        ProfileDetails.data
                                                            ?.user.phone
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {(ProfileDetails.data.user.website ||
                                    ProfileDetails.data.user.linkedIn) && (
                                    <div className="flex flex-row justify-end w-full gap-2 items-center md:w-auto pr-4">
                                        {ProfileDetails.data.user.website && (
                                            <Link
                                                to={
                                                    ProfileDetails.data.user
                                                        .website
                                                }
                                                target="_blank"
                                                className="flex border border-[#D3D3D3]/70 justify-center rounded-full items-center"
                                            >
                                                <WebsiteIcon border={false} />
                                            </Link>
                                        )}
                                        {ProfileDetails.data.user.linkedIn && (
                                            <Link
                                                to={
                                                    ProfileDetails.data.user
                                                        .linkedIn
                                                }
                                                target="_blank"
                                                className="flex border border-[#D3D3D3]/70 justify-center rounded-full items-center"
                                            >
                                                <LinkedInIcon
                                                    color="#0B69C7"
                                                    background="transparent"
                                                    width="40"
                                                    height="40"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>

                            {(ProfileDetails.data.educations.length > 0 ||
                                ProfileDetails.data.workExperiences.length >
                                    0) && (
                                <div>
                                    <div className="flex justify-start gap-2 items-center mb-4">
                                        {ProfileDetails.data.educations.length >
                                            0 && (
                                            <button
                                                onClick={() =>
                                                    setSelectedTab("education")
                                                }
                                                className={`
                                    px-3 py-1 font-medium border ${
                                        selectedTab === "education"
                                            ? "text-primary border-primary"
                                            : "border-[#8C8C8C] text-[#8C8C8C]"
                                    } rounded-full transition-colors duration-300 ease-in-out`}
                                            >
                                                Education
                                            </button>
                                        )}
                                        {ProfileDetails.data.workExperiences
                                            .length > 0 && (
                                            <button
                                                onClick={() =>
                                                    setSelectedTab("experience")
                                                }
                                                className={`
                                    px-3 py-1 font-medium border ${
                                        selectedTab === "experience"
                                            ? "text-primary border-primary"
                                            : "border-[#8C8C8C] text-[#8C8C8C]"
                                    } rounded-full transition-colors duration-300 ease-in-out`}
                                            >
                                                Experience
                                            </button>
                                        )}
                                    </div>
                                    {(ProfileDetails.data.educations.length >
                                        0 ||
                                        ProfileDetails.data.workExperiences
                                            .length > 0) && (
                                        <TimeLineField
                                            event={
                                                selectedTab === "education"
                                                    ? ProfileDetails.data
                                                          .educations
                                                    : ProfileDetails.data
                                                          .workExperiences
                                            }
                                            customizedMarker={
                                                selectedTab === "education"
                                                    ? customizedMarkerEducation
                                                    : customizedMarkerExperience
                                            }
                                        />
                                    )}
                                </div>
                            )}

                            {(ProfileDetails.data.user.resume ||
                                ProfileDetails.data.user.otherDocuments.length >
                                    0) && (
                                <div className="flex flex-col w-full gap-6">
                                    <h1 className="text-primary text-xl font-semibold">
                                        Resume & Additional Documents
                                    </h1>
                                    <div className="flex flex-col border border-[#F2F2F2] p-4 rounded-2xl w-full gap-5 lg:flex-row">
                                        {ProfileDetails.data.user.resume && (
                                            <div className="flex flex-col w-full gap-5 lg:w-1/3 md:2/5 md:pr-8">
                                                <div className="flex border border-primary justify-between rounded-xl w-full items-center lg:w-full md:w-1/2 px-3 lg:py-6 md:py-4 py-3">
                                                    <a
                                                        href={
                                                            ProfileDetails.data
                                                                .user.resume.url
                                                        }
                                                        // download
                                                        target="_blank"
                                                        className="flex w-full gap-3 items-center"
                                                    >
                                                        <div>
                                                            <ResumeIcon />
                                                        </div>
                                                        <p className="text-sm break-words font-semibold truncate">
                                                            Resume
                                                            {/* {uploadResumeCertificateForm.watch("resume")[0]?.name} */}
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {ProfileDetails.data.user.otherDocuments
                                            .length > 0 && (
                                            <div className="flex flex-col gap-5 lg:w-2/3 lg:border-l border-[#E9E9E9] md:pl-6">
                                                <div className="flex flex-col w-full gap-5">
                                                    <div className="flex flex-wrap gap-2 gap-x-6 gap-y-2 items-center">
                                                        {ProfileDetails.data.user.otherDocuments.map(
                                                            (document) => (
                                                                <div
                                                                    key={
                                                                        document.id
                                                                    }
                                                                    className="flex flex-col w-full gap-2 md:w-2/5"
                                                                >
                                                                    <p className="text-black text-lg font-semibold">
                                                                        {
                                                                            document.name
                                                                        }
                                                                    </p>
                                                                    <div className="flex bg-[#F4F4F4] justify-between p-3 rounded-xl items-center">
                                                                        <a
                                                                            href={
                                                                                document.url
                                                                            }
                                                                            // download
                                                                            target="_blank"
                                                                            className="flex w-full gap-2 items-center"
                                                                        >
                                                                            <div>
                                                                                <CertificateIcon />
                                                                            </div>
                                                                            <p className="text-sm break-words font-semibold truncate">
                                                                                {
                                                                                    document.name
                                                                                }
                                                                            </p>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {ProfileDetails.data.tests.length > 0 && (
                                <div className="flex flex-col w-full gap-6">
                                    <h1 className="text-xl text-primary font-semibold">
                                        Interested Job Categories
                                    </h1>
                                    <div className="flex flex-wrap border border-[#F2F2F2] p-4 rounded-2xl w-full md:gap-x-6 gap-x-3 md:gap-y-4 gap-y-2">
                                        {ProfileDetails.data.tests.map(
                                            (test) => (
                                                <div
                                                    key={test.roleId}
                                                    className="flex bg-[#F4F4F4] justify-between md:p-3 p-2 md:text-base text-sm rounded-xl items-center lg:w-1/5 md:w-1/3 "
                                                >
                                                    <p className="break-words font-medium truncate">
                                                        {test.roleName}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="flex h-full justify-center w-full items-center">
                            No data found...
                        </p>
                    )}
                </div>
            )}

            <PreassessmentModal
                visible={preassessmentVisible}
                roles={ProfileDetails.data?.tests?.map((role) => ({
                    id: role?.roleId,
                    title: role?.roleName,
                    canGiveTest: role?.canGiveTest,
                    canGiveTestDaysAfter: role?.canGiveTestDaysAfter,
                }))}
                setVisible={setPreassessmentVisible}
            />
        </div>
    );
};

export default ProfilePreview;
