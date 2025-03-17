import React from 'react';

interface AuthInputBoxProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // 에러 메시지
  successMessage?: string; // 성공 메시지
  successIcon?: React.ReactNode; // 성공 상태 아이콘
  buttonLabel?: string; // 버튼 텍스트 (선택적)
  onButtonClick?: () => void; // 버튼 클릭 핸들러 (선택적)
  rightIcon?: React.ReactNode; // 추가: 입력 필드 우측 아이콘
  className?: string; // 추가적인 클래스
}

export function AuthInputBox({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  successMessage,
  successIcon,
  buttonLabel,
  onButtonClick,
  rightIcon, // 추가
  className = '',
}: AuthInputBoxProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor={label} className="font-regular text-[14px]">
        {label}
      </label>
      <div
        className={`flex items-center border-b-[2px] relative ${
          error
            ? 'focus-within:border-authRed border-authRed'
            : 'border-[#DEDEDE]'
        } focus-within:border-primary-1`}
      >
        <input
          id={label}
          type={type}
          className={`flex-1 h-[45px] pl-2 pr-10 text-[16px] focus:outline-none ${className}`} // pr-10 추가 (아이콘 공간 확보)
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {/* 우측 아이콘 추가 */}
        {rightIcon && (
          <div className="absolute right-2 cursor-pointer">{rightIcon}</div>
        )}

        {buttonLabel && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="ml-2 px-4 py-2 text-primary-1 border rounded-lg text-sm font-medium hover:underline"
          >
            {buttonLabel}
          </button>
        )}
      </div>
      {error && <span className="text-sm text-authRed mt-2">{error}</span>}
      {!error && successMessage && (
        <span className="flex items-center text-sm text-authGreen mt-2">
          {successIcon}
          {successMessage}
        </span>
      )}
    </div>
  );
}
