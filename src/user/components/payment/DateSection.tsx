import { Calendar } from 'lucide-react';

interface Props {
  dates: string[];
}

const DateSection = ({ dates }: Props) => {
  if (!dates || dates.length === 0) return null;

  return (
    <div>
      <div className="text-[18px] font-semibold">희망 날짜</div>
      <div className="flex flex-col mt-[8px] gap-[10px]">
        {dates.map((date, index) => (
          <div
            key={index}
            className="flex items-center gap-[12px] border border-gray-3 rounded-[10px] bg-gray-12 p-[16px] px-[22px] h-[52px]"
          >
            <Calendar strokeWidth={1} className="w-[24px] h-[24px]" />
            <div className="text-[16px]">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSection;