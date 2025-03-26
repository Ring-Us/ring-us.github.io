import { useState } from 'react';
import { Progress } from '@/global/ui';
import { useNavigate } from 'react-router-dom';
import {
  createMentorProfile,
  uploadMentorCertificate,
} from '@/user/api/profileApi';
import { MentorProfileData } from '@/user/types/profileTypes';
import { defaultMentorProfile } from '@/user/types/defaultMentorData';

import TopNavbar from '@/global/ui/TopNavbar';
import MentorProfile1 from '@/user/components/profile/mentor/MentorProfile1';
import MentorProfile2 from '@/user/components/profile/mentor/MentorProfile2';
import MentorProfile3 from '@/user/components/profile/mentor/MentorProfile3';
import MentorCertification from '@/user/components/profile/mentor/MentorCertification';

export default function MentorProfileRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mentorData, setMentorData] =
    useState<MentorProfileData>(defaultMentorProfile);

  // 인증서 파일 상태 저장
  const [mentorCertificates, setMentorCertificates] = useState<{
    enrollment: File | null;
    certification: File | null;
  }>({
    enrollment: null,
    certification: null,
  });

  // 다음 단계로 이동
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  // 멘토 인증서 등록 (파일 업로드)
  const handleSubmitSetup = async (files: {
    enrollment: File | null;
    certification: File | null;
  }) => {
    try {
      // 멘토 프로필 먼저 저장
      console.log('멘토 프로필 전송:', JSON.stringify(mentorData, null, 2));
      await createMentorProfile(mentorData);

      // 학력 인증 업로드
      if (files.enrollment) {
        await uploadMentorCertificate(files.enrollment, 'ENROLLMENT');
      }

      // 재직 인증 업로드
      if (files.certification) {
        await uploadMentorCertificate(files.certification, 'EMPLOYMENT');
      }

      alert('멘토 프로필 및 인증서 등록이 완료되었습니다!');
      navigate('/user'); // 완료 후 마이페이지 이동
    } catch (error) {
      console.error('❌ 프로필 또는 인증서 업로드 실패:', error);
      alert('프로필 또는 인증서 업로드에 실패했습니다.');
    }
  };

  const steps = [
    <MentorProfile1
      mentorData={mentorData}
      setMentorData={setMentorData}
      onNext={handleNext}
      key="step1"
    />,
    <MentorProfile2
      mentorData={mentorData}
      setMentorData={setMentorData}
      onNext={handleNext}
      key="step2"
    />,
    <MentorProfile3
      mentorData={mentorData}
      setMentorData={setMentorData}
      onNext={handleNext}
      key="step3"
    />,
    <MentorCertification
      onSubmit={(files) => {
        setMentorCertificates(files);
        handleSubmitSetup(files);
      }}
      key="step4"
    />,
  ];

  // 진행률 계산
  const progressValue = (step / steps.length) * 100;

  return (
    <div className="relative w-full px-6 mx-auto flex flex-col">
      <TopNavbar
        title="프로필 등록"
        onBack={() =>
          step === 1 ? navigate('/user') : setStep((prev) => prev - 1)
        }
      />
      <div className="pt-[70px] flex flex-col justify-center items-center">
        <Progress value={progressValue} className="w-full rounded-md pb-3" />
      </div>
      <div className="flex-grow">{steps[step - 1]}</div>
    </div>
  );
}
