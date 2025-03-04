import React from 'react';
import { MentorType } from '@/mentorship/pages/mentorlist/MentorshipList.types';
import { Bookmark } from 'lucide-react';

interface MentorItemProps {
  mentor: MentorType;
  isBookmarked: boolean;
  onToggleBookmark: (mName: string) => void;
}

const MentorItem: React.FC<MentorItemProps> = ({
  mentor,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <div className="bg-white p-4 border-b relative w-min-[361px]">
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => onToggleBookmark(mentor.mName)}
         >
        <Bookmark strokeWidth={1}
          className={`w-[24px] h-[24px] ${
            isBookmarked
              ? 'stroke-primary-4 fill-primary-4'
              : 'stroke-gray-2 fill-none'
          }`}
        />
      </div>
      <div className="flex items-center space-x-[13px]">
        <img
          src={'/assets/Profile.png'}
          alt="프로필"
          className="w-[78px] h-[78px] rounded-full object-cover"
        />
        <div>
          <div className="text-[16px] font-bold">{mentor.mName}</div>
          <div className="mt-[4px] text-gray-5 text-[12px]">{mentor.mcompany}</div>
          <div className="text-gray-5 text-[12px]">{mentor.mJobDetail}</div>{' '}

          <div className="text-gray-5 text-[12px]">{mentor.mYear}</div>
          <div className="flex items-center justify-between gap-[22px] border border-gray-8 px-2 py-0.5 rounded-[5px] mt-[4px] h-[30px]">
            <span className="text-primary-3 text-[12px]">멘토링 횟수</span>
            <span className="text-gray-5 text-[12px]">{mentor.respond}회</span> {/* 변수명 수정해야함 */}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-[12px] mt-[15px]">{mentor.intro}</p>
    </div>
  );
};

export default MentorItem;
