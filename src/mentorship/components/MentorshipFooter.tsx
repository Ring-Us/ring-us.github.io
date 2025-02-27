import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/footer_home.png';
import BookmarkIcon from '../../assets/footer_bookmark.png';
import mentoringIcon from '../../assets/footer_mentoring.png';
import myIcon from '../../assets/footeer_my.png';

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
          { menu: '홈', img: homeIcon, link: '/' },
          { menu: '북마크', img: BookmarkIcon},
          { menu: '멘토링 현황', img: mentoringIcon, link: '/mentorship' },
          { menu: '마이', img: myIcon },
        ].map(({ menu, img, link }) =>
          link ? (
            <Link key={menu} to={link} className="text-center w-[47px]">
              <img src={img} alt={menu} className="w-[21px] h-[21px] mx-auto" />
              <div className="text-[10px]">{menu}</div>
            </Link>
          ) : (
            <div key={menu} className="text-center w-[47px]">
              <img src={img} alt={menu} className="w-[21px] h-[21px] mx-auto" />
              <div className="text-[10px]">{menu}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MentorshipFooter;