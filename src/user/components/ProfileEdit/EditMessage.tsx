import { useMentorInfoStore } from '@/user/store/useMentorInfoStore';

const EditMessage = () => {
  const { mentorData, setMentorData } = useMentorInfoStore();

  if (!mentorData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMentorData({
      ...mentorData,
      message: e.target.value,
    });
  };

  return (
    <div className="px-4 py-2">
      <div className="font-bold text-[16px] my-4">멘티에게 전하고 싶은 말</div>
      <textarea
        className="w-full min-h-[150px] px-5 py-4 border-[1px] border-[#D9D7E0] rounded-[10px] text-[14px] resize-none outline-none focus:border-primary-1"
        value={mentorData.message}
        onChange={handleChange}
        placeholder="멘티에게 전하고 싶은 말을 작성하세요."
        maxLength={200}
      />
    </div>
  );
};

export default EditMessage;
