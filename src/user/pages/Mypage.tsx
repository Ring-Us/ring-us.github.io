import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/store/useAuthStore';
import axiosInstance from '@/global/api/axiosInstance';
import { Search } from 'lucide-react';
import Footer from '@/global/components/Footer';

export default function MyPage() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  // 백엔드에서 유저 정보 가져오기 (MyPage 내에서만 관리)
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/v1/members/me');
      setUserData(response.data.data);
      console.log('사용자 정보: ', response.data.data);
    } catch (error) {
      console.error('❌ 사용자 정보 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData(); // 로그인한 경우만 요청
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate('/auth/signin');
  };

  // 프로필 등록 여부 & 멘토/멘티 확인
  const isProfileRegistered = userData?.isProfileRegisterd;
  const isMentor = userData?.memberType === 'MENTOR';
  const profileEditPath = isMentor ? '/user/mentoredit' : '/user/menteeedit';
  const profileRegistrationPath = isMentor
    ? '/user/mentor-profile'
    : '/user/mentee-profile';

  // 로딩 상태 표시
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full h-screen">
      {/* 상단바 */}
      <div className="bg-mentor-gradient pt-6">
        <div className="flex items-center w-full px-5">
          <div className="flex-1 text-[22px] font-bold text-[#ffffff] text-center">
            마이
          </div>
          <Search strokeWidth={1} className="m-5 w-5 h-5 text-gray-1" />
        </div>

        {/* 프로필 정보 */}
        {isAuthenticated ? (
          <div className="flex flex-row items-center p-7 mt-4 space-x-4">
            <div className="w-20 h-20 bg-gray-3 rounded-[50px]"></div>
            <p className="pl-2 text-[#ffffff]">
              {isProfileRegistered ? userData.email : '프로필을 등록해주세요'}
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center p-7 mt-4 space-x-4">
            <div className="w-20 h-20 bg-gray-3 rounded-[50px]"></div>
            <p className="pl-2 text-[#ffffff] font-semibold">
              로그인 후 프로필을 등록해주세요
            </p>
          </div>
        )}
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
          <button className="w-full text-left text-gray-1 text-lg p-5">
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
