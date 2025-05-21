import { useState } from 'react';
import { MentorData } from '@/user/types';
import { X } from 'lucide-react';
import { Plus } from 'lucide-react';

interface EditHashtagsProps {
  mentorData: MentorData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorData | null>>;
}

const EditHashtags = ({ mentorData, setMentorData }: EditHashtagsProps) => {
  const [newTag, setNewTag] = useState('');

  // 해시태그 추가 (최대 8개, 글자수 15자 제한)
  const addHashtag = () => {
    const trimmedTag = newTag.trim();

    if (!trimmedTag) return;
    if (mentorData.hashtags.length >= 8) {
      alert('해시태그는 최대 8개까지 추가할 수 있습니다.');
      return;
    }
    if (trimmedTag.length > 15) {
      alert('해시태그는 최대 15자까지 입력 가능합니다.');
      return;
    }
    if (!mentorData.hashtags.includes(trimmedTag)) {
      setMentorData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          hashtags: [...prev.hashtags, trimmedTag],
        };
      });
      setNewTag('');
    }
  };

  // 해시태그 삭제
  const removeHashtag = (tag: string) => {
    setMentorData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        hashtags: prev.hashtags.filter((t) => t !== tag),
      };
    });
  };

  return (
    <div className="px-4 py-2">
      <div className="font-bold text-[16px] my-4">경험 해시태그</div>

      {/* 해시태그 목록 */}
      <div className="flex flex-wrap gap-1">
        {mentorData.hashtags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center border rounded-[10px] px-3 py-2 text-[14px]"
          >
            #{tag}
            <button onClick={() => removeHashtag(tag)} className="ml-2">
              <X size={16} strokeWidth={1.0} color='#E97B7B'/>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault();
                addHashtag();
              }
            }}
            placeholder="추가"
          />
          <button onClick={addHashtag} className="ml-2">
            <Plus size={16} strokeWidth={1.0} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHashtags;
