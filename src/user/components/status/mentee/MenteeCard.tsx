import React from 'react';
import { ChevronRight } from "lucide-react";
import { Mentee } from './types';

interface MenteeCardProps {
  mentee: Mentee;
}

const MenteeCard: React.FC<MenteeCardProps> = ({ mentee }) => {
  return (
    <div className="flex justify-center cursor-pointer">
      <div className="w-[90%] p-4 pt-3 flex justify-between items-center">
        <div className="flex gap-[19px]">
          <div className="flex flex-col gap-[12px] justify-center items-center">
            <img
              src={mentee.profileImage}
              alt="profileImage"
              className="h-[56px] w-[56px] block mx-auto"
            />
            <div className="bg-paymentblue text-primary-6 rounded-[30px] w-[61px] h-[26px] text-[12px] text-center flex items-center justify-center">
              {mentee.paymentStatus}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-[16px]">{mentee.name}</div>
            <div className="mt-[4px] text-[12px] text-gray-5">
              {mentee.jobTitle} | {mentee.career}년차
            </div>
          </div>
        </div>
        <ChevronRight strokeWidth={1} width={'24px'} height={'24px'} />
      </div>
    </div>
  );
};

export default MenteeCard;