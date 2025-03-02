interface MenteeInfoBioProps {
  summary: string;
  bio: string;
}

const MenteeInfoBio = ({ summary, bio }: MenteeInfoBioProps) => {
  return (
    <div className="px-4 my-2">
      <div className="font-bold text-[16px] my-7 text-center">{summary}</div>
      <div className="bg-[#F2F2F6] rounded-[10px] px-5 py-4 text-[14px] whitespace-pre-line mb-10">{bio}</div>
    </div>
  );
};

export default MenteeInfoBio;