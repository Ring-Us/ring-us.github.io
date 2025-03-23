interface MentorInfoPortfolioProps {
    portfolio: { url: string; description: string; size: number } | null;
}

const MentorInfoPortfolio = ({ portfolio }: MentorInfoPortfolioProps) => {
    // 파일 열기 함수
    const openFile = (fileUrl: string) => {
        window.open(fileUrl, "_blank");
    };

    // 포트폴리오가 없으면 렌더링 안 함
    if (!portfolio) return null;

    return (
        <div className="px-4 my-2">
            <div className="font-bold text-[16px] my-4">포트폴리오</div>
            <div
                className="bg-[#F2F2F6] rounded-[10px] px-5 py-3 text-[12px] flex items-center cursor-pointer"
                onClick={() => openFile(portfolio.url)}
            >
                <span>{portfolio.description}</span>
                <span className="text-[#94939B] ml-1">
                    ({(portfolio.size / 1000000).toFixed(1)}MB)
                </span>
            </div>
        </div>
    );
};

export default MentorInfoPortfolio;