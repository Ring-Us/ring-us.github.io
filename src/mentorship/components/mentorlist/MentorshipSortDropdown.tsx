import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface MentorshipSortDropdownProps {
  sortOption?: string; // optional prop
  onSortChange: (value: string) => void;
}

const MentorshipSortDropdown: React.FC<MentorshipSortDropdownProps> = ({
  sortOption,
  onSortChange,
}) => {
  // sortOption이 없으면 'respond'를 기본값으로 사용
  const effectiveSortOption = sortOption || 'respond';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'respond', label: '멘토링 횟수 순' },
    { value: 'mYear', label: '경력 낮은 순' }, // 임시로 해둔 정렬 기준
  ];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block px-4 w-full justify-end" ref={dropdownRef}>
      <div
        className="w-full text-[12px] text-gray-2 cursor-pointer focus:outline-none text-right p-0"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {options.find(option => option.value === effectiveSortOption)?.label}
        <ChevronDown strokeWidth={1} height="24px" width="24px" color="#94939B" className="inline ml-2" />
      </div>
      {isOpen && (
        <div className="absolute right-4 w-1/2 bg-white border z-10 rounded-[10px] px-4 py-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="py-1.5 hover:bg-gray-100 cursor-pointer text-[14px]"
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorshipSortDropdown;