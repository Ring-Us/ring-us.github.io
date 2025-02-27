interface MypageModalProps {
  message: string;
  onClose: () => void;
}

export default function MypageModal({ message, onClose }: MypageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      //onClick={onClose} // 바깥 클릭하면 모달 닫힘
    >
      <div className="w-full max-w-[600px] h-full bg-[#171717] bg-opacity-80 flex items-center justify-center">
        <div
          className="w-full m-14 max-w-[600px] bg-[#ffffff] rounded-[15px] shadow-lg p-6 text-center relative"
          onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
        >
          <p className="mt-2 text-gray-1">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-[#130c0c] text-[#ffffff] rounded-lg"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
