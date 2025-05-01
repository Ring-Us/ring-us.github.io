import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type SortOption = 'oldest';

interface BookmarkSortDropdownProps {
  sortOption?: SortOption;
  onSortChange: (value: SortOption) => void;
}

const BookmarkSortDropdown: React.FC<BookmarkSortDropdownProps> = ({
  sortOption = 'oldest',
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: SortOption; label: string }[] = [
    { value: 'oldest', label: '오래된 순' },
  ];

  // ✅ 첫 렌더링 때 기본 정렬 전달
  useEffect(() => {
    onSortChange('oldest');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block px-4 w-full justify-end" ref={dropdownRef}>
      <div
        className="w-full text-[12px] text-gray-2 cursor-pointer focus:outline-none text-right p-0 flex items-center justify-end"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {options.find((option) => option.value === sortOption)?.label}
        <ChevronDown strokeWidth={1} height="24px" width="24px" color="#94939B" className="ml-2" />
      </div>
      {isOpen && (
        <div className="absolute right-4 w-1/2 bg-white border z-10 rounded-[10px] px-4 py-1 shadow-md">
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

export default BookmarkSortDropdown;