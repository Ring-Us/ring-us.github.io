import { useState, useEffect } from 'react';

const FileUpload = ({
  title,
  description,
  onFileSelect,
  maxSizeMB = 10,
  selectedFile,
  isUploading = false, // isUploading 속성 추가
}: {
  title: string;
  description: string;
  onFileSelect: (file: File | null) => void;
  maxSizeMB?: number;
  selectedFile?: File | null;
  isUploading?: boolean; // 새롭게 추가
}) => {
  const [localSelectedFile, setLocalSelectedFile] = useState<File | null>(
    selectedFile || null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalSelectedFile(selectedFile || null);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size / (1024 * 1024) > maxSizeMB) {
        setError(`파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`);
        setLocalSelectedFile(null);
        onFileSelect(null);
        return;
      }
      setLocalSelectedFile(file);
      setError(null);
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setLocalSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-xs text-primary-1 mt-8">{description}</p>
      <h3 className="text-xl sm:text-2xl font-bold mt-2">{title}</h3>

      <div className="mt-8">
        <span className="flex mb-5 text-sm">첨부파일</span>

        {localSelectedFile && (
          <div className="mb-5 p-5 rounded-lg text-xs flex items-center justify-between h-[40px] text-gray-1 bg-gray-4">
            <span className="truncate w-full pr-4">
              <strong className="truncate">{localSelectedFile.name}</strong>
              <span className="ml-2 text-gray-2">
                ({(localSelectedFile.size / 1024).toFixed(2)} KB)
              </span>
            </span>
            <button
              onClick={handleRemoveFile}
              className="text-xs text-authRed ml-4 underline whitespace-nowrap"
              disabled={isUploading} // 업로드 중이면 제거 버튼 비활성화
            >
              제거
            </button>
          </div>
        )}

        <label
          htmlFor="file-upload"
          className={`border border-primary-1 rounded-lg px-4 py-2 text-primary-1 cursor-pointer ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          파일 선택
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading} // 업로드 중이면 파일 선택 비활성화
        />
        <span className="flex flex-col mt-4 text-gray-2 text-xs">
          첨부 파일은 최대 {maxSizeMB}MB까지 등록 가능합니다.
        </span>

        {error && <div className="mt-2 text-sm text-authRed">{error}</div>}
      </div>
    </div>
  );
};

export default FileUpload;
