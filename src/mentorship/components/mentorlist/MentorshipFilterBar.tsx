import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MentorshipFilterBarProps {
  selectedField: string | null;         // 직무
  selectedSubField: string | null;      // 세부직무
  onFilterClick: (filterType: '직무' | '세부직무') => void;
}

const MentorshipFilterBar: React.FC<MentorshipFilterBarProps> = ({
  selectedField,
  selectedSubField,
  onFilterClick,
}) => {
  return (
    <div className="w-full max-w-2xl px-4 pt-4 pb-[4px]">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {/* 직무 필터 버튼 */}
          <button
            onClick={() => onFilterClick('직무')}
            className={`pr-2 pl-3 py-1 border-[1px] rounded-[30px] text-[12px] flex items-center gap-[4px]
              ${
                selectedField
                  ? 'border-primary-4 text-primary-4 bg-paymentblue'
                  : 'border-gray-2 text-gray-2'
              }`}
          >
            {selectedField ?? '직무'}
            <ChevronDown strokeWidth={1} />
          </button>

          {/* 세부직무 필터 버튼 */}
          <button
            onClick={() => onFilterClick('세부직무')}
            className={`pr-2 pl-3 py-1 border-[1px] rounded-[30px] text-[12px] flex items-center gap-[4px]
              ${
                selectedSubField
                  ? 'border-primary-4 text-primary-4 bg-paymentblue'
                  : 'border-gray-2 text-gray-2'
              }`}
          >
            {selectedSubField ?? '세부직무'}
            <ChevronDown strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipFilterBar;