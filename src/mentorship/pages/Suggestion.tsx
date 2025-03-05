import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

import SuggestInfo from "../components/suggestion/SuggestInfo";
import SuggestTime from "../components/suggestion/SuggestTime";
import SuggestSubject from "../components/suggestion/SuggestSubject";
import { GlobalButton } from "@/global/ui/GlobalButton";

const Suggestion = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col relative overflow-y-auto">

      {/* 헤더 */}
      <div className="flex justify-between items-center mx-4 mt-[30px]">
        <ArrowLeft
          size={24}
          strokeWidth={1.0}
          className="text-black cursor-pointer"
          onClick={() => navigate("/mentorship/info")}
        />
        <div className="text-[20px] font-[500]">제안하기</div>
        <div className="w-6 h-6"></div>
      </div>

      <div className="pt-3">
        {/* 설명 */}
        <SuggestInfo />

        {/* 희망 날짜 */}
        <SuggestTime />

        {/* 이야기 나누고 싶은 주제 */}
        <SuggestSubject />

      </div>

      {/* 제안하기 버튼 */}
      <div className="px-4 my-5">
        <GlobalButton
          onClick={() => navigate("/user/payment")}
        >
          멘토링 제안하기
        </GlobalButton>
      </div>
    </div>
  );
};

export default Suggestion;