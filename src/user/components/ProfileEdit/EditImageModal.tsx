import React from "react";

interface EditImageModalProps {
  onClose: () => void;
  onResetProfile: () => void;
  onUploadProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditImageModal: React.FC<EditImageModalProps> = ({ onClose, onResetProfile, onUploadProfile }) => {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-[600px] h-[230px] rounded-t-[30px] p-8">

        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-[16px]">프로필 사진 변경</h2>
          <button onClick={onClose}>
            <img src="/assets/exit.png" alt="close" className="w-6 h-6" />
          </button>
        </div>

        <button
          className="w-full  text-black rounded-[10px] text-[16px] p-4 border-b-[1px]"
          onClick={onResetProfile}
        >
          기본 프로필로 변경
        </button>

        <label className="w-full text-black rounded-[10px] text-[16px] p-4 flex items-center justify-center cursor-pointer">
          이미지 선택
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onUploadProfile}
          />
        </label>
      </div>
    </div>
  );
};

export default EditImageModal;