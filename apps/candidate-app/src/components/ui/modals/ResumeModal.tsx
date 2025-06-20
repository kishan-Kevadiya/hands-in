import ResumeIcon from "@/assets/svg/ResumeIcon";
import ComboStar from "@/assets/svg/preassessment-modal/ComboStar";
import { applyApplication } from "@/helpers/apis/application";
import { getUser } from "@/helpers/apis/auth";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import { JOBS, RESUME } from "@/routes";
import { ResumePlatformType } from "@/types/jobs.types";
import { useQuery } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../buttons/PrimaryButton";
import { NoProfile } from "@/assets/images";

interface ResumeModalProps {
    jobId: string;
    role: string;
    logo: string;
    companyName: string;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
    jobId,
    role,
    logo,
    companyName,
    visible,
    setVisible,
}) => {

    const [selectedResume, setSelectedResume] = useState<ResumePlatformType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const userData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_USER],
        queryFn: async () => await getUser(),
    })

    const handleApply = async () => {
        setIsLoading(true);
        try {
            if (!selectedResume) {
                return;
            }
            const response = await applyApplication({
                jobId: jobId,
                resumeType: selectedResume,
            })

            if (response) {
                showToast("success", response.data);
            }
            setVisible(false);
            navigate(JOBS + "/" + jobId);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);

    }

    return (
        <Dialog
            onHide={() => { }}
            visible={visible}
            modal
            onClick={(e) => { e.stopPropagation(); }}
            className="lg:max-w-[50vw] md:!w-4/5 !w-[90vw] lg:overflow-visible overflow-auto"
            content={() => (
                <div className="relativew-full flex items-center justify-center bg-white rounded-2xl px-6 py-10 overflow-hidden">
                    <div className="md:w-4/5 w-full flex flex-col items-center gap-6 font-manrope">

                        <p className="text-3xl font-bold text-center text-black leading-10">
                            Select Your Resume
                        </p>
                        <p className="text-base text-[#424242] font-medium text-center">
                            {`Are you sure you want to apply for the ${role} job role?`}
                        </p>

                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
                            <label htmlFor="resume" className="flex items-center gap-2 cursor-pointer border border-primary rounded-2xl px-4 py-4.5 w-full">
                                <input
                                    name="resume"
                                    type="radio"
                                    id="resume"
                                    className='accent-primary cursor-pointer h-6 w-6'
                                    onChange={() => setSelectedResume(ResumePlatformType.uploadedResume)} />
                                <div className='w-4 h-4 mx-2 bg-white rounded-full flex items-center justify-center'>
                                    <ResumeIcon />
                                </div>
                                <p className='cursor-pointer text-black font-medium w-3/5 truncate'>{userData.data?.uploadedResumeName}</p>
                            </label>

                            <label
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!userData.data?.hasHeadsinResumeCreated) {
                                        navigate(RESUME);
                                    }
                                }}
                                htmlFor="headsin-resume"
                                className="relative border border-primary rounded-2xl overflow-hidden"
                            >
                                <div className="absolute -top-2 -right-12 w-20"><ComboStar width="45" height="45" /></div>
                                <div className="flex items-center gap-2 cursor-pointer bg-[#FFF4F7] px-4 py-2 w-full">
                                    <input
                                        disabled={!userData.data?.hasHeadsinResumeCreated}
                                        name="resume"
                                        type="radio"
                                        id="headsin-resume"
                                        className='accent-primary cursor-pointer h-6 w-6'
                                        onChange={() => setSelectedResume(ResumePlatformType.headsInResume)}
                                    />
                                    <div className='w-4 h-4 mx-2 bg-white rounded-full flex items-center justify-center'>
                                        <ResumeIcon />
                                    </div>
                                    <div className="flex flex-col w-3/5">
                                        <p className='cursor-pointer text-primary font-semibold truncate break-words'>{"HeadsIn Resume"}</p>
                                        <p className='cursor-pointer text-sm text-black truncate'>{"Job chances by 60% with HeadsIn Resume!"}</p>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className="flex flex-col gap-2  items-center justify-center md:px-6 px-2 py-4 border border-[#EBEBEB] rounded-2xl w-full">
                            <p className="text-[#666666] font-medium ">Applying on</p>
                            <div className="flex items-center justify-center gap-2 w-full">
                                <div className="bg-[#F7FAFF] rounded-full min-w-14 w-14 min-h-14 h-14 flex items-center justify-center border border-primary">
                                    <img src={logo || NoProfile} alt="company logo" className="w-full h-full object-contain rounded-full" />
                                </div>
                                <p className="text-black text-xl font-semibold truncate max-w-4/5">{companyName}</p>
                            </div>
                            <p className="text-black md:text-xl text-base font-semibold"><span className="text-[#707070] text-base font-normal">Role: </span>{role}</p>
                        </div>

                        <div className="flex items-center justify-center gap-4 w-full">
                            <div className="w-3/5">
                                <PrimaryButton className="flex items-center justify-center" disabled={!selectedResume || isLoading} onClick={(e) => { e.stopPropagation(); handleApply(); }}>
                                    {isLoading ? <i className="pi pi-spin pi-spinner text-2xl animate-spin text-white" /> : "Yes, Procced"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-[#F0F0F0] absolute z-10 top-4 right-4"
                        onClick={(e) => { e.stopPropagation(); setVisible(false); }}
                    >
                        <i className="pi pi-times"></i>
                    </button>
                </div>
            )}
        ></Dialog>
    );
};

export default ResumeModal;
