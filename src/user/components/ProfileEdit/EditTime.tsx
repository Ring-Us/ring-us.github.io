import { useState } from "react";
import { MentorData } from "@/user/types";
import { TimeSelectModal } from "@/mentorship/components/TimeSelectModal";
import { ChevronDown } from 'lucide-react';

interface EditTimeProps {
  mentorData: MentorData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorData>>;
}

const EditTime = ({ mentorData, setMentorData }: EditTimeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = ["월", "화", "수", "목", "금", "토", "일"];
    
  // 요일 선택
  const toggleSelection = (day: string) => {
    setMentorData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  return (
    <div className="px-4 my-2">
      {/* 선호 시간대 */}
      <div className="font-bold text-[16px] my-4">선호 시간대</div>

      {/* 요일 */}
      <div className="text-[14px] text-[#94939B] mb-2">요일</div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <button
            key={day}
            className={`text-[16px] border-[1px] rounded-[10px] p-2 
              ${mentorData.availableDays.includes(day) ? "bg-[#F2EFFF] text-primary-1 border-primary-1" : "border-[#94939B] text-[#94939B]"}`}
            onClick={() => toggleSelection(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 시간대 */}
      <div className="text-[14px] text-[#94939B] mt-4 mb-2">시간대</div>
      <button
        className="w-full text-left border-[1px] border-[#D9D7E0] rounded-[10px] px-5 py-3 text-[16px] flex justify-between items-center"
        onClick={() => setIsModalOpen(true)}
      >
        {`${mentorData.timezone.startTime.period} ${mentorData.timezone.startTime.hour}:${mentorData.timezone.startTime.minute} ~ ${mentorData.timezone.endTime.period} ${mentorData.timezone.endTime.hour}:${mentorData.timezone.endTime.minute}`}
        <ChevronDown
          size={26}
          strokeWidth={1.0}
          color="#94939b"
        />
      </button>
      
      {/* 시간대 선택 모달 */}
      <TimeSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startPeriod={mentorData.timezone.startTime.period}
        setStartPeriod={(value) => setMentorData((prev) => ({ ...prev, startPeriod: value }))}
        startHour={mentorData.timezone.startTime.hour}
        setStartHour={(value) => setMentorData((prev) => ({ ...prev, startHour: value }))}
        startMinute={mentorData.timezone.startTime.minute}
        setStartMinute={(value) => setMentorData((prev) => ({ ...prev, startMinute: value }))}
        endPeriod={mentorData.timezone.endTime.period}
        setEndPeriod={(value) => setMentorData((prev) => ({ ...prev, endPeriod: value }))}
        endHour={mentorData.timezone.endTime.hour}
        setEndHour={(value) => setMentorData((prev) => ({ ...prev, endHour: value }))}
        endMinute={mentorData.timezone.endTime.minute}
        setEndMinute={(value) => setMentorData((prev) => ({ ...prev, endMinute: value }))}
      />
    </div>
  );
};

export default EditTime;