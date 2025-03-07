import { useState } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import ModalInput from '@/user/components/ModalInput';
import { MentorProfileData } from '@/user/types/profileTypes';
import axiosInstance from '@/global/api/axiosInstance';

interface MentorProfile1Props {
  mentorData: MentorProfileData;
  setMentorData: (data: MentorProfileData) => void;
  onNext: () => void;
}

const MentorProfile1 = ({
  mentorData,
  setMentorData,
  onNext,
}: MentorProfile1Props) => {
  const [isUploading, setIsUploading] = useState(false); // 이미지 업로드 상태

  // 닉네임 유효성 체크
  const handleNicknameCheck = () => {
    setMentorData({
      ...mentorData,
      nickname: mentorData.nickname.trim(),
    });
  };

  //  프로필 이미지 업로드 (사용자가 "다음으로" 버튼 클릭 시 실행)
  const uploadImage = async () => {
    if (!mentorData.image.file) return mentorData.image.filePath; // 기존 이미지 유지

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', mentorData.image.file);

      const response = await axiosInstance.post(
        '/v1/storage/profile/image',
        formData,
      );
      setIsUploading(false);
      return response.data.imageUrl; // 백엔드에서 받은 이미지 URL 반환
    } catch (error) {
      console.error('❌ 이미지 업로드 실패:', error);
      setIsUploading(false);
      alert('이미지 업로드에 실패했습니다.');
      return null;
    }
  };

  //  "다음으로" 버튼 클릭 시 실행 (이미지 업로드 후 데이터 저장)
  const handleNext = async () => {
    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    setMentorData({ ...mentorData, image: imageUrl });
    onNext();
  };

  //  프로필 이미지 선택
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMentorData({
        ...mentorData,
        image: { file, filePath: URL.createObjectURL(file) },
      });
    }
  };

  //  전체 입력 필드 유효성 체크
  const isFormValid =
    mentorData.nickname.trim().length > 0 &&
    mentorData.organization.name.trim().length > 0 &&
    mentorData.organization.role.trim().length > 0 &&
    mentorData.organization.experience !== null;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-15vh)] overflow-hidden">
      {/* 상단 제목과 설명 */}
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
          {mentorData.image ? (
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
          onChange={handleImageSelect}
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
        />
      </div>
      {/* 회사 입력 */}
      <div className="mt-6">
        <AuthInputBox
          label="회사"
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
      {/* 직무 입력 */}
      <div className="mt-6">
        <AuthInputBox
          label="직무"
          type="text"
          placeholder="직무를 입력해 주세요."
          value={mentorData.organization.role}
          onChange={(e) =>
            setMentorData({
              ...mentorData,
              organization: {
                ...mentorData.organization,
                role: e.target.value,
              },
            })
          }
        />
      </div>
      {/* 경력 입력 (ModalInput 사용) */}
      // 경력 입력 (ModalInput 사용)
      <div className="mt-6">
        <ModalInput
          label="경력"
          placeholder="총 경력을 선택해 주세요."
          options={['1년', '2년', '3년', '4년', '5년', '6년 이상']}
          value={mentorData.organization.experience.toString()}
          onChange={(value) => {
            // 문자열에서 숫자만 추출하여 number 타입으로 변환
            const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
            setMentorData({
              ...mentorData,
              organization: {
                ...mentorData.organization,
                experience: numericValue,
              },
            });
          }}
        />
      </div>
      {/* 버튼 */}
      <div className="flex-none py-9">
        <GlobalButton
          onClick={handleNext}
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
