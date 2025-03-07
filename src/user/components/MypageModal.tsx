interface MypageModalProps {
  title: string;
  message: string;
  onConfirm: () => void; // "예" 버튼 클릭 시 실행할 함수
  onClose: () => void; // "아니오" 버튼 클릭 시 실행할 함수 (모달 닫기)
}

export default function MypageModal({
  title,
  message,
  onConfirm,
  onClose,
}: MypageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-[600px] h-full bg-[#171717] bg-opacity-80 flex items-center justify-center">
        <div className="w-full m-14 max-w-[600px] bg-[#ffffff] rounded-[15px] shadow-lg p-6 text-center relative">
          {/* HTML 태그가 포함된 메시지 렌더링 */}
          <h2 className="mt-2 text-lg font-bold">{title}</h2>
          <p
            className="mt-4 text-gray-1"
            dangerouslySetInnerHTML={{ __html: message }}
          />

          {/* "예" / "아니오" 버튼 추가 */}
          <div className="mt-7 flex justify-center space-x-4">
            <button
              onClick={onConfirm} // "예" 버튼 클릭 시
              className="px-10 py-2 bg-primary-1 text-white rounded-lg"
            >
              예
            </button>
            <button
              onClick={onClose} // "아니오" 버튼 클릭 시 모달 닫기
              className="px-7 py-2 bg-gray-2 text-white rounded-lg"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
