import React, { useEffect } from 'react';
import { Mentor } from '../../api/fetchMentors';
import MentorItem from '@/mentorship/components/mentorlist/MentorItem';

interface MentorListProps {
  mentors: Mentor[];
  bookmarked: { [key: string]: boolean };
  onToggleBookmark: (nickname: string) => void;
  lastMentorRef?: (node: Element | null) => void;
}

const MentorList: React.FC<MentorListProps> = ({
  mentors,
  bookmarked,
  onToggleBookmark,
  lastMentorRef,
}) => {
  // mentors 배열이 업데이트 될 때마다 콘솔찍어보기
  useEffect(() => {
    console.log('📋 mentors:', mentors);
  }, [mentors]);

  return (
    <div className="w-full px-0 pt-[4px] space-y-4">
      {mentors.length > 0 ? (
        mentors.map((mentor, index) => {
          const isLast = index === mentors.length - 1;

          return (
            <MentorItem
              key={mentor.mentorId}
              mentor={mentor}
              isBookmarked={bookmarked[mentor.nickname]}
              onToggleBookmark={onToggleBookmark}
              ref={isLast ? lastMentorRef : undefined}
            />
          );
        })
      ) : (
        <div className="text-center text-gray-2 mt-6">
          멘토 내역이 없습니다.
        </div>
      )}
    </div>
  );
};

export default MentorList;