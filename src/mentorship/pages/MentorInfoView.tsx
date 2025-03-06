import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';

import MentorInfoProfile from '../../user/components/profileInfo/MentorInfoProfile';
import MentorInfoBio from '../../user/components/profileInfo/MentorInfoBio';
import MentorInfoFieldsHashtags from '../../user/components/profileInfo/MentorInfoFieldsHashtags';
import MentorInfoTime from '../../user/components/profileInfo/MentorInfoTime';
import MentorInfoMessage from '../../user/components/profileInfo/MentorInfoMessage';
import MentorInfoPortfolio from '../../user/components/profileInfo/MentorInfoPortfolio';

const MentorInfoView = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 테스트용 멘티 데이터 && localStorage에서 데이터 불러오기 (api 연결시 제거)
  const [mentorData, setMentorData] = useState(() => {
    const savedData = localStorage.getItem("mentorData");
    return savedData ? JSON.parse(savedData) : {
      nickname: "바이",
      email: "abcd@gmail.com",
      education: {
        schoolName: "경북대학교",
        major: "컴퓨터공학",
      },
      organization: {
        name: "OO주식회사",
        role: "브랜드 마케팅/카피라이팅",
        experience: 6,
      },
      count: 716,
      image: {
        fileName: "",
        filePath: "",
      },
      introduction: {
        summary: "브랜드 마케팅에 대한 모든 것을 알려드립니다.",
        bio: "안녕하세요!\n저는 OO대학교 경영학과를 졸업하고 현재 XXXX에 다니고 있는 ‘바이’입니다.",
      },        
      availableDays: ["월", "목"],
      timezone: {
        startTime: { period: "오전", hour: "10", minute: "00"},
        endTime: { period: "오후", hour: "18", minute: "00"},
      },
      mentoringField: ["취업 준비", "커리어 고민"],        
      hashtags: ["마케팅", "브랜드마케팅", "이직", "취준", "진로고민상담", "면접노하우"],
      message: "안녕하세요, 멘티 여러분!\n브랜드 마케팅 경험을 바탕으로 여러분의 성장을 지원하고 싶습니다.",
      portfolio: [
        {
          url: "https://example.com/portfolio1.pdf",
          description: "브랜드 마케팅 포트폴리오.pdf",
          size: 25,
        },
      ],
    };
  });

  useEffect(() => {
    const storedBookmark = localStorage.getItem("isBookmarked");
    setIsBookmarked(storedBookmark === "true");
  }, []);

  const toggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    localStorage.setItem("isBookmarked", newBookmarkState.toString());
  };

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
              onClick={() => navigate("/mentorship")}
            />
            <Bookmark
              size={22}
              strokeWidth={1.0}
              className="cursor-pointer"
              fill={isBookmarked ? "white" : "none"}
              stroke="white"
              onClick={toggleBookmark}
            />
          </div>
              
          {/* 프로필 섹션 */}
          <MentorInfoProfile 
            nickname={mentorData.nickname} 
            name={mentorData.organization.name}
            role={mentorData.organization.role} 
            experience={mentorData.organization.experience} 
            count={mentorData.count}
            image={mentorData?.image?.filePath || "/assets/ringusprofile.png"}
          />
        </div>

        <div className="">

          {/* 자기소개 */}
          <MentorInfoBio 
            summary={mentorData.introduction.summary}
            bio={mentorData.introduction.bio}
          />

          {/* 선호 시간대 */}
          <MentorInfoTime
            availableDays={mentorData.availableDays} 
            startTime={mentorData.timezone.startTime} 
            endTime={mentorData.timezone.endTime} 
          />

          {/* 멘토링 분야 & 해시태그 */}
          <MentorInfoFieldsHashtags 
            mentoringField={mentorData.mentoringField} 
            hashtags={mentorData.hashtags} 
          />

          {/* 멘티에게 전하고 싶은 말 */}
          <MentorInfoMessage message={mentorData.message} />

          {/* 포트폴리오 */}
          <MentorInfoPortfolio portfolio={mentorData.portfolio} />
        </div>
      </div>

      {/* 멘토링 제안하기 버튼 */}
      <div className="sticky text-center px-4 py-4 border-t">
        <GlobalButton
          onClick={() => navigate("/mentorship/suggestion")}
        >
          멘토링 제안하기
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorInfoView;