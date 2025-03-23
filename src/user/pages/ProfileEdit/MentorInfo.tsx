import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';

import { getMentorProfile } from '@/user/api/MentorInfoApi';
import { MentorData } from '@/user/types';
import { reverseJobCategoryMapping, reverseDetailedJobMapping } from '@/user/components/mapping';
import { reverseMentoringFieldMapping, reverseDayMapping } from '@/user/components/mapping';

import MentorInfoProfile from '@/user/components/profileInfo/MentorInfoProfile';
import MentorInfoBio from '@/user/components/profileInfo/MentorInfoBio';
import MentorInfoFieldsHashtags from '@/user/components/profileInfo/MentorInfoFieldsHashtags';
import MentorInfoTime from '@/user/components/profileInfo/MentorInfoTime';
import MentorInfoMessage from '@/user/components/profileInfo/MentorInfoMessage';
import MentorInfoPortfolio from '@/user/components/profileInfo/MentorInfoPortfolio';

const MentorInfo = () => {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState<MentorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMentorProfile();
        setMentorData(data);
      } catch (error) {
        console.error('멘토 정보 로딩 실패:', error);
      }
    };
    fetchData();
  }, []);

  if (!mentorData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">

      <div className="overflow-y-auto pb-4">

        {/* 보라색 */}
        <div className="bg-mentor-gradient rounded-b-[30px]">

          {/* 헤더 */}
          <div className="flex justify-between items-center px-4 py-3 h-[55px]">
            <ArrowLeft
              size={24}
              strokeWidth={1.0}
              className="text-white cursor-pointer"
              onClick={() => navigate("/user")}
            />
            <span className="text-[20px] text-[#fff] font-[500]">멘토 프로필</span>
            <div className="w-6 h-6"></div>
          </div>
                
          {/* 프로필 섹션 */}
          <MentorInfoProfile 
            nickname={mentorData.nickname} 
            name={mentorData.organization.name}
            jobCategory={reverseJobCategoryMapping[mentorData.organization.jobCategory] || mentorData.organization.jobCategory}
            detailedJob={reverseDetailedJobMapping[mentorData.organization.detailedJob] || mentorData.organization.detailedJob}
            experience={mentorData.organization.experience} 
            count={mentorData.count}
            image={mentorData?.image?.filePath || "/assets/ringusprofile.png"}
          />
        </div>

        <div className="">

          {/* 자기소개 */}
          <MentorInfoBio 
            title={mentorData.introduction.title}
            content={mentorData.introduction.content}
          />

          {/* 선호 시간대 */}
          <MentorInfoTime
            days={mentorData.timezone.days.map((day) => reverseDayMapping[day] || day)}
            startTime={mentorData.timezone.startTime} 
            endTime={mentorData.timezone.endTime} 
          />

          {/* 멘토링 분야 & 해시태그 */}
          <MentorInfoFieldsHashtags 
            mentoringField={mentorData.mentoringField.map((field) => reverseMentoringFieldMapping[field] || field)}
            hashtags={mentorData.hashtags} 
          />

          {/* 멘티에게 전하고 싶은 말 */}
          <MentorInfoMessage message={mentorData.message} />

          {/* 포트폴리오 */}
          <MentorInfoPortfolio portfolio={mentorData.portfolio} />

        </div>
      </div>

      {/* 수정하기 버튼 */}
      <div className="sticky text-center px-4 py-4 border-t">
        <GlobalButton
          onClick={() => navigate("/user/mentoredit")}
        >
          수정하기
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorInfo;