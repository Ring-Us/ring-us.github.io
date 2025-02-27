import { useState, useEffect } from 'react';

const FileUpload = ({
  title,
  description,
  onFileSelect,
  maxSizeMB = 30, // 기본 파일 크기 제한: 30MB
  selectedFile, // 선택된 파일 상태
}: {
  title: string;
  description: string;
  onFileSelect: (file: File | null) => void;
  maxSizeMB?: number; // 파일 크기 제한
  selectedFile?: File | null; // 선택된 파일 (부모 컴포넌트에서 전달)
}) => {
  const [localSelectedFile, setLocalSelectedFile] = useState<File | null>(
    selectedFile || null,
  ); // 로컬 파일 상태
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 부모 컴포넌트에서 전달된 파일 상태를 로컬 상태와 동기화
    setLocalSelectedFile(selectedFile || null);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 제한 확인
      if (file.size / (1024 * 1024) > maxSizeMB) {
        setError(`파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`);
        setLocalSelectedFile(null);
        onFileSelect(null);
        return;
      }

      setLocalSelectedFile(file);
      setError(null);
      onFileSelect(file); // 부모 컴포넌트로 파일 전달
    }
  };

  const handleRemoveFile = () => {
    setLocalSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 제목 및 설명 */}
      <p className="text-xs text-primary-1 mt-8">{description}</p>
      <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold mt-2">
        {title}
      </h3>

      {/* 파일 선택 */}
      <div className="mt-8">
        <span className="flex mb-5 text-sm">첨부파일</span>

        {/* 선택된 파일 정보 */}
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
            >
              제거
            </button>
          </div>
        )}

        <label
          htmlFor="file-upload"
          className="border border-primary-1 rounded-lg px-4 py-2 text-primary-1 cursor-pointer"
        >
          파일 선택
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="flex flex-col mt-4 text-gray-2 text-xs">
          첨부 파일은 최대 30MB까지 등록 가능합니다.
        </span>

        {/* 에러 메시지 */}
        {error && <div className="mt-2 text-sm text-authRed">{error}</div>}
      </div>
    </div>
  );
};

export default FileUpload;
