import { useState, useEffect } from 'react';

const Slide3 = () => {
  const [imageHeight, setImageHeight] = useState('80vh');

  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      setImageHeight(`${viewportHeight * 0.5}px`); // 80% 높이 설정
    };

    updateHeight(); // 초기 실행
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="h-auto flex flex-col items-start justify-center text-left px-4">
      {/* 텍스트 영역 */}
      <div className="h-[calc(100vh-85vh)] flex flex-col mb-6">
        <h1 className="text-primary-1 text-2xl sm:text-3xl font-bold mb-4 ml-2">
          경험과 가능성 <span className="text-black">을</span>
          <span className="text-primary-1">
            <br />
            하나<span className="text-black">로</span>
          </span>
        </h1>
        <p className="text-sm text-gray-2 ml-2">
          링어스에서 함께 배우고 성장하며 더 큰 목표를 <br /> 이루어 보세요!
        </p>
      </div>

      {/* 이미지 영역 (동적 높이 설정) */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/landing3.png"
          alt="Slide 3"
          style={{ height: imageHeight }}
          className="w-full max-w-[500px] object-contain mb-10"
        />
      </div>
    </div>
  );
};

export default Slide3;
