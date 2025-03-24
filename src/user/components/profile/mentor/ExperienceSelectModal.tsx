import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface ExperienceSelectModalProps {
  experience: number;
  setExperience: (value: number) => void;
}

const ExperienceSelectModal = ({
  experience,
  setExperience,
}: ExperienceSelectModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 연도 옵션 생성 (0~40년)
  const years = Array.from({ length: 41 }, (_, i) => i);

  return (
    <div className="relative">
      {/* 라벨 */}
      <label className="text-[14px] mb-2 block">경력</label>

      {/* 경력 선택 버튼 */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-full h-[45px] border-b-[2px] flex items-center justify-between cursor-pointer pl-2"
      >
        <span
          className={`text-[16px] ${experience ? 'text-black' : 'text-gray-2'}`}
        >
          {experience ? `${experience}년` : '총 경력을 선택해 주세요.'}
        </span>
        <ChevronDown className="text-gray-2 mr-3" size={18} />
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[600px] h-[400px] rounded-t-[20px] p-6 relative">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[16px] font-bold">총 경력 선택</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* 스크롤 선택 */}
            <div className="h-[250px] overflow-y-auto flex flex-col items-center">
              {years.map((year) => (
                <button
                  key={year}
                  className={`py-2 text-lg transition-all w-full text-center ${
                    experience === year
                      ? 'text-primary-1 font-bold text-xl bg-gray-100'
                      : 'text-gray-1 opacity-50'
                  }`}
                  onClick={() => {
                    setExperience(year);
                    setIsModalOpen(false); // 선택 후 닫기
                  }}
                >
                  {year}년
                </button>
              ))}
            </div>

            {/* 완료 버튼 */}
            <div className="absolute bottom-0 left-0 w-full bg-white px-4 pb-4 pt-3">
              <button
                className="w-full bg-primary-1 text-white py-3 rounded-md text-center"
                onClick={() => setIsModalOpen(false)}
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSelectModal;
