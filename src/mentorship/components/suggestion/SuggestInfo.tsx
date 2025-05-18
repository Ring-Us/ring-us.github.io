interface SuggestInfoProps {
  nickname: string;
}

const SuggestInfo = ({ nickname }: SuggestInfoProps) => {
  return (
    <div className="px-4 py-4">
      <div className="bg-[#F2EFFF] rounded-[16px] p-4">
        <div className="mb-4">
          <div className="text-[22px] font-semibold">{nickname}님께</div>
          <div className="text-[22px] font-semibold">멘토링 제안하기</div>
        </div>
        <div className="text-[14px] text-[#7F7D85]">
          링어스 멘토링은 30분을 기본으로 진행됩니다. 
          동문 기반의 멘토링 서비스를 통해 더욱 깊이 있는 조언과 네트워킹 기회를 얻어보세요!
        </div>
      </div>
    </div>
  );
};

export default SuggestInfo;