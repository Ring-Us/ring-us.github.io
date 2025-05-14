import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { MentorProfileData } from '@/user/types/profileTypes';
import { uploadProfileImage } from '@/user/api/profileApi';
import {
  fieldOptions,
  subFieldOptions,
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
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | undefined>(
    undefined,
  );
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (mentorData.nickname.trim().length > 0 && !nicknameError) {
      setIsNicknameValid(true);
    }
  }, [mentorData.nickname, nicknameError]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        '파일 크기가 너무 큽니다.<br />10MB 이하의 이미지를 업로드해주세요.',
      );
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadProfileImage(file, 'ROLE_MENTOR');
      setMentorData({
        ...mentorData,
        image: { fileName: file.name, filePath: imageUrl },
      });
    } catch {
      setErrorMessage('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNicknameCheck = async () => {
    const trimmed = mentorData.nickname.trim();
    if (!trimmed) {
      setNicknameError('닉네임을 입력해주세요.');
      setIsNicknameValid(false);
      setSuccessMessage(undefined);
      return;
    }

    try {
      const { data } = await axiosInstance.get('/v1/members/check-nickname', {
        params: { nickname: trimmed },
      });
      if (data.data === false) {
        setNicknameError(data.message || '이미 사용 중인 닉네임입니다.');
        setIsNicknameValid(false);
        setSuccessMessage(undefined);
      } else {
        setNicknameError(undefined);
        setSuccessMessage('닉네임이 유효합니다.');
        setIsNicknameValid(true);
      }
    } catch (err: any) {
      setNicknameError(
        err.response?.data?.message ||
          '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      );
      setIsNicknameValid(false);
      setSuccessMessage(undefined);
    }
  };

  const isFormValid =
    mentorData.nickname.trim().length > 0 &&
    mentorData.education.schoolName.trim().length > 0 &&
    mentorData.education.major.trim().length > 0 &&
    mentorData.organization.name.trim().length > 0 &&
    mentorData.organization.jobCategory.trim().length > 0 &&
    mentorData.organization.detailedJob.trim().length > 0 &&
    mentorData.organization.experience > 0 &&
    isNicknameValid;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-15vh)] overflow-hidden">
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

        {/* 이미지 업로드 */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-24 h-24 rounded-[50px] bg-gray-3 overflow-hidden">
            {mentorData.image?.filePath ? (
              <img
                src={mentorData.image.filePath}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
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
            value={mentorData.nickname}
            placeholder="닉네임을 입력해주세요."
            onChange={(e) =>
              setMentorData({ ...mentorData, nickname: e.target.value })
            }
            buttonLabel="확인"
            onButtonClick={handleNicknameCheck}
            error={nicknameError}
            successMessage={successMessage}
          />
        </div>

        {/* 학력, 전공, 조직 */}
        <div className="mt-6">
          <AuthInputBox
            label="학력"
            value={mentorData.education.schoolName}
            placeholder="졸업한 학교를 입력해주세요."
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
        <div className="mt-6">
          <AuthInputBox
            label="전공"
            value={mentorData.education.major}
            placeholder="전공을 입력해주세요."
            onChange={(e) =>
              setMentorData({
                ...mentorData,
                education: { ...mentorData.education, major: e.target.value },
              })
            }
          />
        </div>
        <div className="mt-6">
          <AuthInputBox
            label="조직명"
            value={mentorData.organization.name}
            placeholder="회사명을 입력해주세요."
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

        {/* 직무 선택 */}
        <div className="mt-6">
          <ModalMentorFields
            label="직무"
            placeholder="직무/세부직무를 선택해주세요."
            options={fieldOptions}
            subOptions={subFieldOptions}
            value={{
              jobCategory: mentorData.organization.jobCategory,
              detailedJob: mentorData.organization.detailedJob,
            }}
            onChange={({ jobCategory, detailedJob }) => {
              setMentorData({
                ...mentorData,
                organization: {
                  ...mentorData.organization,
                  jobCategory,
                  detailedJob,
                },
              });
            }}
          />
        </div>

        {/* 경력 선택 */}
        <div className="mt-6">
          <ExperienceSelectModal
            experience={mentorData.organization.experience || 0}
            setExperience={(value) =>
              setMentorData({
                ...mentorData,
                organization: { ...mentorData.organization, experience: value },
              })
            }
          />
        </div>
      </div>

      {/* 다음 버튼 */}
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
