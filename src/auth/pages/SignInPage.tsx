import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // 애니메이션 라이브러리 추가
import { X } from 'lucide-react'; // X 닫기 버튼 추가
import { GlobalButton } from '@/global/ui/GlobalButton';
import { SigninInput } from '@/auth/components/SigninInput';
import { useAuthStore } from '@/auth/store/useAuthStore'; // Zustand import
import ErrorModal from '@/global/ui/Modal'; // 모달 컴포넌트 import

export default function SigninPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태 추가
  const login = useAuthStore((state) => state.login);

  const isLoginEnabled = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    try {
      await login(email, password);

      // 로그인 성공 시 `state`에 성공 메시지를 포함하여 홈페이지로 이동
      navigate('/', { state: { loginSuccess: true } });
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }} // 처음 화면 아래에서 시작
      animate={{ y: '0%' }} // 위로 올라오는 애니메이션
      exit={{ y: '100%' }} // 닫힐 때 아래로 내려감
      transition={{ duration: 0.3, ease: 'easeOut' }} // 부드러운 애니메이션 효과
      className="inset-0 shadow-lg flex flex-col items-center justify-center px-6 relative h-screen "
      style={{ height: '100dvh' }}
    >
      {/* 닫기(X) 버튼 추가 */}
      <button
        className="absolute top-3 left-2 p-2"
        onClick={() => navigate('/user')} // 마이페이지로 이동
      >
        <X strokeWidth={1} className="w-6 h-6 text-gray-1" />
      </button>

      {/* 로고 */}
      <div className="mb-8">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-[calc(25vh-20px)] h-auto"
        />
      </div>

      {/* 로그인 폼 */}
      <div className="w-full space-y-4">
        {/* 이메일 입력 */}
        <SigninInput
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          icon="user"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 비밀번호 입력 */}
        <SigninInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 로그인 버튼 (비활성화 조건 적용) */}
        <div className="mt-6">
          <GlobalButton
            variant={isLoginEnabled ? 'default' : 'secondary'} // 조건 충족 시 활성화
            onClick={handleLogin}
            disabled={!isLoginEnabled} // 버튼 비활성화
          >
            로그인
          </GlobalButton>
        </div>

        {/* 비밀번호 찾기 & 회원가입 */}
        <div className="flex justify-end mt-4 text-[14px] text-gray-2">
          <button
            className="hover:underline"
            onClick={() => navigate('/auth/forgot-password')}
          >
            비밀번호 찾기
          </button>
        </div>

        <div className="text-center mt-6 text-sm text-gray-2">
          아직 링어스 회원이 아니라면?{' '}
          <button
            className="text-primary-1 text-sm hover:underline"
            onClick={() => navigate('/auth/signup')}
          >
            회원가입
          </button>
        </div>
      </div>

      {/* 로그인 실패 모달 */}
      {errorMessage && (
        <ErrorModal
          title="로그인 오류"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </motion.div>
  );
}
