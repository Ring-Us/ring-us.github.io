// src/components/MentoringStepBar.tsx
import React from 'react';

const steps = ['결제대기', '수락대기', '멘토링 확정'];

interface MentoringStepBarProps {
  currentStep: number;
}

const MentoringStepBar: React.FC<MentoringStepBarProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center px-6 pt-4 pb-20">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 flex flex-col items-center relative">
          <img
            src={
              index <= currentStep
                ? '/public/assets/ringusProgress.png'
                : '/public/assets/ringusProgressGray.png'
            }
            alt="progress"
            className={`w-9 h-9 mt-10 mb-2 z-10 bg-[#F8F7FF]`}
          />
          {/* 텍스트 */}
          <span
            className={`text-[12px] ${
              index <= currentStep ? 'text-[#7C6FF6]' : 'text-gray-3'
            }`}
          >
            {step}
          </span>

          {/* 라인 */}
          {index < steps.length - 1 && (
            <div className="absolute top-[60px] left-1/2 w-full h-[2px] -z-0">
              <div
                className={`h-full ${
                  index < currentStep ? 'bg-[#7C6FF6]' : 'bg-gray-3'
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MentoringStepBar;
