import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  fieldOptions,
  subFieldOptions,
} from '@/global/components/JobCategories';

interface MentorshipListFilterProps {
  filterType: '직무' | '세부직무';
  onClose: () => void;
  selectedField: string | null;
  onFieldSelect: (field: string | null) => void;
  selectedSubField: string | null;
  onSubFieldSelect: (sub: string | null) => void;
  subFields: string[];
}

const MentorshipListFilter: React.FC<MentorshipListFilterProps> = ({
  filterType,
  onClose,
  selectedField,
  onFieldSelect,
  selectedSubField,
  onSubFieldSelect,
  subFields,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  const handleFieldClick = (field: string) => {
    onFieldSelect(field);
    handleClose();
  };

  const handleSubFieldClick = (sub: string) => {
    onSubFieldSelect(sub);
    handleClose();
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0; }
        }
        .animate-slide-out { animation: slideDown 300ms forwards; }
      `}</style>

      <div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] h-full bg-[#000] bg-opacity-75 flex justify-center items-end z-50"
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          onAnimationEnd={handleAnimationEnd}
          className={`bg-[#fff] w-full rounded-t-[20px] p-4 min-h-[366px] ${isClosing ? 'animate-slide-out' : ''}`}
        >
          <div className="pl-3 mt-[10px]">
            <div className="flex justify-between items-center">
              <h2 className="text-[16px] font-bold">
                {filterType === '직무' ? '직무 선택' : '세부직무 선택'}
              </h2>
              <button onClick={handleClose} className="p-1">
                <X strokeWidth={1} className="w-6 h-6 text-gray-1" />
              </button>
            </div>
          </div>

          {/* 직무 선택 필터 */}
          {filterType === '직무' && (
            <div className="grid grid-cols-3 gap-x-[11px] mt-[34px] gap-y-[13px]">
              {fieldOptions.map((field) => (
                <button
                  key={field}
                  onClick={() => handleFieldClick(field)}
                  className={`p-[12px] border rounded-[8px] text-[14px] text-center min-w-[113px] h-[43px] flex justify-center items-center ${(field === '전체' && !selectedField) || selectedField === field
                    ? 'border-primary-1 text-primary-1'
                    : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {field}
                </button>
              ))}
            </div>
          )}

          {/* 세부직무 선택 필터 */}
          {filterType === '세부직무' && selectedField && (
            <div className="flex flex-col gap-[0px] mt-[34px] mx-auto px-3 mb-[10px]">
              {subFields.length > 0 ? (
                subFields.map((subField) => (
                  <button
                    key={subField}
                    onClick={() => handleSubFieldClick(subField)}
                    className={`rounded-[8px] text-[12px] text-start p-2 ${(subField === '전체' && !selectedSubField) || selectedSubField === subField
                      ? 'text-primary-1'
                      : 'text-gray-800'
                      }`}
                  >
                    {subField}
                  </button>
                ))
              ) : (
                <div className="text-center text-gray-2 mt-[20px]">
                  선택 가능한 세부직무가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MentorshipListFilter;