import { useState } from 'react';
import { AuthButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { sendVerificationCode, verifyCode } from '@/auth/api/emailApi';

const EmailVerification = ({ onNext }: { onNext: (email: string) => void }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [attemptCount, setAttemptCount] = useState(0); // 인증 실패 시도 횟수 추가
  const MAX_ATTEMPTS = 5; // 최대 시도 횟수 지정

  // 이메일 입력 핸들러
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(regex.test(value));

    if (codeError) {
      setCodeError('');
    }
  };

  // 인증번호 입력 핸들러
  const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  // 이메일 인증번호 요청
  const handleSendCode = async () => {
    if (!isEmailValid) return;

    try {
      await sendVerificationCode(email);
      setIsCodeSent(true);
      setAttemptCount(0); // 인증번호 재전송 시 시도 횟수 초기화
    } catch (error: any) {
      setCodeError('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  // 인증번호 검증
  const handleVerifyCode = async () => {
    if (!verificationCode) return;

    try {
      const response = await verifyCode(email, verificationCode);

      if (response.status === 200 || response.status === 201) {
        setIsCodeVerified(true);
        setCodeError('');
        setSuccessMessage('✅ 인증이 성공하였습니다!');
        setAttemptCount(0); // 인증 성공 시 시도 횟수 초기화
      } else {
        throw new Error(response.message || '인증번호가 올바르지 않습니다.');
      }
    } catch (error: any) {
      let errorMsg = '❌ 인증번호가 올바르지 않습니다.';
      if (error.response) {
        const { status, message, remainingAttempts } = error.response.data;

        if (status === 400) {
          setAttemptCount((prev) => prev + 1); // 실패 시 카운트 증가
          const attemptsLeft =
            remainingAttempts ?? MAX_ATTEMPTS - (attemptCount + 1); // 남은 시도 횟수 계산

          errorMsg = `❌ 인증번호가 올바르지 않습니다. (${attemptCount + 1}/${MAX_ATTEMPTS}회 시도)`;

          if (attemptsLeft <= 0) {
            errorMsg = '❌ 인증번호를 5회 틀렸습니다. 다시 요청해주세요.';
          }
        } else if (status === 403) {
          if (message.includes('TTL')) {
            errorMsg = '❌ 인증번호가 만료되었습니다. 다시 요청해주세요.';
          } else if (message.includes('5회')) {
            errorMsg = '❌ 인증번호를 5회 틀렸습니다. 다시 요청해주세요.';
          } else {
            errorMsg = '❌ 인증이 거부되었습니다.';
          }
        } else {
          errorMsg = '❌ 인증 실패. 다시 시도해주세요.';
        }
      } else {
        errorMsg = '❌ 서버 오류가 발생했습니다. 나중에 다시 시도해주세요.';
      }

      setCodeError(errorMsg);
      setIsCodeVerified(false);
      setSuccessMessage('');
    }
  };

  return (
    <div className="relative flex flex-col w-full mt-8">
      <span className="text-sm text-primary-1">
        * 학교 이메일로 인증 시 빠르게 넘어갈 수 있어요
      </span>

      {/* 제목 */}
      <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold mt-2">
        {!isCodeSent ? (
          <>
            이메일 인증을 완료하면 <br /> 가입을 시작할 수 있어요!
          </>
        ) : (
          <>
            {email}
            로 전송된 <br />
            인증번호를 입력하세요.
          </>
        )}
      </h3>

      {/* 이메일 입력 or 인증번호 입력 */}
      {!isCodeSent ? (
        <div className="mt-12">
          <AuthInputBox
            label="이메일"
            type="email"
            placeholder="abc@email.com"
            value={email}
            onChange={handleEmail}
            error={
              (!isEmailValid && email.length > 0
                ? '올바른 이메일을 입력해주세요. '
                : '') || codeError
            }
          />
        </div>
      ) : (
        <div className="mt-12">
          <AuthInputBox
            label="인증번호"
            type="text"
            placeholder="인증번호 4자리를 입력하세요."
            value={verificationCode}
            onChange={handleCode}
            buttonLabel="인증번호 확인"
            onButtonClick={handleVerifyCode}
            error={codeError}
            successMessage={successMessage}
          />
          <div className="p-2 text-gray-2 text-xs">
            메일이 안 왔을 경우, 스팸함을 확인해주세요.
          </div>
        </div>
      )}

      {/* 버튼 */}
      <div className="absolute bottom-16 w-full flex gap-2">
        {!isCodeSent ? (
          <AuthButton
            onClick={handleSendCode}
            variant={isEmailValid ? 'default' : 'secondary'}
            disabled={!isEmailValid}
          >
            인증번호 받기
          </AuthButton>
        ) : (
          <AuthButton
            onClick={() => onNext(email)}
            variant={isCodeVerified ? 'default' : 'secondary'}
            disabled={!isCodeVerified}
          >
            다음으로
          </AuthButton>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
