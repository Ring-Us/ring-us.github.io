import { useState, useEffect } from 'react';
import { AuthButton } from '@/global/ui/GlobalButton';
import { AuthInputBox } from '@/auth/components/AuthInputBox';
import { Check } from 'lucide-react';

const CreatePassword = ({ onNext }: { onNext: (password: string) => void }) => {
  const [password, setPassword] = useState(''); // 비밀번호 입력 값
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 입력 값
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' }); // 에러 메시지
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지
  const [isFormValid, setIsFormValid] = useState(false); // ✅ 폼 유효성 상태 추가

  // 비밀번호 조건: 8~20자, 대문자 1개 이상, 영문, 숫자, 특수문자 포함
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 비밀번호 유효성 검사
  useEffect(() => {
    const newErrors = { password: '', confirmPassword: '' };
    let newSuccessMessage = '';

    // 비밀번호 유효성 검사
    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        '대문자, 소문자, 숫자, 특수문자를 포함해 8~20자로 입력해주세요.';
    } else if (password && passwordRegex.test(password)) {
      newSuccessMessage = '사용 가능한 비밀번호입니다.';
    }

    // 비밀번호 확인 검사
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword =
        '입력한 비밀번호가 서로 달라요. 다시 확인해 주세요.';
    }

    setErrors(newErrors);
    setSuccessMessage(newSuccessMessage);

    // 모든 조건이 충족되면 버튼 활성화
    setIsFormValid(
      passwordRegex.test(password) && password === confirmPassword,
    );
  }, [password, confirmPassword]);

  const handleNext = () => {
    if (isFormValid) {
      onNext(password);
    }
  };

  return (
    <div className="relative flex flex-col w-full mt-10">
      <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold mt-2">
        <span className="text-primary-1">안전한 비밀번호</span>를 <br /> 만들어
        주세요!
      </h3>

      {/* 비밀번호 입력 */}
      <div className="mt-8">
        <AuthInputBox
          label="비밀번호"
          type="password"
          placeholder="대문자, 소문자, 숫자, 특수문자를 포함해 8~20자로 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          successMessage={successMessage}
          successIcon={
            <Check className="w-4 h-4 text-authGreen mr-2" strokeWidth={4} />
          }
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="mt-6">
        <AuthInputBox
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-16 w-full">
        <AuthButton
          onClick={handleNext}
          variant={isFormValid ? 'default' : 'secondary'}
          disabled={!isFormValid} // 버튼 비활성화 적용
        >
          회원가입 완료
        </AuthButton>
      </div>
    </div>
  );
};

export default CreatePassword;
