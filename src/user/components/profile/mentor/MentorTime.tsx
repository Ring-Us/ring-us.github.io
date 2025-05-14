import { useState } from 'react';
import { MentorProfileData } from '@/user/types/profileTypes';
import { TimeModal } from './TimeModal';
import { ChevronDown } from 'lucide-react';

interface MentorTimeProps {
  mentorData: MentorProfileData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorProfileData>>;
}

const MentorTime = ({ mentorData, setMentorData }: MentorTimeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 시작 및 종료 시간 초기값 설정
  const [startHour, setStartHour] = useState(
    parseInt(mentorData.timezone.startTime.split(':')[0], 10) || 8,
  );
  const [startMinute, setStartMinute] = useState(
    parseInt(mentorData.timezone.startTime.split(':')[1], 10) || 0,
  );
  const [endHour, setEndHour] = useState(
    parseInt(mentorData.timezone.endTime.split(':')[0], 10) || 18,
  );
  const [endMinute, setEndMinute] = useState(
    parseInt(mentorData.timezone.endTime.split(':')[1], 10) || 0,
  );

  // 요일 선택: mentorData.timezone.days는 한국어 요일 문자열 배열
  const toggleDaySelection = (day: string) => {
    setMentorData((prev) => ({
      ...prev,
      timezone: {
        ...prev.timezone,
        days: prev.timezone.days.includes(day)
          ? prev.timezone.days.filter((d) => d !== day)
          : [...prev.timezone.days, day],
      },
    }));
  };

  // 시간 선택 완료 후 mentorData 업데이트
  const handleTimeSave = () => {
    const start = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;
    const end = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`;

    if (start >= end) {
      alert('시작 시간은 종료 시간보다 빨라야 합니다.');
      return;
    }

    setMentorData((prev) => ({
      ...prev,
      timezone: {
        ...prev.timezone,
        startTime: start,
        endTime: end,
      },
    }));

    setIsModalOpen(false);
  };

  return (
    <div className="px-4 my-2">
      {/* 선호 시간대 */}
      <div className="font-bold text-[16px] my-4">선호 시간대</div>

      {/* 요일 선택 UI */}
      <div className="text-[14px] text-[#94939B] mb-2">요일</div>
      <div className="grid grid-cols-7 gap-2">
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => {
          const isSelected = mentorData.timezone.days.includes(day);
          return (
            <button
              key={day}
              className={`text-[16px] border-[1px] rounded-[10px] p-2 \
                ${
                  isSelected
                    ? 'bg-[#F2EFFF] text-primary-1 border-primary-1'
                    : 'border-[#94939B] text-[#94939B]'
                }`}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 시간대 */}
      <div className="text-[14px] text-[#94939B] mt-4 mb-2">시간대</div>
      <button
        className="w-full text-left border-[1px] border-[#D9D7E0] rounded-[10px] px-5 py-3 text-[16px] flex justify-between items-center"
        onClick={() => setIsModalOpen(true)}
      >
        {`${mentorData.timezone.startTime} ~ ${mentorData.timezone.endTime}`}
        <ChevronDown size={26} strokeWidth={1.0} color="#94939b" />
      </button>

      <TimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startHour={startHour}
        setStartHour={setStartHour}
        startMinute={startMinute}
        setStartMinute={setStartMinute}
        endHour={endHour}
        setEndHour={setEndHour}
        endMinute={endMinute}
        setEndMinute={setEndMinute}
        onSave={handleTimeSave}
      />

      {/* 선택 완료 버튼 */}
      {isModalOpen && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleTimeSave}
            className="bg-primary-1 text-white px-4 py-2 rounded-md"
          >
            선택 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default MentorTime;
