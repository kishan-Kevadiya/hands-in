import React from "react"

interface Step {
  title: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

const StepperField: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col lg:items-start items-center">
      <div className="flex lg:flex-col flex-row lg:w-full md:w-4/5 w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex lg:w-auto w-full last:w-auto">
            <div className="flex lg:flex-col flex-row items-center lg:mr-4 lg:w-auto w-full">
              <div>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${index < currentStep + 1 ? "bg-primary text-white" : "bg-white text-black/40"}`}
                >
                  {index === steps.length ? (
                    <>
                      {index < currentStep ? "✓" : index}
                    </>
                  ) : (
                    <>
                      {index < currentStep ? "✓" : index + 1}
                    </>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`lg:h-full lg:w-auto w-full ${index < currentStep ? "border border-primary" : "border border-dashed border-[#C5C5C5]"}`} />
              )}
            </div>
            <div className={`lg:block hidden pt-1 ${index < steps.length - 1 ? "pb-16" : ""}`}>
              <p className={`mb-2 text-lg text-wrap font-bold ${index < currentStep + 1 ? "text-black" : "text-black/40"}`}>
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepperField;