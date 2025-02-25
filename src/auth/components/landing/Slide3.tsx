const Slide3 = () => {
  return (
    <div className="h-auto flex-col items-center justify-center text-center px-4">
      {/* 텍스트 영역 */}
      <div className="h-[calc(100vh-85vh)] flex flex-col items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          <span className="text-primary-1">경험과 가능성</span>을{' '}
          <span className="text-primary-1">하나</span>로
        </h1>
        <p className="text-sm text-gray-2">
          링어스에서 함께 배우고 성장하여 더 큰 목표를 이루어 보세요!
        </p>
      </div>

      {/* 이미지 영역 */}
      <div className="w-full h-auto">
        <img
          src="/assets/product-image.png"
          alt="Slide 1"
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Slide3;
