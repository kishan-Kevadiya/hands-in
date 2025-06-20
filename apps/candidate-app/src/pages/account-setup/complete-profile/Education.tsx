import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import Datepicker from "@/components/ui/auth/Datepicker";
import SecondaryButton from "@/components/ui/auth/SecondaryButton";
import SelectField from "@/components/ui/auth/SelectField";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { UserEducation } from "@/helpers/apis/account-setup";
import { getProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import {
    EducationField,
    educationSchema,
    PutEducationRequest,
} from "@/types/accountSetup.types";
import { GetQualificationListResponse } from "@/types/jobs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const Education: React.FC<{ onNext: () => void; onPrevious: () => void }> = ({
    onNext,
    onPrevious,
}) => {
    const queryClient = useQueryClient();
    let qualificationList =
        queryClient.getQueryData<GetQualificationListResponse>([
            USE_QUERY_KEYS.GET_QUALIFICATIONS,
        ]);
    if (!qualificationList) {
        qualificationList = localStorage.getItem("qualifications")
            ? JSON.parse(localStorage.getItem("qualifications") as string)
            : [];
    }

    const [nextButtonLoader, setNextButtonLoader] = useState<boolean>(false);

    const educationForm = useForm<EducationField>({
        defaultValues: {
            educations: [
                {
                    schoolName: "",
                    degreeType: "",
                    course: "",
                    startYear: new Date(),
                    endYear: new Date(),
                    isPresent: false,
                },
            ],
        },
        mode: "all",
        resolver: zodResolver(educationSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: educationForm.control,
        name: "educations",
    });

    const onSubmit = async (data: EducationField) => {
        setNextButtonLoader(true);

        const payload: PutEducationRequest = {
            educations: data.educations?.map((education) => ({
                educationId: education.id,
                schoolName: education.schoolName,
                degreeType: education.degreeType,
                course: education.course,
                startYear: moment(education.startYear).format("YYYY"),
                endYear: education.isPresent
                    ? undefined
                    : moment(education.endYear).format("YYYY"),
            })),
        };

        try {
            const response = await UserEducation(payload);
            if (response) {
                onNext();
            }
        } catch (error) {
            console.error(error);
        }
        setNextButtonLoader(false);
    };

    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
    });

    useEffect(() => {
        if (
            ProfileDetails?.data &&
            ProfileDetails?.data?.educations?.length > 0
        ) {
            const educations = ProfileDetails?.data?.educations?.map(
                (education) => ({
                    id: education?.id,
                    schoolName: education?.instituteName || "",
                    degreeType: education?.degreeType || "",
                    course: education?.course || "",
                    startYear: new Date(education?.startYear),
                    endYear: education?.endYear
                        ? new Date(education?.endYear)
                        : new Date(),
                    isPresent: !education?.endYear,
                })
            );
            educationForm?.setValue("educations", educations);
        }
    }, [ProfileDetails?.data]);

    return (
        <form className="flex flex-col gap-6">
            {fields?.map((field, index) => (
                <div
                    className="flex flex-col gap-8"
                    key={field?.id || index}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold">
                            {index + 1}. Education
                        </h3>
                        {fields?.length > 1 && (
                            <i
                                onClick={() => remove(index)}
                                className="pi pi-times cursor-pointer bg-[#9E9E9E] border-none rounded-full p-1 text-xs text-white"
                            ></i>
                        )}
                    </div>

                    <div className="flex flex-col gap-8">
                        <AuthInput
                            register={educationForm.register(
                                `educations.${index}.schoolName`
                            )}
                            label="School Name"
                            placeholder="Enter First Name"
                            errorMsg={
                                educationForm.formState.errors.educations?.[
                                    index
                                ]?.schoolName
                            }
                        />

                        <div className="flex md:flex-row flex-col gap-6">
                            <Controller
                                control={educationForm.control}
                                name={`educations.${index}.degreeType`}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        label="Degree Type"
                                        placeholder="Select here"
                                        options={
                                            qualificationList?.qualifications?.map(
                                                (qualification) => ({
                                                    label: qualification,
                                                    value: qualification,
                                                })
                                            ) || []
                                        }
                                        errorMsg={
                                            educationForm.formState.errors
                                                .educations?.[index]?.degreeType
                                        }
                                    />
                                )}
                            />

                            <AuthInput
                                register={educationForm.register(
                                    `educations.${index}.course`
                                )}
                                label="Course"
                                placeholder="Enter here"
                                errorMsg={
                                    educationForm.formState.errors.educations?.[
                                        index
                                    ]?.course
                                }
                            />
                        </div>

                        <div className="flex md:flex-row flex-col gap-6 w-full">
                            <Datepicker
                                name="startYear"
                                register={educationForm.register(
                                    `educations.${index}.startYear`
                                )}
                                label="Start Year"
                                value={educationForm.watch(
                                    `educations.${index}.startYear`
                                )}
                                errorMsg={
                                    educationForm.formState.errors.educations?.[
                                        index
                                    ]?.startYear
                                }
                                maxDate={new Date()}
                            />

                            <div className="flex flex-col w-full">
                                <Datepicker
                                    name="endYear"
                                    register={educationForm.register(
                                        `educations.${index}.endYear`
                                    )}
                                    label="End Year"
                                    value={educationForm.watch(
                                        `educations.${index}.endYear`
                                    )}
                                    disabled={educationForm.watch(
                                        `educations.${index}.isPresent`
                                    )}
                                    errorMsg={
                                        educationForm.formState.errors
                                            .educations?.[index]?.endYear
                                    }
                                    minDate={educationForm.watch(
                                        `educations.${index}.startYear`
                                    )}
                                />
                                <div className="flex items-center gap-2 text-sm font-medium text-black mt-4">
                                    <Checkbox
                                        pt={{
                                            root: {
                                                className: "!w-5 !h-5",
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
                                        onClick={() => {
                                            educationForm.setValue(
                                                `educations.${index}.isPresent`,
                                                !educationForm.watch(
                                                    `educations.${index}.isPresent`
                                                )
                                            );
                                            if (
                                                educationForm.watch(
                                                    `educations.${index}.isPresent`
                                                )
                                            ) {
                                                educationForm.setValue(
                                                    `educations.${index}.endYear`,
                                                    new Date()
                                                );
                                            }
                                        }}
                                        checked={educationForm.watch(
                                            `educations.${index}.isPresent`
                                        )}
                                    />
                                    Present
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex items-center justify-center pt-5">
                <SecondaryButton
                    type="button"
                    onClick={() => {
                        if (!educationForm?.formState?.isValid) {
                            educationForm.trigger().then(() => {
                                if (educationForm.formState.isValid) {
                                    append({
                                        schoolName: "",
                                        degreeType: "",
                                        course: "",
                                        startYear: new Date(),
                                        endYear: new Date(),
                                        isPresent: false,
                                    });
                                }
                            });
                        } else {
                            append({
                                schoolName: "",
                                degreeType: "",
                                course: "",
                                startYear: new Date(),
                                endYear: new Date(),
                                isPresent: false,
                            });
                        }
                    }}
                    customStyle="py-2.5 rounded-xl md:w-fit w-1/2 text-primary"
                    label="Add Education"
                />
            </div>

            <div className="flex items-center justify-center gap-4">
                <SecondaryButton
                    customStyle="md:w-1/4 w-1/2 py-2.5 px-0 rounded-xl"
                    type="button"
                    label="Previous"
                    onClick={onPrevious}
                />

                <AuthButton
                    customStyle="md:w-2/5 w-1/2"
                    type="button"
                    disabled={nextButtonLoader}
                    onClick={educationForm.handleSubmit(onSubmit)}
                >
                    {nextButtonLoader ? <ButtonLoader isVisible /> : "Next"}
                </AuthButton>
            </div>
        </form>
    );
};

export default Education;
