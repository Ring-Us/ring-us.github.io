import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

import { getMentorById } from "../api/MentorViewApi";
import { postSuggestion } from "../api/SuggestApi";
import { SuggestionRequest } from "@/user/types";

import SuggestInfo from "../components/suggestion/SuggestInfo";
import SuggestTime from "../components/suggestion/SuggestTime";
import SuggestSubject from "../components/suggestion/SuggestSubject";
import { GlobalButton } from "@/global/ui/GlobalButton";

const Suggestion = () => {
  const navigate = useNavigate();  

  const { mentorId } = useParams<{ mentorId: string }>();
  const [nickname, setNickname] = useState<string>("");
  const [selectedTimes, setSelectedTimes] = useState<(string | null)[]>([null, null, null]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [text, setText] = useState("");

  // 닉네임 불러오기
  useEffect(() => {
    const fetchMentor = async () => {
      if (mentorId) {
        try {
          const data = await getMentorById(Number(mentorId));
          setNickname(data.nickname || "");
        } catch (err) {
          console.error("멘토 정보 불러오기 실패:", err);
        }
      }
    };
    fetchMentor();
  }, [mentorId]);

  const handleSubmit = async () => {
    const validTimes = selectedTimes.filter(
      (time): time is string => !!time && !isNaN(new Date(time).getTime())
    );
    
    if (validTimes.length === 0) {
      alert("올바른 날짜를 최소 1개 이상 선택해주세요.");
      return;
    }

    const formatToLocalISOString = (date: Date): string => {
      const yyyy = date.getFullYear();
      const MM = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mm = String(date.getMinutes()).padStart(2, '0');
      const ss = "00";
      return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
    };

    const applyTimes = validTimes.map((timeStr) => {
      const start = new Date(timeStr);
      const end = new Date(start.getTime() + 30 * 60000);
      return {
        startTime: formatToLocalISOString(start),
        endTime: formatToLocalISOString(end),
      };
    });

    const suggestionData: SuggestionRequest = {
      topic: selectedSubjects[0] || "JOB_PREPARATION",
      mentoringMessage: text,
      applyTimes,
      mentorId: Number(mentorId),
    };

    console.log("🛰️ 최종 전송 데이터", JSON.stringify(suggestionData, null, 2));

    try {
      //await postSuggestion(suggestionData);
      navigate(`/user/payment`);
      //navigate(`/user/payment/${mentorId}`);
    } catch (error) {
      console.error("멘토링 제안 실패:", error);
      alert("제안 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">

      {/* 헤더 */}
      <div className="sticky flex justify-between items-center px-4 py-3 h-[55px] border-b">
        <ArrowLeft
          size={24}
          strokeWidth={1.0}
          className="text-black cursor-pointer"
          onClick={() => navigate(`/mentorship/info/${mentorId}`)}
        />
        <div className="text-[20px] font-[500]">제안하기</div>
        <div className="w-6 h-6"></div>
      </div>

      <div className="overflow-y-auto pt-2 pb-4">
        {/* 설명 */}
        <SuggestInfo nickname={nickname} />

        {/* 희망 날짜 */}
        <SuggestTime selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} />

        {/* 이야기 나누고 싶은 주제 */}
        <SuggestSubject selectedSubjects={selectedSubjects} setSelectedSubjects={setSelectedSubjects} text={text} setText={setText} />

      </div>

      {/* 제안하기 버튼 */}
      <div className="sticky px-4 py-4 border-t">
        <GlobalButton onClick={handleSubmit}>
          멘토링 제안하기
        </GlobalButton>
      </div>
    </div>
  );
};

export default Suggestion;