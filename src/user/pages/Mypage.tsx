import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/store/useAuthStore';
import axiosInstance from '@/global/api/axiosInstance';
import { Search } from 'lucide-react';
import Footer from '@/global/components/Footer';
import MypageModal from '@/user/components/MypageModal';

export default function MyPage() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isProfileRegistered, setIsProfileRegistered] = useState(false);

  // 백엔드에서 유저 정보 가져오기
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/v1/members/me');
      console.log('📌 응답 데이터:', response.data.data);

      if (response.data.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error('❌ 사용자 정보 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    } else {
      setLoading(false);
      setShowModal(true);
    }
  }, [isAuthenticated]);

  // userData가 업데이트될 때 isProfileRegistered 값 업데이트
  useEffect(() => {
    if (userData) {
      setIsProfileRegistered(userData.isProfileRegisterd);
    }
  }, [userData]);

  // 로그인 모달 버튼 핸들러
  const handleConfirm = () => {
    setShowModal(false);
    navigate('/auth/signin');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate('/auth/signin');
  };

  // 프로필 이미지 설정 (기본값 포함)

  const isMentor = userData?.memberType === 'ROLE_MENTOR';
  const profileImageUrl = isProfileRegistered
    ? isMentor
      ? (userData?.mentorProfile?.image?.filePath ??
        '/assets/ringusprofile.png')
      : (userData?.menteeProfile?.image?.filePath ??
        '/assets/ringusprofile.png')
    : '/assets/ringusprofile.png';
  const profileEditPath = isMentor ? '/user/mentorinfo' : '/user/menteeinfo';
  const profileRegistrationPath = isMentor
    ? '/user/mentor-profile'
    : '/user/mentee-profile';

  const mentorInfo = isProfileRegistered
    ? isMentor
      ? userData?.mentorProfile
        ? `${userData.mentorProfile.nickname}\n${userData.mentorProfile.organization?.name ?? '소속 정보 없음'} | ${userData.mentorProfile.organization?.experience ?? 0}년차\n${userData.mentorProfile.organization?.jobCategory ?? ''} ${userData.mentorProfile.organization?.detailedJob ?? ''}`
        : '소속 정보 없음'
      : userData?.menteeProfile
        ? `${userData.menteeProfile.nickname}\n${userData.menteeProfile.education.schoolName ?? '학교 정보 없음'} | ${userData.menteeProfile.education.major ?? '전공 정보 없음'}`
        : '교육 정보 없음'
    : '프로필 정보 없음';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full h-screen">
      {/* 로그인 모달 */}
      {showModal && (
        <MypageModal
          title="로그인하기"
          message="로그인이 필요합니다.<br> 로그인 페이지로 이동하시겠습니까?"
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}

      {/* 상단바 */}
      <div className="bg-mentor-gradient pt-6">
        <div className="flex items-center w-full px-5">
          <div className="flex-1 text-[22px] font-bold text-[#ffffff] text-center pl-5">
            마이
          </div>
          <Search strokeWidth={1} className="w-5 h-5 text-[#ffffff]" />
        </div>

        {/* 프로필 정보 */}
        <div className="flex flex-row items-center p-7 mt-4 space-x-4">
          <img
            src={profileImageUrl}
            alt="프로필"
            className="w-20 h-20 rounded-[50px] object-cover"
          />
          <div className="pl-2 text-[#ffffff]">
            <p>
              {isAuthenticated
                ? isProfileRegistered
                  ? userData?.email
                  : '프로필을 등록해주세요'
                : '로그인 후 프로필을 등록해주세요'}
            </p>

            {isProfileRegistered && (
              <p className="text-sm text-gray-4">
                {mentorInfo.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className="space-y-1">
        {isAuthenticated && (
          <div className="border-b border-gray-3">
            <button
              className="w-full text-left text-gray-1 text-lg p-5"
              onClick={() =>
                navigate(
                  isProfileRegistered
                    ? profileEditPath
                    : profileRegistrationPath,
                )
              }
            >
              {isProfileRegistered ? '프로필 관리' : '프로필 등록'}
            </button>
          </div>
        )}
        <div className="border-b border-gray-3">
          <button
            className="w-full text-left text-gray-1 text-lg p-5"
            onClick={() => navigate('faq')}
          >
            자주 묻는 질문
          </button>
        </div>
        <div className="border-b border-gray-3">
          <button className="w-full text-left text-gray-1 text-lg p-5">
            고객센터
          </button>
        </div>

        {/* 로그인 상태에 따라 버튼 표시 */}
        {isAuthenticated ? (
          <div className="border-b border-gray-3">
            <button
              onClick={handleLogout}
              className="w-full text-left text-lg text-authRed p-5"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="border-b border-gray-3">
            <button
              onClick={() => navigate('/auth/signin')}
              className="w-full text-left text-lg text-primary-1 p-5"
            >
              로그인
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
