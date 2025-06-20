import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthLabel from "@/components/ui/auth/AuthLabel";
import AuthNumber from "@/components/ui/auth/AuthNumber";
import ChipField from "@/components/ui/auth/ChipFiled";
import Datepicker from "@/components/ui/auth/Datepicker";
import EditorField from "@/components/ui/auth/EditorField";
import MultiSelectField from "@/components/ui/auth/MultiSelectField";
import RadioButton from "@/components/ui/auth/RadioField";
import SelectField from "@/components/ui/auth/SelectField";
import SliderField from "@/components/ui/auth/SliderField";
import InfoPopup from "@/components/ui/infoPopup/InfoPopup";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { generateJD, getOneJob } from "@/helpers/apis/jobs";
import { SALARY_TYPE, USE_QUERY_KEYS } from "@/helpers/constants";
import { JOBS, PREVIEW_JOB } from "@/routes";
import {
    CreateAndUpdateJobRequest,
    CreateJobField,
    createJobSchema,
    Gender,
    GetCityListResponse,
    GetQualificationListResponse,
    GetRolesResponse,
    IncentivePeriod,
    JobType,
    Language,
    LanguageProficiency,
    SalaryPeriod,
    WorkModel,
} from "@/types/jobs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
    AutoComplete,
    AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { EditorTextChangeEvent } from "primereact/editor";
