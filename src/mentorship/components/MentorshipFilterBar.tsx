import React from 'react';


interface MentorshipFilterBarProps {
  selectedField: string | null;
  selectedSubField: string | null;
  selectedYear: string | null;
  onFilterClick: (filterType: string) => void;
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
            className="px-4 py-1 border-[1px] border-gray-2 rounded-[30px] text-gray-2 text-[12px] flex items-center"
          >
            {selectedField ? selectedField : '직무'}
            <img
              src={'/assets/down.png'}
              alt="다운 아이콘"
              className="w-5 h-5 ml-1"
            />
          </button>

          {/* 직무/세부직무 필터 버튼 */}
          <button
            onClick={() => onFilterClick('세부직무')}
            className="px-4 py-1 border-[1px] border-gray-2 rounded-[30px] text-gray-2 text-[12px] flex items-center"
          >
            {selectedSubField ? selectedSubField : '세부직무'}
            <img
              src={'/assets/down.png'}
              alt="다운 아이콘"
              className="w-5 h-5 ml-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipFilterBar;
