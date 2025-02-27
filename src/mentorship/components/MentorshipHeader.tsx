import React from 'react';
import searchIcon from '/src/assets/search.png';
import marketingImg from '/src/assets/marketingImg.png';

interface MentorshipHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MentorshipHeader: React.FC<MentorshipHeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full max-w-2xl mt-[16px] px-4">
      {/* 검색창 */}
      <div className="w-full p-2 h-[48px] flex items-center bg-gray-6 rounded-[30px]">
        <img src={searchIcon} alt="검색 아이콘" className="w-6 h-6 ml-2 mr-1" />
        <input
          type="text"
          placeholder="회사, 직무, 학과, 닉네임으로 검색하기"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-1 text-[16px] text-gray-900 placeholder-gray-7 focus:outline-none bg-muted"
        />
      </div>

      {/* 타이틀 + 이미지 */}
      <div className="flex items-center gap-[14px] mt-[16px]">
        <div className="text-[32px] font-bold text-primary-1">마케팅</div>
        <img src={marketingImg} alt="마케팅 이미지" className="w-[44px] h-[44px]" />
      </div>
    </div>
  );
};

export default MentorshipHeader;