import { Button } from '@/global/ui';

const variantClasses = {
  default: 'bg-primary-1',
  secondary: 'bg-primary-2',
  dark: 'bg-[#373737]',
};

interface ButtonProps {
  variant?: 'default' | 'secondary' | 'dark';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean; // disabled 추가
}

export function GlobalButton({
  variant = 'default',
  children,
  onClick,
  disabled = false, // 기본값 false
}: ButtonProps) {
  return (
    <Button
      className={`${variantClasses[variant]} w-full h-[55px] rounded-lg text-[16px] text-[#ffffff] hover:bg-primary-1`}
      onClick={!disabled ? onClick : undefined} // disabled 상태에서는 클릭 이벤트 실행 X
      disabled={disabled} // disabled 명확하게 적용
    >
      {children}
    </Button>
  );
}
