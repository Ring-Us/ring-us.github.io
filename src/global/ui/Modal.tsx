interface ModalProps {
  title: string;
  message: string;
  onClose?: () => void; // "확인" 버튼이나 바깥 클릭 시
  onConfirm?: () => void; // 예
  onCancel?: () => void; // 아니오
  mode?: 'confirm' | 'reject'; // 모드 설정 (확인 또는 예/아니오)
}

export default function Modal({
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
  mode = 'confirm', // 기본값은 'confirm'
}: ModalProps) {
  // 'reject' 모드인 경우 예/아니오 버튼이 나타나고, 'confirm' 모드인 경우 확인 버튼만 표시
  const isRejectMode = mode === 'reject';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-[600px] h-full bg-[#171717] bg-opacity-80 flex items-center justify-center">
        <div
          className="w-full m-14 max-w-[600px] bg-[#ffffff] rounded-[15px] shadow-lg p-6 text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mt-2 text-lg font-bold">{title}</h2>
          <p
            className="mt-4 text-gray-1"
            dangerouslySetInnerHTML={{ __html: message }}
          ></p>

          {isRejectMode ? (
            <div className="mt-7 flex gap-3">
              <button
                onClick={onConfirm}
                className="w-1/2 py-3 bg-primary-1 text-white rounded-lg"
              >
                예
              </button>
              <button
                onClick={onCancel}
                className="w-1/2 py-3 bg-gray-3 text-gray-1 rounded-lg"
              >
                아니오
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="mt-7 w-full py-3 bg-primary-1 text-white rounded-lg"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
