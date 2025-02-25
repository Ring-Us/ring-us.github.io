const Slide4 = () => {
  return (
    <div className="h-auto flex-col items-center justify-center text-center px-4">
      {/* 텍스트 영역 */}
      <div className="h-[calc(100vh-85vh)] flex flex-col items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          내일을 위한 연결
          <span className="text-primary-1">
            <br /> 오늘 링어스에서 시작
          </span>
        </h1>
        <p className="text-sm text-gray-2">
          멘토와 멘티를 이어주는 링어스에서 당신의 가능성을 펼쳐보세요!
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

export default Slide4;
