import { useState } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import FileUpload from '@/user/components/FileUpload';
import ErrorModal from '@/global/ui/Modal'; // 에러 모달 import

interface MenteeCertificationProps {
  onFileUpload: (file: File | null) => void;
  onSubmit: () => void;
  isUploading: boolean;
  selectedFile: File | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB 제한

const MenteeCertification = ({
  onFileUpload,
  onSubmit,
  isUploading,
  selectedFile,
}: MenteeCertificationProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 파일 선택 시 유효성 검사
  const handleFileSelect = (file: File | null) => {
    if (file) {
      // 파일 크기 검증
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage(
          '❌ 파일 크기가 너무 큽니다. 10MB 이하의 이미지를 업로드해주세요.',
        );
        onFileUpload(null);
        return;
      }

      // 정상 파일이면 업로드
      setErrorMessage(null);
      onFileUpload(file);
    } else {
      onFileUpload(null);
    }
  };

  return (
    <div className="h-[calc(100dvh-10dvh)] flex flex-col relative">
      <FileUpload
        title="학생 인증을 완료해주세요!"
        description="* 재학 증명서, 학생증, 졸업 증명서가 해당됩니다."
        onFileSelect={handleFileSelect} // 유효성 검사 추가
        selectedFile={selectedFile}
        isUploading={isUploading}
      />

      {/* 에러 모달 */}
      {errorMessage && (
        <ErrorModal
          title="파일 업로드 오류"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="absolute bottom-[34px] w-full">
        <GlobalButton
          variant={selectedFile ? 'default' : 'secondary'}
          onClick={onSubmit}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? '업로드 중...' : '완료'}
        </GlobalButton>
      </div>
    </div>
  );
};

export default MenteeCertification;
