import { GlobalButton } from '@/global/ui/GlobalButton';
import { MentorProfileData } from '@/user/types/profileTypes';

import MentorFields from '@/user/components/profile/mentor/MentorFields';
import MentorTime from '@/user/components/profile/mentor/MentorTime';

interface MentorProfile2Props {
  mentorData: MentorProfileData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorProfileData>>;
  onNext: () => void;
}

const MentorProfile2 = ({
  mentorData,
  setMentorData,
  onNext,
}: MentorProfile2Props) => {
  // 전체 입력 필드 유효성 체크 (자기소개 + 멘토링 분야)
  const isFormValid =
    mentorData.introduction.title.trim().length > 0 &&
    mentorData.introduction.content.trim().length > 0 &&
    mentorData.mentoringField.length > 0; // 멘토링 분야 선택 필수

  return (
    <div className="flex flex-col w-full h-[calc(100vh-15vh)] overflow-hidden">
      {/* 상단 제목 */}
      <div className="flex-grow overflow-y-auto pr-5 pb-24">
        <div className="flex-none mt-8">
          <h1 className="text-xl font-semibold">
            <span className="text-primary-1">멘토님을</span>
            <br />
            <span className="text-primary-1">소개</span>해볼까요?
          </h1>
        </div>

        {/* 자기소개 입력 */}
        <div className="mt-8">
          <label
            htmlFor="bioTitle"
            className="font-regular text-[14px] mb-2 block"
          >
            자기소개
          </label>
          <textarea
            id="bioTitle"
            className="w-full h-[50px] border rounded-lg p-4 text-xs resize-none placeholder-gray-2"
            style={{ whiteSpace: 'pre-wrap' }}
            placeholder={'자기소개에 제목으로 멘토님을 표현해요.'}
            value={mentorData.introduction.title}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                introduction: {
                  ...mentorData.introduction,
                  title: e.target.value,
                },
              })
            }
          />
          <textarea
            id="bioContent"
            className="w-full mt-3 h-[120px] border rounded-lg p-4 text-xs resize-none placeholder-gray-2"
            style={{ whiteSpace: 'pre-wrap' }}
            placeholder={`예시)
멘토님을 소개해주세요!

ex) 저는 카카오에 재직중인 UX/UI 디자이너 입니다.
저와 함께 포트폴리오의 UT능력과 트렌드를 익혀...`}
            value={mentorData.introduction.content}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                introduction: {
                  ...mentorData.introduction,
                  content: e.target.value,
                },
              })
            }
          />
          <div className="text-xs text-gray-1 mt-1 flex justify-end">
            {mentorData.introduction.content.length}/500
          </div>
        </div>

        {/* EditFields 추가 (멘토링 분야 선택) */}
        <MentorFields
          mentorData={mentorData}
          onChange={(updatedData) => setMentorData(updatedData)} // 변경된 데이터 반영
        />

        {/* 선호 시간대 */}
        <MentorTime mentorData={mentorData} setMentorData={setMentorData} />
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

export default MentorProfile2;
