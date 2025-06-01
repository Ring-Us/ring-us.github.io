import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bookmark, User, ClipboardList, ListChecks } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: '멘토목록',
      path: '/mentorship',
      icon: <ClipboardList size={24} strokeWidth={1} />,
      onClick: () => navigate('/mentorship'),
    },
    {
      name: '북마크',
      path: '/bookmark',
      icon: <Bookmark size={24} strokeWidth={1} />,
      onClick: () => navigate('/bookmark'),
    },
    {
      name: '홈',
      path: '/',
      icon: <Home size={24} strokeWidth={1} />,
      onClick: () => navigate('/'),
    },
    {
      name: '신청현황',
      path: '/progress',
      icon: <ListChecks size={24} strokeWidth={1} />,
      onClick: () => navigate('/progress'), // 클릭 시 무조건 Progress 페이지로 이동
    },
    {
      name: '마이',
      path: '/user',
      icon: <User size={24} strokeWidth={1} />,
      onClick: () => navigate('/user'),
    },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-[#ffffff] border-t shadow-md">
      <div className="flex justify-around py-3">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={item.onClick}
            className={`flex flex-col items-center text-sm ${
              location.pathname === item.path
                ? 'text-primary-1 font-bold'
                : 'text-gray-1'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Footer;
