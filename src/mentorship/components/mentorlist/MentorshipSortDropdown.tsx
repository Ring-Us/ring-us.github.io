import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from '@/mentorship/store/useMentorStore';

interface Props {
  sortOption?: SortOption;
  onSortChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: 'respond', label: '응답순' },
  { value: 'recent', label: '최신순' },
];

const MentorshipSortDropdown: React.FC<Props> = ({
  sortOption,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 라벨, 매칭 안 되면 '응답순' 으로 페일백
  const currentLabel =
    options.find((o) => o.value === sortOption)?.label || '응답순';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div
        className="flex justify-end mr-4 items-center cursor-pointer text-[12px] text-gray-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentLabel}
        <ChevronDown
          strokeWidth={1}
          height="24px"
          width="24px"
          color="#94939B"
          className="ml-2"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 w-36 bg-white border rounded-md shadow-md mt-1">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px]"
              onClick={() => {
                onSortChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorshipSortDropdown;