import { PreassessmentPopup } from "@/assets/images";
import Circle from "@/assets/svg/preassessment-modal/Circle";
import ComboStar from "@/assets/svg/preassessment-modal/ComboStar";
import Star from "@/assets/svg/preassessment-modal/Star";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { ASSESSMENT } from "@/routes";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../buttons/PrimaryButton";

interface InstructionModalProps {
    selectedRole: string;
    instructionModalVisible: boolean;
    setInstructionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionModal: React.FC<InstructionModalProps> = ({
    selectedRole,
    instructionModalVisible,
    setInstructionModalVisible,
}) => {

    const navigate = useNavigate();

    queryClient.removeQueries({
        queryKey: [USE_QUERY_KEYS.GET_TEST_QUESTIONS],
    });

    const onSubmit = () => {
        setInstructionModalVisible(false);
        navigate(ASSESSMENT + "/" + selectedRole);
    }

    return (
        <Dialog
            visible={instructionModalVisible}
            modal
            onHide={() => { }}
            onClick={(e) => { e.stopPropagation(); }}
            className="!w-[90vw] md:!w-4/5 !h-[90vh] max-h-[90vh] overflow-auto lg:max-w-[50vw] lg:!h-[90vh] lg:max-h-[90vh]"
            content={() => (
                <div className="flex bg-white justify-center rounded-2xl w-full items-center overflow-hidden px-6 py-10 relative">
                    <div className="-right-18 top-1/5 absolute">
                        <ComboStar />
                    </div>
                    <div className="-left-24 -top-24 absolute">
                        <Circle />
                    </div>
                    <div className="-bottom-40 -right-28 absolute">
                        <Circle />
                    </div>
                    <div className="flex flex-col w-full font-manrope gap-6 items-center md:w-4/5">

                        <div className="w-36 aspect-[1.15]">
                            <img src={PreassessmentPopup} alt="Preassessment" className="h-full w-full" />
                        </div>

                        <div className="lg:flex items-center justify-center gap-2 text-2xl text-black text-center font-bold leading-10">
                            Welcome to Your HeadsIn
                            <br className="lg:hidden" />
                            <span className="inline-flex">
                                <Star /> {"\u00A0"} Pre-Assessment!
                            </span>
                        </div>
                        <p className="text-black text-base text-center font-medium">
                            Read Carefully Before You Begin
                        </p>

                        <div className="flex flex-col justify-center gap-6 items-center w-full">

                            <div className="flex flex-col gap-2 text-[#393939] text-sm w-full">
                                <h3 className="text-lg font-semibold text-primary">Test Overview:</h3>
                                <ul className="list-disc list-inside flex flex-col gap-1">
                                    <li>The assessment consists of 8 questions.</li>
                                    <li>You will have a total of 240 seconds (4 minutes) to complete the test.</li>
                                    <li>Each question carries a different weightage, contributing to your final score.</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-2 text-[#393939] text-sm w-full">
                                <h3 className="text-lg font-semibold text-primary">Test Guidelines:</h3>
                                <ul className="list-disc list-inside flex flex-col gap-1">
                                    <li>The timer will start once you begin. You cannot pause or revisit the test.</li>
                                    <li>You can only appear for the assessment once every 15 days, so ensure you are prepared.</li>
                                    <li>The test dynamically adjusts based on the role and experience level, ensuring relevance for your profile.</li>
                                    <li>Your final score will impact your profile visibility and increase your chances of being shortlisted for relevant roles.</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-2 text-[#393939] text-sm w-full">
                                <h3 className="text-lg font-semibold text-primary">Important Notes:</h3>
                                <ul className="list-disc list-inside flex flex-col gap-1">
                                    <li>Make sure you have a stable internet connection before starting.</li>
                                    <li>No retakes allowed within the 15-day window after completing the assessment.</li>
                                    <li>This score will be reflected on your profile and updated with every reassessment.</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-2 text-[#393939] text-sm w-full">
                                <h3 className="text-lg font-semibold text-primary">Pro Tip:</h3>
                                <ul className="list-disc list-inside flex flex-col gap-1">
                                    <li>Think fast and answer accurately! Since time is limited, focus on your strengths and aim for a higher score to enhance your profile's visibility.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center gap-4">
                            <div className="w-2/5">
                                <PrimaryButton
                                    label="Let’s Begin"
                                    onClick={(e) => { e.stopPropagation(); onSubmit(); }} />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#F0F0F0] absolute z-10 top-4 right-4"
                            onClick={(e) => { e.stopPropagation(); setInstructionModalVisible(false); }}
                        >
                            <i className="pi pi-times"></i>
                        </button>
                    </div>
                </div>
            )}
        ></Dialog>
    );
};

export default InstructionModal;
