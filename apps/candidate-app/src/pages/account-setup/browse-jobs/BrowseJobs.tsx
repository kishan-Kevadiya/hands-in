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

    const browseJobForm = useForm<BrowseJobsSchema>({
        defaultValues: {
            roles: [],
        },
        mode: "all",
        resolver: zodResolver(browseJobsSchema),
    });

    const { fields, append: appendRole, remove: removeRole, update: updateRole } = useFieldArray({
        control: browseJobForm.control,
        name: "roles",
    });

    const onSubmit = async (data: BrowseJobsSchema) => {
        if (!data.roles.every((role) => role.roleName)) {
            showToast("error", "Please select at least one role or fill all the fields");
            return;
        }
        try {
            const formData = new FormData();
            data.roles?.forEach((role, index) => {
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
        removeRole([0, 1, 2]);
        appendRole({
            roleId: "",
            experience: 0,
            roleName: "",
        })
    }, [])

    useEffect(() => {
        if (ProfileDetails.data) {
            const rolesData = ProfileDetails.data?.tests?.map((role) => ({
                roleId: role?.roleId,
                roleName: role?.roleName,
                // Assuming API returns experience that needs conversion for the slider (0-100)
                // If API already provides the slider value, no conversion is needed.
                experience: role?.experience ? role.experience * 3.34 : 0,
                canGiveTest: role?.canGiveTest,
                canGiveTestDaysAfter: role?.canGiveTestDaysAfter,
            }));
            browseJobForm.setValue("roles", rolesData);
        }
    }, [ProfileDetails.data, browseJobForm]);


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
                    Here, you enter your experience for the assessment test. It will take hardly <strong className="text-[#000]">4</strong> mins.{" "}
                    <br className="hidden md:block" /> The company can view both
                    your profile experience and assessment experience.
                </p>

                <div className=" flex flex-col gap-4 border border-[#EAEAEA] p-6 rounded-2xl lg:w-1/2 md:w-11/12 w-full">
                    <AuthLabel
                        labelStyle="text-black font-medium"
                        label={"You may choose up to 3 roles!"}
                    />
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex md:flex-row flex-col gap-6 w-full">
                            <div className="md:w-1/2 flex flex-col gap-4">

                                <SelectField
                                    label="Role:"
                                    placeholder="Search here"
                                    errorMsg={
                                        browseJobForm.formState.errors.roles?.[index]
                                            ?.roleName
                                    }
                                    name={`roles.${index}.roleName`}
                                    optionLabel="title"
                                    options={roleList?.roles
                                        .filter(
                                            (role: RoleTable) =>
                                                !browseJobForm
                                                    .watch("roles")
                                                    ?.map((r) => r.roleId)
                                                    .includes(role.id) || item.roleId === role.id
                                        )
                                        .map((role: RoleTable) => ({
                                            title: role.title,
                                            id: role.id,
                                        }))}
                                    filter
                                    filterPlaceholder="Search here"
                                    virtualScrollerOptions={{ itemSize: 38 }}
                                    value={{ id: item.roleId, title: item.roleName }}
                                    onChange={(e) => {
                                        if (e?.value) {
                                            updateRole(index, {
                                                ...item,
                                                roleId: e.value.id,
                                                roleName: e.value.title,
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="md:w-1/2 -mt-4">
                                <SliderField
                                    value={item.experience}
                                    label="Experience"
                                    onChange={(e) => {
                                        updateRole(index, {
                                            ...item,
                                            experience: e.value as number
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-center">
                        {browseJobForm.watch("roles")!.length >= 3 ? (
                            <p className="text-primary font-bold">
                                You can not select more than 3 roles
                            </p>
                        ) : (
                            <SecondaryButton
                                onClick={() => {
                                    appendRole({
                                        roleId: "",
                                        roleName: "",
                                        experience: 0, // Default slider value
                                    });
                                }}
                                customStyle="text-primary md:w-1/5 w-1/2"
                                label="Add Role"
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