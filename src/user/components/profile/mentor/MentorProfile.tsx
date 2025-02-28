import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import ModalInput from '@/user/components/ModalInput';

const MentorProfile = ({ onNext }: { onNext: () => void }) => {
  const [bio, setBio] = useState(''); // 자기소개 상태
  const [nickname, setNickname] = useState(''); // 닉네임 상태
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 유효성 상태
  const [nicknameMessage, setNicknameMessage] = useState(''); // 닉네임 메시지
  const [profileImage, setProfileImage] = useState<string | null>(null); // 프로필 이미지 상태
  const [selectedExperience, setSelectedExperience] = useState(''); // 경력 선택 상태
  const [company, setCompany] = useState(''); // 회사 입력 상태
  const [position, setPosition] = useState(''); // 직무 입력 상태

  const [isFormValid, setIsFormValid] = useState(false); // 전체 폼 유효성

  // 자기소개 상태는 입력 필수 아님
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBio(value.length <= 500 ? value : bio);
  };

  const handleNicknameCheck = () => {
    if (nickname.trim().length > 0) {
      setIsNicknameValid(true);
      setNicknameMessage('사용 가능한 닉네임입니다.');
    } else {
      setIsNicknameValid(false);
      setNicknameMessage('닉네임을 1자 이상 입력해 주세요.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 전체 입력 필드 유효성 체크
  useEffect(() => {
    const isFormFilled =
      isNicknameValid &&
      company.trim().length > 0 &&
      position.trim().length > 0 &&
      selectedExperience.trim().length > 0;
    setIsFormValid(isFormFilled);
  }, [isNicknameValid, company, position, selectedExperience]);

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

      {/* 스크롤 가능한 영역 */}
      <div className="flex-grow overflow-y-auto pr-5">
        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-24 h-24 rounded-[50px] bg-gray-3 overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
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
            placeholder="닉네임은 1자 이상으로 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            buttonLabel="확인"
            onButtonClick={handleNicknameCheck}
            error={
              !isNicknameValid && nicknameMessage.includes('닉네임')
                ? nicknameMessage
                : undefined
            }
            successMessage={isNicknameValid ? nicknameMessage : undefined}
          />
        </div>

        {/* 회사 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="회사"
            type="text"
            placeholder="현재 재직 중인 회사 명을 입력해주세요."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* 직무 입력 */}
        <div className="mt-6">
          <AuthInputBox
            label="직무"
            type="text"
            placeholder="직무를 입력해 주세요."
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        {/* 경력 입력 (ModalInput 사용) */}
        <div className="mt-6">
          <ModalInput
            label="경력"
            placeholder="총 경력을 선택해 주세요."
            options={[
              '1년',
              '2년',
              '3년',
              '4년',
              '5년',
              '6년',
              '7년',
              '8년',
              '9년',
              '10년',
              '11년 이상',
            ]}
            value={selectedExperience}
            onChange={setSelectedExperience}
          />
        </div>

        {/* 자기소개 입력 */}
        <div className="mt-6">
          <label htmlFor="bio" className="font-regular text-[14px] mb-2 block">
            자기소개
          </label>
          <textarea
            id="bio"
            className="w-full h-[150px] border rounded-lg p-4 text-xs resize-none placeholder-gray-400"
            style={{ whiteSpace: 'pre-wrap' }}
            placeholder={`예시)
안녕하세요:)
저는 00대학교 경영학과를 졸업하고 현재 xxxx에 다니고 있는 ‘바이’입니다.

저는 브랜드 마케팅 전문가로, 다년간 다양한 산업에서 성공적인 마케팅 캠페인을 기획하고 실행해온 경험을 보유하고 있습니다. 특히, 데이터를 분석하여 전략을 수립하고 소비자 인사이트를 반영한 솔루션 개발에 강점이 있습니다.`}
            value={bio}
            onChange={handleBioChange}
          />
          <div className="text-xs text-gray-1 mt-1 flex justify-end">
            {bio.length}/500
          </div>
        </div>
      </div>

      {/* 완료 버튼 */}
      <div className="flex-none py-9">
        <GlobalButton
          onClick={onNext}
          variant={isFormValid ? 'default' : 'secondary'}
        >
          완료
        </GlobalButton>
      </div>
    </div>
  );
};

export default MentorProfile;
