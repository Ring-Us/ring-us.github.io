import { useState } from 'react';
import { AuthButton } from '@/global/ui/GlobalButton';
import FileUpload from '@/user/components/FileUpload';
import MentorProfile from '@/user/components/mentor/MentorProfile'; // 프로필 설정 컴포넌트 추가

const MentorSetup = ({
  onNext,
}: {
  onNext: (uploadedFiles: (File | null)[]) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([
    null,
    null,
  ]);

  const sections = [
    {
      content: (
        <FileUpload
          title="학력 인증을 완료해주세요!"
          description="* 재학 증명서, 졸업 증명서가 해당됩니다."
          onFileSelect={(file) => {
            const newFiles = [...uploadedFiles];
            newFiles[0] = file; // 첫 번째 섹션의 파일 저장
            setUploadedFiles(newFiles);
          }}
          selectedFile={uploadedFiles[0]} // 기존 파일 상태 유지
        />
      ),
    },
    {
      content: (
        <FileUpload
          title="재직 인증을 완료해주세요!"
          description="* 재직 증명서, 경력 증명서가 해당됩니다."
          onFileSelect={(file) => {
            const newFiles = [...uploadedFiles];
            newFiles[1] = file; // 두 번째 섹션의 파일 저장
            setUploadedFiles(newFiles);
          }}
          selectedFile={uploadedFiles[1]} // 기존 파일 상태 유지
        />
      ),
    },
    {
      content: (
        <MentorProfile
          onNext={() => onNext(uploadedFiles)} // 프로필 설정 완료 시 업로드한 파일 정보 전달
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1); // 다음 섹션으로 이동
    } else {
      onNext(uploadedFiles); // 모든 섹션 완료 후 파일 정보 전달
    }
  };

  const isNextEnabled = () => {
    if (currentStep === 0) {
      return uploadedFiles[0] !== null;
    }
    if (currentStep === 1) {
      return uploadedFiles[1] !== null;
    }
    return true; // 마지막 섹션은 항상 활성화
  };

  return (
    <div className="relative flex flex-col w-full">
      {/* 현재 섹션 내용 */}
      {sections[currentStep].content}

      {/* 버튼 영역 */}
      <div className="absolute bottom-16 w-full flex justify-between">
        {currentStep < sections.length - 1 && (
          <AuthButton
            variant={isNextEnabled() ? 'default' : 'secondary'}
            onClick={handleNext}
          >
            다음으로
          </AuthButton>
        )}
      </div>
    </div>
  );
};

export default MentorSetup;
