import { useNavigate } from 'react-router-dom';
import { Mentor } from '@/mentorship/api/fetchMentors';
import { Bookmark } from 'lucide-react';

interface Props {
  mentor: Mentor;
  isBookmarked: boolean;
  onToggleBookmark: (nickname: string) => void;
}

const BookmarkMentorCard = ({ mentor, isBookmarked, onToggleBookmark }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 border-b relative w-full" onClick={() => navigate(`/mentorship/info/${mentor.mentorId}`)}>
      {/* 북마크 아이콘을 우측 상단에 절대 위치로 배치 */}
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onToggleBookmark(mentor.nickname); }}
      >
        <Bookmark
          strokeWidth={1}
          className={`w-[24px] h-[24px] ${isBookmarked
              ? 'stroke-primary-4 fill-primary-4'
              : 'stroke-gray-2 fill-none'
            }`}
        />
      </div>

      {/* 프로필 + 멘토 정보 */}
      <div className="w-full items-center">
        <div className="flex w-full items-start space-x-[13px]">
          <img
            src={mentor.image.filePath}
            alt="프로필"
            className="w-[86px] h-[86px] rounded-[100px] object-cover"
          />
          <div>
            <div className="text-[20px] font-bold">{mentor.nickname}</div>
            <div className="mt-[4px] text-gray-5 text-[14px]">{mentor.organization.name}</div>
            <div className="text-gray-5 text-[14px]">{mentor.organization.detailedJob}</div>
            <div className="flex items-center justify-between gap-[2px] border border-gray-8 bg-white px-2 py-2 rounded-[4px] mt-[4px] h-[25px] w-[106px]">
              <span className="text-primary-4 text-[12px]">멘토링 횟수</span>
              <span className="text-gray-5 text-[12px]">{mentor.mentoringCount}회</span>
            </div>
            <p className="text-gray-600 text-[12px] mt-[12px]">"{mentor.introduction.title}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkMentorCard;