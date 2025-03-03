import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';

import MenteeInfoProfile from '@/user/components/profileInfo/MenteeInfoProfile';
import MenteeInfoBio from '@/user/components/profileInfo/MenteeInfoBio';

const MenteeInfo = () => {
  const navigate = useNavigate();

  // 테스트용 멘티 데이터 && localStorage에서 데이터 불러오기 (api 연결시 제거)
  const [menteeData, setMenteeData] = useState(() => {
    const savedData = localStorage.getItem("menteeData");
    return savedData ? JSON.parse(savedData) : {
      nickname: "김멘티",
      email: "kimtee@gmail.com",
      education: {
        schoolName: "경북대학교 · 석사",
        major: "심리학과 · 경영학과",
      },
      image: {
        fileName: "",
        filePath: "",
      },
      introduction: {
        summary: "광고 기획자를 꿈꾸는 열정넘치는 학생입니다!",
        bio: "광고 기획자라는 점을 가지고 있는 상황에서 선배님들의 조언을 듣고 싶습니다",
      }
    };
  });

  return (
    <div className="h-screen flex flex-col relative overflow-y-auto">

      {/* 보라색 */}
      <div className="bg-mentor-gradient rounded-b-[30px]">

        {/* 헤더 */}
        <div className="flex justify-between items-center mx-6 mt-[30px]">
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
          email={menteeData.email}
          schoolName={menteeData.education.schoolName}
          major={menteeData.education.major}
          image={menteeData.image.filePath}
        />
      </div>

      {/* 자기소개 */}
      <MenteeInfoBio 
        summary={menteeData.introduction.summary}
        bio={menteeData.introduction.bio}
      />

      {/* 수정 버튼 */}
      <div className="text-center px-4 mb-5 mt-auto">
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