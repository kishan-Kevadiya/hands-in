import SecondaryButton from '@/components/ui/auth/SecondaryButton';
import StepperField from '@/components/ui/stepper/StepperField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Education from './Education';
import PersonalInformation from './PersonalInformation';
import UploadResumeCertificate from './UploadResumeCertificate';
import WorkExperience from './WorkExperience';
import { BROWSE_JOBS } from '@/routes';


const steps = [
    {
        title: "Personal Information",
        header: "Describe Yourself to Us",
    },
    {
        title: "Education",
        header: "Tell me about your schooling",
    },
    {
        title: "Work Experience ",
        header: "Would you be willing to share your experience?",
    },
    {
        title: "Resume & Certificate ",
        header: "Upload Your Resume",
    },
]

const CompleteProfile: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0)

    const handleNextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }

        if (currentStep === steps.length - 1) {
            navigate(BROWSE_JOBS);
        }
    }

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="flex items-center justify-center lg:h-screen lg:py-10 lg:px-14 md:p-6 p-4 bg-[#F7FAFF] font-manrope">
            <div className="flex lg:flex-row flex-col gap-4 bg-white/50 rounded-2xl h-full w-full">
                <div className='flex flex-col lg:gap-12 md:gap-8 gap-6 lg:w-1/4 w-full bg-[#FFE9EF] h-full rounded-2xl p-8'>
                    <div className="w-40 aspect-[6.04]">
                        <img src="/logo.webp" alt="logo" />
                    </div>

                    <StepperField steps={steps} currentStep={currentStep} />
                </div>

                <div className='lg:w-3/4 w-full bg-white h-full rounded-2xl lg:p-6 md:p-4 p-2 overflow-y-auto'>

                    <div className='flex flex-col gap-10'>
                        <div className="flex items-center justify-between gap-3">
                            <h1 className="lg:text-4xl text-2xl font-semibold tracking-[-1px] w-11/12">
                                {steps[currentStep]?.header}
                            </h1>

                            <SecondaryButton customStyle="md:w-fit" label="Skip" onClick={handleNextStep} />
                        </div>

                        {currentStep === 0 && <PersonalInformation onNext={handleNextStep} />}

                        {currentStep === 1 && <Education onNext={handleNextStep} onPrevious={handlePreviousStep} />}

                        {currentStep === 2 && <WorkExperience onNext={handleNextStep} onPrevious={handlePreviousStep} />}

                        {currentStep === 3 && <UploadResumeCertificate onNext={handleNextStep} onPrevious={handlePreviousStep} />}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile
