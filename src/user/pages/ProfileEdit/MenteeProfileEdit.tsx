import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

import { getMenteeProfile, updateMenteeProfile } from "@/user/api/MenteeInfoApi";
import { useMenteeInfoStore } from "@/user/store/useMenteeInfoStore";

import EditProfileSectionMentee from "@/user/components/ProfileEdit/EditProfileSectionMentee";
import EditBioMentee from "@/user/components/ProfileEdit/EditBioMentee";
import { GlobalButton } from "@/global/ui/GlobalButton";

const MenteeProfileEdit = () => {
  const navigate = useNavigate();
  const { menteeData, setMenteeData } = useMenteeInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenteeProfile();
        setMenteeData(data);
      } catch (error) {
        console.error('멘티 프로필 로딩 실패:', error);
      }
    };
    fetchData();
  }, [setMenteeData]);

  const handleSave = async () => {
    try {
      if (!menteeData) return;
      await updateMenteeProfile(menteeData);
      navigate("/user/menteeinfo");
    } catch (error) {
      console.error("멘티 프로필 저장 실패:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  if (!menteeData) {
    return <div className="p-4">Loading...</div>;
  }

  // 작성 완료 버튼 활성화 여부
  const isFormComplete =
    menteeData.introduction.trim() !== "";

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
        <EditProfileSectionMentee />

        {/* 자기소개 섹션 */}
        <EditBioMentee />
        
      </div>
            
      {/* 저장 버튼 */}
      <div className="sticky px-4 py-4 border-t">
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

export default MenteeProfileEdit;