import { InputNumberChangeEvent } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import {
    Controller,
    FieldError,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";

const CreateJob: React.FC = () => {
    const queryClient = useQueryClient();
    let cityList = queryClient.getQueryData<GetCityListResponse>([
        USE_QUERY_KEYS.GET_CITIES,
    ]);
    if (!cityList) {
        cityList = localStorage.getItem("cities")
            ? JSON.parse(localStorage.getItem("cities") as string)
            : [];
    }
    let jobRoleList = queryClient.getQueryData<GetRolesResponse>([
        USE_QUERY_KEYS.GET_ROLES,
    ]);
    if (!jobRoleList) {
        jobRoleList = localStorage.getItem("roles")
            ? JSON.parse(localStorage.getItem("roles") as string)
            : [];
    }
    let qualificationList =
        queryClient.getQueryData<GetQualificationListResponse>([
            USE_QUERY_KEYS.GET_QUALIFICATIONS,
        ]);
    if (!qualificationList) {
        qualificationList = localStorage.getItem("qualifications")
            ? JSON.parse(localStorage.getItem("qualifications") as string)
            : [];
    }

    const navigate = useNavigate();
    const { id } = useParams();

    const [isJDLoading, setIsJDLoading] = useState(false);
    const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

    const createJobForm = useForm<CreateJobField>({
        defaultValues: {
            job_title: "",
            job_type: JobType.fulltime,
            salary: SALARY_TYPE.FIXED,
            minimumSalary: null,
            maximumSalary: null,
            incentiveAmount: null,
            description: "",
            expiry_date: moment().add(15, "days").toDate(),
            vacancy: 1,
            experience: 0,
            work_model: WorkModel.onsite,
            location: "",
            gender: Gender.male,
            required_qualification: [],
            hard_skills: [],
            soft_skills: [],
            languages: [],
            additional_perks: [],
            generatedJobDescription: false,
        },
        mode: "all",
        resolver: zodResolver(createJobSchema),
    });

    const [languageField, setLanguageField] = useState<{
        language: string;
        proficiency: string;
    }>({
        language: "",
        proficiency: "",
    });
    const [hardSkillInput, setHardSkillInput] = useState<string>("");
    const [softSkillInput, setSoftSkillInput] = useState<string>("");
    const [additionalPerkInput, setAdditionalPerkInput] = useState<string>("");

    const languageFieldArray = useFieldArray({
        control: createJobForm.control,
        name: "languages",
    });

    /* Set Job Details in Local Storage */
    const onSubmit = async (data: CreateJobField) => {
        localStorage.setItem("job-details", JSON.stringify(data));
        navigate(PREVIEW_JOB);
    };

    const OneJobDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_ONE_JOB],
        queryFn: async () => await getOneJob(id as string),
        enabled: !!id,
    });

    /* Generate AI Job Description */
    const generateAIJobDescription = async () => {
        const data = createJobForm.getValues();

        const payload: CreateAndUpdateJobRequest = {
            title: data?.job_title,
            jobType: data?.job_type as JobType,
            salaryPeriod: SalaryPeriod.month,
            expiry: moment(data?.expiry_date).format("yyyy-MM-DD"),
            vacancy: data?.vacancy,
            minimumSalary:
                (data.salary === SALARY_TYPE.NOT_DISCLOSED
                    ? null
                    : (data.salary === SALARY_TYPE.FIXED ||
                          data.salary === SALARY_TYPE.FIXED_INCENTIVE) &&
                      data?.minimumSalary) || null,
            maximumSalary:
                (data.salary === SALARY_TYPE.NOT_DISCLOSED
                    ? null
                    : (data.salary === SALARY_TYPE.FIXED ||
                          data.salary === SALARY_TYPE.FIXED_INCENTIVE) &&
                      data?.maximumSalary) || null,
            incentiveAmount:
                (data.salary === SALARY_TYPE.NOT_DISCLOSED
                    ? null
                    : (data.salary === SALARY_TYPE.FIXED_INCENTIVE ||
                          data.salary === SALARY_TYPE.INCENTIVE) &&
                      data?.incentiveAmount) || null,
            incentivePeriod: IncentivePeriod.month,
            experience: Math.ceil((data?.experience as number) / 3.34) || 0,
            workModel: data?.work_model as WorkModel,
            location: data?.location,
            gender:
                (data?.gender as Gender) === Gender.both
                    ? undefined
                    : data?.gender,
            requiredQualification: data?.required_qualification,
            hardSkills: data?.hard_skills,
            softSkills: data?.soft_skills,
            languages: data?.languages as Language[],
            additionalPerks: data?.additional_perks,
        };

        try {
            setIsJDLoading(true);
            const response = await generateJD(payload);
            const description =
                response?.description.slice(1).slice(0, -1) || "";
            createJobForm.setValue("description", description);
            createJobForm.setValue("generatedJobDescription", true);
            setIsJDLoading(false);
        } catch (error) {
            setIsJDLoading(false);
            console.error(error);
        }
    };

    /* Auto Complete */
    const getRolesAutoCompleteList = (e: AutoCompleteCompleteEvent) => {
        if (e.query.length > 2) {
            const filteredRoles =
                jobRoleList?.roles
                    .filter((role) =>
                        role?.title
                            ?.toLowerCase()
                            .includes(e.query.toLowerCase())
                    )
                    .map((role) => role.title) ?? [];

            setAutoCompleteList(filteredRoles);
            return filteredRoles;
        }
    };

    /* Preview Job Details */
    useEffect(() => {
        if (localStorage.getItem("job-details")) {
            const data: CreateJobField = JSON.parse(
                localStorage.getItem("job-details") || ""
            );

            createJobForm.setValue("id", data?.id || "");
            createJobForm.setValue("job_title", data?.job_title || "");
            createJobForm.setValue("job_type", data?.job_type || "");
            createJobForm.setValue("vacancy", data?.vacancy || 0);
            createJobForm.setValue("description", data?.description || "");
            createJobForm.setValue(
                "salary",
                data.maximumSalary !== null &&
                    data.minimumSalary !== null &&
                    data.incentiveAmount !== null
                    ? SALARY_TYPE.FIXED_INCENTIVE
                    : data.maximumSalary !== null && data.minimumSalary !== null
                    ? SALARY_TYPE.FIXED
                    : data.incentiveAmount !== null
                    ? SALARY_TYPE.INCENTIVE
                    : SALARY_TYPE.NOT_DISCLOSED
            );
            createJobForm.setValue(
                "minimumSalary",
                data?.minimumSalary || null
            );
            createJobForm.setValue(
                "maximumSalary",
                data?.maximumSalary || null
            );
            createJobForm.setValue(
                "incentiveAmount",
                data?.incentiveAmount || null
            );
            createJobForm.setValue(
                "expiry_date",
                new Date(data?.expiry_date || "")
            );
            console.log(data?.experience);

            createJobForm.setValue("experience", data?.experience || 0);
            createJobForm.setValue("work_model", data?.work_model || "");
            createJobForm.setValue("location", data?.location || "");
            createJobForm.setValue(
                "gender",
                data?.gender === null ? Gender.both : data?.gender
            );
            createJobForm.setValue(
                "required_qualification",
                data?.required_qualification || ""
            );
            createJobForm.setValue("hard_skills", data?.hard_skills || "");
            createJobForm.setValue("soft_skills", data?.soft_skills || "");
            createJobForm.setValue("languages", data?.languages || "");
            createJobForm.setValue(
                "additional_perks",
                data?.additional_perks || ""
            );
            createJobForm.setValue(
                "generatedJobDescription",
                data?.generatedJobDescription || false
            );
        }
    }, [localStorage.getItem("job-details")]);

    /* Edit Job */
    useEffect(() => {
        const localStorageJobDetails = JSON.parse(
            localStorage.getItem("job-details") as string
        );
        if (OneJobDetails.data && localStorageJobDetails?.id !== id) {
            createJobForm.setValue("id", OneJobDetails.data?.job?.id || "");
            createJobForm.setValue(
                "job_title",
                OneJobDetails.data?.job?.title || ""
            );
            createJobForm.setValue(
                "job_type",
                OneJobDetails.data?.job?.jobType || ""
            );
            createJobForm.setValue(
                "vacancy",
                OneJobDetails.data?.job?.vacancy || 0
            );
            createJobForm.setValue(
                "description",
                OneJobDetails.data?.job?.description || ""
            );
            createJobForm.setValue(
                "salary",
                OneJobDetails.data?.job?.maximumSalary !== null &&
                    OneJobDetails.data?.job?.minimumSalary !== null &&
                    OneJobDetails.data?.job?.incentiveAmount !== null
                    ? SALARY_TYPE.FIXED_INCENTIVE
                    : OneJobDetails.data?.job?.maximumSalary !== null &&
                      OneJobDetails.data?.job?.minimumSalary !== null
                    ? SALARY_TYPE.FIXED
                    : OneJobDetails.data?.job?.incentiveAmount !== null
                    ? SALARY_TYPE.INCENTIVE
                    : SALARY_TYPE.NOT_DISCLOSED
            );
            createJobForm.setValue(
                "minimumSalary",
                OneJobDetails.data?.job?.minimumSalary || null
            );
            createJobForm.setValue(
                "maximumSalary",
                OneJobDetails.data?.job?.maximumSalary || null
            );
            createJobForm.setValue(
                "incentiveAmount",
                OneJobDetails.data?.job?.incentiveAmount || null
            );
            createJobForm.setValue(
                "expiry_date",
                new Date(OneJobDetails.data?.job?.expiry || "")
            );
            createJobForm.setValue(
                "experience",
                Math.ceil(
                    (OneJobDetails.data?.job?.experience as number) * 3.34
                ) || 0
            );
            createJobForm.setValue(
                "work_model",
                OneJobDetails.data?.job?.workModel || ""
            );
            createJobForm.setValue(
                "location",
                OneJobDetails.data?.job?.location || ""
            );
            createJobForm.setValue(
                "gender",
                OneJobDetails.data?.job?.gender === null
                    ? Gender.both
                    : OneJobDetails.data?.job?.gender || ""
            );
            createJobForm.setValue(
                "required_qualification",
                OneJobDetails.data?.job?.requiredQualification as [
                    string,
                    ...string[]
                ]
            );
            createJobForm.setValue(
                "hard_skills",
                OneJobDetails.data?.job?.hardSkills || ""
            );
            createJobForm.setValue(
                "soft_skills",
                OneJobDetails.data?.job?.softSkills || ""
            );
            createJobForm.setValue(
                "languages",
                OneJobDetails.data?.job?.languages || ""
            );
            createJobForm.setValue(
                "additional_perks",
                OneJobDetails.data?.job?.perks || ""
            );
        }
    }, [OneJobDetails.data?.job]);

    return (
        <div className="w-full lg:h-full flex lg:flex-row flex-col gap-4">
            <form className="w-full h-full flex flex-col gap-6 overflow-auto">
                <div className="bg-white w-full rounded-2xl flex flex-col gap-6 p-4">
                    <div className="flex items-center gap-2 pb-4">
                        <Link
                            to={id ? JOBS + "/" + id : JOBS}
                            replace
                            className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
                        >
                            <i
                                className="pi pi-times"
                                onClick={() =>
                                    localStorage.removeItem("job-details")
                                }
                            ></i>
                        </Link>
                        <p className="font-semibold text-xl">
                            {id ? "Update Job" : "Create a Job"}
                        </p>
                    </div>

                    <div className="flex flex-col w-full">
                        <div className={`flex flex-col gap-2 w-full`}>
                            <AuthLabel label="Job Title*" />

                            <AutoComplete
                                value={createJobForm.watch("job_title")}
                                onChange={(e) =>
                                    createJobForm.setValue("job_title", e.value)
                                }
                                placeholder="Enter job title"
                                pt={{
                                    root: {
                                        className: "w-full",
                                    },
                                    input: {
                                        root: {
                                            className:
                                                "!w-full text-black border-none focus:!shadow-none !bg-field !rounded-xl font-manrope",
                                        },
                                    },
                                }}
                                field="name"
                                suggestions={autoCompleteList}
                                itemTemplate={(option) => <span>{option}</span>}
                                completeMethod={getRolesAutoCompleteList}
                            />
                        </div>

                        {createJobForm.formState.errors.job_title && (
                            <small className="w-full text-red-400">
                                {
                                    createJobForm.formState.errors.job_title
                                        .message
                                }
                            </small>
                        )}
                    </div>

                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 md:w-3/5 w-full">
                            <AuthLabel label="Job Type*" />
                            <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
                                <RadioButton
                                    id="fullTime"
                                    label="Full Time"
                                    value={JobType.fulltime}
                                    {...createJobForm.register("job_type")}
                                />
                                <RadioButton
                                    id="contract"
                                    label="Contract"
                                    value={JobType.contract}
                                    {...createJobForm.register("job_type")}
                                />
                                <RadioButton
                                    id="partTime"
                                    label="Part-Time"
                                    value={JobType.parttime}
                                    {...createJobForm.register("job_type")}
                                />
                            </div>
                            {createJobForm.formState.errors.job_type && (
                                <small className="w-full text-red-400">
                                    {
                                        createJobForm.formState.errors.job_type
                                            .message
                                    }
                                </small>
                            )}
                        </div>

                        <div className="w-full">
                            <Controller
                                name="vacancy"
                                control={createJobForm.control}
                                render={({ field: { ...field } }) => (
                                    <AuthNumber
                                        value={field.value}
                                        onChange={(e: InputNumberChangeEvent) =>
                                            field.onChange(e.value)
                                        }
                                        label="Vacancy Available*"
                                        placeholder="Enter here"
                                        useGrouping={false}
                                        errorMsg={
                                            createJobForm.formState.errors
                                                .vacancy
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-max">
                        <AuthLabel label="Salary*" />
                        <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
                            <RadioButton
                                id="fixed"
                                label="Fixed"
                                value={SALARY_TYPE.FIXED}
                                {...createJobForm.register("salary")}
                            />
                            <RadioButton
                                id="fixedIncentive"
                                label="Fixed & Incentive"
                                value={SALARY_TYPE.FIXED_INCENTIVE}
                                {...createJobForm.register("salary")}
                            />
                            <RadioButton
                                id="incentive"
                                label="Incentive"
                                value={SALARY_TYPE.INCENTIVE}
                                {...createJobForm.register("salary")}
                            />
                            <RadioButton
                                id="notDisclosed"
                                label="Not Disclosed"
                                value={SALARY_TYPE.NOT_DISCLOSED}
                                {...createJobForm.register("salary")}
                            />
                        </div>
                    </div>

                    {createJobForm.watch("salary") !==
                        SALARY_TYPE.NOT_DISCLOSED && (
                        <div>
                            {createJobForm.watch("salary") ===
                                SALARY_TYPE.FIXED && (
                                <div className="flex flex-col gap-2">
                                    <AuthLabel label="Fixed Amount per month*" />
                                    <div className="flex items-center gap-2">
                                        <Controller
                                            name="minimumSalary"
                                            control={createJobForm.control}
                                            render={({
                                                field: { ...field },
                                            }) => (
                                                <AuthNumber
                                                    value={field.value}
                                                    onChange={(
                                                        e: InputNumberChangeEvent
                                                    ) =>
                                                        field.onChange(e.value)
                                                    }
                                                    max={10000000}
                                                    placeholder="Enter here"
                                                    useGrouping={false}
                                                    errorMsg={
                                                        createJobForm.formState
                                                            .errors
                                                            .minimumSalary
                                                    }
                                                />
                                            )}
                                        />
                                        <p className="text-sm font-semibold">
                                            To
                                        </p>
                                        <Controller
                                            name="maximumSalary"
                                            control={createJobForm.control}
                                            render={({
                                                field: { ...field },
                                            }) => (
                                                <AuthNumber
                                                    value={field.value}
                                                    onChange={(
                                                        e: InputNumberChangeEvent
                                                    ) =>
                                                        field.onChange(e.value)
                                                    }
                                                    max={10000000}
                                                    placeholder="Enter here"
                                                    useGrouping={false}
                                                    errorMsg={
                                                        createJobForm.formState
                                                            .errors
                                                            .maximumSalary
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {createJobForm.watch("salary") ===
                                SALARY_TYPE.FIXED_INCENTIVE && (
                                <div className="flex md:flex-row flex-col gap-6 w-full">
                                    <div className="flex flex-col gap-2 md:w-2/3">
                                        <AuthLabel label="Fixed Amount per month*" />
                                        <div className="flex items-center gap-2">
                                            <Controller
                                                name="minimumSalary"
                                                control={createJobForm.control}
                                                render={({
                                                    field: { ...field },
                                                }) => (
                                                    <AuthNumber
                                                        value={field.value}
                                                        onChange={(
                                                            e: InputNumberChangeEvent
                                                        ) =>
                                                            field.onChange(
                                                                e.value
                                                            )
                                                        }
                                                        placeholder="Enter here"
                                                        useGrouping={false}
                                                        errorMsg={
                                                            createJobForm
                                                                .formState
                                                                .errors
                                                                .minimumSalary
                                                        }
                                                    />
                                                )}
                                            />
                                            <p className="text-sm font-semibold">
                                                To
                                            </p>
                                            <Controller
                                                name="maximumSalary"
                                                control={createJobForm.control}
                                                render={({
                                                    field: { ...field },
                                                }) => (
                                                    <AuthNumber
                                                        value={field.value}
                                                        onChange={(
                                                            e: InputNumberChangeEvent
                                                        ) =>
                                                            field.onChange(
                                                                e.value
                                                            )
                                                        }
                                                        placeholder="Enter here"
                                                        useGrouping={false}
                                                        errorMsg={
                                                            createJobForm
                                                                .formState
                                                                .errors
                                                                .maximumSalary
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 md:w-1/3">
                                        <AuthLabel label="Incentive Amount per month" />
                                        <Controller
                                            name="incentiveAmount"
                                            control={createJobForm.control}
                                            render={({
                                                field: { ...field },
                                            }) => (
                                                <AuthNumber
                                                    value={field.value}
                                                    onChange={(
                                                        e: InputNumberChangeEvent
                                                    ) =>
                                                        field.onChange(e.value)
                                                    }
                                                    placeholder="Enter here"
                                                    useGrouping={false}
                                                    errorMsg={
                                                        createJobForm.formState
                                                            .errors
                                                            .incentiveAmount
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {createJobForm.watch("salary") ===
                                SALARY_TYPE.INCENTIVE && (
                                <div className="flex flex-col gap-2">
                                    <AuthLabel label="Incentive Amount per month" />
                                    <Controller
                                        name="incentiveAmount"
                                        control={createJobForm.control}
                                        render={({ field: { ...field } }) => (
                                            <AuthNumber
                                                value={field.value}
                                                onChange={(
                                                    e: InputNumberChangeEvent
                                                ) => field.onChange(e.value)}
                                                placeholder="Enter here"
                                                useGrouping={false}
                                                errorMsg={
                                                    createJobForm.formState
                                                        .errors.incentiveAmount
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            )}

                            {createJobForm.formState.errors.salary && (
                                <small className="w-full text-red-400">
                                    {
                                        createJobForm.formState.errors.salary
                                            .message
                                    }
                                </small>
                            )}
                        </div>
                    )}

                    <div className="md:w-1/2">
                        <Controller
                            name="expiry_date"
                            control={createJobForm.control}
                            render={({ field: { ...field } }) => (
                                <Datepicker
                                    minDate={new Date()}
                                    register={field}
                                    label="Expiry Date*"
                                    dateFormat="dd/mm/yy"
                                    errorMsg={
                                        createJobForm.formState.errors
                                            ?.expiry_date
                                    }
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="bg-white w-full rounded-2xl flex flex-col gap-6 p-4">
                    <Controller
                        name="experience"
                        control={createJobForm.control}
                        render={({ field: { ...field } }) => (
                            <SliderField
                                label="Experience(in years)*"
                                value={field.value ?? 0}
                                onChange={(e) => {
                                    field.onChange(e.value);
                                }}
                            />
                        )}
                    />

                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 md:w-max w-full">
                            <AuthLabel label="Work Model*" />
                            <div className="flex items-center gap-2">
                                <RadioButton
                                    id="onsite"
                                    label="Onsite"
                                    value={WorkModel.onsite}
                                    register={createJobForm.register(
                                        "work_model"
                                    )}
                                />
                                <RadioButton
                                    id="hybrid"
                                    label="Hybrid"
                                    value={WorkModel.hybrid}
                                    register={createJobForm.register(
                                        "work_model"
                                    )}
                                />
                                <RadioButton
                                    id="remote"
                                    label="Remote"
                                    value={WorkModel.remote}
                                    register={createJobForm.register(
                                        "work_model"
                                    )}
                                />
                            </div>
                            {createJobForm.formState.errors.work_model && (
                                <small className="w-full text-red-400">
                                    {
                                        createJobForm.formState.errors
                                            .work_model.message
                                    }
                                </small>
                            )}
                        </div>
                        <Controller
                            name="location"
                            control={createJobForm.control}
                            render={({ field: { ...field } }) => (
                                <SelectField
                                    filter
                                    filterPlaceholder="Search location"
                                    placeholder="Search here"
                                    {...field}
                                    label="Location*"
                                    errorMsg={
                                        createJobForm.formState.errors.location
                                    }
                                    options={cityList?.cities?.map((city) => ({
                                        label: city,
                                        value: city,
                                    }))}
                                    virtualScrollerOptions={{ itemSize: 38 }}
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-max">
                        <AuthLabel label="Gender" />
                        <div className="flex items-center gap-2">
                            <RadioButton
                                id="male"
                                label="Male"
                                value={Gender.male}
                                register={createJobForm.register("gender")}
                            />
                            <RadioButton
                                id="female"
                                label="Female"
                                value={Gender.female}
                                register={createJobForm.register("gender")}
                            />
                            <RadioButton
                                id="both"
                                label="Both"
                                value={Gender.both}
                                register={createJobForm.register("gender")}
                            />
                        </div>
                    </div>

                    <Controller
                        name="required_qualification"
                        control={createJobForm.control}
                        render={({ field: { ...field } }) => (
                            <MultiSelectField
                                {...field}
                                label="Required Qualification*"
                                placeholder="Select here"
                                options={qualificationList?.qualifications?.map(
                                    (qualification) => ({
                                        label: qualification,
                                        value: qualification,
                                    })
                                )}
                                panelHeaderTemplate={<></>}
                                errorMsg={
                                    createJobForm.formState.errors
                                        .required_qualification as FieldError
                                }
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col gap-2 bg-white w-full rounded-2xl p-4">
                    <AuthLabel label="Skills" />

                    <div className="flex flex-col gap-6">
                        {/* Hard Skills */}
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <AuthLabel
                                        labelStyle="font-medium"
                                        label="Hard Skills"
                                    />
                                    <InfoPopup
                                        content={
                                            <p>
                                                Technical or job-specific
                                                abilities (e.g., Python, SEO,
                                                Excel, Data Analysis, AutoCAD,
                                                Machinery Operation, Legal
                                                Research)
                                            </p>
                                        }
                                    />
                                </div>
                                <div className="flex gap-4 w-full">
                                    <AuthInput
                                        value={hardSkillInput}
                                        onChange={(e) => {
                                            setHardSkillInput(e.target.value);
                                        }}
                                        name="hard_skills"
                                        placeholder="Enter here"
                                        errorMsg={
                                            createJobForm.watch("hard_skills")
                                                .length > 0
                                                ? undefined
                                                : (createJobForm.formState
                                                      .errors
                                                      .hard_skills as FieldError)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                if (hardSkillInput === "")
                                                    return;
                                                createJobForm.setValue(
                                                    "hard_skills",
                                                    [
                                                        ...createJobForm.watch(
                                                            "hard_skills"
                                                        ),
                                                        hardSkillInput,
                                                    ]
                                                );
                                                setHardSkillInput("");
                                            }
                                        }}
                                    />

                                    <AuthButton
                                        customStyle="w-1/3 h-fit"
                                        label="Add"
                                        type="button"
                                        onClick={() => {
                                            if (hardSkillInput === "") return;
                                            setHardSkillInput("");
                                            createJobForm.setValue(
                                                "hard_skills",
                                                [
                                                    ...createJobForm.watch(
                                                        "hard_skills"
                                                    ),
                                                    hardSkillInput,
                                                ]
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 my-2">
                                {createJobForm.watch("hard_skills")?.length >
                                0 ? (
                                    createJobForm
                                        .watch("hard_skills")
                                        .map((skill, index) => (
                                            <ChipField
                                                label={skill}
                                                key={index}
                                                removable
                                                onRemove={() => {
                                                    createJobForm.setValue(
                                                        "hard_skills",
                                                        createJobForm
                                                            .watch(
                                                                "hard_skills"
                                                            )
                                                            .filter(
                                                                (item) =>
                                                                    item !==
                                                                    skill
                                                            )
                                                    );
                                                }}
                                            />
                                        ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <AuthLabel
                                        labelStyle="font-medium"
                                        label="Soft Skills"
                                    />
                                    <InfoPopup
                                        content={
                                            <p>
                                                Personal and people-related
                                                traits (e.g., Teamwork,
                                                Communication, Problem Solving,
                                                Empathy, Leadership, Critical
                                                Thinking)
                                            </p>
                                        }
                                    />
                                </div>
                                <div className="flex items-end gap-4">
                                    <AuthInput
                                        value={softSkillInput}
                                        onChange={(e) => {
                                            setSoftSkillInput(e.target.value);
                                        }}
                                        name="soft_skills"
                                        labelStyle="font-medium"
                                        placeholder="Enter here"
                                        errorMsg={
                                            createJobForm.formState.errors
                                                .soft_skills?.[0]
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                if (softSkillInput === "")
                                                    return;
                                                createJobForm.setValue(
                                                    "soft_skills",
                                                    [
                                                        ...createJobForm.watch(
                                                            "soft_skills"
                                                        ),
                                                        softSkillInput,
                                                    ]
                                                );
                                                setSoftSkillInput("");
                                            }
                                        }}
                                    />
                                    <AuthButton
                                        customStyle="w-1/3"
                                        label="Add"
                                        type="button"
                                        onClick={() => {
                                            if (softSkillInput === "") return;
                                            createJobForm.setValue(
                                                "soft_skills",
                                                [
                                                    ...createJobForm.watch(
                                                        "soft_skills"
                                                    ),
                                                    softSkillInput,
                                                ]
                                            );
                                            setSoftSkillInput("");
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 my-2">
                                {createJobForm.watch("soft_skills")?.length >
                                0 ? (
                                    createJobForm
                                        .watch("soft_skills")
                                        .map((skill, index) => (
                                            <ChipField
                                                label={skill}
                                                key={index}
                                                removable
                                                onRemove={() => {
                                                    createJobForm.setValue(
                                                        "soft_skills",
                                                        createJobForm
                                                            .watch(
                                                                "soft_skills"
                                                            )
                                                            .filter(
                                                                (item) =>
                                                                    item !==
                                                                    skill
                                                            )
                                                    );
                                                }}
                                            />
                                        ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white w-full rounded-2xl flex flex-col gap-6 p-4">
                    {/* Languages */}
                    <div className="">
                        <div className="flex md:flex-row flex-col md:items-end md:justify-start justify-end gap-4 w-full">
                            <div className="md:w-2/5 w-full">
                                {/* <AuthInput
                                    value={languageField?.language}
                                    onChange={(e) => {
                                        setLanguageField({
                                            ...languageField,
                                            language: e.target.value,
                                        });
                                    }}
                                    label="Languages"
                                    placeholder="Enter here"
                                    errorMsg={
                                        createJobForm.formState.errors
                                            .languages?.[0]?.language
                                    }
                                /> */}
                                <SelectField
                                    dropdownContainerStyle="w-full"
                                    options={[
                                        "English",
                                        "Hindi",
                                        "Gujarati",
                                        "Bengali",
                                        "Marathi",
                                        "Tamil",
                                        "Telugu",
                                        "Malayalam",
                                        "Kannada",
                                        "Punjabi",
                                    ]}
                                    label="Languages"
                                    placeholder="Select Language"
                                    value={languageField?.language}
                                    onChange={(e) => {
                                        setLanguageField({
                                            ...languageField,
                                            language: e.value,
                                        });
                                    }}
                                    errorMsg={
                                        createJobForm.formState.errors
                                            .languages?.[0]?.language
                                    }
                                />
                            </div>

                            <div className="flex items-end gap-4 md:w-3/5">
                                <SelectField
                                    dropdownContainerStyle="w-full"
                                    options={[
                                        {
                                            label: "Beginner",
                                            value: LanguageProficiency.beginner,
                                        },
                                        {
                                            label: "Intermediate",
                                            value: LanguageProficiency.intermediate,
                                        },
                                        {
                                            label: "Proficient",
                                            value: LanguageProficiency.proficient,
                                        },
                                    ]}
                                    placeholder="Select Type"
                                    value={languageField?.proficiency}
                                    onChange={(e) => {
                                        setLanguageField({
                                            ...languageField,
                                            proficiency: e.value,
                                        });
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            if (
                                                !languageField.language ||
                                                !languageField.proficiency
                                            )
                                                return;
                                            languageFieldArray.append(
                                                languageField
                                            );
                                            setLanguageField({
                                                language: "",
                                                proficiency: "",
                                            });
                                        }
                                    }}
                                    errorMsg={
                                        createJobForm.formState.errors
                                            .languages?.[0]?.proficiency
                                    }
                                />

                                <AuthButton
                                    customStyle="md:w-3/4 w-1/3"
                                    label="Add"
                                    type="button"
                                    onClick={() => {
                                        if (
                                            !languageField.language ||
                                            !languageField.proficiency
                                        )
                                            return;
                                        languageFieldArray.append(
                                            languageField
                                        );
                                        setLanguageField({
                                            language: "",
                                            proficiency: "",
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 my-2">
                            {languageFieldArray?.fields?.length > 0 ? (
                                languageFieldArray.fields.map(
                                    (skill, index) => (
                                        <ChipField
                                            label={`${skill?.language}: ${
                                                skill?.proficiency
                                                    ?.charAt(0)
                                                    ?.toUpperCase() +
                                                skill?.proficiency
                                                    ?.slice(1)
                                                    ?.toLowerCase()
                                            }`}
                                            key={index}
                                            removable
                                            onRemove={() =>
                                                languageFieldArray.remove(index)
                                            }
                                        />
                                    )
                                )
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    {/* Additional Perks */}
                    <div className="">
                        <div className="flex items-end gap-4">
                            <AuthInput
                                value={additionalPerkInput}
                                onChange={(e) => {
                                    setAdditionalPerkInput(e.target.value);
                                }}
                                label="Additional Perk"
                                placeholder="Enter here"
                                errorMsg={
                                    createJobForm.formState.errors
                                        .additional_perks?.[0]
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (additionalPerkInput === "") return;
                                        createJobForm.setValue(
                                            "additional_perks",
                                            [
                                                ...createJobForm.watch(
                                                    "additional_perks"
                                                ),
                                                additionalPerkInput,
                                            ]
                                        );
                                        setAdditionalPerkInput("");
                                    }
                                }}
                            />

                            <AuthButton
                                customStyle="w-1/3"
                                label="Add"
                                type="button"
                                onClick={() => {
                                    if (additionalPerkInput === "") return;
                                    createJobForm.setValue("additional_perks", [
                                        ...createJobForm.watch(
                                            "additional_perks"
                                        ),
                                        additionalPerkInput,
                                    ]);
                                    setAdditionalPerkInput("");
                                }}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 my-2">
                            {createJobForm.watch("additional_perks")?.length >
                            0 ? (
                                createJobForm
                                    .watch("additional_perks")
                                    .map((skill, index) => (
                                        <ChipField
                                            label={skill}
                                            key={index}
                                            removable
                                            onRemove={() => {
                                                createJobForm.setValue(
                                                    "additional_perks",
                                                    createJobForm
                                                        .watch(
                                                            "additional_perks"
                                                        )
                                                        .filter(
                                                            (item) =>
                                                                item !== skill
                                                        )
                                                );
                                            }}
                                        />
                                    ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <AuthButton
                            type="button"
                            disabled={isJDLoading}
                            customStyle="w-3/5"
                            onClick={createJobForm.handleSubmit(onSubmit)}
                        >
                            {isJDLoading ? (
                                <ButtonLoader isVisible={isJDLoading} />
                            ) : id ? (
                                "Update"
                            ) : (
                                "Preview"
                            )}
                        </AuthButton>
                    </div>
                </div>
            </form>

            <div className="flex flex-col gap-2 bg-white border border-[#E7E7E7] rounded-2xl p-4 lg:w-8/12 lg:max-w-8/12 max-h-full lg:h-fit">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Job Description</h1>
                    <Controller
                        control={createJobForm.control}
                        name="description"
                        render={({ field }) => (
                            <EditorField
                                value={field.value}
                                onTextChange={(
                                    value: EditorTextChangeEvent
                                ) => {
                                    if (!value.htmlValue) return;
                                    field.onChange(value.htmlValue);
                                }}
                                isLoading={isJDLoading}
                            />
                        )}
                    />
                </div>
                {!isJDLoading &&
                    !createJobForm.watch("description") &&
                    createJobForm.formState.errors.description && (
                        <small className="w-full text-red-400">
                            {
                                createJobForm.formState.errors.description
                                    ?.message
                            }
                        </small>
                    )}
                {!isJDLoading && (
                    <AuthButton
                        customStyle="text-sm w-1/3 shrink-0"
                        type="button"
                        disabled={
                            createJobForm.watch("generatedJobDescription") ||
                            isJDLoading
                        }
                        onClick={async () => {
                            await createJobForm.trigger([
                                "job_title",
                                "job_type",
                                "vacancy",
                                "salary",
                                "minimumSalary",
                                "maximumSalary",
                                "incentiveAmount",
                                "expiry_date",
                                "experience",
                                "work_model",
                                "location",
                                "gender",
                                "required_qualification",
                            ]);

                            if (
                                createJobForm.formState.errors.job_title ||
                                createJobForm.formState.errors.job_type ||
                                createJobForm.formState.errors.vacancy ||
                                createJobForm.formState.errors.salary ||
                                createJobForm.formState.errors.expiry_date ||
                                createJobForm.formState.errors.work_model ||
                                createJobForm.formState.errors.location ||
                                createJobForm.formState.errors.gender ||
                                createJobForm.formState.errors
                                    .required_qualification
                            )
                                return;
                            await generateAIJobDescription();
                        }}
                    >
                        {isJDLoading ? (
                            <ButtonLoader isVisible={true} />
                        ) : (
                            "Generete by AI"
                        )}
                    </AuthButton>
                )}
            </div>
        </div>
    );
};

export default CreateJob;
