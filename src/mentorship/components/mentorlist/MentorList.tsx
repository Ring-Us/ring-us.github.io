import React from 'react';
import { MentorType } from '@/mentorship/pages/mentorlist/MentorshipList.types';
import MentorItem from '@/mentorship/components/mentorlist/MentorItem';

interface MentorListProps {
  mentors: MentorType[];
  bookmarked: { [key: string]: boolean };
  onToggleBookmark: (mName: string) => void;
}

const MentorList: React.FC<MentorListProps> = ({
  mentors,
  bookmarked,
  onToggleBookmark,
}) => {
  return (
    <div className="w-full px-0 pt-[4px] space-y-4">
      {mentors.length > 0 ? (
        mentors.map((mentor) => (
          <MentorItem
            key={mentor.mName}
            mentor={mentor}
            isBookmarked={bookmarked[mentor.mName]}
            onToggleBookmark={onToggleBookmark}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default MentorList;
