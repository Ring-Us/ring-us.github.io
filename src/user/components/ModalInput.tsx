import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface ModalInputProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const ModalInput: React.FC<ModalInputProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className={`text-sm ${value ? 'text-base' : 'text-gray-2'} truncate`}
        >
          {value || placeholder}
        </span>
        <ChevronDown className="text-gray-1 mr-3" size={18} />
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setIsModalOpen(false)} // 바깥 클릭하면 모달 닫힘
        >
          {/* 모달 본문 */}
          <div className="w-full max-w-[600px] h-full bg-[#171717] bg-opacity-80 flex items-end">
            <div
              className="w-full max-w-[600px] bg-[#ffffff] rounded-t-[30px] overflow-hidden overflow-y-auto h-[50vh]"
              onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
            >
              {/* 닫기 버튼 */}
              <div className="flex items-center justify-end px-4 py-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-2 hover:text-gray-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 옵션 리스트 */}
              <ul className="flex-1 overflow-y-auto px-4 pb-6">
                {options.map((option) => (
                  <li
                    key={option}
                    className="py-2 pl-4 hover:bg-gray-3 cursor-pointer"
                    onClick={() => {
                      onChange(option);
                      setIsModalOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalInput;
