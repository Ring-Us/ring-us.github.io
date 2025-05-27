import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { Check, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@/auth/api/authApi';

import CompleteModal from '@/global/ui/Modal';
import ErrorModal from '@/global/ui/Modal';

export default function ResetForm({
  email,
  onResetComplete,
}: {
  email: string;
  onResetComplete: () => void;
}) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({ password: '', confirm: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  useEffect(() => {
    const newErrors = { password: '', confirm: '' };
    let newSuccessMessage = '';

    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        '대문자, 소문자, 숫자, 특수문자를 포함해 8~20자로 입력해주세요.';
    } else if (password && passwordRegex.test(password)) {
      newSuccessMessage = '사용 가능한 비밀번호입니다.';
    }

    if (password && confirm && password !== confirm) {
      newErrors.confirm = '입력한 비밀번호가 서로 달라요. 다시 확인해 주세요.';
    }

    setErrors(newErrors);
    setSuccessMessage(newSuccessMessage);

    setIsFormValid(passwordRegex.test(password) && password === confirm);
  }, [password, confirm]);

  const handleReset = async () => {
    if (isFormValid) {
      try {
        await resetPassword(email, password);
        setShowModal(true);
      } catch (e: any) {
        // 백엔드에서 보내는 message 콘솔 출력
        const backendMessage = e;
        setErrorMsg(
          backendMessage ||
            '비밀번호 변경에 실패했습니다. <br />다시 시도해주세요.',
        );
        setShowError(true);
      }
    }
  };

  return (
    <div>
      {/* ...비밀번호/확인 입력 폼 생략 (동일) */}
      <div className="w-full px-6 mb-3">
        <AuthInputBox
          label="새 비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="대문자, 소문자, 숫자, 특수문자를 포함해 8~20자로 입력해주세요."
          className="flex-1 py-3 text-[15px] bg-transparent outline-none pr-12"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          successMessage={successMessage}
          successIcon={
            <Check className="w-4 h-4 text-authGreen mr-2" strokeWidth={4} />
          }
          rightIcon={
            <div
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <Eye strokeWidth={1} className="w-6 h-6 text-gray-2" />
              ) : (
                <EyeOff strokeWidth={1} className="w-6 h-6 text-gray-2" />
              )}
            </div>
          }
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="w-full px-6 mb-3">
        <AuthInputBox
          label="비밀번호 확인"
          type={showConfirm ? 'text' : 'password'}
          placeholder="비밀번호를 다시 입력해주세요."
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          rightIcon={
            <div
              onMouseEnter={() => setShowConfirm(true)}
              onMouseLeave={() => setShowConfirm(false)}
              className="cursor-pointer"
            >
              {showConfirm ? (
                <Eye strokeWidth={1} className="w-6 h-6 text-gray-2" />
              ) : (
                <EyeOff strokeWidth={1} className="w-6 h-6 text-gray-2" />
              )}
            </div>
          }
        />
      </div>

      {/* 완료 버튼 */}
      <div className="w-full px-6 mt-4 mb-20">
        <GlobalButton
          onClick={handleReset}
          variant={isFormValid ? 'default' : 'secondary'}
          disabled={!isFormValid}
        >
          비밀번호 변경
        </GlobalButton>
      </div>

      {/* 완료 모달 */}
      {showModal && (
        <CompleteModal
          title="비밀번호 재설정 완료"
          message={`비밀번호 재설정이 완료되었습니다.<br />다시 로그인 해주세요.`}
          onClose={() => navigate('/auth/signin')}
        />
      )}
      {/* 에러 모달 */}
      {showError && (
        <ErrorModal
          title="오류"
          message={errorMsg}
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
}
