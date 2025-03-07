import { useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import EditFields from '@/user/components/ProfileEdit/EditFields';
import { MentorProfileData } from '@/user/types/profileTypes';

interface MentorProfile2Props {
  mentorData: MentorProfileData;
  setMentorData: (data: MentorProfileData) => void;
  onNext: () => void;
}

const MentorProfile2 = ({
  mentorData,
  setMentorData,
  onNext,
}: MentorProfile2Props) => {
  // 전체 입력 필드 유효성 체크 (자기소개 + 멘토링 분야)
  const isFormValid =
    mentorData.introductionTitle.trim().length > 0 &&
    mentorData.introduction.trim().length > 0 &&
    mentorData.mentoringField.length > 0; // 멘토링 분야 선택 필수

  return (
    <div className="flex flex-col w-full h-[calc(100vh-15vh)] overflow-hidden">
      {/* 상단 제목 */}
      <div className="flex-none mt-8">
        <h1 className="text-xl font-semibold">
          <span className="text-primary-1">멘토님을</span>
          <br />
          <span className="text-primary-1">소개</span>해볼까요?
        </h1>
      </div>

      <div className="flex-grow overflow-y-auto pr-5">
        {/* 자기소개 입력 */}
        <div className="mt-8">
          <label
            htmlFor="bioTitle"
            className="font-regular text-[14px] mb-2 block"
          >
            자기소개 제목
          </label>
          <textarea
            id="bioTitle"
            className="w-full h-[50px] border rounded-lg p-4 text-xs resize-none placeholder-gray-2"
            style={{ whiteSpace: 'pre-wrap' }}
            placeholder={'자기소개에 제목으로 멘토님을 표현해요.'}
            value={mentorData.introductionTitle}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                introductionTitle: e.target.value,
              })
            }
          />

          <label
            htmlFor="bioContent"
            className="font-regular text-[14px] mb-2 block mt-4"
          >
            자기소개 본문
          </label>
          <textarea
            id="bioContent"
            className="w-full mt-3 h-[120px] border rounded-lg p-4 text-xs resize-none placeholder-gray-2"
            style={{ whiteSpace: 'pre-wrap' }}
            placeholder={`예시)
멘토님을 소개해주세요!

ex) 저는 카카오에 재직중인 UX/UI 디자이너 입니다.
저와 함께 포트폴리오의 UT능력과 트렌드를 익혀...`}
            value={mentorData.introduction}
            onChange={(e) =>
              setMentorData({ ...mentorData, introduction: e.target.value })
            }
          />
          <div className="text-xs text-gray-1 mt-1 flex justify-end">
            {mentorData.introduction.length}/500
          </div>
        </div>

        {/* EditFields 추가 (멘토링 분야 선택) */}
        <EditFields mentorData={mentorData} setMentorData={setMentorData} />
      </div>

      {/* 완료 버튼 */}
      <div className="flex-none py-9">
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
