import { GlobalButton } from '@/global/ui/GlobalButton';
import FileUpload from '@/user/components/FileUpload';

interface MenteeCertificationProps {
  onFileUpload: (file: File | null) => void; // null 허용
  onSubmit: () => void;
  isUploading: boolean;
  selectedFile: File | null;
}

const MenteeCertification = ({
  onFileUpload,
  onSubmit,
  isUploading,
  selectedFile,
}: MenteeCertificationProps) => {
  return (
    <div className="h-[calc(100dvh-10dvh)] flex flex-col relative">
      <FileUpload
        title="학생 인증을 완료해주세요!"
        description="* 재학 증명서, 학생증, 졸업 증명서가 해당됩니다."
        onFileSelect={(file) => onFileUpload(file)} // null도 전달 가능하게 처리
        selectedFile={selectedFile}
        isUploading={isUploading}
      />

      <div className="absolute bottom-[34px] w-full">
        <GlobalButton
          variant={selectedFile ? 'default' : 'secondary'}
          onClick={onSubmit}
          disabled={!selectedFile || isUploading} // selectedFile이 없으면 비활성화
        >
          {isUploading ? '업로드 중...' : '완료'}
        </GlobalButton>
      </div>
    </div>
  );
};

export default MenteeCertification;
