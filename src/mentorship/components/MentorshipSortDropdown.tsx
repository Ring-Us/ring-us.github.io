import React from 'react';
import downIcon from '/src/assets/down.png';

interface MentorshipSortDropdownProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

const MentorshipSortDropdown: React.FC<MentorshipSortDropdownProps> = ({
  sortOption,
  onSortChange,
}) => {
  return (
    <div className="max-w-[600px] w-full flex justify-end items-center mt-[16px] px-4">
      <label className="relative flex items-center">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-[12px] text-gray-2 appearance-none cursor-pointer focus:outline-none w-full pr-[26px]"
          style={{
            backgroundImage: `url(${downIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
            backgroundSize: '24px 24px',
          }}
        >
          <option value="review">후기 많은 순</option>
          <option value="respond">응답률 높은 순</option>
          <option value="mStar">별점 높은 순</option>
        </select>
      </label>
    </div>
  );
};

export default MentorshipSortDropdown;