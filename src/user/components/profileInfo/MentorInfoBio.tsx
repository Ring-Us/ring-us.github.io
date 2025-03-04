interface MentorInfoBioProps {
  summary: string;
  bio: string;
}

const MentorInfoBio = ({ summary, bio }: MentorInfoBioProps) => {
  return (
    <div className="px-4 my-2">
      <div className="font-bold text-[16px] my-7 text-center">{summary}</div>
      <div className="bg-[#F2F2F6] rounded-[10px] px-5 py-4 text-[14px] whitespace-pre-line">{bio}</div>
    </div>
  );
};

export default MentorInfoBio;