import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { sendVerificationCode, verifyCode } from '@/auth/api/emailApi';

interface VerifyFormProps {
  onVerified: (email: string) => void;
}

export default function VerifyForm({ onVerified }: VerifyFormProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const MAX_ATTEMPTS = 5;
  const [remainingTime, setRemainingTime] = useState(300);

  // 인증 타이머
  useEffect(() => {
    if (emailSent && remainingTime > 0) {
      const timer = setInterval(() => setRemainingTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [emailSent, remainingTime]);

  // 이메일 인증 발송
  const handleSendEmail = async () => {
    if (!email) return;
    setError('');
    try {
      const res = await sendVerificationCode(email, true); // 비번 재설정이므로 true
      setEmailSent(true);
      setAttemptCount(0);
      setRemainingTime(300);
    } catch (err: any) {
      let errorMsg =
        err?.response?.data?.errors?.message ||
        err?.response?.data?.message ||
        err?.message;

      if (errorMsg) {
        setError(`❌ ${errorMsg}`);
      } else {
        setError(
          '❌ 인증 메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        );
      }
      setEmailSent(false);
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!code) return;
    setError('');
    try {
      const res = await verifyCode(email, code);
      if (res.status === 200 || res.status === 201) {
        setCodeVerified(true); // 인증 성공만 표시
        setAttemptCount(0);
        setError('');
        // 여기서 onVerified(email); 호출 X!
      } else {
        throw new Error(res.message || '인증번호가 올바르지 않습니다.');
      }
    } catch (err: any) {
      let errorMsg = '❌ 인증번호가 올바르지 않습니다.';
      setAttemptCount((prev) => prev + 1);
      if (attemptCount + 1 >= MAX_ATTEMPTS) {
        errorMsg = '❌ 인증번호를 5회 틀렸습니다. 다시 요청해주세요.';
      } else {
        errorMsg = `❌ 인증번호가 올바르지 않습니다. (${attemptCount + 1}/${MAX_ATTEMPTS})`;
      }
      setError(errorMsg);
    }
  };

  // 버튼 활성화 조건
  const isFinishEnabled = !!email && !!code && codeVerified;

  return (
    <div>
      {/* 이메일 입력 */}
      <div className="w-full px-6 mb-3">
        <div className="flex border-b border-[#eee] items-center">
          <input
            type="email"
            className="flex-1 py-3 text-[15px] bg-transparent outline-none"
            placeholder="이메일 주소를 입력해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailSent}
          />
          <button
            className="border border-primary-1 rounded-lg px-4 py-2 ml-2 text-primary-1 text-[13px] hover:bg-primary-1 hover:text-white transition w-[110px]"
            onClick={handleSendEmail}
            disabled={!email || emailSent}
          >
            인증메일 발송
          </button>
        </div>
      </div>
      {/* 인증번호 입력 */}
      <div className="w-full px-6 mb-6">
        <div className="flex border-b border-[#eee] items-center">
          <input
            type="text"
            className="flex-1 py-3 text-[15px] bg-transparent outline-none"
            placeholder="인증번호를 입력해 주세요."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={!emailSent || codeVerified}
          />
          <button
            className="border border-primary-1 rounded-lg px-4 py-2 ml-2 text-primary-1 text-[13px] hover:bg-primary-1 hover:text-white transition w-[110px]"
            onClick={handleVerifyCode}
            disabled={
              !code ||
              !emailSent ||
              codeVerified ||
              attemptCount >= MAX_ATTEMPTS
            }
          >
            확인
          </button>
        </div>
        {/* 타이머와 에러 메시지 */}
        <div className="text-xs mt-2 min-h-[20px]">
          {error && <span className="text-authRed">{error}</span>}
          {emailSent && remainingTime > 0 && (
            <span className="text-gray-2 ml-2">
              인증번호 유효시간:{' '}
              <b>
                {Math.floor(remainingTime / 60)}:
                {(remainingTime % 60).toString().padStart(2, '0')}
              </b>
            </span>
          )}
          {emailSent && remainingTime <= 0 && (
            <span className="text-authRed ml-2">
              ❌ 인증번호가 만료되었습니다. 재전송해주세요.
            </span>
          )}
        </div>
      </div>
      {/* 인증 완료 버튼 */}
      <div className="w-full px-6 mt-4 mb-20">
        <GlobalButton
          variant={isFinishEnabled ? 'default' : 'secondary'}
          disabled={!isFinishEnabled}
          onClick={() => onVerified(email)}
        >
          인증 완료
        </GlobalButton>
      </div>
    </div>
  );
}
