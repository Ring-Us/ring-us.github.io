import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupFinish() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 자동으로 로그인 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/auth/signin');
    }, 2000);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <img
        className="w-full p-5 mb-3"
        src="/src/assets/success.png"
        alt="success"
      />
      <h1 className="text-2xl sm:text-3xl 2xl:text-3xl font-bold mb-2">
        링어스 가입을 축하드려요
      </h1>
      <div className="flex items-center mb-6">
        <img
          className="mr-1 w-[55px]"
          src="/src/assets/RINGUS.png"
          alt="ringus"
        />
        <p className="text-[13px] sm:text-md text-gray-1">
          와 함께 성장의 여정을 시작하세요.
        </p>
      </div>
    </div>
  );
}
