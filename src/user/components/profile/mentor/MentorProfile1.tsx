import { useState } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { MentorProfileData } from '@/user/types/profileTypes';
import { uploadProfileImage } from '@/user/api/profileApi';
import {
  fieldOptions,
  subFieldOptions,
  jobCategoryMapping,
  detailedJobMapping,
} from '@/global/components/JobCategories';

import ErrorModal from '@/global/ui/ErrorModal';
import ModalMentorFields from '@/user/components/ModalMentorFields';
import ExperienceSelectModal from './ExperienceSelectModal';
import axiosInstance from '@/global/api/axiosInstance';

interface MentorProfile1Props {
  mentorData: MentorProfileData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorProfileData>>;
  onNext: () => void;
}

const MentorProfile1 = ({
  mentorData,
  setMentorData,
  onNext,
}: MentorProfile1Props) => {
  const [isUploading, setIsUploading] = useState(false); // 이미지 업로드 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | undefined>(
    undefined,
  ); // 닉네임 에러 메시지 상태 수정
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 유효성 상태 추가
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );

  // 프로필 이미지 선택 후 API 요청하여 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 10MB 초과 확인 (10MB = 10 * 1024 * 1024 바이트)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        '파일 크기가 너무 큽니다.<br />10MB 이하의 이미지를 업로드해주세요.',
      );
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadProfileImage(file, 'ROLE_MENTOR'); // memberType 추가
      setMentorData({
        ...mentorData,
        image: { fileName: file.name, filePath: imageUrl },
      });
    } catch (error) {
      setErrorMessage('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  // 닉네임 유효성 체크
  const handleNicknameCheck = async () => {
    const trimmedNickname = mentorData.nickname.trim(); // 공백 제거

    console.log('검사 닉네임: ', trimmedNickname);

    if (!trimmedNickname) {
      setNicknameError('닉네임을 입력해주세요.');
      setIsNicknameValid(false);
      setSuccessMessage(undefined); // 닉네임 검사를 새로 시작하면 이전 성공 메시지는 초기화
      return;
    }

    try {
      const response = await axiosInstance.get(
        `https://api.ringus.my/v1/members/check-nickname`,
        { params: { nickname: mentorData.nickname.trim() } },
      );
      //console.log('응답 데이터:', response.data);

      if (response.data.data === false) {
        // 닉네임이 이미 존재하는 경우
        setNicknameError(
          response.data.message || '이미 사용 중인 닉네임입니다.',
        );
        setIsNicknameValid(false);
        setSuccessMessage(undefined); // 성공 메시지 초기화
      } else {
        // 닉네임이 사용 가능할 때
        setNicknameError(undefined); // 에러 초기화
        setSuccessMessage('닉네임이 유효합니다.'); // 성공 메시지 설정
        setIsNicknameValid(true); // 유효성 체크 성공
      }
    } catch (error: any) {
      if (error.response) {
        setNicknameError(
          error.response.data.message || '알 수 없는 오류가 발생했습니다.',
        );
      } else {
        setNicknameError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
      setIsNicknameValid(false);
      setSuccessMessage(undefined); // 실패 시 성공 메시지 초기화
    }
  };

  //  전체 입력 필드 유효성 체크
  const isFormValid =
    mentorData.nickname.trim().length > 0 &&
    mentorData.education.schoolName.trim().length > 0 &&
    mentorData.education.major.trim().length > 0 &&
    mentorData.organization.name.trim().length > 0 &&
    mentorData.organization.jobCategory.trim().length > 0 &&
    mentorData.organization.detailedJob.trim().length > 0 &&
    mentorData.organization.experience !== null &&
    isNicknameValid;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-15vh)] overflow-hidden">
      {/* 상단 제목과 설명 */}
      {errorMessage && (
        <ErrorModal
          title="파일 업로드 오류"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="flex-grow overflow-y-auto pr-5 pb-24">
        <div className="flex-none mt-12">
          <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-primary-1">
            프로필을 설정해주세요!
          </h3>
          <p className="text-xs text-gray-1 mt-2 mb-5">
            멘토로서 자신을 소개하는 내용을 입력하세요.
          </p>
        </div>
        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-24 h-24 rounded-[50px] bg-gray-3 overflow-hidden">
            {mentorData.image?.filePath ? (
              <img
                src={mentorData.image.filePath}
                alt="프로필 이미지"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xs text-gray-2">
                이미지 없음
              </div>
            )}
          </div>
          <label
            htmlFor="profile-upload"
            className="mt-2 mb-4 text-xs text-primary-1 cursor-pointer hover:underline"
          >
            프로필 사진 변경
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        {/* 닉네임 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={mentorData.nickname}
            onChange={(e) =>
              setMentorData({ ...mentorData, nickname: e.target.value })
            }
            buttonLabel="확인"
            onButtonClick={handleNicknameCheck}
            error={nicknameError}
            successMessage={successMessage}
          />
        </div>
        {/* 학교 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="학력"
            type="text"
            placeholder="졸업한 학교를 입력해주세요."
            value={mentorData.education.schoolName}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                education: {
                  ...mentorData.education,
                  schoolName: e.target.value,
                },
              })
            }
          />
        </div>
        {/* 전공 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="전공"
            type="text"
            placeholder="전공을 입력해주세요."
            value={mentorData.education.major}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                education: {
                  ...mentorData.education,
                  major: e.target.value,
                },
              })
            }
          />
        </div>
        {/* 회사 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="조직명"
            type="text"
            placeholder="현재 재직 중인 회사명을 입력해주세요."
            value={mentorData.organization.name}
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                organization: {
                  ...mentorData.organization,
                  name: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="mt-6">
          <ModalMentorFields
            label="직무"
            placeholder="직무/세부직무를 선택해주세요."
            options={fieldOptions}
            subOptions={subFieldOptions}
            value={{
              jobCategory: mentorData.organization.jobCategory, // 직무 (한글)
              detailedJob: mentorData.organization.detailedJob, // 세부 직무 (한글)
            }}
            onChange={(value) => {
              setMentorData({
                ...mentorData,
                organization: {
                  ...mentorData.organization,
                  jobCategory:
                    jobCategoryMapping[value.jobCategory] || value.jobCategory, // ✅ 한글 → 영어 변환
                  detailedJob:
                    detailedJobMapping[value.detailedJob] || value.detailedJob, // ✅ 한글 → 영어 변환
                },
              });
            }}
          />
        </div>
        <div className="mt-6">
          {/* 경력 선택 모달 */}
          <ExperienceSelectModal
            experience={mentorData.organization.experience || 0}
            setExperience={(value) => {
              setMentorData({
                ...mentorData,
                organization: {
                  ...mentorData.organization,
                  experience: value, // 숫자로 저장
                },
              });
            }}
          />
        </div>
      </div>
      {/* 버튼 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-white px-6 py-4 shadow-md">
        <GlobalButton
          onClick={onNext}
          variant={isFormValid ? 'default' : 'secondary'}
          disabled={!isFormValid || isUploading}
        >
          {isUploading ? '업로드 중...' : '다음으로'}
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorProfile1;
