const Slide4 = () => {
  return (
    <div className="h-auto flex flex-col items-start justify-center text-left px-4">
      {/* 텍스트 영역 */}
      <div className="flex flex-col mb-6">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4 ml-2">
          내일을 위한 연결 <br />
          오늘 링어스에서 시작
        </h1>
        <p className="text-sm text-white ml-2">
          멘토와 멘티를 이어주는 링어스에서 당신의 가능성을 펼쳐보세요!
        </p>
      </div>

      {/* 이미지 영역 (전체 높이 맞춤) */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/landing4.png"
          alt="Slide 4"
          className="max-w-[600px] h-[calc(100vh-200px)] object-contain"
        />
      </div>
    </div>
  );
};

export default Slide4;
