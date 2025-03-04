import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bookmark, User, ClipboardList } from 'lucide-react';

interface MentorshipFooterProps {
  isVisible: boolean;
}

const MentorshipFooter: React.FC<MentorshipFooterProps> = ({ isVisible }) => {
  return (
    <div
      className="w-full max-w-[600px] mx-auto h-[50px] fixed bottom-0 bg-background p-4 pt-[7px] transition-transform duration-[1500ms] ease-in-out"
      style={{
        boxShadow: '0px -4px 4px rgba(210, 205, 205, 0.25)',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <div className="flex justify-around">
        {[
          { menu: '홈', icon: <Home size={24} />, link: '/' },
          {
            menu: '멘토링 현황',
            icon: <ClipboardList size={24} />,
            link: '/mentorship',
          },
          { menu: '북마크', icon: <Bookmark size={24} />, link: '/bookmark' },
          { menu: '마이', icon: <User size={24} />, link: '/user' },
        ].map(({ menu, icon, link }) =>
          link ? (
            <Link key={menu} to={link} className="text-center w-[47px]">
              <div className="w-[21px] h-[21px] mx-auto">{icon}</div>
              <div className="text-[10px]">{menu}</div>
            </Link>
          ) : (
            <div key={menu} className="text-center w-[47px]">
              <div className="w-[21px] h-[21px] mx-auto">{icon}</div>
              <div className="text-[10px]">{menu}</div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MentorshipFooter;
