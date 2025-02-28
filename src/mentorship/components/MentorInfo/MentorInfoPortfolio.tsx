interface MentorInfoPortfolioProps {
    portfolio: { url: string; description: string; size: number }[];
}

const MentorInfoPortfolio = ({ portfolio }: MentorInfoPortfolioProps) => {
    // 파일 열기 함수
    const openFile = (fileUrl: string) => {
        window.open(fileUrl, "_blank");
    };
  
    return (
        <div className="px-4 my-2">
            <div className="font-bold text-[16px] my-4">포트폴리오</div>
            <div className="mt-2 space-y-2">
                {portfolio.map((file, index) => (
                    <div
                        key={index}
                        className="bg-[#F2F2F6] rounded-[10px] px-5 py-3 text-[12px] flex items-center cursor-pointer"
                        onClick={() => openFile(file.url)}
                    >
                        <span>{file.description}</span>
                        <span className="text-[#94939B] ml-1">({file.size.toFixed(1)}MB)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentorInfoPortfolio;