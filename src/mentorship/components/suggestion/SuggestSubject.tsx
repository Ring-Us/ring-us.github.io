import { useState } from "react";

const SuggestSubject = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [text, setText] = useState("");

  const subjects = ["취업준비", "업계 동향", "면접 대비", "커리어 고민"];

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev: string[]) =>
      prev.includes(subject)
        ? prev.filter((t) => t !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className="px-4 py-2">
      <div className="font-semibold text-[18px] my-4">이야기 나누고 싶은 주제</div>

      {/* 주제 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            className={`text-[16px] border-[1px] rounded-[10px] flex flex-col items-center justify-center p-3
              ${selectedSubjects.includes(subject) ? "bg-[#F2EFFF] text-primary-1 border-primary-1" : "border-[#D9D7E0] text-[#8C8B93]"}`}
            onClick={() => toggleSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* 주제 작성 */}
      <textarea
        className="w-full min-h-[350px] px-5 py-4 mt-4 border-[1px] border-[#D9D7E0] rounded-[10px] text-[14px] resize-none outline-none focus:border-primary-1"
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= 500) {
            setText(e.target.value);
          }
        }}
        placeholder="하고 싶은 이야기가 별도로 있다면 직접 자유롭게 작성해 주세요."
        rows={4}
      />
      <div className="text-right text-[#94939B] text-[14px] mt-1">
        {text.length} / 500
      </div>
    </div>
  );
};

export default SuggestSubject;