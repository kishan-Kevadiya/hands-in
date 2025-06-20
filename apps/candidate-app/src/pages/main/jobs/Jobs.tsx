import { NoProfile } from "@/assets/images";
import AcceptedRejectedIcon from "@/assets/svg/AcceptedRejectedIcon";
import AI_Icon from "@/assets/svg/AI_Icon";
import AppliedIcon from "@/assets/svg/AppliedIcon";
import FilterIcon from "@/assets/svg/FilterIcon";
import CompleteProfileIcon from "@/assets/svg/profile/CompleteProfileIcon";
import SavedIcon from "@/assets/svg/SavedIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import SelectField from "@/components/ui/auth/SelectField";
import TabComponent, { Tab } from "@/components/ui/tab/TabComponent";
import { FilterDataContext } from "@/contexts/FilterContext";
import { getUser } from "@/helpers/apis/auth";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { EDIT_PROFILE, PROFILE } from "@/routes";
import { FilterType } from "@/types/general.types";
import {
    GetCityListResponse,
    GetQualificationListResponse,
    JobType,
    jobTypeObj,
    WorkModel,
} from "@/types/jobs.types";
import { GetRolesResponse } from "@/types/profileSetup.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AutoComplete,
    AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import { OverlayPanel } from "primereact/overlaypanel";
import { Slider } from "primereact/slider";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

const tabs: Tab[] = [
    {
        id: 0,
        icon: <AI_Icon />,
        label: "Recommended by AI",
        path: ".",
    },
    {
        id: 1,
        icon: <SavedIcon />,
        label: "Saved",
        path: "saved",
    },
    {
        id: 2,
        icon: <AppliedIcon />,
        label: "Applied",
        path: "applied",
    },
    {
        id: 3,
        icon: <AcceptedRejectedIcon />,
        label: "Accepted & Rejected",
        path: "accepted-rejected",
    },
];

