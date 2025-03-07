import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Slide1 from '../components/landing/Slide1';
import Slide2 from '../components/landing/Slide2';
import Slide3 from '../components/landing/Slide3';
import Slide4 from '../components/landing/Slide4';
import { GlobalButton } from '@/global/ui/GlobalButton';

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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
  };

  return (
    <div
      style={{ height: viewportHeight }}
      className="flex flex-col h-screen justify-between"
    >
      {/* 슬라이더 영역 */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-[600px]">
          <Slider {...settings}>
            <Slide1 />
            <Slide2 />
            <Slide3 />
            <Slide4 />
          </Slider>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full flex justify-end px-7 pb-7">
        {currentSlide !== 3 && (
          <button className="text-sm hover:underline" onClick={handleSkip}>
            건너뛰기
          </button>
        )}

        {currentSlide === 3 && (
          <GlobalButton variant="default" onClick={handleFinish}>
            지금 시작하기
          </GlobalButton>
        )}
      </div>
    </div>
  );
}
