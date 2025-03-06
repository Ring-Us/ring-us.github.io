import { useState } from "react";
import { Calendar } from "@/global/ui/calendar";
import { GlobalButton } from "@/global/ui/GlobalButton";

interface DateTimeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dateTime: string) => void;
}

const DateTimeSelectModal: React.FC<DateTimeSelectModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = ["17:00 ~ 18:30", "18:30 ~ 19:00", "19:00 ~ 19:30", "19:30 ~ 20:00","20:00 ~ 20:30", "20:30 ~ 21:00", "21:00 ~ 21:30", "21:30 ~ 22:00", "22:30 ~ 23:00", "23:00 ~ 23:30"];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      onSelect(`${formattedDate} ${selectedTime}`);
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

        {/* 📅 캘린더 적용 */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="my-2"
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