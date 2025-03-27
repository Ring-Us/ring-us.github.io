import { useState, useEffect } from 'react';

const Slide1 = () => {
  const [imageHeight, setImageHeight] = useState('80vh');

  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      setImageHeight(`${viewportHeight * 0.5}px`); // 80% 높이로 설정
    };

    updateHeight(); // 초기 실행
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="h-auto flex flex-col items-start justify-center text-left px-4">
      {/* 텍스트 영역 */}
      <div className="h-[calc(100vh-85vh)] flex flex-col mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 ml-2">
          언제 어디서나
          <span className="text-primary-1">
            <br /> 손쉽게 연결하세요!
          </span>
        </h1>
        <p className="text-sm text-gray-2 ml-2">
          멘토와 멘티를 간편하게 이어주는 <br />
          링어스에서 당신의 시간을 가치 있게 만들어보세요.
        </p>
      </div>

      {/* 이미지 영역 */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/landing1.png"
          alt="Slide 1"
          style={{ height: imageHeight }}
          className="w-full max-w-[550px] object-contain mb-10"
        />
      </div>
    </div>
  );
};

export default Slide1;
