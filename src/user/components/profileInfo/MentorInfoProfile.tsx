interface MentorInfoProfileProps {
  nickname: string;
  name: string;
  jobCategory: string;
  detailedJob: string;
  experience: number;
  mentoringCount: number;
  image: string;
}

const MentorInfoProfile = ({ nickname, name, jobCategory, detailedJob, experience, mentoringCount, image }: MentorInfoProfileProps) => {
    return (
        <div className="text-white px-10 pb-8 pt-5">
            <div className="flex items-center">
                <img
                    src={image || "/assets/ringusprofile.png"}
                    alt="멘토 프로필"
                    className="w-20 h-20 rounded-[50px] border-[1px] border-white object-cover"
                />
                <div className="ml-[20px]">
                    <p className="text-[16px] font-bold mb-[6px]">{nickname}</p>
                    <p className="text-[12px]">{name}</p>
                    <p className="text-[12px]">{jobCategory} | {detailedJob} | {experience}년차</p>
                </div>
            </div>

            <div className="flex justify-around items-center h-[60px] mt-5 p-2 rounded-[8px] border-[1px] border-white">
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[14px] text-white">멘토링 횟수</div>
                </div>
                <div className="w-px h-[30px] bg-white mx-4" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[16px] font-bold text-white">{mentoringCount}</div>
                </div>
            </div>
        </div>
    );
};

export default MentorInfoProfile;