import { Lock, User } from 'lucide-react';

interface SigninInputProps {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  icon: keyof typeof icons;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 사용할 아이콘 목록 (이쪽으로 아이콘 추가)
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
  const LucideIcon = icons[icon] || User; // 아이콘이 없을 경우 기본 아이콘 설정

  return (
    <div className="flex items-center w-full h-[55px] px-4 border rounded-md border-gray-3 focus-within:border-primary-1">
      {/* Lucide 아이콘 */}
      <div className="mr-4 text-gray-2">
        <LucideIcon strokeWidth={1} className="w-6 h-6" />
      </div>
      {/* 입력 필드 */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 text-[16px] focus:outline-none"
      />
    </div>
  );
}
