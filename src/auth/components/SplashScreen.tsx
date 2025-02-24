import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/auth/store/useAuthStore';

export default function SplashScreen() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const { isAuthenticated, checkSession } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  useEffect(() => {
    async function initialize() {
      await checkSession(); // 세션 체크 실행
      setIsChecking(false); // 세션 체크 완료
    }

    initialize();
  }, [checkSession]);

  useEffect(() => {
    if (!isChecking) {
      setTimeout(() => {
        setIsSplashComplete(true); // SplashScreen이 끝났다고 표시

        if (isAuthenticated) {
          // 로그인된 경우, 마지막 방문한 페이지로 이동
          const lastVisitedPath =
            location.pathname !== '/auth/signin' ? location.pathname : '/';
          navigate(lastVisitedPath, { replace: true });
        } else {
          // 로그인되지 않은 경우, 랜딩 페이지(/auth)로 이동
          navigate('/auth', { replace: true });
        }
      }, 2000); // ✅ 2초 동안 SplashScreen 유지
    }
  }, [isChecking, isAuthenticated, navigate, location.pathname]);

  // SplashScreen이 끝나기 전까지 아무 화면도 렌더링하지 않음
  if (!isSplashComplete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex items-center justify-center bg-white"
      >
        <motion.img
          src="/src/assets/logo.png"
          alt="Logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-40 h-40"
        />
      </motion.div>
    );
  }

  return null; // SplashScreen이 끝난 후에만 다른 화면이 렌더링됨
}
