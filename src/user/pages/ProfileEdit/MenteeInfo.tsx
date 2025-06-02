import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';

import { getMenteeProfile } from '@/user/api/MenteeInfoApi';
import { useMenteeInfoStore } from '@/user/store/useMenteeInfoStore';

import MenteeInfoProfile from '@/user/components/profileInfo/MenteeInfoProfile';
import MenteeInfoBio from '@/user/components/profileInfo/MenteeInfoBio';

const MenteeInfo = () => {
  const navigate = useNavigate();
  const { menteeData, setMenteeData } = useMenteeInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenteeProfile();
        setMenteeData(data);
      } catch (error) {
        console.error('멘티 정보 로딩 실패:', error);
      }
    };
    fetchData();
  }, [setMenteeData]);

  if (!menteeData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">

      <div className="overflow-y-auto">

        {/* 보라색 */}
        <div className="bg-mentor-gradient rounded-b-[24px]">

          {/* 헤더 */}
          <div className="flex justify-between items-center px-4 py-3 h-[55px]">
            <ArrowLeft
              size={24}
              strokeWidth={1.0}
              className="text-white cursor-pointer"
              onClick={() => navigate("/user")}
            />
            <span className="text-[20px] text-[#fff] font-[500]">멘티 프로필</span>
            <div className="w-6 h-6"></div>
          </div>
              
          {/* 프로필 섹션 */}
          <MenteeInfoProfile 
            nickname={menteeData.nickname}
            schoolName={menteeData.education.schoolName}
            major={menteeData.education.major}
            image={menteeData.image.filePath}
          />
        </div>

        {/* 자기소개 */}
        <MenteeInfoBio 
          introduction={menteeData.introduction}
        />
      </div>


      {/* 수정 버튼 */}
      <div className="sticky text-center px-4 py-4 mt-auto border-t">
        <GlobalButton
          onClick={() => navigate("/user/menteeedit")}
        >
          수정하기
        </GlobalButton>
      </div>
    </div>
  );
};

export default MenteeInfo;