const Jobs: React.FC = () => {
    const queryClient = useQueryClient();
    let cityList = queryClient.getQueryData<GetCityListResponse>([
        USE_QUERY_KEYS.GET_CITIES,
    ]);
    if (!cityList && undefined) {
        cityList = localStorage.getItem("cities")
            ? JSON.parse(localStorage.getItem("cities") as string)
            : [];
    }
    let roleList = queryClient.getQueryData<GetRolesResponse>([
        USE_QUERY_KEYS.GET_ROLES,
    ]);
    if (!roleList && undefined) {
        roleList = localStorage.getItem("roles")
            ? JSON.parse(localStorage.getItem("roles") as string)
            : [];
    }
    let qualificationList =
        queryClient.getQueryData<GetQualificationListResponse>([
            USE_QUERY_KEYS.GET_QUALIFICATIONS,
        ]);
    if (!qualificationList && undefined) {
        qualificationList = localStorage.getItem("qualifications")
            ? JSON.parse(localStorage.getItem("qualifications") as string)
            : [];
    }

    const op = useRef<OverlayPanel>(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    // const [jobTitle, setJobTitle] = useState("");
    const [searchJobTitle, setSearchJobTitle] = useState("");
    const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

    const [filter, setFilter] = useState(false);
    const filterForm = useForm<FilterType>({
        defaultValues: {
            experience: 0,
            salaryRange: [0, 1000000],
        },
    });

    const [filterData, setFilterData] = useState<FilterType>(
        filterForm.getValues()
    );

    useEffect(() => {
        tabs.forEach((tab, index) => {
            if (pathname.includes(tab.path)) {
                setActiveTabIndex(index);
            }
        });
        // setJobTitle("");
    }, [pathname]);

    const UserData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_USER],
        queryFn: async () => await getUser(),
    });

    const filterFormSubmit = (data: FilterType) => {
        setFilterData(data);
        op.current?.hide?.();
        setFilter(false);
    };

    const getRolesAutoCompleteList = (e: AutoCompleteCompleteEvent) => {
        if (e.query.length > 2) {
            const filteredRoles =
                roleList?.roles
                    .filter((role) =>
                        role?.title
                            ?.toLowerCase()
                            .includes(e.query.toLowerCase())
                    )
                    ?.map((role) => role.title) ?? [];

            setAutoCompleteList(filteredRoles);
            return filteredRoles;
        }
    };

    return !UserData.data ? (
        <Outlet />
    ) : (
        <FilterDataContext
            value={{
                jobTitle: searchJobTitle,
                setJobTitle: setSearchJobTitle,
                filterData,
            }}
        >
            <div className="flex flex-col gap-4 h-full">
                <div className="flex md:flex-row flex-col-reverse gap-4 items-center justify-between w-full">
                    <div className="flex flex-col gap-4 md:w-[70%] w-11/12">
                        <h1 className="md:block hidden text-black font-semibold text-2xl">
                            Search for a Job
                        </h1>
                        <div className="flex md:gap-6 gap-2 items-center w-full">
                            <div className="w-full h-10 flex items-center justify-start gap-4">
                                <AutoComplete
                                    value={searchJobTitle}
                                    onChange={(e) => setSearchJobTitle(e.value)}
                                    // onSelect={(e) => setJobTitle(e.value)}
                                    placeholder="Search here..."
                                    pt={{
                                        root: {
                                            className: "w-full",
                                        },
                                        input: {
                                            root: {
                                                className:
                                                    "!flex-1 !h-[50px] !text-sm !text-black !border-none focus:border-primary focus:!shadow-none !bg-white !rounded-xl font-manrope",
                                            },
                                        },
                                    }}
                                    field="name"
                                    suggestions={autoCompleteList}
                                    itemTemplate={(option) => (
                                        <span>{option}</span>
                                    )}
                                    completeMethod={getRolesAutoCompleteList}
                                />
                            </div>

                            {/* Filter */}
                            <button
                                onClick={(e) => {
                                    op.current?.toggle?.(e);
                                    setFilter(true);
                                }}
                                className={`${
                                    filter ? "filter-svg" : ""
                                } flex items-center gap-5 bg-white rounded-xl px-6 h-[50px]`}
                            >
                                <FilterIcon
                                    badge={
                                        !!(
                                            (filterForm.watch().workSchedule
                                                ?.length ?? 0) > 0 ||
                                            (filterForm.watch().workModel
                                                ?.length ?? 0) > 0 ||
                                            (filterForm.watch().experience ??
                                                0) !== 0 ||
                                            filterForm.watch()
                                                .salaryRange[0] !== 0 ||
                                            filterForm.watch()
                                                .salaryRange[1] !== 1000000 ||
                                            filterForm.watch().workLocation ||
                                            filterForm.watch().qualification
                                        )
                                    }
                                />
                                <p className="text-primary font-medium">
                                    Filter
                                </p>
                            </button>
                            <OverlayPanel
                                pt={{
                                    root: {
                                        className:
                                            "lg:w-3/5 md:w-4/5 w-full overflow-y-auto md:h-auto h-screen bg-white md:rounded-2xl rounded-none !m-0 lg:!left-1/2 md:left-20 !left-1/2 md:!-translate-x-auto -translate-x-1/2 lg:!top-[113.987px] md:!top-50 !top-0 md:!-translate-y-auto -translate-y-0  before:!hidden transition-all ease-in-out duration-300 z-20",
                                    },
                                }}
                                ref={op}
                                onHide={() => setFilter(false)}
                            >
                                <form className="w-full flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-xl text-black font-semibold">
                                            Filter
                                        </h1>
                                        <div className="w-max">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    op.current?.hide?.();
                                                    setFilter(false);
                                                }}
                                                className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
                                            >
                                                <i className="pi pi-times text-black"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:gap-8 gap-6">
                                        <div className="flex lg:flex-row flex-col md:gap-8 gap-6 w-full">
                                            <div className="flex md:gap-8 gap-6 lg:w-1/2">
                                                {/* Work Schedule */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-primary md:mb-4 mb-2">
                                                        Work schedule
                                                    </h3>
                                                    <div className="flex flex-col gap-3">
                                                        {[
                                                            JobType.fulltime,
                                                            JobType.parttime,
                                                            JobType.contract,
                                                        ]?.map((schedule) => (
                                                            <div
                                                                key={schedule}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Checkbox
                                                                    onChange={() => {
                                                                        const currentWorkSchedule =
                                                                            filterForm.watch(
                                                                                "workSchedule"
                                                                            );
                                                                        if (
                                                                            currentWorkSchedule
                                                                        ) {
                                                                            filterForm.setValue(
                                                                                "workSchedule",
                                                                                currentWorkSchedule.includes(
                                                                                    schedule
                                                                                )
                                                                                    ? currentWorkSchedule.filter(
                                                                                          (
                                                                                              item: JobType
                                                                                          ) =>
                                                                                              item !==
                                                                                              schedule
                                                                                      )
                                                                                    : [
                                                                                          ...currentWorkSchedule,
                                                                                          schedule,
                                                                                      ]
                                                                            );
                                                                        } else {
                                                                            filterForm.setValue(
                                                                                "workSchedule",
                                                                                [
                                                                                    schedule,
                                                                                ]
                                                                            );
                                                                        }
                                                                    }}
                                                                    checked={
                                                                        filterForm
                                                                            .watch(
                                                                                "workSchedule"
                                                                            )
                                                                            ?.includes(
                                                                                schedule
                                                                            ) ??
                                                                        false
                                                                    }
                                                                    inputId={`schedule-${schedule}`}
                                                                    pt={{
                                                                        root: {
                                                                            className:
                                                                                "!w-5 !h-5",
                                                                        },
                                                                        box: {
                                                                            className:
                                                                                "!w-5 !h-5 rounded-md border-primary bg-transparent",
                                                                        },
                                                                        icon: {
                                                                            className:
                                                                                "w-full h-full bg-primary",
                                                                        },
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`schedule-${schedule}`}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {
                                                                        jobTypeObj[
                                                                            schedule
                                                                        ]
                                                                    }
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Work Model */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-primary md:mb-4 mb-2">
                                                        Work Model
                                                    </h3>
                                                    <div className="flex flex-col gap-3">
                                                        {[
                                                            WorkModel.onsite,
                                                            WorkModel.hybrid,
                                                            WorkModel.remote,
                                                        ]?.map((model) => (
                                                            <div
                                                                key={model}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Checkbox
                                                                    inputId={`model-${model}`}
                                                                    pt={{
                                                                        root: {
                                                                            className:
                                                                                "!w-5 !h-5",
                                                                        },
                                                                        box: {
                                                                            className:
                                                                                "!w-5 !h-5 rounded-md border-primary bg-transparent",
                                                                        },
                                                                        icon: {
                                                                            className:
                                                                                "w-full h-full bg-primary",
                                                                        },
                                                                    }}
                                                                    onChange={() => {
                                                                        const currentWorkModel =
                                                                            filterForm.watch(
                                                                                "workModel"
                                                                            );
                                                                        if (
                                                                            currentWorkModel
                                                                        ) {
                                                                            filterForm.setValue(
                                                                                "workModel",
                                                                                currentWorkModel.includes(
                                                                                    model
                                                                                )
                                                                                    ? currentWorkModel.filter(
                                                                                          (
                                                                                              item: WorkModel
                                                                                          ) =>
                                                                                              item !==
                                                                                              model
                                                                                      )
                                                                                    : [
                                                                                          ...currentWorkModel,
                                                                                          model,
                                                                                      ]
                                                                            );
                                                                        } else {
                                                                            filterForm.setValue(
                                                                                "workModel",
                                                                                [
                                                                                    model,
                                                                                ]
                                                                            );
                                                                        }
                                                                    }}
                                                                    checked={
                                                                        filterForm
                                                                            .watch(
                                                                                "workModel"
                                                                            )
                                                                            ?.includes(
                                                                                model
                                                                            ) ??
                                                                        false
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`model-${model}`}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {model
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        model
                                                                            ?.slice(
                                                                                1
                                                                            )
                                                                            .toLowerCase()}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row flex-col md:gap-8 gap-6 w-full">
                                                {/* Experience */}
                                                <div className="w-full">
                                                    <h3 className="text-lg font-semibold text-primary md:mb-4 mb-2">
                                                        Experience{" "}
                                                        <span className="font-light">
                                                            (in years)
                                                        </span>
                                                    </h3>
                                                    <div className="md:mt-8 mt-2 px-2">
                                                        {/* <div className="text-center mb-2 text-lg">{filter.experience}</div> */}
                                                        <div className="text-center mb-2 text-lg">
                                                            {filterForm.watch(
                                                                "experience"
                                                            )}
                                                        </div>
                                                        <Slider
                                                            value={filterForm.watch(
                                                                "experience"
                                                            )}
                                                            onChange={(e) =>
                                                                filterForm.setValue(
                                                                    "experience",
                                                                    e.value as number
                                                                )
                                                            }
                                                            pt={{
                                                                root: {
                                                                    className:
                                                                        "w-full",
                                                                },
                                                                range: {
                                                                    className:
                                                                        "bg-primary",
                                                                },
                                                                handle: {
                                                                    className:
                                                                        "border-primary hover:bg-primary hover:border-primary w-5 h-5",
                                                                },
                                                            }}
                                                            min={0}
                                                            max={30}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Salary Range */}
                                                <div className="w-full">
                                                    <h3 className="text-lg font-semibold text-primary md:mb-4 mb-2">
                                                        Salary Range
                                                    </h3>
                                                    <div className="md:mt-8 mt-2 px-2">
                                                        <div className="flex justify-between mb-2">
                                                            <span>
                                                                ₹
                                                                {
                                                                    filterForm.watch(
                                                                        "salaryRange"
                                                                    )[0]
                                                                }
                                                            </span>
                                                            <span>
                                                                ₹
                                                                {
                                                                    filterForm.watch(
                                                                        "salaryRange"
                                                                    )[1]
                                                                }
                                                            </span>
                                                        </div>
                                                        <Slider
                                                            pt={{
                                                                root: {
                                                                    className:
                                                                        "w-full",
                                                                },
                                                                range: {
                                                                    className:
                                                                        "bg-primary",
                                                                },
                                                                handle: {
                                                                    className:
                                                                        "border-primary hover:bg-primary hover:border-primary w-5 h-5",
                                                                },
                                                            }}
                                                            value={[
                                                                filterForm.watch(
                                                                    "salaryRange"
                                                                )[0],
                                                                filterForm.watch(
                                                                    "salaryRange"
                                                                )[1],
                                                            ]}
                                                            onChange={(e) =>
                                                                filterForm.setValue(
                                                                    "salaryRange",
                                                                    e.value as number[]
                                                                )
                                                            }
                                                            min={0}
                                                            max={1000000}
                                                            range
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex md:flex-row flex-col items-end justify-between lg:gap-8 gap-6">
                                            <div className="flex md:flex-row flex-col lg:gap-8 gap-4 lg:w-3/4 md:w-4/5 w-full">
                                                {/* Work Location */}
                                                <div className="md:w-1/2">
                                                    <h3 className="text-lg font-semibold text-primary md:mb-4 mb-2">
                                                        Work Location
                                                    </h3>
                                                    <SelectField
                                                        filter
                                                        value={filterForm.watch(
                                                            "workLocation"
                                                        )}
                                                        filterPlaceholder="Search City"
                                                        onChange={(e) =>
                                                            filterForm.setValue(
                                                                "workLocation",
                                                                e.value as string
                                                            )
                                                        }
                                                        options={cityList?.cities?.map(
                                                            (city) => ({
                                                                label: city,
                                                                value: city,
                                                            })
                                                        )}
                                                        virtualScrollerOptions={{
                                                            itemSize: 38,
                                                        }}
                                                        placeholder="Select"
                                                        className="w-full bg-primary-light rounded-md"
                                                    />
                                                </div>

                                                {/* Qualification Required */}
                                                <div className="md:w-1/2">
                                                    <h3 className="text-lg font-semibold text-primary md:mb-4 mb-2">
                                                        Qualification Required
                                                    </h3>
                                                    <SelectField
                                                        value={filterForm.watch(
                                                            "qualification"
                                                        )}
                                                        onChange={(e) =>
                                                            filterForm.setValue(
                                                                "qualification",
                                                                e.value as string
                                                            )
                                                        }
                                                        options={qualificationList?.qualifications?.map(
                                                            (
                                                                qualification
                                                            ) => ({
                                                                label: qualification,
                                                                value: qualification,
                                                            })
                                                        )}
                                                        placeholder="Select"
                                                        className="w-full bg-primary-light rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-row-reverse md:gap-4 gap-6">
                                                <div>
                                                    <AuthButton
                                                        type="button"
                                                        label="Apply"
                                                        customStyle="w-fit !bg-primary !text-white hover:bg-unset border-none focus:shadow-none !rounded-xl md:px-4 px-4 py-2 font-medium text-xs"
                                                        onClick={filterForm.handleSubmit(
                                                            filterFormSubmit
                                                        )}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="text-sm text-primary font-semibold text-nowrap"
                                                    onClick={() => {
                                                        filterForm.reset();
                                                        setFilterData(
                                                            filterForm.getValues()
                                                        );
                                                        op.current?.hide?.();
                                                    }}
                                                >
                                                    Reset all
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </OverlayPanel>
                        </div>
                    </div>

                    <div className="md:block hidden bg-gradient-to-b from-[#3F1562] to-[#DF6789] rounded-[14px] p-0.5 lg:w-[30%]">
                        <div className="flex lg:flex-row md:flex-col flex-row items-cente justify-between gap-3 bg-white rounded-xl px-4 py-3 w-full">
                            {/* Complete Profile */}
                            {!UserData.data?.remainingProfileModules
                                ?.isPersonalInfoCompleted ||
                            !UserData.data?.remainingProfileModules
                                ?.isEducationCompleted ||
                            !UserData.data?.remainingProfileModules
                                ?.isWorkExperienceCompleted ||
                            !UserData.data?.remainingProfileModules
                                ?.isResumeUploaded ? (
                                <div className="flex items-center gap-2 lg:border-r-2 lg:border-b-0 md:border-b-2 md:border-r-0 border-r-2 border-[#ECECEC] lg:pr-2 lg:pb-0 md:pr-0 md:pb-3 pr-3 lg:w-[64%]">
                                    <CompleteProfileIcon />
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-black font-semibold text-center text-nowrap">
                                            Complete your profile
                                        </p>
                                        <AuthButton
                                            onClick={() =>
                                                navigate(EDIT_PROFILE)
                                            }
                                            label="Let’s do it"
                                            customStyle="text-sm text-[#C72855] py-2"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 lg:border-r-2 lg:border-b-0 md:border-b-2 md:border-r-0 border-r-2 border-[#ECECEC] lg:pr-3 lg:pb-0  md:pr-0 md:pb-3 pr-3 lg:w-[64%]">
                                    <div className="shrink-0 w-10 h-10 border border-[#ECECEC] rounded-full">
                                        <img
                                            src={
                                                UserData.data?.avatar ||
                                                NoProfile
                                            }
                                            alt="profile"
                                            className="w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-3/4">
                                        <p className="text-xl text-black font-semibold truncate w-full">
                                            {(UserData.data?.firstName ?? "")
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                UserData.data?.firstName
                                                    ?.slice(1)
                                                    .toLowerCase()}{" "}
                                            {(UserData.data?.lastName ?? "")
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                UserData.data?.lastName
                                                    ?.slice(1)
                                                    .toLowerCase()}
                                        </p>
                                        <p className="text-sm text-[#C72855] truncate">
                                            {UserData.data?.bio}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Head Score */}
                            <button
                                onClick={() => navigate(PROFILE)}
                                className="flex lg:flex-col md:flex-row flex-col lg:gap-0 gap-2 items-center bg-[#FFF4F7] rounded-xl px-3 py-4 lg:w-auto md:w-full"
                            >
                                <p className="lg:block md:hidden text-xs bg-gradient-to-r bg-clip-text text-transparent from-[#3F1562] to-[#DF6789] font-semibold">
                                    View
                                </p>
                                <p className="text-sm text-center w-full bg-gradient-to-r bg-clip-text text-transparent from-[#3F1562] to-[#DF6789] font-semibold text-nowrap">
                                    Head Score
                                </p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:h-[calc(100%-120px)] md:h-[calc(100%-170px)] h-[calc(100%-100px)]">
                    <TabComponent
                        tabs={tabs}
                        activeTabIndex={activeTabIndex}
                        onTabClick={(id) => setActiveTabIndex(id)}
                    />
                    <div
                        className={twMerge(
                            "h-full md:max-h-[calc(100%-50px)] max-h-[calc(100%-10px)] w-full lg:p-4 p-2 bg-white rounded-2xl",
                            activeTabIndex === 0 &&
                                "rounded-tr-2xl rounded-tl-none",
                            activeTabIndex === tabs.length - 1 &&
                                "rounded-tl-2xl rounded-tr-none"
                        )}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </FilterDataContext>
    );
};

export default Jobs;
