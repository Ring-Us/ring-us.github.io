import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { uploadProfileImage } from '@/user/api/profileApi';
import { MenteeProfileData } from '@/user/types/profileTypes';
import { Camera } from 'lucide-react';

import ErrorModal from '@/global/ui/Modal'; // Error 모달 추가
import axiosInstance from '@/global/api/axiosInstance';

interface MenteeProfileProps {
  menteeData: MenteeProfileData;
  setMenteeData: (data: MenteeProfileData) => void;
  onNext: () => void;
}

const MenteeProfile = ({
  menteeData,
  setMenteeData,
  onNext,
}: MenteeProfileProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태 추가
  const [nicknameError, setNicknameError] = useState<string | undefined>(
    undefined,
  ); // 닉네임 에러 메시지 상태 수정
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 유효성 상태 추가
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (menteeData.nickname.trim().length > 0 && !nicknameError) {
      setIsNicknameValid(true);
    }
  }, [menteeData.nickname, nicknameError]);

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
      const imageUrl = await uploadProfileImage(file, 'ROLE_MENTEE'); // memberType 추가
      setMenteeData({
        ...menteeData,
        image: { fileName: file.name, filePath: imageUrl },
      });
      console.log('업로드된 이미지 URL:', imageUrl);
      console.log('업로드된 이미지 파일명:', file.name);
    } catch (error) {
      setErrorMessage('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNicknameCheck = async () => {
    const trimmedNickname = menteeData.nickname.trim(); // 공백 제거

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
        { params: { nickname: menteeData.nickname.trim() } },
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

  // 전체 입력 필드 유효성 체크
  const isFormValid =
    menteeData.nickname.trim().length > 0 &&
    menteeData.introduction.trim().length > 0 && // 필수
    menteeData.introduction.trim().length <= 200 && // 200자 제한
    menteeData.education.schoolName.trim().length > 0 &&
    isNicknameValid;

  return (
    <div className="flex flex-col w-full h-[calc(100dvh-15dvh)] overflow-hidden">
      {/* 에러 모달 */}
      {errorMessage && (
        <ErrorModal
          title="파일 업로드 오류"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="flex-grow overflow-y-auto pr-5 pb-24">
        <div className="flex-none pt-10">
          <h3 className="text-xl sm:text-2xl font-bold text-primary-1">
            프로필을 설정해주세요!
          </h3>
          <p className="text-xs text-gray-1 mt-2 mb-5">
            멘티로서 자신을 소개하는 내용을 입력하세요.
          </p>
        </div>

        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-24 h-24 rounded-[50px] bg-gray-3 overflow-hidden">
            {/* 프로필 이미지 또는 기본 이미지 */}
            <img
              src={menteeData.image?.filePath || '/assets/ringusprofile.png'}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
            {/* 기본 이미지일 때만 오버레이 & 카메라 아이콘 */}
            {(!menteeData.image?.filePath ||
              menteeData.image.filePath === '/assets/ringusprofile.png') && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white opacity-70" />
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

        {/* 입력 필드들 */}
        <div className="mt-6">
          <AuthInputBox
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={menteeData.nickname}
            onChange={(e) =>
              setMenteeData({ ...menteeData, nickname: e.target.value })
            }
            buttonLabel="확인"
            onButtonClick={handleNicknameCheck}
            error={nicknameError}
            successMessage={successMessage}
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="menteeIntroduction"
            className="block text-xs mb-2 font-medium"
          >
            자기소개 <span className="text-primary-1">*</span>
          </label>
          <textarea
            id="menteeIntroduction"
            placeholder="간단한 자기소개를 입력해주세요."
            value={menteeData.introduction}
            maxLength={200}
            required
            className="w-full border rounded-lg p-3 text-xs resize-none placeholder-gray-2"
            rows={4}
            onChange={(e) =>
              setMenteeData({ ...menteeData, introduction: e.target.value })
            }
          />
          <div className="text-xs text-gray-1 mt-1 flex justify-end">
            {menteeData.introduction.length}/200
          </div>
        </div>

        <div className="mt-6">
          <AuthInputBox
            label="학교명"
            type="text"
            placeholder="학교명을 입력해주세요."
            value={menteeData.education.schoolName}
            onChange={(e) =>
              setMenteeData({
                ...menteeData,
                education: {
                  ...menteeData.education,
                  schoolName: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="mt-6">
          <AuthInputBox
            label="전공 (선택)"
            type="text"
            placeholder="전공을 입력해주세요."
            value={menteeData.education.major}
            onChange={(e) =>
              setMenteeData({
                ...menteeData,
                education: { ...menteeData.education, major: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* 완료 버튼 */}
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

export default MenteeProfile;
