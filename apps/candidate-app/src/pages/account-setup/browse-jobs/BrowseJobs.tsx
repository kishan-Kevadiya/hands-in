import AuthButton from "@/components/ui/auth/AuthButton";
import AuthLabel from "@/components/ui/auth/AuthLabel";
import SecondaryButton from "@/components/ui/auth/SecondaryButton";
import SelectField from "@/components/ui/auth/SelectField";
import SliderField from "@/components/ui/auth/SliderField";
import PreassessmentModal from "@/components/ui/modals/PreassessmentModal";
import { UserOnboarding } from "@/helpers/apis/account-setup";
import { getProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import { DASHBOARD, JOB_DETAILS } from "@/routes";
import { BrowseJobsSchema, browseJobsSchema } from "@/types/browseJobs.types";
import { GetRolesResponse, RoleTable } from "@/types/profileSetup.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

const BrowseJobs: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const jobId = localStorage.getItem("jobId");

    const queryClient = useQueryClient();
    let roleList = queryClient.getQueryData<GetRolesResponse>([
        USE_QUERY_KEYS.GET_ROLES,
    ]);
    if (!roleList && undefined) {
        roleList = localStorage.getItem("roles")
            ? JSON.parse(localStorage.getItem("roles") as string)
            : [];
    }

    const [visible, setVisible] = useState(false);
    const [role, setRole] = useState<RoleTable>();
    const [experienceYear, setExperienceYear] = useState<number>(0);

    const browseJobForm = useForm<BrowseJobsSchema>({
        defaultValues: {
            roles: [],
        },
        mode: "all",
        resolver: zodResolver(browseJobsSchema),
    });

    const { append: appendRole, remove: removeRole } = useFieldArray({
        control: browseJobForm.control,
        name: "roles",
    });

    const onSubmit = async (data: BrowseJobsSchema) => {
        if (data.roles?.length === 0) {
            showToast("error", "Please select at least one role");
            return;
        }
        try {
            const formData = new FormData();
            data.roles?.map((role, index) => {
                formData.append(`roles[${index}][roleId]`, role.roleId);
                formData.append(
                    `roles[${index}][experience]`,
                    Math.ceil((role.experience as number) / 3.34).toString()
                );
            });

            await UserOnboarding(formData);
            if (state?.from === "account-setup") {
                navigate(jobId ? `${JOB_DETAILS}/${jobId}` : DASHBOARD);
            } else {
                setVisible(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
    });

    useEffect(() => {
        if (ProfileDetails.data) {
            const rolesData = ProfileDetails.data?.tests?.map((role) => ({
                roleId: role?.roleId,
                roleName: role?.roleName,
                experience: role?.experience,
                canGiveTest: role?.canGiveTest,
                canGiveTestDaysAfter: role?.canGiveTestDaysAfter,
            }));
            browseJobForm.setValue("roles", rolesData);
        }
    }, [ProfileDetails.data]);

    return (
        <div className="relative bg-gradient-to-tr from-[#FFB2DF]/50 to-[#E9D0FF]/50 flex items-center justify-center h-screen lg:py-10 lg:px-14 md:p-6 p-4">
            <div
                className="absolute z-10 lg:left-30 md:left-14 left-8 lg:top-24 md:top-14 top-8 flex items-center justify-center cursor-pointer border border-primary/40 rounded-full p-2 md:w-10 w-9 md:h-10 h-9"
                onClick={() => navigate(-1)}
            >
                <i className="pi pi-chevron-left text-xs"></i>
            </div>

            <div className=" flex flex-col items-center w-full lg:p-10 md:p-6 p-4 gap-4 bg-white rounded-2xl font-manrope h-full z-0 overflow-y-auto">
                {/* Logo */}
                <div className="w-52 aspect-[6.04] md:pt-0 pt-4">
                    <img
                        src="/logo.webp"
                        alt="logo"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-center text-2xl font-semibold text-[#212121] leading-10">
                    What role are you looking for?
                </h1>

                <p className="text-center lg:text-base text-sm text-[#8B8B8B] font-medium md:leading-8 leading-6">
                    Here, you enter your experience for the assessment test.{" "}
                    <br className="hidden md:block" /> The company can view both
                    your profile experience and assessment experience.
                </p>

                <div className=" flex flex-col gap-4 border border-[#EAEAEA] p-6 rounded-2xl lg:w-1/2 md:w-11/12 w-full">
                    <div className="flex md:flex-row flex-col gap-6 w-full">
                        <div className="md:w-1/2 flex flex-col gap-4">
                            <AuthLabel
                                labelStyle="text-black font-medium"
                                label="You may choose up to 3 roles!"
                            />
                            <SelectField
                                // filter
                                label="Role:"
                                placeholder="Search here"
                                errorMsg={
                                    browseJobForm.formState.errors.roles?.[0]
                                        ?.roleName
                                }
                                optionLabel="title"
                                options={roleList?.roles
                                    .filter(
                                        (role: RoleTable) =>
                                            !browseJobForm
                                                .watch("roles")
                                                ?.map((role) => role.roleId)
                                                .includes(role.id)
                                    )
                                    .map((role: RoleTable) => ({
                                        title: role.title,
                                        id: role.id,
                                    }))}
                                filter
                                filterPlaceholder="Search here"
                                virtualScrollerOptions={{ itemSize: 38 }}
                                value={role}
                                onChange={(e) => {
                                    setRole({
                                        id: e.value.id,
                                        title: e.value.title,
                                    });
                                }}
                            />
                        </div>
                        <div className="md:w-1/2">
                            <AuthLabel
                                labelStyle="text-[#8B8B8B] font-medium"
                                label="Experience"
                            />
                            <SliderField
                                value={experienceYear}
                                onChange={(e) => {
                                    setExperienceYear(e.value as number);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {browseJobForm.watch("roles")!.length >= 3 ? (
                            <p className="text-primary font-bold">
                                You can not select more than 3 roles
                            </p>
                        ) : (
                            <SecondaryButton
                                onClick={() => {
                                    if (
                                        role?.id &&
                                        role?.title &&
                                        experienceYear >= 0
                                    ) {
                                        appendRole({
                                            roleId: role?.id ?? "",
                                            roleName: role?.title ?? "",
                                            experience: experienceYear,
                                        });
                                        setRole({ id: "", title: "" });
                                        setExperienceYear(0);
                                    }
                                }}
                                customStyle="text-primary md:w-1/5 w-1/2"
                                label="Add"
                            />
                        )}
                    </div>
                </div>

                {browseJobForm.watch("roles") && (
                    <div className="flex flex-wrap items-center justify-center gap-4 lg:w-4/5 w-full">
                        {browseJobForm.watch("roles")?.map((role, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-4 bg-[#F4F4F4] py-2 px-3 rounded-xl"
                            >
                                <div className="w-4/5">
                                    <p className="text-black font-medium truncate">
                                        {role.roleName}
                                    </p>
                                    <p className="text-black font-medium text-sm">
                                        <span className="text-[#666666]">
                                            Exp:
                                        </span>
                                        {Math.ceil(
                                            (role.experience as number) / 3.34
                                        )}{" "}
                                        year
                                    </p>
                                </div>
                                <i
                                    onClick={() => {
                                        removeRole(index);
                                    }}
                                    className="pi pi-times text-white text-xs text-center bg-[#9E9E9E] p-1.5 rounded-full cursor-pointer"
                                ></i>
                            </div>
                        ))}
                    </div>
                )}

                {/* Next Button */}
                <div className="flex justify-center md:w-1/4 w-1/2">
                    <AuthButton
                        disabled={browseJobForm.watch("roles")?.length === 0}
                        label="Next"
                        onClick={browseJobForm.handleSubmit(onSubmit)}
                    />
                </div>
            </div>

            <PreassessmentModal
                visible={visible}
                roles={browseJobForm.watch("roles")?.map((role) => ({
                    id: role.roleId,
                    title: role.roleName,
                    experience: Math.ceil((role.experience as number) / 3.34),
                    canGiveTest: role.canGiveTest,
                    canGiveTestDaysAfter: role.canGiveTestDaysAfter,
                }))}
                setVisible={setVisible}
            />
        </div>
    );
};

export default BrowseJobs;
