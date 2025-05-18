export interface Mentor {
  profileImage: string;
  name: string;
  jobTitle: string;
  description: string;
  mentoringCount: number;
}

interface MentorSectionProps {
  mentor: Mentor;
}

const MentorSection = ({ mentor }: MentorSectionProps) => {
  return (
    <div className="mt-[12px]">
      <div className="text-[18px] mb-[8px] font-semibold">제안 멘토</div>
      <div className="border-[1px] border-gray-10 bg-paymentblue rounded-[8px] flex items-center p-[16px]">
        <img className="w-[86px] h-[86px]" src={mentor.profileImage} alt="profile" />
        <div className="ml-3">
          <div className="text-[20px] font-semibold">{mentor.name}</div>
          <div className="text-[14px] text-gray-9">{mentor.jobTitle}</div>
          <div className="text-[12px] mt-[5px]">{mentor.description}</div>
          <div className="flex items-center justify-between border border-gray-8 px-3 py-0.5 rounded-[4px] mt-[5px] h-[30px] w-[135px] bg-[#fff]">
            <span className="text-primary-3 text-[12px]">멘토링 횟수</span>
            <span className="text-gray-5 text-[12px]">{mentor.mentoringCount}회</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSection;