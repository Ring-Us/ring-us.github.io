import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

import { MenteeData } from "@/user/menteetypes";
import EditProfileSectionMentee from "@/user/components/ProfileEdit/EditProfileSectionMentee";
import EditBio from "@/user/components/ProfileEdit/EditBio";
import { GlobalButton } from "@/global/ui/GlobalButton";

const MenteeProfileEdit = () => {
  const navigate = useNavigate();

  // 테스트용 멘티 데이터 && localStorage에서 데이터 불러오기 (api 연결시 제거)
  const [menteeData, setMenteeData] = useState<MenteeData>(() => {
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
        title: "광고 기획자를 꿈꾸는 열정넘치는 학생입니다!",
        content: "광고 기획자라는 점을 가지고 있는 상황에서 선배님들의 조언을 듣고 싶습니다",
      }
    };
  });

  // 수정된 내용을 localStorage에 저장하는 함수 (api 연결시 제거)
  const handleSave = () => {
    localStorage.setItem("menteeData", JSON.stringify(menteeData)); // localStorage에 저장
    navigate("/user/menteeinfo"); // 수정 완료 후 MenteeInfo로 이동
  };

  // 작성 완료 버튼 활성화 여부 확인
  const isFormComplete =
    menteeData.introduction.title.trim() !== "" &&
    menteeData.introduction.content.trim() !== "";

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">

      {/* 헤더 */}
      <div className="flex justify-between items-center px-4 py-3 h-[55px] border-b">
        <ArrowLeft
          size={24}
          strokeWidth={1.0}
          className="text-black cursor-pointer"
          onClick={() => navigate("/user/menteeinfo")}
        />
          <div className="text-[20px] font-[500]">프로필 수정</div>
          <div className="w-6 h-6"></div>
      </div>
        
      <div className="overflow-y-auto pt-2 pb-4">

        {/* 프로필 섹션 */}
        <EditProfileSectionMentee menteeData={menteeData} setMenteeData={setMenteeData} />

        {/* 자기소개 섹션 */}
        <EditBio menteeData={menteeData} setMenteeData={setMenteeData} />
        
      </div>
            
      {/* 저장 버튼 */}
      <div className="sticky px-4 py-4 border-t">
        <GlobalButton
          // onClick={() => isFormComplete && navigate("/user/menteeinfo")}
          onClick={handleSave}
          disabled={!isFormComplete}
        >
          작성 완료
        </GlobalButton>
      </div>
    </div>
  );
};

export default MenteeProfileEdit;