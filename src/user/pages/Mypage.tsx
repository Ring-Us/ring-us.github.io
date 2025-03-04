import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/store/useAuthStore';
import { Search } from 'lucide-react';
import Footer from '@/global/components/Footer';

export default function MyPage() {
  const { isAuthenticated, user, logout } = useAuthStore(); // 로그인 상태 확인
  const navigate = useNavigate();

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate('/auth/signin'); // 로그인 페이지로 이동
  };

  return (
    <div className="relative max-w-[600px] mx-auto w-full">
      {/* 상단바 */}
      <div className="flex justify-between items-center">
        <div></div>
        <Search strokeWidth={1} className="m-5 w-5 h-5 text-gray-1" />
      </div>

      {/* 프로필 정보 */}
      {isAuthenticated && (
        <div className="flex flex-row items-center mt-8 p-7 space-x-4">
          <div className="w-20 h-20 bg-gray-3 rounded-[50px]"></div>
          <p className="pl-3 text-gray-1">
            {user?.profileRegistered
              ? user.email // 프로필이 등록되었으면 이메일 표시
              : '프로필을 등록해주세요'}{' '}
          </p>
        </div>
      )}

      {/* 메뉴 리스트 */}
      <div className="p-7 mt-8 space-y-11">
        <button className="w-full text-left text-gray-1 text-lg">
          프로필 등록
        </button>
        <button className="w-full text-left text-gray-1 text-lg">
          자주 묻는 질문
        </button>
        <button className="w-full text-left text-gray-1 text-lg">
          고객센터
        </button>

        {/* 로그인 상태에 따라 다른 버튼 표시 */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="w-full text-left text-lg text-authRed"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => navigate('/auth/signin')}
            className="w-full text-left text-lg text-primary-1"
          >
            로그인
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
}
