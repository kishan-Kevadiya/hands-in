import { EDIT_PROFILE } from "@/routes";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useNavigate, useParams } from "react-router";
import PrimaryButton from "../buttons/PrimaryButton";

interface ProfileComplitionModalProps {
    personalInfoCompleted: boolean;
    educationCompleted: boolean;
    workExperienceCompleted: boolean;
    resumeUploaded: boolean;
    rolesSelected: boolean;
    user?: boolean;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileComplitionModal: React.FC<ProfileComplitionModalProps> = ({
    personalInfoCompleted,
    educationCompleted,
    workExperienceCompleted,
    resumeUploaded,
    rolesSelected,
    user,
    visible,
    setVisible,
}) => {
    const { id } = useParams();

    const navigate = useNavigate();

    return (
        <Dialog
            onHide={() => {}}
            visible={visible}
            modal
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="lg:max-w-[50vw] md:!w-4/5 !w-[90vw] lg:overflow-visible overflow-auto"
            content={() => (
                <div className="relativew-full flex items-center justify-center bg-white rounded-2xl px-6 py-10 overflow-hidden">
                    <div className="md:w-4/5 w-full flex flex-col items-center gap-6 font-manrope">
                        <div className="flex flex-col gap-6 border-b border-[#EBEBEB] pb-10">
                            <p className="text-3xl font-bold text-center text-black leading-10">
                                First, Complete Your Profile
                            </p>
                            <p className="text-base text-[#424242] font-medium text-center">
                                If you want to apply for this job, please
                                complete the information below first.
                            </p>
                        </div>

                        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-6 w-full list-disc list-inside text-black font-medium pt-4">
                            {!personalInfoCompleted && (
                                <li className="marker:text-primary">
                                    Personal Information
                                </li>
                            )}
                            {!educationCompleted && (
                                <li className="marker:text-primary">
                                    Educational Information
                                </li>
                            )}
                            {!workExperienceCompleted && (
                                <li className="marker:text-primary">
                                    Work Experience
                                </li>
                            )}
                            {!resumeUploaded && (
                                <li className="marker:text-primary">Resume</li>
                            )}
                            {!rolesSelected && (
                                <li className="marker:text-primary">
                                    Interested Job Categories
                                </li>
                            )}
                        </ul>

                        <div className="flex items-center justify-center gap-4 w-full">
                            <div className="w-3/5">
                                <PrimaryButton
                                    className="flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(EDIT_PROFILE);
                                        if (!user) {
                                            localStorage.setItem(
                                                "jobId",
                                                id || ""
                                            );
                                        }
                                    }}
                                >
                                    {"Yes, Procced"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-[#F0F0F0] absolute z-10 top-4 right-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            setVisible(false);
                        }}
                    >
                        <i className="pi pi-times"></i>
                    </button>
                </div>
            )}
        ></Dialog>
    );
};

export default ProfileComplitionModal;
