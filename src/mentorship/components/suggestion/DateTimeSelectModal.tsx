import { useState } from "react";
import { Calendar } from "@/global/ui/calendar";
import { GlobalButton } from "@/global/ui/GlobalButton";

interface DateTimeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dateTime: string) => void;
  selectedTimes: (string | null)[];
}

const DateTimeSelectModal: React.FC<DateTimeSelectModalProps> = ({ isOpen, onClose, onSelect, selectedTimes }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const isSlotTaken = (slotISO: string) => {
    return selectedTimes.some((t) => {
      if (!t) return false;
      const selected = new Date(t);
      const candidate = new Date(slotISO);
      return selected.getTime() === candidate.getTime();
    });
  };

  const generateTimeSlots = (startHour: number, endHour: number, selectedDate?: Date): string[] => {
    const now = new Date();
    const slots: string[] = [];
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        const candidate = new Date(selectedDate || now);
        candidate.setHours(hour, minute, 0, 0);
  
        if (selectedDate) {
          const selectedYMD = selectedDate.toDateString();
          const nowYMD = now.toDateString();
  
          // 오늘 날짜이고 현재보다 과거 시간이면 제외
          if (selectedYMD === nowYMD && candidate < now) continue;
        }

        const iso = candidate.toISOString();
        if (isSlotTaken(iso)) continue;
  
        const end = new Date(candidate.getTime() + 30 * 60000);
        const format = (date: Date) =>
          `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  
        slots.push(`${format(candidate)} ~ ${format(end)}`);
      }
    }
  
    return slots;
  };
  
  const timeSlots = generateTimeSlots(7, 23, selectedDate);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const startTime = selectedTime.split("~")[0].trim();
      const [hour, minute] = startTime.split(":").map(Number);
  
      const selected = new Date(selectedDate);
      selected.setHours(hour);
      selected.setMinutes(minute);
      selected.setSeconds(0);
      selected.setMilliseconds(0);
  
      const isoString = selected.toISOString();
  
      onSelect(isoString);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black/75 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-[600px] h-[90%] rounded-t-[30px] p-8 flex flex-col relative">

        {/* 헤더 */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-[16px]">희망 날짜</h2>
          <button onClick={onClose}>
              <img src="/assets/exit.png" alt="close" className="w-6 h-6" />
          </button>
        </div>

        {/* 캘린더 적용 */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="my-2"
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />

        {/* 시간 선택 */}
        <div className="flex-grow overflow-y-auto px-1 pt-1 no-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`py-2 px-4 border rounded-[10px] ${
                  selectedTime === slot ? "bg-[#F2EFFF] text-primary-1 border-primary-1" : "text-[#8C8B93] border-[#D9D7E0]"
                }`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* 선택 완료 버튼 */}
        <div className="w-full pt-5 bg-white">
          <GlobalButton
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
          >
            선택 완료
          </GlobalButton>
        </div>
      </div>
    </div>
  ) : null;
};

export default DateTimeSelectModal;