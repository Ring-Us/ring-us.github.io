import { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface TimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  startHour: number;
  setStartHour: (value: number) => void;
  startMinute: number;
  setStartMinute: (value: number) => void;
  endHour: number;
  setEndHour: (value: number) => void;
  endMinute: number;
  setEndMinute: (value: number) => void;
  onSave: () => void;
}

export const TimeModal = ({
  isOpen,
  onClose,
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
  onSave,
}: TimeModalProps) => {
  const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);
  const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  const renderTimePicker = (
    hour: number,
    setHour: (value: number) => void,
    minute: number,
    setMinute: (value: number) => void,
  ) => {
    const minuteOptions = [0, 30];
    const hourOptions = Array.from(
      new Set([Math.max(hour - 1, 8), hour, Math.min(hour + 1, 23)]),
    ); // 중복 제거

    return (
      <div className="grid grid-cols-2 items-center text-center gap-6">
        {/* 시 */}
        <div className="flex flex-col items-center justify-center h-[100px]">
          {hourOptions.map((h, index) => (
            <button
              key={`${h}-${index}`}
              className={`w-10 h-8 py-1 transition-all ${
                hour === h
                  ? 'text-primary-1 text-[14px] border-y border-[#EBEDEF]'
                  : 'text-[#94939B] text-[14px]'
              }`}
              onClick={() => setHour(h)}
            >
              {String(h).padStart(2, '0')}
            </button>
          ))}
        </div>

        {/* 분 */}
        <div className="flex flex-col items-center justify-center h-[100px]">
          {minuteOptions.map((m) => (
            <button
              key={m}
              className={`w-10 h-8 py-1 transition-all ${
                minute === m
                  ? 'text-primary-1 text-[14px] border-y border-[#EBEDEF]'
                  : 'text-[#94939B] text-[14px]'
              }`}
              onClick={() => setMinute(m)}
            >
              {String(m).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-end justify-center z-[50]">
      <div className="bg-white w-full max-w-[600px] h-[400px] rounded-t-[30px] p-8 relative">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-[16px]">선호 시간대</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 시작 시간 선택 */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-gray-2">시작 시간</p>
            <button
              className="flex items-center text-[16px] space-x-2"
              onClick={() => {
                setIsStartPickerOpen(!isStartPickerOpen);
                setIsEndPickerOpen(false);
              }}
            >
              <span className="text-gray-2">{`${startHour}:${String(startMinute).padStart(2, '0')}`}</span>
              <ChevronDown className="text-gray-2" size={20} />
            </button>
          </div>

          {isStartPickerOpen && (
            <div className="flex flex-col items-center mt-4">
              {renderTimePicker(
                startHour,
                setStartHour,
                startMinute,
                setStartMinute,
              )}
            </div>
          )}
        </div>

        {/* 종료 시간 선택 */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-gray-2">종료 시간</p>
            <button
              className="flex items-center text-[16px] space-x-2"
              onClick={() => {
                setIsEndPickerOpen(!isEndPickerOpen);
                setIsStartPickerOpen(false);
              }}
            >
              <span className="text-gray-2">{`${endHour}:${String(endMinute).padStart(2, '0')}`}</span>
              <ChevronDown className="text-gray-2" size={20} />
            </button>
          </div>

          {isEndPickerOpen && (
            <div className="flex flex-col items-center mt-4">
              {renderTimePicker(endHour, setEndHour, endMinute, setEndMinute)}
            </div>
          )}
        </div>

        {/* 완료 버튼 */}
        <div className="absolute bottom-0 left-0 w-full bg-white px-4 pb-4 pt-3">
          <button
            className="w-full bg-primary-1 text-white py-3 rounded-md text-center"
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
