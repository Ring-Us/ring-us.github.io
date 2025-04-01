import { useNavigate } from 'react-router-dom';

interface Mentor {
  mentorId: number;
  nickname: string;
  imgUrl: string;
  introduction: {
    title: string;
    content: string;
  };
  organization: {
    name: string;
    jobCategory: string;
    detailedJob: string;
    experience: number;
  };
  message: string;
  mentoringCount: number;
}

interface Props {
  mentor: Mentor;
}

const BookmarkMentorCard = ({ mentor }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border-b-[1px] p-[16px] flex flex-col">
      <div className="flex items-start gap-4">
        <img
          src={mentor.imgUrl}
          alt="프로필"
          className="w-[86px] h-[86px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{mentor.nickname}</h2>
          <p className="text-sm text-gray-2">{mentor.organization.name}</p>
          <p className="text-sm text-gray-2">
           {mentor.organization.jobCategory} | {mentor.organization.detailedJob} {' '}
            {mentor.organization.experience}년차
          </p>
          <div className="flex items-center justify-between gap-[2px] border border-gray-8 bg-white px-2 py-2 rounded-[4px] mt-[8px] h-[25px] w-[106px]">
            <span className="text-primary-4 text-[12px]">멘토링 횟수</span>
            <span className="text-gray-5 text-[12px]">{mentor.mentoringCount}회</span>
          </div>
          <div className="mt-[8px] text-[12px] text-gray-600">“{mentor.introduction.content}”</div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/mentorship/suggestion/${mentor.mentorId}`)}
        className="mt-4 bg-primary-7 text-white text-[16px] py-2 rounded-xl h-[48px] rounded-[8px]"
      >
        멘토링 제안하기
      </button>
    </div>
  );
};

export default BookmarkMentorCard;