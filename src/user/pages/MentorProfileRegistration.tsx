import { useState } from 'react';
import { Progress } from '@/global/ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  createMentorProfile,
  createMentorCertification,
} from '@/user/api/profileApi';
import {
  MentorProfileData,
  MentorCertificateData,
} from '@/user/types/profileTypes';
import {
  defaultMentorProfile,
  defaultMentorSetup,
} from '@/user/types/defaultMentorData';

import MentorProfile1 from '@/user/components/profile/mentor/MentorProfile1';
import MentorProfile2 from '@/user/components/profile/mentor/MentorProfile2';
import MentorProfile3 from '@/user/components/profile/mentor/MentorProfile3';
import MentorCertification from '@/user/components/profile/mentor/MentorCertification';

export default function MentorProfileRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mentorData, setMentorData] =
    useState<MentorProfileData>(defaultMentorProfile);
  const [mentorSetupData, setMentorSetupData] =
    useState<MentorCertificateData>(defaultMentorSetup);

  // 다음 단계로 이동 (멘토 프로필 저장 시 API 호출)
  const handleNext = async () => {
    if (step === 3) {
      try {
        console.log('🔹 멘토 프로필 데이터 전송:', mentorData);
        await createMentorProfile(mentorData);
      } catch (error) {
        console.error('❌ 멘토 프로필 전송 실패:', error);
        alert('멘토 프로필 저장에 실패했습니다.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    step === 1 ? navigate('/user') : setStep((prev) => prev - 1);
  };

  // 멘토 인증서 등록 (MentorSetup 완료 시 API 호출)
  const handleSubmitSetup = async () => {
    try {
      console.log('🔹 멘토 설정 데이터 전송:', mentorSetupData);
      await createMentorCertification(mentorSetupData);
      alert('멘토 설정이 완료되었습니다!');
      navigate('/user'); // 완료 후 마이페이지로 이동
    } catch (error) {
      console.error('❌ 멘토 설정 전송 실패:', error);
      alert('멘토 설정 저장에 실패했습니다.');
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
      onPrev={handlePrev}
      key="step2"
    />,
    <MentorProfile3
      mentorData={mentorData}
      setMentorData={setMentorData}
      onNext={handleNext}
      onPrev={handlePrev}
      key="step3"
    />,
    <MentorCertification
      mentorSetupData={mentorSetupData}
      setMentorSetupData={setMentorSetupData}
      onSubmit={handleSubmitSetup}
      onPrev={handlePrev}
      key="step4"
    />,
  ];

  //  진행률 계산 (현재 단계 / 전체 단계 * 100)
  const progressValue = (step / steps.length) * 100;

  return (
    <div className="relative w-full px-6 mx-auto h-screen flex flex-col">
      <button
        className="absolute top-8 left-3 rounded-full"
        onClick={handlePrev}
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
