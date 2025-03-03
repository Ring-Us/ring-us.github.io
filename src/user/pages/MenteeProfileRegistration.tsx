import { useState } from 'react';
import { Progress } from '@/global/ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  createMenteeProfile,
  uploadMenteeCertificate,
} from '@/user/api/profileApi';
import { MenteeProfileData } from '@/user/types/profileTypes';
import { defaultMenteeProfile } from '@/user/types/defaultMenteeData';

import MenteeProfile from '@/user/components/profile/mentee/MenteeProfile';
import MenteeCertification from '@/user/components/profile/mentee/MenteeCertification';

export default function MenteeProfileRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [menteeData, setMenteeData] =
    useState<MenteeProfileData>(defaultMenteeProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // selectedFile 추가
  const [isUploading, setIsUploading] = useState(false);

  // 다음 단계로 이동 (멘티 프로필 저장 후 인증서 업로드 진행)
  const handleNext = async () => {
    if (step === 1) {
      try {
        //console.log('🔹 멘티 프로필 데이터 전송:', menteeData);
        await createMenteeProfile(menteeData);
      } catch (error) {
        console.error('❌ 멘티 프로필 전송 실패:', error);
        alert('멘티 프로필 저장에 실패했습니다.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  // 인증서 업로드 후 멘티 프로필과 함께 제출
  const handleSubmitSetup = async () => {
    if (!selectedFile) {
      alert('먼저 인증서를 업로드해주세요.');
      return;
    }

    if (isUploading) return; // 중복 실행 방지

    setIsUploading(true);
    try {
      // FormData를 사용하여 인증서 업로드
      await uploadMenteeCertificate(selectedFile, 'ENROLLMENT');

      //console.log('인증서 업로드 완료, URL:', certificateUrl);

      alert('멘티 인증서 업로드가 완료되었습니다! 프로필 등록이 끝났습니다!');
      navigate('/user'); // 완료 후 마이페이지로 이동
    } catch (error) {
      console.error('❌ 멘티 인증서 업로드 실패:', error);
      alert('멘티 인증서 업로드에 실패했습니다.');
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
      onFileUpload={setSelectedFile} // 변경된 부분
      selectedFile={selectedFile} // 추가된 부분
      onSubmit={handleSubmitSetup}
      isUploading={isUploading}
      key="step2"
    />,
  ];

  // 진행률 계산 (현재 단계 / 전체 단계 * 100)
  const progressValue = (step / steps.length) * 100;

  return (
    <div className="relative w-full px-6 mx-auto h-screen flex flex-col">
      <button
        className="absolute top-8 left-3 rounded-full"
        onClick={() =>
          step === 1 ? navigate('/user') : setStep((prev) => prev - 1)
        }
      >
        <ArrowLeft className="w-6 h-6 text-gray-1" />
      </button>
      <div className="flex justify-center mt-24">
        <Progress value={progressValue} className="w-full rounded-md" />
      </div>
      <div className="flex-grow">{steps[step - 1]}</div>
    </div>
  );
}
