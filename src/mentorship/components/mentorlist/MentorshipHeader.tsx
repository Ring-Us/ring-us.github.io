import React from 'react';

const MentorshipHeader: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mt-[16px] px-4">
      {/* 타이틀 + 이미지 */}
      <div className="flex items-center gap-[14px] mt-[16px]">
        <div className="text-[32px] font-bold text-primary-1">마케팅</div>
        <img
          src={'/assets/marketingImg.png'}
          alt="마케팅 이미지"
          className="w-[44px] h-[44px]"
        />
      </div>
    </div>
  );
};

export default MentorshipHeader;