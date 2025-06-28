import CertificateIcon from "@/assets/svg/Certificate";
import FileUpload from "@/assets/svg/file-upload.svg";
import DeleteIcon from "@/assets/svg/profile/DeleteIcon";
import ResumeIcon from "@/assets/svg/ResumeIcon";
import UploadDocumentIcon from "@/assets/svg/UploadDocument";
import UploadIcon from "@/assets/svg/UploadIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthLabel from "@/components/ui/auth/AuthLabel";
import AuthPhone from "@/components/ui/auth/AuthPhone";
import AuthTextArea from "@/components/ui/auth/AuthTextArea";
import Datepicker from "@/components/ui/auth/Datepicker";
import SecondaryButton from "@/components/ui/auth/SecondaryButton";
import SelectField from "@/components/ui/auth/SelectField";
import SliderField from "@/components/ui/auth/SliderField";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import PreassessmentModal from "@/components/ui/modals/PreassessmentModal";
import HeadScore from "@/components/ui/progressbar/HeadScore";
import {
    UserAdditionalDocuments,
    UserDeleteAdditionalDocument,
    UserEducation,
    UserOnboarding,
    UserWorkExperience,
} from "@/helpers/apis/account-setup";
import { getProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import { DASHBOARD } from "@/routes";
import {
    Gender,
    JobType,
    PutEducationRequest,
    PutWorkExperienceRequest,
    WorkExperienceTable,
} from "@/types/accountSetup.types";
import { FileType } from "@/types/general.types";
import {
    GetCityListResponse,
    GetQualificationListResponse,
} from "@/types/jobs.types";
import {
    GetProfileResponse_Test,
    GetRolesResponse,
    ProfileSetupField,
    profileSetupSchema,
    RoleTable,
} from "@/types/profileSetup.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Checkbox } from "primereact/checkbox";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const EditProfile: React.FC = () => {
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

    const navigate = useNavigate();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteModalType, setDeleteModalType] = useState<
        "education" | "experience" | ""
    >("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [role, setRole] = useState<RoleTable>();
    const [experienceYear, setExperienceYear] = useState<number>(0);
    const [deleteDocumentModalVisible, setDeleteDocumentModalVisible] =
        useState({
            resume: false,
            otherDocumentId: "",
        });
    const [otherDocumentLoader, setOtherDocumentLoader] =
        useState<boolean>(false);
    const [preassessmentVisible, setPreassessmentVisible] = useState(false);
    const [saveButtonLoader, setSaveButtonLoader] = useState<boolean>(false);

    const profileSetupForm = useForm<ProfileSetupField>({
        defaultValues: {
            profileImage: null,
            firstName: "",
            lastName: "",
            experience: 0,
            email: "",
            phone: "",
            bio: "",
            workPortfolio: "",
            linkedin: "",
            city: "",
            postalCode: "",
            educations: [],
            experiences: [],
            resume: null,
            roles: [],
        },
        mode: "all",
        resolver: zodResolver(profileSetupSchema),
    });

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control: profileSetupForm.control,
        name: "educations",
    });

    const {
        fields: workExperienceFields,
        append: appendWorkExperience,
        remove: removeWorkExperience,
    } = useFieldArray({
        control: profileSetupForm.control,
        name: "experiences",
    });

    const { append: appendRole, remove: removeRole } = useFieldArray({
        control: profileSetupForm.control,
        name: "roles",
    });

    const profileImageWatcher = profileSetupForm.watch("profileImage");

    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
    });

    const refeshProfile = () => {
        queryClient.invalidateQueries({
            queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        });
    };

    const onSubmit = async (data: ProfileSetupField) => {
        setSaveButtonLoader(true);
        try {
            const formData = new FormData();

            if (data.profileImage instanceof File) {
                formData.append("profile_picture", data.profileImage);
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
            formData.append("website", data.workPortfolio || "");
            formData.append("linkedIn", data.linkedin || "");
            formData.append("city", data.city);
            formData.append("postalCode", data.postalCode);
            formData.append(
                "resume",
                data.resume instanceof File ? data.resume : new File([], "")
            );
            data.roles?.map((role, index) => {
                formData.append(`roles[${index}][roleId]`, role.roleId);
                formData.append(
                    `roles[${index}][experience]`,
                    Math.ceil((role.experience as number) / 3.34).toString()
                );
            });

            const educationsData: PutEducationRequest = {
                educations: data.educations?.map((education) => ({
                    educationId: education?.id,
                    schoolName: education.schoolName,
                    degreeType: education.degreeType,
                    course: education.course,
                    startYear: moment(education.startYear).format("YYYY"),
                    endYear: education.isPresent
                        ? undefined
                        : moment(education.endYear).format("YYYY"),
                })),
            };

            const experienceData: PutWorkExperienceRequest = {
                workExperiences: data.experiences?.map((experience) => ({
                    workExperienceId: experience?.id,
                    jobTitle: experience.jobTitle,
                    jobDescription: experience.jobDescription,
                    companyName: experience.companyName,
                    jobType: experience.jobType,
                    startYear: moment(experience.startYear).format("YYYY"),
                    endYear: experience.isCurrentlyWorking
                        ? undefined
                        : moment(experience.endYear).format("YYYY"),
                })),
            };

            await UserOnboarding(formData);
            await UserEducation(educationsData);
            await UserWorkExperience(experienceData);
            showToast("success", "Profile updated successfully");
            refeshProfile();
            navigate(DASHBOARD);
        } catch (error) {
            console.error(error);
        }
        setSaveButtonLoader(false);
    };

    const uploadAdditionalDocument = async (
        document: File,
        documentName: string
    ) => {
        try {
            const additionalDocumentsFormData = new FormData();
            additionalDocumentsFormData.append("document", document);
            additionalDocumentsFormData.append("name", documentName);
            await UserAdditionalDocuments(additionalDocumentsFormData);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteAdditionalDocument = async (documentId: string) => {
        try {
            await UserDeleteAdditionalDocument(documentId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (ProfileDetails.data) {
            profileSetupForm.setValue(
                "profileImage",
                ProfileDetails.data.user.avatar
            );
            profileSetupForm.setValue(
                "firstName",
                ProfileDetails.data.user.firstName || ""
            );
            profileSetupForm.setValue(
                "lastName",
                ProfileDetails.data.user.lastName || ""
            );
            profileSetupForm.setValue(
                "gender",
                ProfileDetails.data.user.gender || Gender.male
            );
            profileSetupForm.setValue(
                "experience",
                ProfileDetails.data.user.experience * 3.34 || 0
            );
            profileSetupForm.setValue(
                "email",
                ProfileDetails.data.user.email || ""
            );
            profileSetupForm.setValue(
                "phone",
                ProfileDetails.data.user.phone || ""
            );
            profileSetupForm.setValue(
                "bio",
                ProfileDetails.data.user.bio || ""
            );
            profileSetupForm.setValue(
                "workPortfolio",
                ProfileDetails.data.user.website || ""
            );
            profileSetupForm.setValue(
                "linkedin",
                ProfileDetails.data.user.linkedIn || ""
            );
            profileSetupForm.setValue(
                "city",
                ProfileDetails.data.user.city || ""
            );
            if (ProfileDetails.data.user.postalCode) {
                profileSetupForm.setValue(
                    "postalCode",
                    ProfileDetails.data.user.postalCode || ""
                );
            }
            profileSetupForm.setValue(
                "educations",
                ProfileDetails.data.educations?.map((education) => ({
                    id: education.id,
                    schoolName: education.instituteName,
                    degreeType: education.degreeType,
                    course: education.course,
                    startYear: new Date(education.startYear),
                    endYear: education.endYear
                        ? new Date(education.endYear)
                        : null,
                    isPresent: education.endYear === null,
                }))
            );
            profileSetupForm.setValue(
                "experiences",
                ProfileDetails.data.workExperiences?.map(
                    (experience: WorkExperienceTable) => ({
                        id: experience.id,
                        jobTitle: experience.jobTitle,
                        jobDescription: experience.jobDescription,
                        companyName: experience.companyName,
                        jobType: experience.jobType,
                        startYear: new Date(experience.startYear),
                        endYear: experience.endYear
                            ? new Date(experience.endYear)
                            : null,
                        isCurrentlyWorking: experience.endYear === null,
                    })
                )
            );
            profileSetupForm.setValue("roles", ProfileDetails.data.tests);
        }

        if (ProfileDetails.data?.user.otherDocuments) {
            const otherDocument = {
                document: ProfileDetails.data.user.otherDocuments?.map(
                    (document) => ({
                        id: document.id,
                        name: document.name,
                        url: document.url,
                    })
                )[0],
            };
            profileSetupForm.setValue("otherDocument", otherDocument);
        }

        if (
            ProfileDetails.data?.user.resume &&
            (ProfileDetails.data?.user.resume as FileType)
        ) {
            profileSetupForm.setValue("resume", {
                id: ProfileDetails.data.user.resume.id,
                name: ProfileDetails.data.user.resume.name,
                url: ProfileDetails.data.user.resume.url,
                type: "application/pdf",
                size: 0,
            });
        }
    }, [ProfileDetails.data && ProfileDetails.data.user]);

    return (
        <div className="flex flex-col gap-4 min-w-full">
            <h1 className="text-2xl font-semibold tracking-[-1px] text-black">
                My Profile
            </h1>
            <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-md">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F2F2F2]"
                        type="button"
                    >
                        <i className="pi pi-times text-black" />
                    </button>
                    <h1 className="text-2xl font-semibold tracking-[-1px] text-primary">
                        Edit Profile
                    </h1>
                </div>

                <form onSubmit={profileSetupForm.handleSubmit(onSubmit)} className="flex flex-col gap-10 min-w-full">
                    <div className="flex lg:flex-row flex-col items-center justify-between lg:gap-0 gap-4 pb-4 w-full border border-[#F2F2F2] rounded-2xl p-4">
                        <div className=" flex items-center md:justify-start justify-between md:gap-10 gap-4 lg:w-3/5 w-full">
                            <div className="lg:w-40 lg:h-40 md:w-32 md:h-32 w-22 h-22 rounded-full bg-[#F7FAFF]">
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer w-full h-full relative rounded-full group"
                                >
                                    {profileImageWatcher ? (
                                        <>
                                            <img
                                                src={
                                                    profileImageWatcher instanceof
                                                        File
                                                        ? URL.createObjectURL(
                                                            profileImageWatcher
                                                        )
                                                        : profileImageWatcher.url
                                                }
                                                alt="No Image"
                                                className="w-full h-full object-cover rounded-full bg-[#F7FAFF]"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-200">
                                                <i className="pi pi-pen-to-square w-5 h-5 text-white" />
                                            </div>
                                            <div className="absolute bottom-0 right-2 bg-black/50 rounded-full p-2 flex items-center justify-center text-center">
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
                                        {...profileSetupForm.register(
                                            "profileImage"
                                        )}
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
                                                profileSetupForm.setValue(
                                                    "profileImage",
                                                    file
                                                );
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col w-3/5 lg:gap-2 md:gap-1">
                                <p className="lg:text-4xl md:text-3xl text-2xl font-semibold truncate break-words">
                                    {profileSetupForm.watch("firstName")}{" "}
                                    {profileSetupForm.watch("lastName")}
                                </p>
                                <p className="text-base text-[#393939] font-semibold line-clamp-2 break-words">
                                    {profileSetupForm.watch("bio")}
                                </p>
                                <ul className="flex gap-x-6 text-base list-disc text-[#393939]">
                                    {profileSetupForm.watch("gender") && (
                                        <li className="first:list-none">
                                            {profileSetupForm
                                                .watch("gender")
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                profileSetupForm
                                                    .watch("gender")
                                                    ?.slice(1)
                                                    .toLowerCase()}
                                        </li>
                                    )}
                                    {profileSetupForm.watch("city") && (
                                        <li className="first:list-none">
                                            {profileSetupForm.watch("city")}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col md:w-11/12 w-full md:gap-2 gap-4 items-end lg:w-2/5 mx-w-2/5">
                            <div className="flex justify-end md:gap-2 gap-1 md:pt-0 pt-4 w-full">
                                {ProfileDetails.data &&
                                    ProfileDetails.data.tests?.map(
                                        (test: GetProfileResponse_Test) => (
                                            <div
                                                key={test.roleId}
                                                className="flex flex-col md:gap-2 items-center justify-between w-1/3"
                                            >
                                                <HeadScore
                                                    size={
                                                        window.innerWidth < 425
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
                                                    {test.experience} year
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
                            {ProfileDetails.data &&
                                ProfileDetails.data.tests?.length > 0 && (
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

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-8">
                            {/* Personal Information */}
                            <div className="flex flex-col gap-8 border border-[#F2F2F2] rounded-2xl p-4">
                                <h1 className="text-xl font-semibold text-black">
                                    Personal Information
                                </h1>

                                <div className="flex md:flex-row flex-col gap-6">
                                    <AuthInput
                                        register={profileSetupForm.register(
                                            "firstName"
                                        )}
                                        label="First Name"
                                        placeholder="Enter First Name"
                                        errorMsg={
                                            profileSetupForm.formState.errors
                                                .firstName
                                        }
                                    />

                                    <AuthInput
                                        register={profileSetupForm.register(
                                            "lastName"
                                        )}
                                        label="Last Name"
                                        placeholder="Enter Last Name"
                                        errorMsg={
                                            profileSetupForm.formState.errors
                                                .lastName
                                        }
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col gap-6">
                                    <Controller
                                        name="gender"
                                        control={profileSetupForm.control}
                                        render={({ field: { ...field } }) => (
                                            <SelectField
                                                {...field}
                                                label="Gender"
                                                placeholder="Select Gender"
                                                errorMsg={
                                                    profileSetupForm.formState
                                                        .errors.gender
                                                }
                                                options={[
                                                    {
                                                        label: "Male",
                                                        value: Gender.male,
                                                    },
                                                    {
                                                        label: "Female",
                                                        value: Gender.female,
                                                    },
                                                ]}
                                            />
                                        )}
                                    />

                                    <SliderField
                                        className="gap-0 pb-0"
                                        label="Experience"
                                        value={profileSetupForm.watch(
                                            "experience"
                                        )}
                                        onChange={(e) =>
                                            profileSetupForm.setValue(
                                                "experience",
                                                e.value as number
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col gap-6">
                                    <AuthInput
                                        register={profileSetupForm.register(
                                            "email"
                                        )}
                                        label="Email"
                                        disabled
                                        placeholder="Enter Email"
                                        errorMsg={
                                            profileSetupForm.formState.errors
                                                .email
                                        }
                                    />

                                    <AuthPhone
                                        register={profileSetupForm.register(
                                            "phone"
                                        )}
                                        label="Phone Number"
                                        placeholder="9999999999"
                                        errorMsg={
                                            profileSetupForm.formState.errors
                                                .phone
                                        }
                                    />
                                </div>

                                <AuthTextArea
                                    register={profileSetupForm.register("bio")}
                                    label="Bio"
                                    placeholder="Type here"
                                    rows={3}
                                    cols={5}
                                    errorMsg={
                                        profileSetupForm.formState.errors.bio
                                    }
                                />

                                <div className="flex md:flex-row flex-col gap-6">
                                    <AuthInput
                                        register={profileSetupForm.register(
                                            "workPortfolio"
                                        )}
                                        label="Work Portfolio URL"
                                        placeholder="Enter here"
                                        errorMsg={
                                            profileSetupForm.formState.errors
                                                ?.workPortfolio
                                        }
                                    />

                                    <AuthInput
                                        register={profileSetupForm.register(
                                            "linkedin"
                                        )}
                                        label="Linkedin URL"
                                        placeholder="Enter here"
                                        errorMsg={
                                            profileSetupForm.formState.errors
                                                ?.linkedin
                                        }
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-8 border border-[#F2F2F2] rounded-2xl p-4">
                                <h1 className="text-xl font-semibold text-black">
                                    Address
                                </h1>
                                <div className="flex md:flex-row flex-col gap-6">
                                    <Controller
                                        name="city"
                                        control={profileSetupForm.control}
                                        render={({ field: { ...field } }) => (
                                            <SelectField
                                                filter
                                                {...field}
                                                label="City"
                                                placeholder="Select here"
                                                options={cityList?.cities?.map(
                                                    (city) => ({
                                                        label: city,
                                                        value: city,
                                                    })
                                                )}
                                                virtualScrollerOptions={{
                                                    itemSize: 38,
                                                }}
                                                errorMsg={
                                                    profileSetupForm.formState
                                                        .errors.city
                                                }
                                            />
                                        )}
                                    />

                                    <AuthInput
                                        register={profileSetupForm.register(
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
                                            profileSetupForm.formState.errors
                                                ?.postalCode
                                        }
                                    />
                                </div>
                            </div>

                            {/* Educational Information */}
                            <div className="flex flex-col gap-8 ">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-semibold text-primary">
                                        Educational Information
                                    </h1>
                                    <AuthButton
                                        type="button"
                                        onClick={() => {
                                            appendEducation({
                                                schoolName: "",
                                                degreeType: "",
                                                course: "",
                                                startYear: new Date(),
                                                endYear: new Date(),
                                                isPresent: false,
                                            });
                                        }}
                                        customStyle="py-2.5 rounded-xl md:w-fit w-1/2 text-primary"
                                        label="Add Education"
                                    />
                                </div>

                                {educationFields?.map((field, index) => (
                                    <div
                                        className="flex flex-col gap-8 border border-[#F2F2F2] rounded-2xl p-4"
                                        key={field.id}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-semibold">
                                                {index + 1}. Education
                                            </h3>
                                            {educationFields?.length > 1 && (
                                                <div
                                                    onClick={() => {
                                                        setDeleteModalVisible(
                                                            true
                                                        );
                                                        setDeleteModalType(
                                                            "education"
                                                        );
                                                        setDeleteId(index);
                                                    }}
                                                    className="text-xs font-semibold flex items-center gap-2 py-2 px-2.5 border border-[#C1C1C1] rounded-lg cursor-pointer"
                                                >
                                                    <p>Delete</p>
                                                    <DeleteIcon />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-8">
                                            <AuthInput
                                                register={profileSetupForm.register(
                                                    `educations.${index}.schoolName`
                                                )}
                                                label="School Name"
                                                placeholder="Enter First Name"
                                                errorMsg={
                                                    profileSetupForm.formState
                                                        .errors.educations?.[
                                                        index
                                                    ]?.schoolName
                                                }
                                            />

                                            <div className="flex md:flex-row flex-col gap-6">
                                                <Controller
                                                    control={
                                                        profileSetupForm.control
                                                    }
                                                    name={`educations.${index}.degreeType`}
                                                    render={({ field }) => (
                                                        <SelectField
                                                            {...field}
                                                            label="Degree Type"
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
                                                                profileSetupForm
                                                                    .formState
                                                                    .errors
                                                                    .educations?.[
                                                                    index
                                                                ]?.degreeType
                                                            }
                                                        />
                                                    )}
                                                />

                                                <AuthInput
                                                    register={profileSetupForm.register(
                                                        `educations.${index}.course`
                                                    )}
                                                    label="Course"
                                                    placeholder="Enter here"
                                                    errorMsg={
                                                        profileSetupForm
                                                            .formState.errors
                                                            .educations?.[index]
                                                            ?.course
                                                    }
                                                />
                                            </div>

                                            <div className="flex md:flex-row flex-col gap-6 w-full">
                                                <Datepicker
                                                    name="startYear"
                                                    register={profileSetupForm.register(
                                                        `educations.${index}.startYear`
                                                    )}
                                                    label="Start Year"
                                                    value={profileSetupForm.watch(
                                                        `educations.${index}.startYear`
                                                    )}
                                                    errorMsg={
                                                        profileSetupForm
                                                            .formState.errors
                                                            .educations?.[index]
                                                            ?.startYear
                                                    }
                                                    maxDate={new Date()}
                                                />

                                                <div className="flex flex-col w-full">
                                                    <Datepicker
                                                        name="endYear"
                                                        register={profileSetupForm.register(
                                                            `educations.${index}.endYear`
                                                        )}
                                                        label="End Year"
                                                        value={profileSetupForm.watch(
                                                            `educations.${index}.endYear`
                                                        )}
                                                        disabled={profileSetupForm.watch(
                                                            `educations.${index}.isPresent`
                                                        )}
                                                        errorMsg={
                                                            profileSetupForm
                                                                .formState
                                                                .errors
                                                                .educations?.[
                                                                index
                                                            ]?.endYear
                                                        }
                                                        minDate={profileSetupForm.watch(
                                                            `educations.${index}.startYear`
                                                        )}
                                                    />
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
                                                                profileSetupForm.setValue(
                                                                    `educations.${index}.isPresent`,
                                                                    !profileSetupForm.watch(
                                                                        `educations.${index}.isPresent`
                                                                    )
                                                                );
                                                                if (
                                                                    profileSetupForm.watch(
                                                                        `educations.${index}.isPresent`
                                                                    )
                                                                ) {
                                                                    profileSetupForm.setValue(
                                                                        `educations.${index}.endYear`,
                                                                        new Date()
                                                                    );
                                                                }
                                                            }}
                                                            checked={profileSetupForm.watch(
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
                            </div>

                            {/* Work Experience */}
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-semibold text-primary">
                                        Work Experience
                                    </h1>
                                    <AuthButton
                                        type="button"
                                        onClick={() => {
                                            appendWorkExperience({
                                                jobTitle: "",
                                                jobDescription: "",
                                                companyName: "",
                                                jobType: JobType.fulltime,
                                                startYear: new Date(),
                                                endYear: new Date(),
                                                isCurrentlyWorking: false,
                                            });
                                        }}
                                        customStyle="py-2.5 rounded-xl md:w-fit w-1/2 text-primary"
                                        label="Add Experience"
                                    />
                                </div>

                                {workExperienceFields?.map((field, index) => (
                                    <div
                                        className="flex flex-col gap-8 border border-[#F2F2F2] rounded-2xl p-4"
                                        key={field?.id}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-semibold">
                                                {index + 1}. Experience
                                            </h3>
                                            {workExperienceFields?.length >
                                                1 && (
                                                    <div
                                                        onClick={() => {
                                                            setDeleteModalVisible(
                                                                true
                                                            );
                                                            setDeleteModalType(
                                                                "experience"
                                                            );
                                                            setDeleteId(index);
                                                        }}
                                                        className="text-xs font-semibold flex items-center gap-2 py-2 px-2.5 border border-[#C1C1C1] rounded-lg cursor-pointer"
                                                    >
                                                        <p>Delete</p>
                                                        <DeleteIcon />
                                                    </div>
                                                )}
                                        </div>

                                        <div className="flex flex-col gap-8">
                                            <AuthInput
                                                register={profileSetupForm.register(
                                                    `experiences.${index}.jobTitle`
                                                )}
                                                label="Job Title"
                                                placeholder="Enter here"
                                                errorMsg={
                                                    profileSetupForm.formState
                                                        .errors.experiences?.[
                                                        index
                                                    ]?.jobTitle
                                                }
                                            />

                                            <AuthTextArea
                                                register={profileSetupForm.register(
                                                    `experiences.${index}.jobDescription`
                                                )}
                                                label="Job Description"
                                                rows={3}
                                                placeholder="Enter here"
                                                errorMsg={
                                                    profileSetupForm.formState
                                                        .errors.experiences?.[
                                                        index
                                                    ]?.jobDescription
                                                }
                                            />

                                            <div className="flex md:flex-row flex-col md:gap-6 gap-8">
                                                <AuthInput
                                                    register={profileSetupForm.register(
                                                        `experiences.${index}.companyName`
                                                    )}
                                                    label="Company  Name"
                                                    placeholder="Enter here"
                                                    errorMsg={
                                                        profileSetupForm
                                                            .formState.errors
                                                            .experiences?.[
                                                            index
                                                        ]?.companyName
                                                    }
                                                />

                                                <Controller
                                                    control={
                                                        profileSetupForm.control
                                                    }
                                                    name={`experiences.${index}.jobType`}
                                                    render={({ field }) => (
                                                        <SelectField
                                                            {...field}
                                                            label="Job Type"
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
                                                                    label: "Freelance",
                                                                    value: JobType.contract,
                                                                },
                                                            ]}
                                                            errorMsg={
                                                                profileSetupForm
                                                                    .formState
                                                                    .errors
                                                                    .experiences?.[
                                                                    index
                                                                ]?.jobType
                                                            }
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className="flex md:flex-row flex-col gap-6 w-full">
                                                <Datepicker
                                                    register={profileSetupForm.register(
                                                        `experiences.${index}.startYear`
                                                    )}
                                                    label="Start Year"
                                                    value={profileSetupForm.watch(
                                                        `experiences.${index}.startYear`
                                                    )}
                                                    errorMsg={
                                                        profileSetupForm
                                                            .formState.errors
                                                            .experiences?.[
                                                            index
                                                        ]?.startYear
                                                    }
                                                    maxDate={new Date()}
                                                />

                                                <div className="flex flex-col w-full">
                                                    <Datepicker
                                                        register={profileSetupForm.register(
                                                            `experiences.${index}.endYear`
                                                        )}
                                                        label="End Year"
                                                        value={profileSetupForm.watch(
                                                            `experiences.${index}.endYear`
                                                        )}
                                                        disabled={profileSetupForm.watch(
                                                            `experiences.${index}.isCurrentlyWorking`
                                                        )}
                                                        errorMsg={
                                                            profileSetupForm
                                                                .formState
                                                                .errors
                                                                .experiences?.[
                                                                index
                                                            ]?.endYear
                                                        }
                                                        minDate={profileSetupForm.watch(
                                                            `experiences.${index}.startYear`
                                                        )}
                                                    />

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
                                                                profileSetupForm.setValue(
                                                                    `experiences.${index}.isCurrentlyWorking`,
                                                                    !profileSetupForm.watch(
                                                                        `experiences.${index}.isCurrentlyWorking`
                                                                    )
                                                                );
                                                            }}
                                                            checked={profileSetupForm.watch(
                                                                `experiences.${index}.isCurrentlyWorking`
                                                            )}
                                                        />
                                                        Currently working
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Resume */}
                            <div className="flex flex-col md:gap-8 gap-4">
                                <h1 className="text-xl font-semibold text-primary">
                                    Resume
                                </h1>
                                {profileSetupForm.watch("resume") ? (
                                    <div className="flex flex-wrap gap-4 w-full border border-[#F2F2F2] rounded-2xl p-4">
                                        <div className="flex items-center justify-between gap-2 cursor-pointer border border-primary rounded-2xl px-3 lg:py-6 py-4 lg:w-1/4 md:w-2/5 w-full">
                                            <div className="w-5 h-5 mx-2 bg-white rounded-full flex items-center justify-center">
                                                <ResumeIcon />
                                            </div>
                                            <a
                                                href={
                                                    (
                                                        profileSetupForm.watch(
                                                            "resume"
                                                        ) as FileType
                                                    ).url
                                                }
                                                target="_blank"
                                                className="cursor-pointer text-black font-medium w-3/4 truncate"
                                            >
                                                {
                                                    (
                                                        profileSetupForm.watch(
                                                            "resume"
                                                        ) as FileType
                                                    ).name
                                                }
                                            </a>
                                            <i
                                                onClick={() =>
                                                    profileSetupForm.setValue(
                                                        "resume",
                                                        null
                                                    )
                                                }
                                                className="pi pi-times cursor-pointer bg-black border-none rounded-full p-1.5 text-xs text-white"
                                            ></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="md:w-sm w-full p-8 rounded-3xl border-2 border-dashed border-primary/80">
                                        <div className="flex flex-col items-center md:space-y-6 space-y-4">
                                            <div>
                                                <UploadIcon />
                                            </div>

                                            <div className="text-center">
                                                <h2 className="md:text-xl text-lg text-[#8B8B8B] font-medium">
                                                    Upload your resume as a{" "}
                                                    <span className="text-primary">
                                                        .pdf
                                                    </span>
                                                </h2>
                                            </div>

                                            <label
                                                htmlFor="pdf-upload"
                                                className="w-full flex items-center justify-center cursor-pointer"
                                            >
                                                <input
                                                    id="pdf-upload"
                                                    type="file"
                                                    accept="application/pdf"
                                                    className="hidden"
                                                    {...profileSetupForm.register(
                                                        "resume",
                                                        {
                                                            onChange: (e) => {
                                                                profileSetupForm.setValue(
                                                                    "resume",
                                                                    e.target
                                                                        .files?.[0]
                                                                )
                                                            }
                                                            ,
                                                        }
                                                    )}
                                                />

                                                <SecondaryButton
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        document
                                                            .getElementById(
                                                                "pdf-upload"
                                                            )
                                                            ?.click();
                                                    }}
                                                    type="button"
                                                    customStyle="py-2.5 md:w-fit w-1/2"
                                                    label="Select File"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Additional Documents */}
                            <div className="flex flex-col md:gap-8 gap-4">
                                <h1 className="text-xl font-semibold text-primary">
                                    Additional Documents
                                </h1>

                                <div className="flex md:flex-row flex-col gap-5 border border-[#F2F2F2] rounded-2xl p-4">
                                    <div className="flex flex-col gap-5 md:border-r border-[#E9E9E9] md:pr-14 lg:w-1/3 md:2/5 w-full">
                                        <AuthInput
                                            register={profileSetupForm.register(
                                                `otherDocument.documentName`
                                            )}
                                            label="Document Name"
                                            placeholder="Enter here"
                                            errorMsg={
                                                profileSetupForm.formState
                                                    .errors?.otherDocument
                                                    ?.documentName
                                            }
                                        />

                                        <div className="flex flex-wrap items-center gap-6 w-full">
                                            <div className="flex flex-col items-center md:w-fit">
                                                <label
                                                    htmlFor={`file-upload-${0}`}
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex flex-col items-center gap-3">
                                                        <UploadDocumentIcon />
                                                        {/* <p className="text-black text-lg font-medium">
                                                            Drag file here
                                                        </p> */}
                                                    </div>
                                                </label>
                                                {/* <p className="text-gray-500 text-lg font-medium">
                                                    or
                                                </p> */}
                                                <input
                                                    id={`file-upload-${0}`}
                                                    type="file"
                                                    className="hidden"
                                                    accept="application/doc, application/docx"
                                                    {...profileSetupForm.register(
                                                        `otherDocument.document`
                                                    )}
                                                    onChange={async (e) => {
                                                        if (e.target.files) {
                                                            const document =
                                                                e.target
                                                                    .files[0];
                                                            const documentName =
                                                                profileSetupForm.getValues(
                                                                    `otherDocument.documentName`
                                                                ) ?? ""; // or get the name from somewhere else

                                                            if (
                                                                !document ||
                                                                !documentName.trim()
                                                            ) {
                                                                showToast(
                                                                    "error",
                                                                    "Please enter a document name"
                                                                );
                                                                return;
                                                            }
                                                            setOtherDocumentLoader(
                                                                true
                                                            );
                                                            await uploadAdditionalDocument(
                                                                document,
                                                                documentName
                                                            );
                                                            await refeshProfile();
                                                            setOtherDocumentLoader(
                                                                false
                                                            );
                                                            profileSetupForm.setValue(
                                                                `otherDocument.documentName`,
                                                                ""
                                                            );
                                                            profileSetupForm.setValue(
                                                                `otherDocument.document`,
                                                                null
                                                            );
                                                        }
                                                    }}
                                                />

                                                <AuthButton
                                                    type="button"
                                                    customStyle="py-2 mt-2 w-full"
                                                    onClick={() => {
                                                        document
                                                            .getElementById(
                                                                `file-upload-${0}`
                                                            )
                                                            ?.click();
                                                    }}
                                                >
                                                    {otherDocumentLoader ? (
                                                        <ButtonLoader
                                                            isVisible
                                                        />
                                                    ) : (
                                                        "Browse"
                                                    )}
                                                </AuthButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5 lg:w-2/3">
                                        <div className="flex flex-wrap gap-y-2 gap-x-6 items-center gap-2">
                                            {ProfileDetails.data?.user.otherDocuments?.map(
                                                (doc, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col gap-2 md:w-2/5 w-full"
                                                    >
                                                        <p className="text-black text-lg font-semibold">
                                                            {doc.name}
                                                        </p>
                                                        {doc && (
                                                            <div className="flex items-center justify-between bg-[#F4F4F4] py-2 px-3 rounded-xl">
                                                                <a
                                                                    download
                                                                    href={`${doc.url}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="flex items-center gap-2 w-10/12"
                                                                >
                                                                    <div>
                                                                        <CertificateIcon />
                                                                    </div>
                                                                    <p className="text-sm font-semibold truncate break-words">
                                                                        {
                                                                            doc.name
                                                                        }
                                                                    </p>
                                                                </a>
                                                                <i
                                                                    onClick={() => {
                                                                        setDeleteDocumentModalVisible(
                                                                            {
                                                                                resume: true,
                                                                                otherDocumentId:
                                                                                    doc.id,
                                                                            }
                                                                        );
                                                                    }}
                                                                    className="pi pi-times text-white text-xs text-center bg-[#353535] p-1.5 rounded-full cursor-pointer"
                                                                ></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interested Job Categories */}
                            <div className="flex flex-col gap-8 w-full">
                                <h1 className="text-xl font-semibold text-primary">
                                    Interested Job Categories
                                </h1>

                                <div className="flex flex-col gap-4 border border-[#EAEAEA] p-4 rounded-2xl w-full">
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="flex flex-col items-start gap-6 lg:w-1/3 md:w-1/2 w-full">
                                            <div className="w-11/12 flex flex-col gap-4">
                                                <SelectField
                                                    label="Role:"
                                                    placeholder="Search here"
                                                    errorMsg={
                                                        profileSetupForm
                                                            .formState.errors
                                                            .roles?.[0]
                                                            ?.roleName
                                                    }
                                                    optionLabel="title"
                                                    options={roleList?.roles
                                                        ?.filter(
                                                            (role: RoleTable) =>
                                                                !profileSetupForm
                                                                    .watch(
                                                                        "roles"
                                                                    )
                                                                    ?.map(
                                                                        (
                                                                            role
                                                                        ) =>
                                                                            role.roleId
                                                                    )
                                                                    .includes(
                                                                        role.id
                                                                    )
                                                        )
                                                        ?.map(
                                                            (
                                                                role: RoleTable
                                                            ) => ({
                                                                title: role.title,
                                                                id: role.id,
                                                            })
                                                        )}
                                                    filter
                                                    filterPlaceholder="Search here"
                                                    virtualScrollerOptions={{
                                                        itemSize: 38,
                                                    }}
                                                    value={role}
                                                    onChange={(e) => {
                                                        setRole({
                                                            id: e.value.id,
                                                            title: e.value
                                                                .title,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <AuthLabel
                                                    labelStyle="text-base text-[#8B8B8B] font-medium"
                                                    label="Experience:"
                                                />
                                                <SliderField
                                                    value={experienceYear}
                                                    onChange={(e) => {
                                                        setExperienceYear(
                                                            e.value as number
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-start w-full">
                                                {profileSetupForm.watch(
                                                    "roles"
                                                )!.length >= 3 ? (
                                                    <p className="text-primary font-bold">
                                                        You can not select more
                                                        than 3 roles
                                                    </p>
                                                ) : (
                                                    <AuthButton
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                role?.id &&
                                                                role?.title &&
                                                                experienceYear >=
                                                                0
                                                            ) {
                                                                appendRole({
                                                                    roleId:
                                                                        role?.id ??
                                                                        "",
                                                                    roleName:
                                                                        role?.title ??
                                                                        "",
                                                                    experience:
                                                                        experienceYear,
                                                                });
                                                                setRole({
                                                                    id: "",
                                                                    title: "",
                                                                });
                                                                setExperienceYear(
                                                                    0
                                                                );
                                                            }
                                                        }}
                                                        customStyle="text-primary md:w-1/3 w-1/2"
                                                        label="Add"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-start gap-4 lg:w-4/5 w-full">
                                        {profileSetupForm.watch("roles") &&
                                            profileSetupForm
                                                .watch("roles")
                                                ?.map((role, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between gap-4 bg-[#F4F4F4] py-2 px-3 rounded-xl md:w-1/4"
                                                    >
                                                        <div className="flex flex-col md:gap-2 w-4/5">
                                                            <p className="text-black md:text-base text-sm font-medium truncate">
                                                                {role.roleName}
                                                            </p>
                                                            <p className="text-black font-medium md:text-xs text-[10px]">
                                                                <span className="text-[#666666]">
                                                                    Exp:
                                                                </span>
                                                                {Math.ceil(
                                                                    role.experience /
                                                                    11
                                                                )}{" "}
                                                                year
                                                            </p>
                                                        </div>
                                                        <i
                                                            onClick={() => {
                                                                removeRole(
                                                                    index
                                                                );
                                                            }}
                                                            className="pi pi-times text-white text-[10px] text-center bg-[#9E9E9E] p-1.5 p-1 rounded-full cursor-pointer"
                                                        ></i>
                                                    </div>
                                                ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center lg:justify-start justify-center">
                                <AuthButton
                                    customStyle="md:w-1/4 w-1/2"
                                    type="submit"
                                    disabled={saveButtonLoader}
                                >
                                    {saveButtonLoader ? (
                                        <ButtonLoader
                                            isVisible={saveButtonLoader}
                                        />
                                    ) : (
                                        "Save"
                                    )}
                                </AuthButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Preassessment Modal */}
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

            {/* Other Documents Delete Confirmation Modal */}
            <ConfirmationModal
                buttonLabel={"Yes, Delete"}
                visible={deleteDocumentModalVisible.resume}
                setVisible={() =>
                    setDeleteDocumentModalVisible({
                        ...deleteDocumentModalVisible,
                        resume: false,
                    })
                }
                header="Delete Document"
                message="Are you certain you wish to proceed with delete this document?"
                onClick={async () => {
                    setDeleteDocumentModalVisible({
                        ...deleteDocumentModalVisible,
                        resume: false,
                    });
                    if (deleteDocumentModalVisible.otherDocumentId !== null) {
                        await deleteAdditionalDocument(
                            deleteDocumentModalVisible.otherDocumentId
                        );
                        await refeshProfile();
                    }
                }}
            />

            {/* Experience and Education Delete Confirmation Modal */}
            <ConfirmationModal
                buttonLabel="Yes, Delete"
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                header={`Delete ${deleteModalType === "education" ? "Education" : "Experience"
                    }`}
                message={`Are you certain you wish to proceed with delete this ${deleteModalType === "education" ? "education" : "experience"
                    }?`}
                onClick={() => {
                    setDeleteModalVisible(false);
                    if (deleteId !== null) {
                        if (deleteModalType === "education") {
                            removeEducation(deleteId);
                        } else {
                            removeWorkExperience(deleteId);
                        }
                    }
                }}
            />
        </div>
    );
};

export default EditProfile;
