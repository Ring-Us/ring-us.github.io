import { GlobalButton } from '@/global/ui/GlobalButton';
import { MentorProfileData } from '@/user/types/profileTypes';

import MentorHashtags from './MentorHashtags';
import MentorPortfolio from './MentorPortfolio';

interface MentorProfile3Props {
  mentorData: MentorProfileData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorProfileData>>;
  onNext: () => void;
}

const MentorProfile3 = ({
  mentorData,
  setMentorData,
  onNext,
}: MentorProfile3Props) => {
  // 전체 입력 필드 유효성 체크 (자기소개 + 멘토링 분야)
  const isFormValid =
    mentorData.message.trim().length > 0 &&
    mentorData.message.trim().length <= 100 &&
    mentorData.hashtags.length <= 8 &&
    mentorData.hashtags.every((tag) => tag.length <= 15);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-15vh)] overflow-hidden">
      <div className="flex-grow overflow-y-auto pr-5 pb-24">
        <div className="flex-none mt-8">
          <h1 className="text-xl font-semibold">
            <span className="">얼마남지 않았어요!</span>
            <br />
            <span className="">조금만 더 힘내세요!</span>
          </h1>
        </div>
        {/* 자기소개 입력 */}
        <div className="mt-8">
          <label
            htmlFor="bioTitle"
            className="font-regular text-[14px] mb-2 block"
          >
            멘티에게 전하고 싶은 말
          </label>
          <textarea
            id="bioTitle"
            className="w-full h-[170px] border rounded-lg p-4 text-xs resize-none placeholder-gray-2"
            style={{ whiteSpace: 'pre-wrap' }}
            placeholder={`멘티에게 전하고 싶은 말을 작성해주세요.
  
ex) 안녕하세요, 멘티 여러분들!
브랜드 마케팅 경험을 바탕으로 여러분의 성장을 지원하고 싶습니다.`}
            value={mentorData.message}
            maxLength={100}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                message: e.target.value.slice(0, 100),
              })
            }
          />
          <div className="text-xs text-gray-1 mt-1 flex justify-end">
            {mentorData.message.length}/100
          </div>
        </div>

        {/* 경험 해시태그 */}
        <MentorHashtags mentorData={mentorData} setMentorData={setMentorData} />
        {/* 포트폴리오*/}
        <div className="mt-8">
          <MentorPortfolio
            mentorData={mentorData}
            setMentorData={setMentorData}
          />
        </div>
      </div>

      {/* 완료 버튼 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-white px-6 py-4 shadow-md">
        <GlobalButton
          onClick={onNext}
          variant={isFormValid ? 'default' : 'secondary'}
          disabled={!isFormValid} // 버튼 비활성화
        >
          다음으로
        </GlobalButton>
      </div>
    </div>
  );
};
export default MentorProfile3;
