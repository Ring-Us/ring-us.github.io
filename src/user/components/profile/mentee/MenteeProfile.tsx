import { useState } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { uploadProfileImage } from '@/user/api/profileApi';
import { MenteeProfileData } from '@/user/types/profileTypes';

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

  // 프로필 이미지 선택 후 API 요청하여 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadProfileImage(file);
      setMenteeData({
        ...menteeData,
        image: { fileName: file.name, filePath: imageUrl }, // 백엔드 요구사항에 맞춘 image 필드 저장
      });
      console.log(imageUrl);
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  // 전체 입력 필드 유효성 체크
  const isFormValid =
    menteeData.email.trim().length > 0 &&
    menteeData.nickname.trim().length > 0 &&
    menteeData.introduction.trim().length > 0 &&
    menteeData.education.schoolName.trim().length > 0 &&
    menteeData.education.major.trim().length > 0;

  return (
    <div className="flex flex-col w-full h-[calc(100dvh-15dvh)] overflow-hidden">
      {/* 아래 버튼을 고정시켜서 그 크기만큼 패딩을 넣어줘야함 */}
      <div className="flex-grow overflow-y-auto pr-5 pb-24">
        {/* 상단부분도 마찬가지로 위에 global topNavbar 생각해줘서 mt-20 넣어줌 */}
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
            {menteeData.image?.filePath ? (
              <img
                src={menteeData.image.filePath}
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
        {/* 이메일 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={menteeData.email}
            onChange={(e) =>
              setMenteeData({ ...menteeData, email: e.target.value })
            }
          />
        </div>

        {/* 닉네임 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={menteeData.nickname}
            onChange={(e) =>
              setMenteeData({ ...menteeData, nickname: e.target.value })
            }
          />
        </div>

        {/* 자기소개 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="자기소개"
            type="text"
            placeholder="간단한 자기소개를 입력해주세요."
            value={menteeData.introduction}
            onChange={(e) =>
              setMenteeData({ ...menteeData, introduction: e.target.value })
            }
          />
        </div>

        {/* 교육 정보 - 학교명 */}
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

        {/* 교육 정보 - 전공 */}
        <div className="mt-6">
          <AuthInputBox
            label="전공"
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
