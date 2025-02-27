import { MentorData } from "@/user/types";

import exit from '@/assets/exit.png';

interface EditPortfolioProps {
  mentorData: MentorData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorData>>;
}

const EditPortfolio = ({ mentorData, setMentorData }: EditPortfolioProps) => {
  
  // 파일 업로드 (30MB 이하 파일만 허용)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // 30MB 초과하는 파일이 있는지 확인
      const validFiles = newFiles.filter(file => file.size <= 30 * 1024 * 1024);
      const invalidFiles = newFiles.filter(file => file.size > 30 * 1024 * 1024);

      if (invalidFiles.length > 0) {
        alert("30MB 이하의 파일만 업로드할 수 있습니다.");
      }

      // 유효한 파일만 mentorData에 추가
    setMentorData((prev) => ({
      ...prev,
      portfolio: [
        ...prev.portfolio,
        ...validFiles.map(file => ({
          url: URL.createObjectURL(file),
          description: file.name,
          size: file.size
        }))
      ]
    }));
    }
  };

  // 파일 열기 (파일명을 클릭했을 때)
  const openFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  // 파일 삭제
  const removeFile = (index: number) => {
    setMentorData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index),
    }));
  };
  
  return (
    <div className="px-4 my-2">
      <div className="font-bold text-[16px] my-4">포트폴리오</div>
          
      {/* 업로드된 파일 목록 */}
      <div className="mt-2 space-y-2">
        {mentorData.portfolio.map((file, index) => (
          <div 
            key={index} 
            className="bg-[#F2F2F6] rounded-[10px] px-5 py-3 text-[12px] flex justify-between items-center cursor-pointer"
            onClick={() => openFile(file.url)}
          >
            <div>
              <span>{file.description}</span>
              <span className="text-[#94939B] ml-1">({(file.size / 1000000).toFixed(1)}MB)</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); removeFile(index); }}>
              <img src={exit} alt="exit" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 파일 업로드 버튼 */}
      <div className="mt-3">
        <label className="w-[30%] px-5 py-2 cursor-pointer border border-primary-1 text-primary-1 text-[12px] rounded-[10px] flex justify-center items-center">
          파일 선택
          <input type="file" className="hidden" multiple onChange={handleFileUpload} />
        </label>
        <div className="text-[12px] text-[#A0A0A0] mt-2">첨부 파일은 최대 30MB까지 등록 가능합니다.</div>
      </div>
    </div>
  );
};

export default EditPortfolio;