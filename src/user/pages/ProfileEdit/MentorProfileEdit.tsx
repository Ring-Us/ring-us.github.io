import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';

import { MentorData } from '@/user/types';
import { getMentorProfile, updateMentorProfile } from '@/user/api/MentorInfoApi';

import EditProfileSection from '@/user/components/ProfileEdit/EditProfileSection';
import EditBio from '@/user/components/ProfileEdit/EditBio';
import EditFields from '@/user/components/ProfileEdit/EditFields';
import EditTime from '@/user/components/ProfileEdit/EditTime';
import EditMessage from '@/user/components/ProfileEdit/EditMessage';
import EditHashtags from '@/user/components/ProfileEdit/EditHashtags';
import EditPortfolio from '@/user/components/ProfileEdit/EditPortfolio';

const MentorProfileEdit = () => {
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

  const handleSave = async () => {
    try {
      await updateMentorProfile(mentorData);
      navigate("/user/mentorinfo");
    } catch (error) {
      console.error("멘토 정보 저장 실패:", error);
      alert("멘토 정보 저장 중 오류가 발생했습니다.");
    }
  };

  // 작성 완료 버튼 활성화 여부
  const isFormComplete =
    mentorData.introduction?.title?.trim() !== '' &&
    mentorData.introduction?.content?.trim() !== '' &&
    mentorData.timezone?.days?.length > 0;


  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      
      {/* 헤더 */}
      <div className="sticky flex justify-between items-center px-4 py-3 h-[55px] border-b">
        <ArrowLeft
          size={24}
          strokeWidth={1.0}
          className="text-black cursor-pointer"
          onClick={() => navigate("/user/mentorinfo")}
        />
        <div className="text-[20px] font-[500]">프로필 수정</div>
        <div className="w-6 h-6"></div>
      </div>
          
      <div className="overflow-y-auto pb-4">

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

export default MentorProfileEdit;
