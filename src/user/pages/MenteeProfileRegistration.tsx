import { useState } from 'react';
import { Progress } from '@/global/ui';
import { useNavigate } from 'react-router-dom';
import {
  createMenteeProfile,
  uploadMenteeCertificate,
} from '@/user/api/profileApi';
import { MenteeProfileData } from '@/user/types/profileTypes';
import { defaultMenteeProfile } from '@/user/types/defaultMenteeData';

import TopNavbar from '@/global/ui/TopNavbar';
import MenteeProfile from '@/user/components/profile/mentee/MenteeProfile';
import MenteeCertification from '@/user/components/profile/mentee/MenteeCertification';

export default function MenteeProfileRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [menteeData, setMenteeData] =
    useState<MenteeProfileData>(defaultMenteeProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmitSetup = async () => {
    if (!selectedFile) {
      alert('먼저 인증서를 업로드해주세요.');
      return;
    }

    if (isUploading) return;

    setIsUploading(true);
    try {
      // 멘티 프로필 저장
      await createMenteeProfile(menteeData);

      // 인증서 업로드
      await uploadMenteeCertificate(selectedFile, 'ENROLLMENT');

      alert('멘티 프로필과 인증서 등록이 완료되었습니다!');
      navigate('/user');
    } catch (error) {
      console.error('❌ 프로필 또는 인증서 업로드 실패:', error);
      alert('프로필 또는 인증서 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const steps = [
    <MenteeProfile
      menteeData={menteeData}
      setMenteeData={setMenteeData}
      onNext={handleNext}
      key="step1"
    />,
    <MenteeCertification
      onFileUpload={setSelectedFile}
      selectedFile={selectedFile}
      onSubmit={handleSubmitSetup}
      isUploading={isUploading}
      key="step2"
    />,
  ];

  const progressValue = (step / steps.length) * 100;

  return (
    <div className="relative w-full mx-auto px-6 flex flex-col">
      {/* 글로벌 네비게이션 바 추가 (스크롤 시 고정) */}
      <TopNavbar
        title="프로필 등록"
        onBack={() =>
          step === 1 ? navigate('/user') : setStep((prev) => prev - 1)
        }
      />
      {/* 상단 여백 추가 (네비게이션 바 높이 만큼) */}
      <div className="pt-[70px] flex flex-col justify-center items-center">
        <Progress value={progressValue} className="w-full rounded-md pb-3" />
      </div>

      <div className="flex-grow">{steps[step - 1]}</div>
    </div>
  );
}
