interface MenteeInfoBioProps {
  introduction: string;
}

const MenteeInfoBio = ({ introduction }: MenteeInfoBioProps) => {
  return (
    <div className="px-4 my-8">
      <div className="bg-[#F2F2F6] rounded-[10px] px-5 py-4 text-[14px] whitespace-pre-line mb-10">{introduction}</div>
    </div>
  );
};

export default MenteeInfoBio;