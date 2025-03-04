import { Calendar } from 'lucide-react';

const availableDates = [
  '2025.01.12 19:00~19:30',
  '2025.01.13 20:30~21:00',
  '2025.01.16 10:30~14:00',
];


const DateSection = () => {
  return (
    <div>
      <div className="text-[18px] font-semibold">희망 날짜</div>
      <div className="flex flex-col mt-[8px] gap-[10px]">
        {availableDates.map((date, index) => (
          <div key={index} className="flex items-center gap-[12px] border border-gray-3 rounded-[10px] bg-gray-12 p-[16px] px-[22px] h-[52px] cursor-pointer hover:border-primary-4">
            <Calendar strokeWidth={1} className="w-[24px] h-[24px]" />
            <div className="text-[16px]">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSection;