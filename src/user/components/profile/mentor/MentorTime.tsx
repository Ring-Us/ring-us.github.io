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

  const daysMap: Record<string, string> = {
    월: 'MON',
    화: 'TUE',
    수: 'WED',
    목: 'THU',
    금: 'FRI',
    토: 'SAT',
    일: 'SUN',
  };

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

  // 요일 선택
  const toggleDaySelection = (day: string) => {
    setMentorData((prev) => ({
      ...prev,
      timezone: {
        ...prev.timezone,
        days: prev.timezone.days.includes(daysMap[day])
          ? prev.timezone.days.filter((d) => d !== daysMap[day]) // 선택 해제
          : [...prev.timezone.days, daysMap[day]], // 선택 추가
      },
    }));
  };

  // 시간 선택 완료 후 mentorData 업데이트
  const handleTimeSave = () => {
    setMentorData((prev) => ({
      ...prev,
      timezone: {
        ...prev.timezone,
        startTime: `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`,
        endTime: `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`,
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
        {Object.keys(daysMap).map((day) => (
          <button
            key={day}
            className={`text-[16px] border-[1px] rounded-[10px] p-2 
              ${
                mentorData.timezone.days.includes(daysMap[day])
                  ? 'bg-[#F2EFFF] text-primary-1 border-primary-1'
                  : 'border-[#94939B] text-[#94939B]'
              }`}
            onClick={() => toggleDaySelection(day)}
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
        onSave={handleTimeSave} // mentorData에 저장하는 함수
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
