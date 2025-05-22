import { useState } from 'react';
import { MentorProfileData } from '@/user/types/profileTypes';
import { uploadPortfolio } from '@/user/api/profileApi';
import { X } from 'lucide-react';
import ErrorModal from '@/global/ui/ErrorModal'; // 모달 import

interface MentorPortfolioProps {
  mentorData: MentorProfileData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorProfileData>>;
}

const MentorPortfolio = ({
  mentorData,
  setMentorData,
}: MentorPortfolioProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ALLOWED_EXTENSIONS = ['pdf', 'zip', 'hwp', 'ppt', 'docx', 'jpg', 'png'];

  // 파일 업로드 (10MB 이하 파일만 허용, 1개만 업로드 가능)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
        setErrorMessage(
          '지원하지 않는 파일 형식입니다.\n(pdf, zip, hwp, ppt, docx, jpg, png만 가능)',
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(
          '파일 크기가 너무 큽니다.<br />10MB 이하의 파일만 업로드해주세요.',
        );
        return;
      }

      try {
        const fileUrl = await uploadPortfolio(file);
        setMentorData((prev) => ({
          ...prev,
          portfolio: {
            url: fileUrl,
            description: file.name,
            fileSize: file.size,
          },
        }));
      } catch (err) {
        setErrorMessage('포트폴리오 업로드에 실패했습니다.');
      }
    }
  };

  // 파일 열기 (파일명을 클릭했을 때)
  const openFile = () => {
    if (mentorData.portfolio?.url) {
      window.open(mentorData.portfolio.url, '_blank');
    }
  };

  // 파일 삭제
  const removeFile = () => {
    setMentorData((prev) => ({
      ...prev,
      portfolio: null, // 파일 정보 삭제
    }));
  };

  return (
    <div className="px-4 my-2">
      {/* 에러 모달 */}
      {errorMessage && (
        <ErrorModal
          title="파일 업로드 오류"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="text-[14px] my-4">포트폴리오 (선택)</div>

      {/* 업로드된 파일 표시 */}
      {mentorData.portfolio && mentorData.portfolio.description ? (
        <div
          className="bg-[#F2F2F6] rounded-[10px] px-5 py-3 text-[12px] flex justify-between items-center cursor-pointer"
          onClick={openFile}
        >
          <div>
            <span>{mentorData.portfolio.description}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
          >
            <X size={16} strokeWidth={1.0} />
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <label className="w-[30%] px-5 py-2 cursor-pointer border border-primary-1 text-primary-1 text-[12px] rounded-[10px] flex justify-center items-center">
            파일 선택
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <div className="text-[12px] text-[#A0A0A0] mt-2">
            첨부 파일은 최대 10MB까지 등록 가능합니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorPortfolio;
