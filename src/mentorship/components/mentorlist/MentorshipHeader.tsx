import React from 'react';
import { fieldIcons } from '@/global/components/JobCategories'; 

interface MentorshipHeaderProps {
  selectedField: string | null;
}

const MentorshipHeader: React.FC<MentorshipHeaderProps> = ({ selectedField }) => {
  const field = selectedField || '전체';
  const iconSrc = fieldIcons[field] ?? '/assets/main/overall.png';

  return (
    <div className="w-full max-w-2xl mt-[16px] px-4">
      <div className="flex items-center gap-[14px] mt-[16px]">
        <div className="text-[32px] font-bold text-primary-1">{field}</div>
        <img
          src={iconSrc}
          alt={`${field} 이미지`}
          className="w-auto h-[44px]"
        />
      </div>
    </div>
  );
};

export default MentorshipHeader;