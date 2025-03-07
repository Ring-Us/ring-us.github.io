import React from 'react';
import MenteeCard from './MenteeCard';
import { Mentee } from './types';

interface MenteeListProps {
  mentees: Mentee[];
  emptyMessage: string;
}

const MenteeList: React.FC<MenteeListProps> = ({ mentees, emptyMessage }) => {
  return (
    <div className="flex flex-col gap-0 mt-[19px]">
      {mentees.length > 0 ? (
        mentees.map((mentee, index) => (
          <MenteeCard key={index} mentee={mentee} />
        ))
      ) : (
        <div className="mt-[50px] text-center text-gray-2 text-[14px]">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default MenteeList;