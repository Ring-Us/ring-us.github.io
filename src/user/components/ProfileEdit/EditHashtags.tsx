import { useState } from "react";
import { MentorData } from "@/user/types";

import exit from "@/assets/exit.png";
import add from "@/assets/add.png";

interface EditHashtagsProps {
  mentorData: MentorData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorData>>;
}

const EditHashtags = ({ mentorData, setMentorData }: EditHashtagsProps) => {
  const [newTag, setNewTag] = useState("");

  // 해시태그 추가 (최대 8개, 글자수 15자 제한)
  const addHashtag = () => {
    const trimmedTag = newTag.trim();

    if (!trimmedTag) return;
    if (mentorData.hashtags.length >= 8) {
      alert("해시태그는 최대 8개까지 추가할 수 있습니다.");
      return;
    }
    if (trimmedTag.length > 15) {
      alert("해시태그는 최대 15자까지 입력 가능합니다.");
      return;
    }
    if (!mentorData.hashtags.includes(trimmedTag)) {
      setMentorData((prev) => ({
        ...prev,
        hashtags: [...prev.hashtags, trimmedTag],
      }));
      setNewTag("");
    }
  };

  // 해시태그 삭제
  const removeHashtag = (tag: string) => {
    setMentorData((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((t) => t !== tag),
    }));
  };

  return (
    <div className="px-4 my-2">
      <div className="font-bold text-[16px] my-4">경험 해시태그</div>
      
      {/* 해시태그 목록 */}
      <div className="flex flex-wrap gap-1">
        {mentorData.hashtags.map((tag, index) => (
          <div key={index} className="flex items-center border rounded-[10px] px-3 py-2 text-[14px]">
            #{tag}
            <button
              onClick={() => removeHashtag(tag)}
              className="ml-2"
            >
              <img src={exit} alt="exit" className="w-4 v-4" />
            </button>
          </div>
        ))}
        
        {/* 해시태그 추가 */}
        <div className="flex items-center border rounded-[10px] px-3 py-2 text-[14px]">
          <span className="text-gray-700">#</span>
          <input
            type="text"
            className="outline-none w-20"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="추가"
          />
          <button onClick={addHashtag} className="ml-2">
            <img src={add} alt="add" className="w-4 v-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHashtags;