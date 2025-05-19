import { MentorData } from '@/user/types';
import { X } from 'lucide-react';

interface EditPortfolioProps {
  mentorData: MentorData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorData | null>>;
}

const EditPortfolio = ({ mentorData, setMentorData }: EditPortfolioProps) => {
  
  // 파일 삭제
  const removeFile = () => {
    setMentorData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        portfolio: null,
      };
    });
  };

  // 파일 업로드 (10MB 이하 파일만 허용)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // 10MB 초과하면 업로드 차단
      if (file.size > 10 * 1000 * 1000) {
        alert('10MB 이하의 파일만 업로드할 수 있습니다.');
        e.target.value = ''; // 파일 선택 초기화
        return;
      }

      // 기존 파일이 있으면 삭제 후 새 파일 업로드
      removeFile();

      setMentorData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          portfolio: {
            url: URL.createObjectURL(file),
            description: file.name,
            size: file.size,
          },
        };
      });
    }
  };

  // 파일 열기
  const openFile = () => {
    if (mentorData.portfolio) {
      window.open(mentorData.portfolio.url, '_blank');
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="font-bold text-[16px] my-4">포트폴리오</div>

      {/* 업로드된 파일이 있을 경우 표시 */}
      {mentorData.portfolio && (
        <div
          className="bg-[#F2F2F6] rounded-[10px] px-5 py-3 text-[12px] flex justify-between items-center cursor-pointer"
          onClick={openFile}
        >
          <div>
            <span>{mentorData.portfolio.description}</span>
            <span className="text-[#94939B] ml-1">
              ({(mentorData.portfolio.size / 1000000).toFixed(1)}MB)
            </span>
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
      )}

      {/* 파일 업로드 버튼 */}
      <div className="mt-3">
        <label className="w-[30%] px-5 py-2 cursor-pointer border border-primary-1 text-primary-1 text-[12px] rounded-[10px] flex justify-center items-center">
          파일 선택
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <div className="text-[12px] text-[#A0A0A0] mt-2">
          첨부 파일은 최대 10MB까지 등록 가능합니다.
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;