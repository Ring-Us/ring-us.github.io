import { Button } from '@/global/ui';

const variantClasses = {
  default: 'bg-primary-1 text-white hover:bg-primary-1 hover:text-white',
  secondary: 'bg-primary-2 text-white hover:bg-primary-1 hover:text-white',
  dark: 'bg-[#373737] text-white',
  transparent:
    'bg-transparent text-primary-1 border border-primary-1 hover:bg-primary-1 hover:text-white',
  dark_transparent:
    'bg-transparent text-gray-2 border border-gray-2 hover:bg-gray-1 hover:text-white',
};

interface ButtonProps {
  variant?:
    | 'default'
    | 'secondary'
    | 'dark'
    | 'transparent'
    | 'dark_transparent';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function GlobalButton({
  variant = 'default',
  children,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <Button
      className={`${variantClasses[variant]} w-full h-[55px] rounded-lg text-[16px] ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
