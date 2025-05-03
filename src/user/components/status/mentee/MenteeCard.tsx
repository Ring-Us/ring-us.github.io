import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Mentee } from './types';
import { useNavigate } from 'react-router-dom';

interface MenteeCardProps {
  mentee: Mentee;
}

const MenteeCard: React.FC<MenteeCardProps> = ({ mentee }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/status/mentee/progress/${mentee.id}`);
  };
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="flex justify-center cursor-pointer p-3 pb-2 pt-2">
        <div className="bg-white w-full p-4 pt-3 rounded-lg relative">
          <div className="absolute top-3 left-4">
            <div className="bg-paymentblue text-primary-6 rounded-[30px] px-3 h-[26px] text-[12px] flex items-center justify-center">
              {mentee.paymentStatus}
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex justify-between items-center mt-10">
            {/* 이미지 */}
            <img
              src={mentee.profileImage}
              alt="profileImage"
              className="h-[56px] w-[56px] border border-gray-4 rounded-[50px]"
            />

            {/* 텍스트 정보 */}
            <div className="flex flex-col pl-4 flex-grow">
              <div className="font-bold text-[17px]">{mentee.name}</div>
              <div className="mt-[4px] text-[12px] text-gray-5">
                {mentee.jobTitle} | {mentee.career}년차
              </div>
            </div>

            {/* 오른쪽 화살표 */}
            <ChevronRight strokeWidth={1} width="24px" height="24px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeCard;
