import { useState } from 'react';
import { AuthButton } from '@/global/ui/GlobalButton';
import FileUpload from '@/user/components/FileUpload';
import MenteeProfile from '@/user/components/mentee/MenteeProfile'; // 프로필 설정 컴포넌트 추가

const MenteeSetup = ({
  onNext,
}: {
  onNext: (uploadedFiles: (File | null)[]) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([null]);

  const sections = [
    {
      content: (
        <FileUpload
          title="학생 인증을 완료해주세요!"
          description="* 재학 증명서, 학생증, 졸업 증명서가 해당됩니다."
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
        <MenteeProfile
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

export default MenteeSetup;
