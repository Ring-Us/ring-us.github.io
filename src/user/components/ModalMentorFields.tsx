import React, { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface ModalMentorFieldsProps {
  label: string;
  placeholder: string;
  options: string[];
  subOptions?: { [key: string]: string[] }; // 세부 직무 옵션 추가
  value: { jobCategory: string; detailedJob: string };
  onChange: (value: { jobCategory: string; detailedJob: string }) => void;
}

const ModalMentorFields: React.FC<ModalMentorFieldsProps> = ({
  label,
  placeholder,
  options,
  subOptions,
  value,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMainOption, setSelectedMainOption] = useState<string | null>(
    null,
  ); // 직무 선택
  const [selectedSubOption, setSelectedSubOption] = useState<string>(''); // 세부 직무 선택
  const [step, setStep] = useState(1); // 단계(1: 직무 선택, 2: 세부 직무 선택)

  // ✅ 모달이 열릴 때 Step을 초기화
  useEffect(() => {
    if (isModalOpen) {
      setStep(1); // 모달 열리면 첫 번째 단계로 초기화
    }
  }, [isModalOpen]);

  return (
    <div className="relative">
      {/* 라벨 */}
      <label className="text-[14px] mb-2 block">{label}</label>

      {/* 클릭 가능한 인풋 박스 */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-full h-[45px] border-b-[2px] flex items-center justify-between cursor-pointer pl-2"
      >
        <span
          className={`text-[16px] ${value.jobCategory && value.detailedJob ? 'text-black' : 'text-gray-2'} truncate`}
        >
          {selectedMainOption && selectedSubOption
            ? `${selectedMainOption} / ${selectedSubOption}`
            : placeholder}
        </span>
        <ChevronDown className="text-gray-2 mr-3" size={18} />
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)} // 바깥 클릭하면 모달 닫힘
        >
          {/* 모달 본문 */}
          <div
            className="w-full max-w-[600px] bg-white rounded-t-[30px] overflow-hidden p-4 min-h-[400px] relative"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
          >
            {/* 모달 상단 */}
            <div className="flex justify-between items-center p-2">
              <h2 className="text-[16px] font-bold">
                {step === 1 ? '직무 선택' : '세부 직무 선택'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-3 hover:text-gray-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* STEP 1: 직무 선택 */}
            {step === 1 && (
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-3 mt-[20px]">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedMainOption(option)}
                      className={`p-[12px] border rounded-[8px] text-[14px] text-center min-w-[113px] h-[43px] flex justify-center items-center ${
                        selectedMainOption === option
                          ? 'border-primary-1 text-primary-1'
                          : 'text-gray-2'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: 세부 직무 선택 */}
            {step === 2 && selectedMainOption && subOptions && (
              <div className="flex flex-col gap-[20px] mt-[20px] max-h-[50vh] overflow-y-auto px-3">
                {subOptions[selectedMainOption]?.map((subOption) => (
                  <button
                    key={subOption}
                    onClick={() => setSelectedSubOption(subOption)}
                    className={`rounded-[8px] text-[12px] text-start ${
                      selectedSubOption === subOption
                        ? 'text-primary-1 font-bold'
                        : 'text-gray-2'
                    }`}
                  >
                    {subOption}
                  </button>
                ))}
              </div>
            )}

            {/* 버튼 하단 고정 */}
            <div className="absolute bottom-0 left-0 w-full bg-white px-4 pb-4 pt-3">
              {step === 1 ? (
                <button
                  onClick={() => {
                    if (selectedMainOption) setStep(2);
                  }}
                  className="w-full bg-primary-1 text-white py-3 rounded-md text-center"
                  disabled={!selectedMainOption}
                >
                  다음으로
                </button>
              ) : (
                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/2 border border-primary-1 text-primary-1 py-3 rounded-md text-center"
                  >
                    이전으로
                  </button>
                  <button
                    onClick={() => {
                      if (selectedMainOption && selectedSubOption) {
                        onChange({
                          jobCategory: selectedMainOption, // 직무 (main)
                          detailedJob: selectedSubOption, // 세부 직무 (sub)
                        });
                        setIsModalOpen(false);
                      }
                    }}
                    className="w-1/2 bg-primary-1 text-white py-3 rounded-md text-center"
                  >
                    선택 완료
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMentorFields;
