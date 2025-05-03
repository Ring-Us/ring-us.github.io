import React from 'react';

interface StatusTabsProps {
  selectedStatus: '미확정' | '확정' | '완료';
  onStatusChange: (status: '미확정' | '확정' | '완료') => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const statuses: Array<'미확정' | '확정' | '완료'> = [
    '미확정',
    '확정',
    '완료',
  ];

  return (
    <div className="flex h-auto mt-[5px]">
      {statuses.map((status) => (
        <div
          key={status}
          onClick={() => onStatusChange(status)}
          className={`w-1/3 text-[16px] font-bold flex transition-all border-gray-3 pb-3 border-b-[1px] justify-center items-start cursor-pointer 
            ${selectedStatus === status ? 'border-primary-5 text-[#000]' : 'text-gray-3'}
          `}
        >
          {status}
        </div>
      ))}
    </div>
  );
};

export default StatusTabs;
