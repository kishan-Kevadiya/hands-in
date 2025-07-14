import { Resume1, Resume2, Resume3, Resume4, Resume5 } from "@/assets/images";
import MailIcon from "@/assets/svg/MailIcon";
import FileUpload from "@/assets/svg/file-upload.svg";
import LocationIcon from "@/assets/svg/jobs/LocationIcon";
import Star from "@/assets/svg/preassessment-modal/Star";
import DeleteIcon from "@/assets/svg/profile/DeleteIcon";
import CustomizeIcon from "@/assets/svg/resume/CustomizeIcon";
import DownloadIcon from "@/assets/svg/resume/DownloadIcon";
import PhoneIcon from "@/assets/svg/support/call.svg";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthTextArea from "@/components/ui/auth/AuthTextArea";
import ChipField from "@/components/ui/auth/ChipFiled";
import Datepicker from "@/components/ui/auth/Datepicker";
import SecondaryButton from "@/components/ui/auth/SecondaryButton";
import SelectField from "@/components/ui/auth/SelectField";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import CustomPDFViewer from "@/components/ui/customPDFViewer/CustomPDFViewer";
import InfoPopup from "@/components/ui/infoPopup/InfoPopup";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import Loader from "@/components/ui/loader/Loader";
import { getProfile } from "@/helpers/apis/profile";
import {
    createResume,
    getResume,
    getResumePdfLink,
} from "@/helpers/apis/resume";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import {
    GetQualificationListResponse,
    JobType,
    LanguageProficiency,
} from "@/types/jobs.types";
import {
    resumeEducationField,
    resumeExperienceField,
    resumeSetupField,
    resumeSetupSchema,
    ResumeTemplateType,
} from "@/types/resumeSetupField.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";
import {
    Controller,
    FieldError,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const resumeTemplateImages = {
    [ResumeTemplateType.resume1]: Resume1,
    [ResumeTemplateType.resume2]: Resume2,
    [ResumeTemplateType.resume3]: Resume3,
    [ResumeTemplateType.resume4]: Resume4,
    [ResumeTemplateType.resume5]: Resume5,
};

const Resume: React.FC = () => {
    const queryClient = useQueryClient();
    let qualificationList =
        queryClient.getQueryData<GetQualificationListResponse>([
            USE_QUERY_KEYS.GET_QUALIFICATIONS,
        ]);
    if (!qualificationList && undefined) {
        qualificationList = localStorage.getItem("qualifications")
            ? JSON.parse(localStorage.getItem("qualifications") as string)
            : [];
    }

    const [customizeResume, setCustomizeResume] = useState(false);

    const resumeCreateForm = useForm<resumeSetupField>({
        defaultValues: {
            image: null,
            linkedinUrl: "",
            portfolioUrl: "",
            otherUrl: "",
            soft_skills: [],
            hard_skills: [],
            languages: [],
        },
        mode: "all",
        resolver: zodResolver(resumeSetupSchema),
    });

    const resumeEducationForm = useForm<resumeEducationField>({
        defaultValues: {
            educations: {
                schoolName: "",
                degreeType: "",
                course: "",
            },
        },
    });

    const resumeExperienceForm = useForm<resumeExperienceField>({
        defaultValues: {
            experiences: {
                jobTitle: "",
                jobDescription: "",
                companyName: "",
            },
        },
    });

    const imageWatcher = resumeCreateForm.watch("image");
    const [educationData, setEducationData] = useState<
        resumeEducationField["educations"][]
    >([]);
    const [experienceData, setExperienceData] = useState<
        resumeExperienceField["experiences"][]
    >([]);
    const [softSkillInput, setSoftSkillInput] = useState<string>("");
    const [hardSkillInput, setHardSkillInput] = useState<string>("");
    const [selectedResume, setSelectedResume] = useState<ResumeTemplateType>(
        ResumeTemplateType.resume1
    );
    const [isLoading, setIsLoading] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);

    const [languageField, setLanguageField] = useState<{
        language: string;
        level: string;
    }>({
        language: "",
        level: "",
    });

    const languageFieldArray = useFieldArray({
        control: resumeCreateForm.control,
        name: "languages",
    });

    /* get resume */
    const ResumeDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_RESUME],
        queryFn: async () => await getResume(),
    });

    /* get profile */
    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
        enabled: !ResumeDetails.data,
    });

    const refetchResume = () => {
        queryClient.invalidateQueries({
            queryKey: [USE_QUERY_KEYS.GET_RESUME],
        });
    };

    const resumeLink = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_RESUME_LINK],
        queryFn: async () => await getResumePdfLink(),
    });

    const refetchResumeLink = () => {
        queryClient.invalidateQueries({
            queryKey: [USE_QUERY_KEYS.GET_RESUME_LINK],
        });
    };

    const onSubmit = async (data: resumeSetupField) => {
        if (educationData.length === 0)
            return showToast(
                "error",
                "Please add at least one education and experience"
            );

        if (!selectedResume) {
            return showToast("error", "Please select a resume template");
        }

        setIsLoading(true);

        try {
            const formData = new FormData();

            if (data.id) {
                formData.append("resumeId", data.id);
            }

            if (ProfileDetails.data?.user.avatar && !data.image) {
                formData.append(
                    "profileImageId",
                    ProfileDetails.data?.user.avatar instanceof File
                        ? ProfileDetails.data?.user.avatar
                        : ProfileDetails.data?.user.avatar.id
                );
            }

            formData.append(
                "image",
                data.image instanceof File ? data.image : new File([], "")
            );

            formData.append(
                "name",
                ProfileDetails.data?.user.firstName +
                " " +
                ProfileDetails.data?.user.lastName
            );
            formData.append("title", ProfileDetails.data?.user.bio ?? "");
            formData.append("email", ProfileDetails.data?.user.email ?? "");
            formData.append("location", ProfileDetails.data?.user.city ?? "");
            formData.append("phone", ProfileDetails.data?.user.phone ?? "");
            formData.append("templateType", selectedResume ?? "");
            formData.append("linkedIn", data.linkedinUrl || "");
            formData.append("portfolioLink", data.portfolioUrl || "");
            formData.append("otherLink", data.otherUrl ?? "");

            educationData?.map((education, index) => {
                formData.append(
                    `educations[${index}][school]`,
                    education.schoolName
                );
                formData.append(
                    `educations[${index}][degree]`,
                    education.degreeType
                );
                formData.append(
                    `educations[${index}][major]`,
                    education.course
                );
                formData.append(
                    `educations[${index}][startDate]`,
                    moment(education.start_date).format("YYYY-MM-DD")
                );
                if (!education.isPresent) {
                    formData.append(
                        `educations[${index}][endDate]`,
                        moment(education.end_date).format("YYYY-MM-DD")
                    );
                }
            });

            experienceData?.forEach((experience, index) => {
                formData.append(
                    `experiences[${index}][jobTitle]`,
                    experience.jobTitle
                );
                formData.append(
                    `experiences[${index}][jobDescription]`,
                    experience.jobDescription
                );
                formData.append(
                    `experiences[${index}][company]`,
                    experience.companyName
                );
                formData.append(
                    `experiences[${index}][jobType]`,
                    experience.jobType as JobType
                );
                formData.append(
                    `experiences[${index}][startDate]`,
                    moment(experience.start_experience_date).format(
                        "YYYY-MM-DD"
                    )
                );
                if (!experience.isCurrentlyWorking) {
                    formData.append(
                        `experiences[${index}][endDate]`,
                        moment(experience.end_experience_date).format(
                            "YYYY-MM-DD"
                        )
                    );
                }
            });

            data.soft_skills?.map((skill, index) => {
                formData.append(`softSkills[${index}]`, skill);
            });

            data.hard_skills?.map((skill, index) => {
                formData.append(`hardSkills[${index}]`, skill);
            });

            data.languages?.map((language, index) => {
                formData.append(
                    `languages[${index}][language]`,
                    language.language
                );
                formData.append(
                    `languages[${index}][proficiency]`,
                    language.level
                );
            });

            const response = await createResume(formData);

            if (response) {
                showToast("success", response.message);
                refetchResume();
                refetchResumeLink();
                setCustomizeResume(false);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    /* download resume */
    const downloadResume = async () => {
        try {
            const response = await getResumePdfLink();
            const link = document.createElement("a");
            link.href = response ?? "";
            link.download = `${ResumeDetails.data?.resumeData.name}.pdf`;
            link.click();
        } catch (error) {
            console.error(error);
        }
    };

    /* fetch resume */
    useEffect(() => {
        if (!ResumeDetails.isLoading && ResumeDetails.data) {
            setSelectedResume(ResumeDetails.data?.resumeData?.templateType);

            resumeCreateForm.setValue("id", ResumeDetails.data?.resumeData?.id);
            if (ResumeDetails.data?.resumeData?.image) {
                resumeCreateForm.setValue(
                    "image",
                    ResumeDetails.data?.resumeData?.image || null
                );
            }
            resumeCreateForm.setValue(
                "linkedinUrl",
                ResumeDetails.data?.resumeData?.linkedIn || ""
            );
            resumeCreateForm.setValue(
                "portfolioUrl",
                ResumeDetails.data?.resumeData?.portfolioLink || ""
            );
            resumeCreateForm.setValue(
                "otherUrl",
                ResumeDetails.data?.resumeData?.otherLink || ""
            );

            const educations = ResumeDetails.data?.resumeData?.educations?.map(
                (education) => ({
                    id: uuidv4(),
                    schoolName: education?.school,
                    degreeType: education?.degree,
                    course: education?.major,
                    start_date: new Date(education?.startDate),
                    end_date: new Date(education?.endDate),
                    isPresent: !education?.endDate ? true : false,
                })
            );

            setEducationData(educations);

            const experiences =
                ResumeDetails.data?.resumeData?.experiences?.map(
                    (experience) => ({
                        id: uuidv4(),
                        jobTitle: experience?.jobTitle,
                        jobDescription: experience?.jobDescription ?? "",
                        companyName: experience?.company,
                        jobType: experience?.jobType,
                        start_experience_date: new Date(experience?.startDate),
                        end_experience_date: new Date(experience?.endDate),
                        isCurrentlyWorking: !experience?.endDate ? true : false,
                    })
                );

            setExperienceData(experiences);

            resumeCreateForm.setValue(
                "soft_skills",
                ResumeDetails.data?.resumeData?.softSkills || []
            );
            resumeCreateForm.setValue(
                "hard_skills",
                ResumeDetails.data?.resumeData?.hardSkills || []
            );

            const languages = ResumeDetails.data?.resumeData?.languages?.map(
                (language) => ({
                    language: language.language,
                    level: language.proficiency,
                })
            );
            resumeCreateForm.setValue("languages", languages || []);
        } else if (!ProfileDetails.isLoading && ProfileDetails.data) {
            if (ProfileDetails.data.user.avatar) {
                resumeCreateForm.setValue(
                    "image",
                    ProfileDetails.data.user.avatar || null
                );
            }
            resumeCreateForm.setValue(
                "linkedinUrl",
                ProfileDetails.data.user.linkedIn || ""
            );

            const educations = ProfileDetails?.data?.educations?.map(
                (education) => ({
                    id: education?.id,
                    schoolName: education?.instituteName,
                    degreeType: education?.degreeType,
                    course: education?.course,
                    start_date: new Date(education?.startYear),
                    end_date: new Date(education?.endYear ?? new Date()),
                    isPresent: !education?.endYear ? true : false,
                })
            );

            setEducationData(educations);

            const experiences = ProfileDetails?.data?.workExperiences?.map(
                (experience) => ({
                    id: experience?.id,
                    jobTitle: experience?.jobTitle,
                    jobDescription: experience?.jobDescription ?? "",
                    companyName: experience?.companyName,
                    jobType: experience?.jobType,
                    start_experience_date: new Date(experience?.startYear),
                    end_experience_date: new Date(
                        experience?.endYear ?? new Date()
                    ),
                    isCurrentlyWorking: !experience?.endYear ? true : false,
                })
            );

            setExperienceData(experiences);
        } else {
            resumeCreateForm.reset();
            setEducationData([]);
            setExperienceData([]);
        }
    }, [ProfileDetails.data, ResumeDetails.data]);

    return (
        <div className="flex flex-col w-full gap-6">
            <div className="flex md:flex-row flex-col md:justify-between justify-end md:items-center items-end md:gap-0 gap-4">
                <div className="flex flex-col md:gap-2 gap-1 w-full">
                    <h1 className="md:text-3xl text-2xl text-black font-semibold">
                        Crafted{" "}
                        <span className="bg-gradient-to-r from-[#3F1562] to-70% to-primary bg-clip-text text-transparent">
                            Resumes
                        </span>{" "}
                        by HeadsIn
                    </h1>

                    <p className="text-base text-black font-semibold gap-2 inline-flex items-center">
                        <small className="text-lg text-primary font-semibold">
                            Enhance your job success rate by 60%
                        </small>
                        <span>
                            <Star />
                        </span>
                    </p>
                </div>

                {ResumeDetails.data &&
                    (customizeResume ? (
                        <div>
                            <AuthButton
                                customStyle="gap-2 px-4"
                                label="Preview"
                                type="button"
                                onClick={() => setCustomizeResume(false)}
                            />
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <AuthButton
                                customStyle="gap-2 px-4"
                                icon={<CustomizeIcon />}
                                label="Customize"
                                type="button"
                                onClick={() => setCustomizeResume(true)}
                            />
                            <AuthButton
                                customStyle="gap-2 px-4"
                                icon={<DownloadIcon />}
                                label="Download"
                                type="button"
                                onClick={() => downloadResume()}
                            />
                        </div>
                    ))}
            </div>

            {ResumeDetails.isLoading ? (
                <Loader isVisible={ResumeDetails.isLoading} />
            ) : !ResumeDetails.data || customizeResume ? (
                <form onSubmit={resumeCreateForm.handleSubmit(onSubmit)} className="flex flex-col bg-[#FFF1F5] h-full p-2 rounded-2xl rounded-tr-2xl w-full gap-8 lg:p-4">
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl text-primary font-semibold">
                            Personalize Your Resume Layout
                        </p>

                        <div className="grid grid-cols-5 w-full gap-4">
                            {[
                                ResumeTemplateType.resume1,
                                ResumeTemplateType.resume2,
                                ResumeTemplateType.resume3,
                                ResumeTemplateType.resume4,
                                ResumeTemplateType.resume5,
                            ]?.map((templateType) => (
                                <div
                                    key={templateType}
                                    className="border-[#DEDEDE] border-2 rounded-lg w-full cursor-pointer relative bg-center bg-cover bg-white aspect-[0.71]"
                                    onClick={() =>
                                        setSelectedResume(templateType)
                                    }
                                    style={{
                                        backgroundImage: `url(${resumeTemplateImages[templateType]})`,
                                    }}
                                >
                                    {selectedResume === templateType && (
                                        <div className="absolute bottom-2 right-2">
                                            <Checkbox
                                                pt={{
                                                    root: {
                                                        className: "!w-6 !h-6",
                                                    },
                                                    box: {
                                                        className:
                                                            "!w-6 !h-6 rounded-md border-primary bg-transparent",
                                                    },
                                                    icon: {
                                                        className:
                                                            "w-full h-full bg-primary",
                                                    },
                                                }}
                                                checked={
                                                    selectedResume ===
                                                    templateType
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-2xl text-primary font-semibold pb-4">
                            Resume Details
                        </p>
                        <div className="flex flex-col gap-10">
                            {/* image */}
                            <div className="flex gap-4 items-center">
                                <label
                                    htmlFor="image-upload"
                                    className="h-25 rounded-full w-25 cursor-pointer group relative"
                                >
                                    {(() => {
                                        let imageSrc: string | undefined;
                                        if (imageWatcher instanceof File) {
                                            imageSrc = imageWatcher.size > 0 ? URL.createObjectURL(imageWatcher) : undefined;
                                        } else if (imageWatcher && imageWatcher.url) {
                                            imageSrc = imageWatcher.url || undefined;
                                        }
                                        return imageSrc ? (
                                            <>
                                                <img
                                                    src={imageSrc}
                                                    alt="No Image"
                                                    className="bg-[#F7FAFF] h-full rounded-full w-full object-cover"
                                                />
                                                <div className="flex bg-black/50 justify-center rounded-full absolute duration-200 group-hover:opacity-80 inset-0 items-center opacity-0 transition-opacity">
                                                    <i className="h-5 text-white w-5 pi pi-pen-to-square" />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex bg-white border-2 border-dashed border-gray-300 h-full justify-center rounded-full w-full items-center">
                                                <img
                                                    alt="No Image"
                                                    src={FileUpload}
                                                    className="h-8 text-gray-400 w-8"
                                                />
                                            </div>
                                        );
                                    })()}
                                    <input
                                        id="image-upload"
                                        type="file"
                                        {...resumeCreateForm.register("image")}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file?.size > 1000000) {
                                                    showToast(
                                                        "warning",
                                                        "File too large"
                                                    );
                                                    return;
                                                }
                                                resumeCreateForm.setValue(
                                                    "image",
                                                    file
                                                );
                                            }
                                        }}
                                    />
                                </label>

                                <div className="flex flex-col gap-4">
                                    <p className="text-lg font-medium">
                                        Upload image
                                    </p>
                                </div>
                            </div>

                            <div className="text-black w-full">
                                <h3 className="text-3xl font-semibold line-clamp-2 pb-1 break-words">
                                    {ProfileDetails.data?.user?.firstName}{" "}
                                    {ProfileDetails.data?.user?.lastName}
                                </h3>
                                <small className="text-lg font-medium break-words">
                                    {ProfileDetails.data?.user?.bio}
                                </small>
                            </div>

                            <div className="flex flex-wrap justify-start text-base text-black gap-4 items-center lg:gap-6">
                                {ProfileDetails.data?.user?.email && (
                                    <div className="flex gap-2 items-center">
                                        <div className="flex bg-white border border-[#868686] h-10 justify-center rounded-full w-10 items-center">
                                            <MailIcon
                                                stroke="none"
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                        <p>
                                            {ProfileDetails.data?.user?.email}
                                        </p>
                                    </div>
                                )}
                                {ProfileDetails.data?.user?.city && (
                                    <div className="flex gap-2 items-center">
                                        <div className="flex bg-white border border-[#868686] h-10 justify-center p-2.5 rounded-full w-10 items-center">
                                            <LocationIcon />
                                        </div>
                                        <p className="break-words">
                                            {ProfileDetails.data?.user?.city}
                                        </p>
                                    </div>
                                )}
                                {ProfileDetails.data?.user?.phone && (
                                    <div className="flex gap-2 items-center">
                                        <div className="flex h-10 justify-center w-10 items-center">
                                            <div className="flex bg-white border border-[#868686] h-10 justify-center p-2.5 rounded-full w-10 items-center">
                                                <img
                                                    src={PhoneIcon}
                                                    alt="phone"
                                                    className="h-full w-full aspect-square"
                                                />
                                            </div>
                                        </div>
                                        <p>
                                            {ProfileDetails.data?.user?.phone}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 md:flex-row">
                                <AuthInput
                                    register={resumeCreateForm.register(
                                        "linkedinUrl"
                                    )}
                                    label="LinkdIn Url"
                                    placeholder="Enter here"
                                    errorMsg={
                                        resumeCreateForm.formState.errors
                                            .linkedinUrl
                                    }
                                />

                                <AuthInput
                                    register={resumeCreateForm.register(
                                        "portfolioUrl"
                                    )}
                                    label="Portfolio Link"
                                    placeholder="Enter here"
                                    errorMsg={
                                        resumeCreateForm.formState.errors
                                            .portfolioUrl
                                    }
                                />

                                <AuthInput
                                    register={resumeCreateForm.register(
                                        "otherUrl"
                                    )}
                                    label="Other Url"
                                    placeholder="Enter here"
                                    errorMsg={
                                        resumeCreateForm.formState.errors
                                            .otherUrl
                                    }
                                />
                            </div>

                            <div className="flex flex-col w-full gap-10">
                                <div className="flex flex-col w-full gap-10">
                                    {/* Education */}
                                    <div className="flex gap-2 items-start">
                                        <div className="flex flex-col w-full gap-2">
                                            <h3 className="text-2xl font-semibold">
                                                Education
                                            </h3>

                                            {educationData.map(
                                                (education, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full"
                                                    >
                                                        <div className="flex text-xl w-full font-semibold gap-6 mb-2">
                                                            <h3 className="break-words max-w-11/12 truncate">
                                                                {" "}
                                                                {
                                                                    education?.schoolName
                                                                }
                                                            </h3>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setEducationData(
                                                                        educationData.filter(
                                                                            (
                                                                                edu
                                                                            ) =>
                                                                                edu?.id !==
                                                                                education?.id
                                                                        )
                                                                    )
                                                                }
                                                                className="flex bg-white border border-[#DFDFDF] h-8 justify-center rounded-full w-8 cursor-pointer items-center"
                                                            >
                                                                <DeleteIcon color="#FF4F4F" />
                                                            </button>
                                                        </div>
                                                        <p className="mb-2">
                                                            {
                                                                education?.degreeType
                                                            }{" "}
                                                            -{" "}
                                                            {education?.course}
                                                        </p>
                                                        <p className="font-semibold mb-2">
                                                            {moment(
                                                                education?.start_date?.toString()
                                                            ).format(
                                                                "MMMM, YYYY"
                                                            )}{" "}
                                                            -{" "}
                                                            {education?.isPresent
                                                                ? "Present"
                                                                : moment(
                                                                    education?.end_date?.toString()
                                                                ).format(
                                                                    "MMMM, YYYY"
                                                                )}
                                                        </p>
                                                    </div>
                                                )
                                            )}

                                            {showEducationForm && (
                                                <div className="flex flex-col gap-2 lg:w-2/4">
                                                    <AuthInput
                                                        register={resumeEducationForm.register(
                                                            `educations.schoolName`
                                                        )}
                                                        placeholder="School Name"
                                                        errorMsg={
                                                            resumeEducationForm
                                                                .formState
                                                                .errors
                                                                .educations
                                                                ?.schoolName
                                                        }
                                                    />

                                                    <Controller
                                                        control={
                                                            resumeEducationForm.control
                                                        }
                                                        name={`educations.degreeType`}
                                                        render={({ field }) => (
                                                            <SelectField
                                                                {...field}
                                                                placeholder="Select here"
                                                                options={
                                                                    qualificationList?.qualifications?.map(
                                                                        (
                                                                            qualification
                                                                        ) => ({
                                                                            label: qualification,
                                                                            value: qualification,
                                                                        })
                                                                    ) || []
                                                                }
                                                                errorMsg={
                                                                    resumeEducationForm
                                                                        .formState
                                                                        .errors
                                                                        .educations
                                                                        ?.degreeType
                                                                }
                                                            />
                                                        )}
                                                    />

                                                    <AuthInput
                                                        register={resumeEducationForm.register(
                                                            `educations.course`
                                                        )}
                                                        placeholder="Course"
                                                        errorMsg={
                                                            resumeEducationForm
                                                                .formState
                                                                .errors
                                                                .educations
                                                                ?.course
                                                        }
                                                    />

                                                    <div className="flex flex-col w-full gap-2 lg:flex-row">
                                                        <div className="w-full">
                                                            <Controller
                                                                name={`educations.start_date`}
                                                                control={
                                                                    resumeEducationForm.control
                                                                }
                                                                render={({
                                                                    field: {
                                                                        ...field
                                                                    },
                                                                }) => (
                                                                    <Datepicker
                                                                        maxDate={
                                                                            new Date()
                                                                        }
                                                                        register={
                                                                            field
                                                                        }
                                                                        placeholder="Start Date"
                                                                        dateFormat="dd/mm/yy"
                                                                        value={
                                                                            field.value
                                                                        }
                                                                        className="w-full"
                                                                        errorMsg={
                                                                            resumeEducationForm
                                                                                .formState
                                                                                .errors
                                                                                .educations
                                                                                ?.start_date ||
                                                                            (resumeEducationForm
                                                                                .formState
                                                                                .errors
                                                                                .educations as FieldError)
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col w-full">
                                                            <div className="w-full">
                                                                <Controller
                                                                    name={`educations.end_date`}
                                                                    control={
                                                                        resumeEducationForm.control
                                                                    }
                                                                    render={({
                                                                        field: {
                                                                            ...field
                                                                        },
                                                                    }) => (
                                                                        <Datepicker
                                                                            minDate={
                                                                                resumeEducationForm.watch(
                                                                                    "educations"
                                                                                )
                                                                                    ?.start_date
                                                                            }
                                                                            register={
                                                                                field
                                                                            }
                                                                            placeholder="End Date"
                                                                            dateFormat="dd/mm/yy"
                                                                            value={
                                                                                field.value
                                                                            }
                                                                            disabled={resumeEducationForm.watch(
                                                                                "educations.isPresent"
                                                                            )}
                                                                            className="w-full"
                                                                            errorMsg={
                                                                                resumeEducationForm
                                                                                    .formState
                                                                                    .errors
                                                                                    .educations
                                                                                    ?.end_date
                                                                            }
                                                                        />
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm font-medium text-black mt-4">
                                                                <Checkbox
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
                                                                    onClick={() => {
                                                                        resumeEducationForm.setValue(
                                                                            `educations.isPresent`,
                                                                            !resumeEducationForm.watch(
                                                                                `educations.isPresent`
                                                                            )
                                                                        );
                                                                    }}
                                                                    checked={resumeEducationForm.watch(
                                                                        `educations.isPresent`
                                                                    )}
                                                                />
                                                                Present
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <PrimaryButton
                                                    label={showEducationForm ? 'Save' : "+ Add Education"}
                                                    type="button"
                                                    onClick={async () => {
                                                        if (!showEducationForm)
                                                            setShowEducationForm(
                                                                true
                                                            );
                                                        else {
                                                            const educationValues =
                                                                resumeEducationForm.getValues(
                                                                    "educations"
                                                                );
                                                            if (
                                                                !educationValues.schoolName ||
                                                                !educationValues.degreeType ||
                                                                !educationValues.course
                                                            )
                                                                return;
                                                            setEducationData([
                                                                ...educationData,
                                                                {
                                                                    ...resumeEducationForm.getValues(
                                                                        "educations"
                                                                    ),
                                                                    id: uuidv4(),
                                                                },
                                                            ]);
                                                            setShowEducationForm(
                                                                false
                                                            );
                                                            resumeEducationForm.reset(
                                                                {
                                                                    educations: {
                                                                        schoolName:
                                                                            "",
                                                                        degreeType:
                                                                            "",
                                                                        course: "",
                                                                        start_date:
                                                                            new Date(),
                                                                        end_date:
                                                                            new Date(),
                                                                    },
                                                                }
                                                            );
                                                        }
                                                    }}
                                                    labelStyle="text-black font-semibold"
                                                    className="bg-[#FFDAE5] w-fit gap-3 mb-4 px-3 py-3"
                                                />

                                                {showEducationForm && (
                                                    <SecondaryButton label="Cancel"
                                                        className="bg-[#FFDAE5] mb-4 !w-[6rem]" onClick={() => setShowEducationForm(false)} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div className="flex-col">
                                        <div className="flex text-2xl font-semibold gap-2 items-center mb-4">
                                            <h3>Experience</h3>
                                        </div>

                                        <div className="flex gap-2">
                                            <div className="flex flex-col w-full gap-2">
                                                {experienceData?.map(
                                                    (experience, index) => (
                                                        <div
                                                            className="flex gap-2 items-start"
                                                            key={index}
                                                        >
                                                            <div className="h-6 w-6 aspect-square"></div>
                                                            <div className="w-full">
                                                                <div className="flex text-xl font-semibold gap-2 items-center mb-2">
                                                                    <h3 className="break-words max-w-11/12 truncate">
                                                                        {
                                                                            experience?.companyName
                                                                        }
                                                                    </h3>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            setExperienceData(
                                                                                experienceData.filter(
                                                                                    (
                                                                                        _,
                                                                                        i
                                                                                    ) =>
                                                                                        i !==
                                                                                        index
                                                                                )
                                                                            )
                                                                        }
                                                                        className="flex bg-white border border-[#DFDFDF] h-8 justify-center rounded-full w-8 cursor-pointer items-center"
                                                                    >
                                                                        <DeleteIcon color="#FF4F4F" />
                                                                    </button>
                                                                </div>
                                                                <p className="mb-2">
                                                                    {
                                                                        experience?.jobTitle
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        experience?.jobType
                                                                    }
                                                                </p>
                                                                <p className="font-semibold mb-2">
                                                                    {moment(
                                                                        experience?.start_experience_date?.toString()
                                                                    ).format(
                                                                        "MMMM, YYYY"
                                                                    )}{" "}
                                                                    -{" "}
                                                                    {experience?.isCurrentlyWorking
                                                                        ? "Present"
                                                                        : moment(
                                                                            experience?.end_experience_date?.toString()
                                                                        ).format(
                                                                            "MMMM, YYYY"
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}

                                                {showExperienceForm && (
                                                    <div className="flex flex-col gap-2 lg:w-2/4">
                                                        <AuthInput
                                                            register={resumeExperienceForm.register(
                                                                `experiences.jobTitle`
                                                            )}
                                                            placeholder="Job Title"
                                                            errorMsg={
                                                                resumeExperienceForm
                                                                    .formState
                                                                    .errors
                                                                    .experiences
                                                                    ?.jobTitle
                                                            }
                                                        />
                                                        <AuthTextArea
                                                            register={resumeExperienceForm.register(
                                                                `experiences.jobDescription`
                                                            )}
                                                            rows={3}
                                                            placeholder="Enter here"
                                                            errorMsg={
                                                                resumeExperienceForm
                                                                    .formState
                                                                    .errors
                                                                    .experiences
                                                                    ?.jobDescription
                                                            }
                                                        />
                                                        <AuthInput
                                                            register={resumeExperienceForm.register(
                                                                `experiences.companyName`
                                                            )}
                                                            placeholder="Company Name"
                                                            errorMsg={
                                                                resumeExperienceForm
                                                                    .formState
                                                                    .errors
                                                                    .experiences
                                                                    ?.companyName
                                                            }
                                                        />

                                                        <Controller
                                                            control={
                                                                resumeExperienceForm.control
                                                            }
                                                            name={`experiences.jobType`}
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <SelectField
                                                                    {...field}
                                                                    placeholder="Select here"
                                                                    options={[
                                                                        {
                                                                            label: "Full Time",
                                                                            value: JobType.fulltime,
                                                                        },
                                                                        {
                                                                            label: "Part Time",
                                                                            value: JobType.parttime,
                                                                        },
                                                                        {
                                                                            label: "Contract",
                                                                            value: JobType.contract,
                                                                        },
                                                                    ]}
                                                                    errorMsg={
                                                                        resumeExperienceForm
                                                                            .formState
                                                                            .errors
                                                                            .experiences
                                                                            ?.jobType
                                                                    }
                                                                />
                                                            )}
                                                        />

                                                        <div className="flex flex-col w-full gap-2 lg:flex-row">
                                                            <div className="w-full">
                                                                <Controller
                                                                    name={`experiences.start_experience_date`}
                                                                    control={
                                                                        resumeExperienceForm.control
                                                                    }
                                                                    render={({
                                                                        field: {
                                                                            ...field
                                                                        },
                                                                    }) => (
                                                                        <Datepicker
                                                                            maxDate={
                                                                                new Date()
                                                                            }
                                                                            register={
                                                                                field
                                                                            }
                                                                            placeholder="Start Date"
                                                                            dateFormat="dd/mm/yy"
                                                                            value={
                                                                                field.value
                                                                            }
                                                                            errorMsg={
                                                                                resumeExperienceForm
                                                                                    .formState
                                                                                    .errors
                                                                                    .experiences
                                                                                    ?.start_experience_date
                                                                            }
                                                                        />
                                                                    )}
                                                                />
                                                            </div>

                                                            <div className="flex flex-col w-full">
                                                                <div className="w-full">
                                                                    <Controller
                                                                        name={`experiences.end_experience_date`}
                                                                        control={
                                                                            resumeExperienceForm.control
                                                                        }
                                                                        render={({
                                                                            field: {
                                                                                ...field
                                                                            },
                                                                        }) => (
                                                                            <Datepicker
                                                                                minDate={
                                                                                    resumeExperienceForm.watch(
                                                                                        "experiences"
                                                                                    )
                                                                                        .start_experience_date
                                                                                }
                                                                                register={
                                                                                    field
                                                                                }
                                                                                placeholder="End Date"
                                                                                dateFormat="dd/mm/yy"
                                                                                value={
                                                                                    field.value
                                                                                }
                                                                                disabled={resumeExperienceForm.watch(
                                                                                    `experiences.isCurrentlyWorking`
                                                                                )}
                                                                                errorMsg={
                                                                                    resumeExperienceForm
                                                                                        .formState
                                                                                        .errors
                                                                                        .experiences
                                                                                        ?.end_experience_date
                                                                                }
                                                                            />
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center gap-2 text-sm font-medium text-black mt-4">
                                                                    <Checkbox
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
                                                                        onClick={() => {
                                                                            resumeExperienceForm.setValue(
                                                                                `experiences.isCurrentlyWorking`,
                                                                                !resumeExperienceForm.watch(
                                                                                    `experiences.isCurrentlyWorking`
                                                                                )
                                                                            );
                                                                        }}
                                                                        checked={resumeExperienceForm.watch(
                                                                            `experiences.isCurrentlyWorking`
                                                                        )}
                                                                    />
                                                                    Currently
                                                                    working
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <PrimaryButton
                                                        label={showExperienceForm ? 'Save' : "+ Add Experience"}
                                                        type="button"
                                                        onClick={async () => {
                                                            if (
                                                                !showExperienceForm
                                                            ) {
                                                                setShowExperienceForm(
                                                                    true
                                                                );
                                                            } else {
                                                                const experienceValue =
                                                                    resumeExperienceForm.getValues(
                                                                        "experiences"
                                                                    );
                                                                if (
                                                                    !experienceValue.jobTitle ||
                                                                    !experienceValue.jobDescription ||
                                                                    !experienceValue.companyName ||
                                                                    !experienceValue.jobType
                                                                )
                                                                    return;
                                                                setExperienceData([
                                                                    ...experienceData,
                                                                    {
                                                                        ...resumeExperienceForm.getValues(
                                                                            "experiences"
                                                                        ),
                                                                        id: uuidv4(),
                                                                        jobType:
                                                                            resumeExperienceForm.getValues(
                                                                                "experiences"
                                                                            )
                                                                                .jobType as JobType,
                                                                    },
                                                                ]);
                                                                setShowExperienceForm(
                                                                    false
                                                                );
                                                                resumeExperienceForm.reset(
                                                                    {
                                                                        experiences:
                                                                        {
                                                                            jobTitle:
                                                                                "",
                                                                            jobDescription:
                                                                                "",
                                                                            companyName:
                                                                                "",
                                                                            jobType:
                                                                                null,
                                                                            start_experience_date:
                                                                                new Date(),
                                                                            end_experience_date:
                                                                                new Date(),
                                                                        },
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                        labelStyle="text-black font-semibold"
                                                        className="bg-[#FFDAE5] w-fit gap-3 px-3 py-3"
                                                    />
                                                    {showExperienceForm && (
                                                        <SecondaryButton label="Cancel"
                                                            className="bg-[#FFDAE5] !w-[6rem]" onClick={() => setShowExperienceForm(false)} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Soft Skill */}
                                    <div className="flex gap-2 items-start">
                                        <div className="flex flex-col w-full gap-0 lg:gap-4 md:gap-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-semibold">
                                                    Soft Skills
                                                </h3>
                                                <InfoPopup
                                                    content={
                                                        <p>
                                                            Personal and
                                                            people-related
                                                            traits (e.g.,
                                                            Teamwork,
                                                            Communication,
                                                            Problem Solving,
                                                            Empathy, Leadership,
                                                            Critical Thinking)
                                                        </p>
                                                    }
                                                />
                                            </div>
                                            {resumeCreateForm.watch(
                                                "soft_skills"
                                            )?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 my-2">
                                                        {resumeCreateForm.watch(
                                                            "soft_skills"
                                                        )?.length > 0 ? (
                                                            resumeCreateForm
                                                                .watch(
                                                                    "soft_skills"
                                                                )
                                                                ?.map(
                                                                    (
                                                                        skill,
                                                                        index
                                                                    ) => (
                                                                        <ChipField
                                                                            label={
                                                                                skill
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                            removable
                                                                            onRemove={() => {
                                                                                resumeCreateForm.setValue(
                                                                                    "soft_skills",
                                                                                    resumeCreateForm
                                                                                        .watch(
                                                                                            "soft_skills"
                                                                                        )
                                                                                        .filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                item !==
                                                                                                skill
                                                                                        )
                                                                                );
                                                                            }}
                                                                        />
                                                                    )
                                                                )
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                )}

                                            <div className="flex items-start gap-2 lg:w-1/2 md:w-1/2">
                                                <div className="w-3/5 md:w-full">
                                                    <AuthInput
                                                        value={softSkillInput}
                                                        onChange={(e) => {
                                                            setSoftSkillInput(
                                                                e.target.value
                                                            );
                                                        }}
                                                        name="soft_skills"
                                                        labelStyle="font-medium"
                                                        placeholder="Type here"
                                                        inputStyle="!bg-white"
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                "Enter"
                                                            ) {
                                                                if (
                                                                    softSkillInput ===
                                                                    ""
                                                                )
                                                                    return;
                                                                resumeCreateForm?.setValue(
                                                                    "soft_skills",
                                                                    [
                                                                        ...(resumeCreateForm.getValues(
                                                                            "soft_skills"
                                                                        ) ||
                                                                            []),
                                                                        softSkillInput,
                                                                    ]
                                                                );
                                                                setSoftSkillInput(
                                                                    ""
                                                                );
                                                            }
                                                        }}
                                                        errorMsg={
                                                            resumeCreateForm.watch(
                                                                "soft_skills"
                                                            ).length > 0
                                                                ? undefined
                                                                : (resumeCreateForm
                                                                    .formState
                                                                    .errors
                                                                    .soft_skills as FieldError)
                                                        }
                                                    />
                                                </div>

                                                <div className="flex w-2/4 items-end">
                                                    <PrimaryButton
                                                        label="+ &nbsp;&nbsp;Add Skill"
                                                        type="button"
                                                        className="bg-[#FFDAE5] w- gap-3 px-3 py-3"
                                                        labelStyle="text-black font-semibold flex-nowrap"
                                                        onClick={() => {
                                                            if (
                                                                softSkillInput ===
                                                                ""
                                                            )
                                                                return;
                                                            resumeCreateForm?.setValue(
                                                                "soft_skills",
                                                                [
                                                                    ...(resumeCreateForm.getValues(
                                                                        "soft_skills"
                                                                    ) || []),
                                                                    softSkillInput,
                                                                ]
                                                            );
                                                            setSoftSkillInput(
                                                                ""
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hard Skill */}
                                    <div className="flex gap-2 items-start">
                                        <div className="flex flex-col w-full gap-0 lg:gap-4 md:gap-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-semibold">
                                                    Hard Skills
                                                </h3>
                                                <InfoPopup
                                                    content={
                                                        <p>
                                                            Technical or
                                                            job-specific
                                                            abilities (e.g.,
                                                            Python, SEO, Excel,
                                                            Data Analysis,
                                                            AutoCAD, Machinery
                                                            Operation, Legal
                                                            Research)
                                                        </p>
                                                    }
                                                />
                                            </div>

                                            {resumeCreateForm.watch(
                                                "hard_skills"
                                            )?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 my-2">
                                                        {resumeCreateForm.watch(
                                                            "hard_skills"
                                                        )?.length > 0 ? (
                                                            resumeCreateForm
                                                                .watch(
                                                                    "hard_skills"
                                                                )
                                                                ?.map(
                                                                    (
                                                                        skill,
                                                                        index
                                                                    ) => (
                                                                        <ChipField
                                                                            label={
                                                                                skill
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                            removable
                                                                            onRemove={() => {
                                                                                resumeCreateForm.setValue(
                                                                                    "hard_skills",
                                                                                    resumeCreateForm
                                                                                        .watch(
                                                                                            "hard_skills"
                                                                                        )
                                                                                        .filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                item !==
                                                                                                skill
                                                                                        )
                                                                                );
                                                                            }}
                                                                        />
                                                                    )
                                                                )
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                )}

                                            <div className="flex items-start gap-2 lg:w-1/2 md:w-1/2">
                                                <div className="w-3/5 md:w-full">
                                                    <AuthInput
                                                        value={hardSkillInput}
                                                        onChange={(e) => {
                                                            setHardSkillInput(
                                                                e.target.value
                                                            );
                                                        }}
                                                        name="hard_skills"
                                                        labelStyle="font-medium"
                                                        placeholder="Type here"
                                                        inputStyle="!bg-white"
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                "Enter"
                                                            ) {
                                                                if (
                                                                    hardSkillInput ===
                                                                    ""
                                                                )
                                                                    return;
                                                                resumeCreateForm.setValue(
                                                                    "hard_skills",
                                                                    [
                                                                        ...(resumeCreateForm.getValues(
                                                                            "hard_skills"
                                                                        ) ||
                                                                            []),
                                                                        hardSkillInput,
                                                                    ]
                                                                );
                                                                setHardSkillInput(
                                                                    ""
                                                                );
                                                            }
                                                        }}
                                                        errorMsg={
                                                            resumeCreateForm.watch(
                                                                "hard_skills"
                                                            ).length > 0
                                                                ? undefined
                                                                : (resumeCreateForm
                                                                    .formState
                                                                    .errors
                                                                    .hard_skills as FieldError)
                                                        }
                                                    />
                                                </div>

                                                <div className="flex w-2/4 items-end">
                                                    <PrimaryButton
                                                        label="+ &nbsp;&nbsp;Add Skill"
                                                        type="button"
                                                        className="bg-[#FFDAE5] gap-3 mb-4 px-3 py-3"
                                                        labelStyle="text-black font-semibold"
                                                        onClick={() => {
                                                            if (
                                                                hardSkillInput ===
                                                                ""
                                                            )
                                                                return;
                                                            resumeCreateForm.setValue(
                                                                "hard_skills",
                                                                [
                                                                    ...(resumeCreateForm.getValues(
                                                                        "hard_skills"
                                                                    ) || []),
                                                                    hardSkillInput,
                                                                ]
                                                            );
                                                            setHardSkillInput(
                                                                ""
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Language */}
                                    <div className="flex gap-2 items-start">
                                        <div></div>
                                        <div className="flex flex-col w-full gap-0 lg:gap-4 md:gap-2">
                                            <h3 className="text-2xl font-semibold">
                                                Languages
                                            </h3>

                                            {resumeCreateForm.watch("languages")
                                                ?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 my-2">
                                                        {languageFieldArray?.fields
                                                            ?.length > 0 ? (
                                                            languageFieldArray.fields?.map(
                                                                (skill, index) => (
                                                                    <ChipField
                                                                        label={`${skill.language
                                                                            } | ${skill?.level
                                                                                ?.charAt(
                                                                                    0
                                                                                )
                                                                                ?.toUpperCase() +
                                                                            skill?.level
                                                                                ?.slice(
                                                                                    1
                                                                                )
                                                                                ?.toLowerCase()
                                                                            }`}
                                                                        key={index}
                                                                        removable
                                                                        onRemove={() =>
                                                                            languageFieldArray.remove(
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                )
                                                            )
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                )}

                                            <div className="flex flex-col w-full gap-4 items-end lg:w-1/2 md:flex-row md:w-3/4">
                                                <div className="flex gap-2 w-full items-center md:w-4/6">
                                                    <div className="w-1/2">
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
                                                            className="!bg-white !rounded-xl"
                                                            placeholder="Select Language"
                                                            value={
                                                                languageField?.language
                                                            }
                                                            onChange={(e) => {
                                                                setLanguageField(
                                                                    {
                                                                        ...languageField,
                                                                        language:
                                                                            e.value,
                                                                    }
                                                                );
                                                            }}
                                                            errorMsg={
                                                                resumeCreateForm
                                                                    .formState
                                                                    .errors
                                                                    .languages?.[0]
                                                                    ?.language
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        {/* <AuthInput
                                                            value={
                                                                languageField?.level
                                                            }
                                                            onChange={(e) => {
                                                                setLanguageField(
                                                                    {
                                                                        ...languageField,
                                                                        level: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                );
                                                            }}
                                                            placeholder="Proficiency"
                                                            inputStyle="!bg-white !rounded-r-xl !rounded-l-none"
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key ===
                                                                    "Enter"
                                                                ) {
                                                                    if (
                                                                        !languageField.language ||
                                                                        !languageField.level
                                                                    )
                                                                        return;
                                                                    languageFieldArray.append(
                                                                        languageField
                                                                    );
                                                                    setLanguageField(
                                                                        {
                                                                            language:
                                                                                "",
                                                                            level: "",
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                        /> */}
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
                                                            className="!bg-white !rounded-xl"
                                                            placeholder="Select Type"
                                                            value={
                                                                languageField?.level
                                                            }
                                                            onChange={(e) => {
                                                                setLanguageField(
                                                                    {
                                                                        ...languageField,
                                                                        level: e.value,
                                                                    }
                                                                );
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key ===
                                                                    "Enter"
                                                                ) {
                                                                    if (
                                                                        !languageField.language ||
                                                                        !languageField.level
                                                                    )
                                                                        return;
                                                                    languageFieldArray.append(
                                                                        languageField
                                                                    );
                                                                    setLanguageField(
                                                                        {
                                                                            language:
                                                                                "",
                                                                            level: "",
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                            errorMsg={
                                                                resumeCreateForm
                                                                    .formState
                                                                    .errors
                                                                    .languages?.[0]
                                                                    ?.level
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex w-2/4 items-end">
                                                    <PrimaryButton
                                                        label="+ &nbsp;&nbsp;Add Language"
                                                        type="button"
                                                        className="bg-[#FFDAE5] gap-3 px-3 py-3"
                                                        labelStyle="text-black font-semibold"
                                                        onClick={() => {
                                                            if (
                                                                !languageField.language ||
                                                                !languageField.level
                                                            )
                                                                return;
                                                            languageFieldArray.append(
                                                                languageField
                                                            );
                                                            setLanguageField({
                                                                language: "",
                                                                level: "",
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {resumeCreateForm.watch("languages")
                                                ?.length === 0 &&
                                                resumeCreateForm.formState
                                                    .errors.languages && (
                                                    <small className="text-red-400">
                                                        {
                                                            resumeCreateForm
                                                                .formState
                                                                .errors
                                                                .languages
                                                                .message
                                                        }
                                                    </small>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 lg:justify-start">
                        <AuthButton
                            customStyle="md:w-1/4 w-1/2"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <ButtonLoader isVisible /> : "Save"}
                        </AuthButton>
                    </div>
                </form>
            ) : resumeLink.isLoading ? (
                <Loader isVisible={resumeLink.isLoading} />
            ) : (
                <CustomPDFViewer url={resumeLink.data as string} />
            )}
        </div>
    );
};

export default Resume;
