import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';

// import { MentorData } from '@/user/types';
import { MentorViewData } from '@/user/types';
import { getMentorById } from '../api/MentorViewApi';

import MentorInfoProfile from '../../user/components/profileInfo/MentorInfoProfile';
import MentorInfoBio from '../../user/components/profileInfo/MentorInfoBio';
import MentorInfoFieldsHashtags from '../../user/components/profileInfo/MentorInfoFieldsHashtags';
import MentorInfoTime from '../../user/components/profileInfo/MentorInfoTime';
import MentorInfoMessage from '../../user/components/profileInfo/MentorInfoMessage';
import MentorInfoPortfolio from '../../user/components/profileInfo/MentorInfoPortfolio';

const MentorInfoView = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mentorData, setMentorData] = useState<MentorViewData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!mentorId || isNaN(Number(mentorId))) return;
        const data = await getMentorById(Number(mentorId));
        // 백엔드에서 이미 한국어 필드가 내려오므로 그대로 사용
        setMentorData(data);
      } catch (err) {
        console.error('멘토 상세 불러오기 실패:', err);
      }
    };
    fetchData();
  }, [mentorId]);

  useEffect(() => {
    const stored = localStorage.getItem('isBookmarked');
    setIsBookmarked(stored === 'true');
  }, []);

  const toggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    localStorage.setItem('isBookmarked', next.toString());
  };

  if (!mentorData) return <div className="p-4">Loading...</div>;

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      <div className="overflow-y-auto pb-4">
        <div className="bg-mentor-gradient rounded-b-[30px]">
          <div className="flex justify-between items-center px-4 py-3 h-[55px]">
            <ArrowLeft
              size={24}
              strokeWidth={1.0}
              className="text-white cursor-pointer"
              onClick={() => navigate('/mentorship')}
            />
            <Bookmark
              size={22}
              strokeWidth={1.0}
              className="cursor-pointer"
              fill={isBookmarked ? 'white' : 'none'}
              stroke="white"
              onClick={toggleBookmark}
            />
          </div>
          <MentorInfoProfile
            nickname={mentorData.nickname}
            name={mentorData.organization.name}
            jobCategory={mentorData.organization.jobCategory}
            detailedJob={mentorData.organization.detailedJob}
            experience={mentorData.organization.experience}
            mentoringCount={mentorData.mentoringCount}
            image={mentorData.image?.filePath || '/assets/ringusprofile.png'}
          />
        </div>
        <MentorInfoBio
          title={mentorData.introduction.title}
          content={mentorData.introduction.content}
        />
        <MentorInfoTime
          days={mentorData.timezone.days}
          startTime={mentorData.timezone.startTime}
          endTime={mentorData.timezone.endTime}
        />
        <MentorInfoFieldsHashtags
          mentoringField={mentorData.mentoringField}
          hashtags={mentorData.hashtags}
        />
        <MentorInfoMessage message={mentorData.message} />
        <MentorInfoPortfolio portfolio={mentorData.portfolio} />
      </div>
      <div className="sticky text-center px-4 py-4 border-t">
        <GlobalButton
          onClick={() => navigate(`/mentorship/suggestion/${mentorId}`)}
        >
          멘토링 제안하기
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorInfoView;
