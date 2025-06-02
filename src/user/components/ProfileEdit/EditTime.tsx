import { useState } from 'react';
import { TimeModal } from '../profile/mentor/TimeModal';
// import { TimeSelectModal } from '@/mentorship/components/TimeSelectModal';
import { ChevronDown } from 'lucide-react';
import { useMentorInfoStore } from '@/user/store/useMentorInfoStore';

const EditTime = () => {
  const { mentorData, setMentorData } = useMentorInfoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!mentorData) return null;

  const availabledays = ['월', '화', '수', '목', '금', '토', '일'];

  // `HH:MM:SS` 형식에서 시간과 분을 추출하는 함수
  const parseTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return { hour, minute };
  };

  const { hour: startHour, minute: startMinute } = parseTime(mentorData.timezone.startTime);
  const { hour: endHour, minute: endMinute } = parseTime(mentorData.timezone.endTime);


  // 시간 저장
  const handleSaveTime = () => {
    setMentorData({
      ...mentorData,
      timezone: {
        ...mentorData.timezone,
        startTime: `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`,
        endTime: `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`,
      },
    });
  };

  
  // 요일 선택
  const toggleSelection = (day: string) => {
    const newDays = mentorData.timezone.days.includes(day)
      ? mentorData.timezone.days.filter((d) => d !== day)
      : [...mentorData.timezone.days, day];

    setMentorData({
      ...mentorData,
      timezone: {
        ...mentorData.timezone,
        days: newDays,
      },
    });
  };

  return (
    <div className="px-4 py-2">
      {/* 선호 시간대 */}
      <div className="font-bold text-[16px] my-4">선호 시간대</div>

      {/* 요일 */}
      <div className="text-[14px] text-[#94939B] mb-2">요일</div>
      <div className="grid grid-cols-7 gap-2">
        {availabledays.map((day) => (
          <button
            key={day}
            className={`text-[16px] border-[1px] rounded-[10px] p-2 
              ${mentorData.timezone.days.includes(day) ? 'bg-[#F2EFFF] text-primary-1 border-primary-1' : 'border-[#94939B] text-[#94939B]'}`}
            onClick={() => toggleSelection(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 시간대 */}
      <div className="text-[14px] text-[#94939B] mt-4 mb-2">시간대</div>
      <button
        className="w-[50%] text-left border-[1px] border-[#D9D7E0] rounded-[10px] px-4 py-3 text-[16px] flex justify-between items-center"
        onClick={() => setIsModalOpen(true)}
      >
        {`${mentorData.timezone.startTime.slice(0,5)} ~ ${mentorData.timezone.endTime.slice(0,5)}`}
        <ChevronDown size={26} strokeWidth={1.0} color="#94939b" />
      </button>

      {/* 시간대 선택 모달 */}
      <TimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startHour={startHour}
        setStartHour={(value) =>
          setMentorData({
            ...mentorData,
            timezone: {
              ...mentorData.timezone,
              startTime: `${String(value).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`,
            },
          })
        }
        startMinute={startMinute}
        setStartMinute={(value) =>
          setMentorData({
            ...mentorData,
            timezone: {
              ...mentorData.timezone,
              startTime: `${String(startHour).padStart(2, '0')}:${String(value).padStart(2, '0')}:00`,
            },
          })
        }
        endHour={endHour}
        setEndHour={(value) =>
          setMentorData({
            ...mentorData,
            timezone: {
              ...mentorData.timezone,
              endTime: `${String(value).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`,
            },
          })
        }
        endMinute={endMinute}
        setEndMinute={(value) =>
          setMentorData({
            ...mentorData,
            timezone: {
              ...mentorData.timezone,
              endTime: `${String(endHour).padStart(2, '0')}:${String(value).padStart(2, '0')}:00`,
            },
          })
        }
        onSave={handleSaveTime}
      />
    </div>
  );
};

export default EditTime;
