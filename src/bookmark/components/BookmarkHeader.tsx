import React from 'react';
import { Bookmark } from 'lucide-react';

const MentorshipHeader: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mt-[16px] px-4">
      {/* 타이틀 + 이미지 */}
      <div className="flex items-center gap-[5px] mt-[16px]">
        <div className="text-[28px] font-bold text-primary-4">북마크</div>
        <Bookmark
            strokeWidth={2}
            className={`w-[30px] h-[30px] stroke-primary-4`}>
        </Bookmark>
      </div>
    </div>
  );
};

export default MentorshipHeader;