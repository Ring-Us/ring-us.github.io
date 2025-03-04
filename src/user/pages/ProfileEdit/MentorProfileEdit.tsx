import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { GlobalButton } from "@/global/ui/GlobalButton";

import { MentorData } from "@/user/types";
import EditProfileSection from "@/user/components/ProfileEdit/EditProfileSection";
import EditBio from "@/user/components/ProfileEdit/EditBio";
import EditFields from "@/user/components/ProfileEdit/EditFields";
import EditTime from "@/user/components/ProfileEdit/EditTime";
import EditMessage from "@/user/components/ProfileEdit/EditMessage";
import EditHashtags from "@/user/components/ProfileEdit/EditHashtags";
import EditPortfolio from "@/user/components/ProfileEdit/EditPortfolio";

const MentorProfileEdit = () => {
  const navigate = useNavigate();

  // 테스트용 멘티 데이터 && localStorage에서 데이터 불러오기 (api 연결시 제거)
  const [mentorData, setMentorData] = useState<MentorData>(() => {
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
      count: "716",
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
      hashtags: ["마케팅", "브랜드마케팅",],
      message: "안녕하세요, 멘티 여러분!\n브랜드 마케팅 경험을 바탕으로 여러분의 성장을 지원하고 싶습니다.",
      portfolio: [
        {
          url: "https://example.com/portfolio1.pdf",
          description: "브랜드 마케팅 포트폴리오.pdf",
          size: 25000000,
        },
      ],
    };
  });

  // 수정된 내용을 localStorage에 저장하는 함수 (API 연결 시 제거)
  const handleSave = () => {
    localStorage.setItem("mentorData", JSON.stringify(mentorData)); // ✅ localStorage에 저장
    navigate("/user/mentorinfo"); // ✅ 수정 완료 후 MentorInfo로 이동
  };

  // 작성 완료 버튼 활성화 여부 확인
  const isFormComplete =
    mentorData.introduction.summary.trim() !== "" &&
    mentorData.introduction.bio.trim() !== "" &&
    mentorData.availableDays.length > 0;

  return (
    <div className="h-screen flex flex-col relative overflow-y-auto">

      {/* 헤더 */}
      <div className="flex justify-between items-center mx-6 mt-[30px]">
        <ArrowLeft
          size={24}
          strokeWidth={1.0}
          className="text-black cursor-pointer"
          onClick={() => navigate("/mentorship/info")}
        />
        <div className="text-[20px] font-[500]">프로필 수정</div>
        <div className="w-6 h-6"></div>
      </div>
          
      {/* 프로필 섹션 */}
      <EditProfileSection mentorData={mentorData} setMentorData={setMentorData} />

      {/* 자기소개 섹션 */}
      <EditBio mentorData={mentorData} setMentorData={setMentorData} />
      
      {/* 선호 시간대 */}
      <EditTime mentorData={mentorData} setMentorData={setMentorData} />

      {/* 멘토링 분야 */}
      <EditFields mentorData={mentorData} setMentorData={setMentorData} />

      {/* 멘티에게 전하고 싶은 말 */}
      <EditMessage mentorData={mentorData} setMentorData={setMentorData} />
      
      {/* 경험 해시태그 */}
      <EditHashtags mentorData={mentorData} setMentorData={setMentorData} />

      {/* 포트폴리오*/}
      <EditPortfolio mentorData={mentorData} setMentorData={setMentorData} />
              
      {/* 저장 버튼 */}
      <div className="text-center px-4 mb-5 mt-10">
        <GlobalButton
          onClick={handleSave}
          disabled={!isFormComplete}
        >
          작성 완료
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorProfileEdit;