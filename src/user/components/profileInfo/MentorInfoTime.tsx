interface MentorInfoTimeProps {
  days: string[];
  startTime: string;
  endTime: string;
}

const MentorInfoTime = ({ days, startTime, endTime }: MentorInfoTimeProps) => {
  return (
      <div className="px-4 my-2">
          <div className="font-bold text-[16px] my-4">선호 시간대</div>

          <div className="text-[14px] text-[#94939B] mb-2">요일</div>
          <div className="flex gap-2">
              {days.map((day, index) => (
                  <div key={index} className="border border-primary-1 text-black px-4 py-2 rounded-[10px] text-[16px]">
                      {day}
                  </div>
              ))}
          </div>

          <div className="text-[14px] text-[#94939B] mt-4 mb-2">시간대</div>
          <div className="w-[100%] text-left border border-primary-1 text-black px-4 py-3 rounded-[10px] text-[16px]">
              {`${startTime} ~ ${endTime}`}
          </div>
      </div>
  );
};

export default MentorInfoTime;