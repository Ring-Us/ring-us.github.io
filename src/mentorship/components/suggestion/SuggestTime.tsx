import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

import DateTimeSelectModal from './DateTimeSelectModal';

const SuggestTime = () => {
  const [selectedTimes, setSelectedTimes] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [modalOpen, setModalOpen] = useState<number | null>(null);

  const handleDateTimeSelect = (index: number, dateTime: string) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[index] = dateTime;
    setSelectedTimes(updatedTimes);
    setModalOpen(null);
  };

  const addTimeSelection = () => {
    if (selectedTimes.length < 5) {
      setSelectedTimes([...selectedTimes, null]);
    }
  };

  return (
    <div className="px-4 py-2">
      <h2 className="font-semibold text-[18px] my-4">희망 날짜</h2>

      {/* 시간 선택 */}
      {selectedTimes.map((time, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 py-3 my-2 border border-[#D9D7E0] rounded-[10px] cursor-pointer"
          onClick={() => setModalOpen(index)}
        >
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-[#94939B]" strokeWidth={1.5} />
            <span
              className={`text-[16px] ${time ? 'text-black' : 'text-[#94939B]'}`}
            >
              {time ? time : '날짜를 선택해주세요.'}
            </span>
          </div>
        </div>
      ))}

      {selectedTimes.length < 5 && (
        <button
          className="w-full flex items-center justify-center px-4 py-3 my-2 border border-primary-1 text-primary-1 rounded-[10px] cursor-pointer"
          onClick={addTimeSelection}
        >
          <CirclePlus className="w-5 h-5 mr-3" strokeWidth={1.5} />
          날짜 추가하기
        </button>
      )}

      {modalOpen !== null && (
        <DateTimeSelectModal
          isOpen={modalOpen !== null}
          onClose={() => setModalOpen(null)}
          onSelect={(dateTime: string) =>
            handleDateTimeSelect(modalOpen, dateTime)
          }
        />
      )}
    </div>
  );
};

export default SuggestTime;
