import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MentorshipSortDropdownProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

const MentorshipSortDropdown: React.FC<MentorshipSortDropdownProps> = ({
  sortOption,
  onSortChange,
}) => {
  return (
    <div className="relative inline-block mt-[16px] px-4 w-full justify-end">
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full text-[12px] text-gray-2 appearance-none cursor-pointer focus:outline-none text-right pr-[20px]"
      >
        <option value="review">후기 많은 순</option>
        <option value="respond">응답률 높은 순</option>
        <option value="mStar">별점 높은 순</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-[4px]">
        <ChevronDown strokeWidth={1} height="24px" width="24px" color="#94939B"/>
      </div>
    </div>
  );
};

export default MentorshipSortDropdown;