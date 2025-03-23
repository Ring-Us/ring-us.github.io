import React from 'react';
import { Mentor } from '../../api/fetchMentors'; 
import MentorItem from '@/mentorship/components/mentorlist/MentorItem';

interface MentorListProps {
  mentors: Mentor[];
  bookmarked: { [key: string]: boolean };
  onToggleBookmark: (nickname: string) => void;
  lastMentorRef?: (node: Element | null) => void; // ✅ ref prop 추가
}

const MentorList: React.FC<MentorListProps> = ({
  mentors,
  bookmarked,
  onToggleBookmark,
  lastMentorRef,
}) => {
  return (
    <div className="w-full px-0 pt-[4px] space-y-4">
      {mentors.length > 0 ? (
        mentors.map((mentor, index) => {
          const isLast = index === mentors.length - 1;

          return (
            <MentorItem
              key={mentor.nickname} // ✅ 유니크 key
              mentor={mentor}
              isBookmarked={bookmarked[mentor.nickname]}
              onToggleBookmark={onToggleBookmark}
              ref={isLast ? lastMentorRef : undefined} // ✅ 마지막 mentor에만 ref 연결
            />
          );
        })
      ) : (
        <div className="text-center text-gray-2 mt-6">멘토 내역이 없습니다.</div>
      )}
    </div>
  );
};

export default MentorList;