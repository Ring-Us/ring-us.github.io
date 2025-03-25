import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bookmark, User, ClipboardList } from 'lucide-react';

interface MentorshipFooterProps {
  isVisible: boolean;
}

const MentorshipFooter: React.FC<MentorshipFooterProps> = ({ isVisible }) => {
  const menuItems = [
    { menu: '홈', icon: <Home size={24} />, link: '/' },
    { menu: '멘토링 현황', icon: <ClipboardList size={24} />, link: '/mentorship' },
    { menu: '북마크', icon: <Bookmark size={24} />, link: '/bookmark' },
    { menu: '마이', icon: <User size={24} />, link: '/user' },
  ];

  return (
    <div
      className={`w-full max-w-[600px] mx-auto h-[50px] fixed bottom-0 bg-background p-4 pt-[7px] transition-transform duration-500 ease-in-out shadow-lg ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-around">
        {menuItems.map(({ menu, icon, link }) => (
          <Link key={menu} to={link} className="text-center w-[47px]">
            {icon}
            <div className="text-[10px]">{menu}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MentorshipFooter;