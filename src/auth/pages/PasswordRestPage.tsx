import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import VerifyForm from '@/auth/components/password/VerifyForm';
import ResetForm from '@/auth/components/password/ResetForm'; // ResetForm → PasswordResetNew

export default function PasswordResetPage() {
  const [step, setStep] = useState<'verify' | 'reset' | 'complete'>('verify');
  const navigate = useNavigate();
  const [verifiedEmail, setVerifiedEmail] = useState('');

  // 1단계: 인증 성공 시
  const handleVerified = (email: string) => {
    setVerifiedEmail(email);
    setStep('reset');
  };

  // 2단계: 비밀번호 재설정 성공 시
  const handleResetComplete = () => {
    setStep('complete');
  };

  return (
    <div className="shadow-lg flex flex-col items-center justify-center relative h-screen bg-white">
      {/* 상단 뒤로가기 버튼 */}
      <button
        className="absolute top-3 left-2 p-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft strokeWidth={1} className="w-6 h-6 text-gray-1" />
      </button>

      <div>
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-[calc(25vh-20px)] h-auto"
        />
      </div>
      <div className="text-lg font-semibold mb-6">비밀번호 재설정</div>
      <div className="w-full max-w-[600px]">
        {step === 'verify' && <VerifyForm onVerified={handleVerified} />}
        {step === 'reset' && (
          <ResetForm
            email={verifiedEmail}
            onResetComplete={handleResetComplete}
          />
        )}
      </div>
    </div>
  );
}
