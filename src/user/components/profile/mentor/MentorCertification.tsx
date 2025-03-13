import { useState } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import FileUpload from '@/user/components/FileUpload';

interface MentorCertificationProps {
  onSubmit: (files: {
    enrollment: File | null;
    certification: File | null;
  }) => void;
}

const MentorCertification = ({ onSubmit }: MentorCertificationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [certificateFiles, setCertificateFiles] = useState<{
    enrollment: File | null;
    certification: File | null;
  }>({
    enrollment: null,
    certification: null,
  });

  // 파일 업로드 핸들러
  const handleFileUpload = (
    file: File | null,
    type: 'ENROLLMENT' | 'GRADUATION' | 'EMPLOYMENT',
  ) => {
    setCertificateFiles((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  // 단계 변경
  const handleNext = () => {
    if (currentStep === 1) {
      onSubmit(certificateFiles); // 🔹 최종적으로 상위 컴포넌트로 전달
    } else {
      setCurrentStep((prev) => prev + 1); // 다음 단계로 이동
    }
  };

  // 현재 단계 UI 정의
  const sections = [
    {
      title: '학력 인증을 완료해주세요!',
      description: '* 재학 증명서, 졸업 증명서가 해당됩니다.',
      fileType: 'enrollment',
      selectedFile: certificateFiles.enrollment,
    },
    {
      title: '재직 인증을 완료해주세요!',
      description: '* 재직 증명서, 경력 증명서가 해당됩니다.',
      fileType: 'certification',
      selectedFile: certificateFiles.certification,
    },
  ];

  return (
    <div className="h-[calc(100dvh-10dvh)] flex flex-col relative">
      <FileUpload
        title={sections[currentStep].title}
        description={sections[currentStep].description}
        onFileSelect={(file) =>
          handleFileUpload(
            file,
            sections[currentStep].fileType as
              | 'ENROLLMENT'
              | 'GRADUATION'
              | 'EMPLOYMENT',
          )
        }
        selectedFile={sections[currentStep].selectedFile}
      />

      <div className="absolute bottom-[34px] w-full">
        <GlobalButton
          variant={sections[currentStep].selectedFile ? 'default' : 'secondary'}
          onClick={handleNext}
          disabled={!sections[currentStep].selectedFile}
        >
          {currentStep === 0 ? '다음으로' : '완료'}
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorCertification;
