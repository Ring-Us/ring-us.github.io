import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/auth/pages/LandingStyle.css';
import { useNavigate } from 'react-router-dom';
import Slide1 from '../components/landing/Slide1';
import Slide2 from '../components/landing/Slide2';
import Slide3 from '../components/landing/Slide3';
import Slide4 from '../components/landing/Slide4';
import { AuthButton } from '@/global/ui/GlobalButton';

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFinish = () => {
    navigate('/'); // 홈으로 이동
  };

  const handleSkip = () => {
    navigate('/'); // 홈 화면으로 이동
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: any) => (
      <div className="absolute w-full">
        <ul className="relative bottom">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="w-full max-w-[600px] h-[calc(100vh-30vh)] px-2">
        <Slider {...settings}>
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide4 />
        </Slider>
      </div>

      {/* 건너뛰기 버튼: 클릭 시 홈 화면으로 이동 */}
      {currentSlide !== 3 && (
        <button
          className="absolute bottom-10 right-10 text-sm hover:underline"
          onClick={handleSkip}
        >
          건너뛰기
        </button>
      )}

      {/* 마지막 슬라이드에서만 "지금 시작하기" 버튼 표시 */}
      {currentSlide === 3 && (
        <div className="absolute bottom-14 left-5 right-5">
          <AuthButton variant="default" onClick={handleFinish}>
            지금 시작하기
          </AuthButton>
        </div>
      )}
    </div>
  );
}
