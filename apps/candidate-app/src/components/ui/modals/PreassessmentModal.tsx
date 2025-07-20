import { PreassessmentPopup } from "@/assets/images";
import Circle from "@/assets/svg/preassessment-modal/Circle";
import ComboStar from "@/assets/svg/preassessment-modal/ComboStar";
import Star from "@/assets/svg/preassessment-modal/Star";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { RoleTable } from "@/types/profileSetup.types";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import React, { useEffect, useState } from "react";
import RadioField from "../auth/RadioField";
import PrimaryButton from "../buttons/PrimaryButton";
import InstructionModal from "./InstructionModal";

interface PreassessmentModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    roles?: RoleTable[];
}

const PreassessmentModal: React.FC<PreassessmentModalProps> = ({
    visible,
    setVisible,
    roles,
}) => {
    const [selectedChoice, setSelectedChoice] = useState<RoleTable>();
    const [InstructionModalVisible, setInstructionModalVisible] =
        useState(false);

    queryClient.removeQueries({
        queryKey: [USE_QUERY_KEYS.GET_TEST_QUESTIONS],
    });

    const onSubmit = () => {
        setInstructionModalVisible(true);
    };

    useEffect(() => {
        if (roles) {
            setSelectedChoice(roles[0]);
        }
    }, [roles]);

    return (
        <Dialog
            visible={visible}
            modal
            onHide={() => { }}
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="!w-[90vw] lg:max-w-[40vw] lg:overflow-visible md:!w-4/5 overflow-auto"
            content={() => (
                <div className="flex bg-white justify-center rounded-2xl w-full items-center overflow-hidden px-6 py-10 relative">
                    <div className="-right-10 -top-10 absolute">
                        <ComboStar />
                    </div>
                    <div className="-left-24 -top-24 absolute">
                        <Circle />
                    </div>
                    <div className="-bottom-40 -right-28 absolute">
                        <Circle />
                    </div>
                    <div className="flex flex-col w-full font-manrope gap-6 items-center md:w-4/5">
                        <div className="w-2/5 aspect-[1.15]">
                            <img
                                src={PreassessmentPopup}
                                alt="Preassessment"
                                className="h-full w-full"
                            />
                        </div>

                        <div className="md:text-3xl text-2xl text-black text-center font-bold leading-10">
                            Let's Get Started with Your
                            <br className="hidden md:block" />
                            <span className="inline-flex">
                                <Star />
                                {"\u00A0"} Preassessment!
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1z" fill="#DF6789"/>
                              </svg>
                            </span>

                            <h3 className="text-2xl"><span className="font-bold">4</span> mins</h3>
                        </div>

                        <p className="text-[#424242] text-base text-center font-medium">
                            Taking the test is mandatory to apply for any job.
                        </p>

                        <Divider
                            pt={{
                                root: {
                                    className: "before:border-[#EBEBEB] m-0",
                                },
                            }}
                        />

                        <div className="flex flex-wrap justify-center gap-6 items-center">
                            {roles?.map((role) => (
                                <RadioField
                                    key={role.id}
                                    name="role"
                                    onChange={() => setSelectedChoice(role)}
                                    id={role.id}
                                    label={role.title}
                                    value={role.id}
                                    checked={selectedChoice?.id === role?.id}
                                />
                            ))}
                        </div>

                        {(selectedChoice?.canGiveTest === undefined || selectedChoice?.canGiveTest) ? (
                            <div className="flex w-full items-center justify-center gap-4">
                                {/* <div className="w-2/5">
                                    <SecondaryButton
                                        customStyle="w-full h-full rounded-xl text-primary"
                                        label="Close"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setVisible(false);
                                        }}
                                    />
                                </div> */}

                                <div className="w-3/5">
                                    <PrimaryButton
                                        disabled={!selectedChoice}
                                        label="Next"
                                        onClick={onSubmit}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="text-black text-center font-medium">
                                The test will be available after{" "}
                                <span className="text-primary">
                                    {selectedChoice?.canGiveTestDaysAfter} days{" "}
                                </span>
                                .
                            </p>
                        )}
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

                    <InstructionModal
                        selectedRole={selectedChoice?.id || ""}
                        instructionModalVisible={InstructionModalVisible}
                        setInstructionModalVisible={setInstructionModalVisible}
                    />
                </div>
            )}
        ></Dialog>
    );
};

export default PreassessmentModal;
