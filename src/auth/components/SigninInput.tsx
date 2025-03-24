import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

interface SigninInputProps {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  icon: keyof typeof icons;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 사용할 아이콘 목록
const icons = {
  lock: Lock,
  user: User,
};

export function SigninInput({
  type,
  placeholder,
  icon,
  value,
  onChange,
}: SigninInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const LucideIcon = icons[icon] || User; // 아이콘이 없을 경우 기본 아이콘 설정

  return (
    <div className="flex items-center w-full h-[55px] px-4 border rounded-md border-gray-3 focus-within:border-primary-1 relative">
      {/* 좌측 아이콘 */}
      <div className="mr-4 text-gray-2">
        <LucideIcon strokeWidth={1} className="w-6 h-6" />
      </div>

      {/* 입력 필드 */}
      <input
        type={type === 'password' && showPassword ? 'text' : type} // 비밀번호 보기 기능 적용
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 text-[16px] focus:outline-none"
      />

      {/* 비밀번호 보기 아이콘 (password 타입일 경우만 표시) */}
      {type === 'password' && (
        <div
          onMouseEnter={() => setShowPassword(true)}
          onMouseLeave={() => setShowPassword(false)}
          className="absolute right-4 cursor-pointer"
        >
          {showPassword ? (
            <Eye strokeWidth={1} className="text-gray-2 w-6 h-6" />
          ) : (
            <EyeOff strokeWidth={1} className="text-gray-2 w-6 h-6" />
          )}
        </div>
      )}
    </div>
  );
}
