import FileUpload from "@/assets/svg/file-upload.svg";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthPhone from "@/components/ui/auth/AuthPhone";
import AuthTextArea from "@/components/ui/auth/AuthTextArea";
import SelectField from "@/components/ui/auth/SelectField";
import SliderField from "@/components/ui/auth/SliderField";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { UserOnboarding } from "@/helpers/apis/account-setup";
import { getProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import {
    Gender,
    PersonalInformationField,
    personalInformationSchema,
} from "@/types/accountSetup.types";
import { GetCityListResponse } from "@/types/jobs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const PersonalInformation: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const queryClient = useQueryClient();
    let cityList = queryClient.getQueryData<GetCityListResponse>([
        USE_QUERY_KEYS.GET_CITIES,
    ]);
    if (!cityList) {
        cityList = localStorage.getItem("cities")
            ? JSON.parse(localStorage.getItem("cities") as string)
            : [];
    }

    const [nextButtonLoader, setNextButtonLoader] = useState<boolean>(false);

    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
    });

    const personalInformationForm = useForm<PersonalInformationField>({
        defaultValues: {
            logo: null,
            firstName: "",
            lastName: "",
            experience: 0,
            email: "",
            phone: "",
            bio: "",
            city: "",
            postalCode: "",
            workPortfolio: "",
            linkedin: "",
        },
        mode: "all",
        resolver: zodResolver(personalInformationSchema),
    });

    const logoImgWatcher = personalInformationForm.watch("logo");

    const onSubmit = async (data: PersonalInformationField) => {
        setNextButtonLoader(true);

        const formData = new FormData();
        if (data.logo instanceof File) {
            formData.append("profile_picture", data.logo);
        }

        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("gender", data.gender);
        formData.append(
            "experience",
            Math.ceil(data.experience / 3.34).toString()
        );
        formData.append("phone", data.phone);
        formData.append("bio", data.bio);
        formData.append("city", data.city);
        formData.append("postalCode", data.postalCode);
        formData.append("website", data.workPortfolio || "");
        formData.append("linkedIn", data.linkedin || "");

        try {
            const response = await UserOnboarding(formData);
            if (response) {
                onNext();
            }
        } catch (error) {
            console.error(error);
        }
        setNextButtonLoader(false);
    };

    useEffect(() => {
        if (ProfileDetails.data) {
            personalInformationForm.setValue(
                "logo",
                ProfileDetails.data.user.avatar
            );
            personalInformationForm.setValue(
                "firstName",
                ProfileDetails.data.user.firstName || ""
            );
            personalInformationForm.setValue(
                "lastName",
                ProfileDetails.data.user.lastName || ""
            );
            personalInformationForm.setValue(
                "gender",
                ProfileDetails.data.user.gender
            );
            personalInformationForm.setValue(
                "experience",
                Math.ceil(ProfileDetails.data.user.experience * 3.34) || 0
            );
            personalInformationForm.setValue(
                "email",
                ProfileDetails.data.user.email || ""
            );
            personalInformationForm.setValue(
                "phone",
                ProfileDetails.data.user.phone || ""
            );
            personalInformationForm.setValue(
                "bio",
                ProfileDetails.data.user.bio || ""
            );
            personalInformationForm.setValue(
                "city",
                ProfileDetails.data.user.city || ""
            );
            personalInformationForm.setValue(
                "postalCode",
                ProfileDetails.data.user.postalCode || ""
            );
            personalInformationForm.setValue(
                "workPortfolio",
                ProfileDetails.data.user.website || ""
            );
            personalInformationForm.setValue(
                "linkedin",
                ProfileDetails.data.user.linkedIn || ""
            );
        }
    }, [ProfileDetails.data]);

    return (
        <form className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer relative w-30 h-30 rounded-full group"
                >
                    {logoImgWatcher ? (
                        <>
                            <img
                                src={
                                    logoImgWatcher instanceof File
                                        ? URL.createObjectURL(logoImgWatcher)
                                        : logoImgWatcher.url
                                }
                                alt="No Image"
                                className="w-full h-full object-cover rounded-full bg-[#F7FAFF]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-200">
                                <i className="pi pi-pen-to-square w-5 h-5 text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/50 rounded-full p-2 flex items-center justify-center text-center">
                                <i className="pi pi-pen-to-square text-xs text-white text-center" />
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-white">
                            <img
                                alt="No Image"
                                src={FileUpload}
                                className="w-8 h-8 text-gray-400"
                            />
                        </div>
                    )}

                    <input
                        id="image-upload"
                        type="file"
                        {...personalInformationForm.register("logo")}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                if (file?.size > 1000000) {
                                    showToast("warning", "File too large");
                                    return;
                                }
                                personalInformationForm.setValue("logo", file);
                            }
                        }}
                    />
                </label>
                <div className="flex flex-col gap-4">
                    <p className="font-medium text-lg">
                        Upload Profile Picture
                    </p>
                    <p className="text-[#A5A3AE] text-sm">
                        Allowed JPG or PNG. <br />
                        Max size of 1 MB
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex md:flex-row flex-col gap-6">
                    <AuthInput
                        register={personalInformationForm.register("firstName")}
                        label="First Name"
                        placeholder="Enter First Name"
                        errorMsg={
                            personalInformationForm.formState.errors.firstName
                        }
                    />

                    <AuthInput
                        register={personalInformationForm.register("lastName")}
                        label="Last Name"
                        placeholder="Enter Last Name"
                        errorMsg={
                            personalInformationForm.formState.errors.lastName
                        }
                    />
                </div>

                <div className="flex md:flex-row flex-col gap-6">
                    <Controller
                        control={personalInformationForm.control}
                        name={"gender"}
                        render={({ field }) => (
                            <SelectField
                                {...field}
                                label="Gender"
                                placeholder="Select here"
                                options={[
                                    { label: "Male", value: Gender.male },
                                    { label: "Female", value: Gender.female },
                                ]}
                                errorMsg={
                                    personalInformationForm.formState.errors
                                        .gender
                                }
                            />
                        )}
                    />

                    <SliderField
                        className="gap-0 pb-0"
                        label="Experience"
                        value={personalInformationForm.watch("experience")}
                        onChange={(e) =>
                            personalInformationForm.setValue(
                                "experience",
                                e.value as number
                            )
                        }
                    />
                </div>

                <div className="flex md:flex-row flex-col gap-6">
                    <AuthInput
                        disabled
                        register={personalInformationForm.register("email")}
                        label="Email"
                        placeholder="Enter Email"
                        errorMsg={
                            personalInformationForm.formState.errors.email
                        }
                    />

                    <AuthPhone
                        register={personalInformationForm.register("phone")}
                        label="Phone Number"
                        placeholder="9999999999"
                        errorMsg={
                            personalInformationForm.formState.errors.phone
                        }
                    />
                </div>

                <AuthTextArea
                    register={personalInformationForm.register("bio")}
                    label="Bio"
                    placeholder="Type here"
                    rows={3}
                    cols={5}
                    errorMsg={personalInformationForm.formState.errors.bio}
                />

                <div className="flex md:flex-row flex-col gap-6">
                    <Controller
                        name="city"
                        control={personalInformationForm.control}
                        render={({ field: { ...field } }) => (
                            <SelectField
                                filter
                                filterPlaceholder="Search City"
                                {...field}
                                label="City"
                                placeholder="Select here"
                                options={cityList?.cities?.map((city) => ({
                                    label: city,
                                    value: city,
                                }))}
                                virtualScrollerOptions={{ itemSize: 38 }}
                                errorMsg={
                                    personalInformationForm.formState.errors
                                        .city
                                }
                            />
                        )}
                    />

                    <AuthInput
                        register={personalInformationForm.register(
                            "postalCode"
                        )}
                        label="Postal Code"
                        placeholder="Postal Code"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        keyfilter="int"
                        maxLength={6}
                        errorMsg={
                            personalInformationForm.formState.errors?.postalCode
                        }
                    />
                </div>

                <div className="flex md:flex-row flex-col gap-6">
                    <AuthInput
                        register={personalInformationForm.register(
                            "workPortfolio"
                        )}
                        label="Work Portfolio URL"
                        placeholder="Enter here"
                        errorMsg={
                            personalInformationForm?.formState?.errors
                                ?.workPortfolio
                        }
                    />

                    <AuthInput
                        register={personalInformationForm.register("linkedin")}
                        label="Linkedin URL"
                        placeholder="Enter here"
                        errorMsg={
                            personalInformationForm?.formState?.errors?.linkedin
                        }
                    />
                </div>

                <div className="flex items-center justify-center ">
                    <AuthButton
                        customStyle="md:w-2/5 w-1/2"
                        type="button"
                        disabled={nextButtonLoader}
                        onClick={personalInformationForm.handleSubmit(onSubmit)}
                    >
                        {nextButtonLoader ? <ButtonLoader isVisible /> : "Next"}
                    </AuthButton>
                </div>
            </div>
        </form>
    );
};

export default PersonalInformation;
