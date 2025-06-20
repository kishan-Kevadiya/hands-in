import AuthButton from '@/components/ui/auth/AuthButton'
import AuthInput from '@/components/ui/auth/AuthInput'
import AuthTextArea from '@/components/ui/auth/AuthTextArea'
import Datepicker from '@/components/ui/auth/Datepicker'
import SecondaryButton from '@/components/ui/auth/SecondaryButton'
import SelectField from '@/components/ui/auth/SelectField'
import ButtonLoader from '@/components/ui/loader/ButtonLoader'
import { UserWorkExperience } from '@/helpers/apis/account-setup'
import { getProfile } from '@/helpers/apis/profile'
import { USE_QUERY_KEYS } from '@/helpers/constants'
import { ExperienceField, experienceSchema, JobType, PutWorkExperienceRequest } from '@/types/accountSetup.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Checkbox } from 'primereact/checkbox'
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

const WorkExperience: React.FC<{ onNext: () => void, onPrevious: () => void }> = ({ onNext, onPrevious }) => {

    const [nextButtonLoader, setNextButtonLoader] = useState<boolean>(false);

    const workExperiencesForm = useForm<ExperienceField>({
        defaultValues: {
            experiences: [
                {
                    jobTitle: "",
                    jobDescription: "",
                    companyName: "",
                    jobType: JobType.fulltime,
                    startYear: new Date(),
                    endYear: new Date(),
                    isCurrentlyWorking: false,
                }
            ],
        },
        mode: "all",
        resolver: zodResolver(experienceSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: workExperiencesForm.control,
        name: "experiences",
    })

    const onSubmit = async (data: ExperienceField) => {
        setNextButtonLoader(true);

        const payload: PutWorkExperienceRequest = {
            workExperiences: data.experiences.map((experience) => ({
                workExperienceId: experience.id,
                jobTitle: experience.jobTitle,
                jobDescription: experience.jobDescription,
                companyName: experience.companyName,
                jobType: experience.jobType,
                startYear: moment(experience.startYear).format("YYYY"),
                endYear: experience.isCurrentlyWorking ? undefined : moment(experience.endYear).format("YYYY"),
            }))
        }

        try {
            const response = await UserWorkExperience(payload);
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
    })

    useEffect(() => {
        if (ProfileDetails?.data && ProfileDetails?.data?.workExperiences?.length > 0) {
            const experiences = ProfileDetails?.data?.workExperiences?.map((workExperience) => ({
                id: workExperience?.id,
                jobTitle: workExperience?.jobTitle || "",
                jobDescription: workExperience?.jobDescription || "",
                companyName: workExperience?.companyName || "",
                jobType: workExperience?.jobType as JobType,
                startYear: new Date(workExperience?.startYear),
                endYear: workExperience?.endYear ? new Date(workExperience?.endYear) : new Date(),
                isCurrentlyWorking: !workExperience?.endYear
            }))

            workExperiencesForm?.setValue("experiences", experiences);
        }
    }, [ProfileDetails?.data])

    return (
        <form className="flex flex-col gap-6">

            {fields?.map((field, index) => (
                <div className="flex flex-col gap-8" key={field?.id || index}>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-2xl font-semibold'>{index + 1}. Experience</h3>
                        {fields?.length > 1 && <i
                            onClick={() => remove(index)}
                            className='pi pi-times cursor-pointer bg-[#9E9E9E] border-none rounded-full p-1 text-xs text-white'>
                        </i>}
                    </div>

                    <div className="flex flex-col gap-8">
                        <AuthInput
                            register={workExperiencesForm.register(`experiences.${index}.jobTitle`)}
                            label="Job Title"
                            placeholder="Enter here"
                            errorMsg={workExperiencesForm.formState.errors.experiences?.[index]?.jobTitle}
                        />

                        <AuthTextArea
                            register={workExperiencesForm.register(`experiences.${index}.jobDescription`)}
                            label="Job Description"
                            rows={3}
                            placeholder="Enter here"
                            errorMsg={workExperiencesForm.formState.errors.experiences?.[index]?.jobDescription}
                        />

                        <div className='flex md:flex-row flex-col md:gap-6 gap-8'>
                            <AuthInput
                                register={workExperiencesForm.register(`experiences.${index}.companyName`)}
                                label='Company  Name'
                                placeholder='Enter here'
                                errorMsg={workExperiencesForm.formState.errors.experiences?.[index]?.companyName}
                            />

                            <Controller
                                control={workExperiencesForm.control}
                                name={`experiences.${index}.jobType`}
                                render={({ field }) => (
                                    <SelectField
                                        {...field}
                                        label="Job Type"
                                        placeholder='Select here'
                                        options={[
                                            { label: "Full Time", value: JobType.fulltime },
                                            { label: "Part Time", value: JobType.parttime },
                                            { label: "Contract", value: JobType.contract },
                                        ]}
                                        errorMsg={workExperiencesForm.formState.errors.experiences?.[index]?.jobType}
                                    />
                                )}
                            />
                        </div>

                        <div className='flex md:flex-row flex-col gap-6 w-full'>
                            <Datepicker
                                register={workExperiencesForm.register(`experiences.${index}.startYear`)}
                                label="Start Year"
                                value={workExperiencesForm.watch(`experiences.${index}.startYear`)}
                                errorMsg={workExperiencesForm.formState.errors.experiences?.[index]?.startYear}
                                maxDate={new Date()}
                            />

                            <div className='flex flex-col w-full'>
                                <Datepicker
                                    register={workExperiencesForm.register(`experiences.${index}.endYear`)}
                                    label="End Year"
                                    value={workExperiencesForm.watch(`experiences.${index}.endYear`)}
                                    disabled={workExperiencesForm.watch(`experiences.${index}.isCurrentlyWorking`)}
                                    errorMsg={workExperiencesForm.formState.errors.experiences?.[index]?.endYear}
                                    minDate={workExperiencesForm.watch(`experiences.${index}.startYear`)}
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
                                                className: "w-full h-full bg-primary",
                                            },
                                        }}

                                        onClick={() => {
                                            workExperiencesForm.setValue(
                                                `experiences.${index}.isCurrentlyWorking`,
                                                !workExperiencesForm.watch(`experiences.${index}.isCurrentlyWorking`,)
                                            )
                                        }}
                                        checked={workExperiencesForm.watch(`experiences.${index}.isCurrentlyWorking`,)}
                                    />
                                    Currently working
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            ))}


            <div className="flex items-center justify-center pt-5">
                <SecondaryButton
                    type='button'
                    onClick={() => {
                        if (!workExperiencesForm?.formState?.isValid) {
                            workExperiencesForm.trigger().then(() => {
                                if (workExperiencesForm.formState.isValid) {
                                    append({
                                        jobTitle: "",
                                        jobDescription: "",
                                        companyName: "",
                                        jobType: JobType.fulltime,
                                        startYear: new Date(),
                                        endYear: new Date(),
                                        isCurrentlyWorking: false,
                                    })
                                }
                            })
                        } else {
                            append({
                                jobTitle: "",
                                jobDescription: "",
                                companyName: "",
                                jobType: JobType.fulltime,
                                startYear: new Date(),
                                endYear: new Date(),
                                isCurrentlyWorking: false,
                            })
                        }
                    }}
                    customStyle="py-2.5 rounded-xl md:w-fit w-1/2 text-primary"
                    label="Add Experience"
                />
            </div>

            <div className="flex items-center justify-center gap-4 ">
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
                    onClick={workExperiencesForm.handleSubmit(onSubmit)}
                >
                    {nextButtonLoader ? <ButtonLoader isVisible /> : "Next"}
                </AuthButton>
            </div>

        </form>
    )
}

export default WorkExperience
