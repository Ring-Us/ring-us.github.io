interface MentorInfoMessageProps {
  message: string;
}

const MentorInfoMessage = ({ message }: MentorInfoMessageProps) => {
  return (
      <div className="px-4 py-2">
          <div className="font-bold text-[16px] my-4">멘티에게 전하고 싶은 말</div>
          <div className="bg-[#F2F2F6] rounded-[10px] px-5 py-4 text-[14px] whitespace-pre-line">{message}</div>
      </div>
  );
};

export default MentorInfoMessage;