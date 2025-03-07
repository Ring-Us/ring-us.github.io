import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TopNavbarProps {
  title?: string;
  onBack?: () => void;
}

export default function TopNavbar({ title, onBack }: TopNavbarProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] h-14 bg-[#fff] shadow-sm flex items-center px-3 z-50">
      <button
        className="flex items-center justify-center rounded-full flex-none"
        onClick={onBack ? onBack : () => navigate(-1)}
      >
        <ArrowLeft strokeWidth={1} className="w-6 h-6 text-gray-1" />
      </button>
      <h1 className="flex-1 text-lg font-semibold text-center">{title}</h1>
      <div className="w-10"></div> {/* 오른쪽 균형 맞추기 */}
    </div>
  );
}
