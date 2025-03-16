interface MentorInfoProfileProps {
  nickname: string;
  name: string;
  jobCategory: string;
  detailedJob: string;
  experience: number;
  count: number;
  image: string;
}

const MentorInfoProfile = ({ nickname, name, jobCategory, detailedJob, experience, count, image }: MentorInfoProfileProps) => {
    return (
        <div className="text-white px-14 pb-10 pt-6">
            <div className="flex items-center">
                <img
                    src={image || "/assets/ringusprofile.png"}
                    alt="멘토 프로필"
                    className="w-20 h-20 rounded-[50px] border-[1px] border-white object-cover"
                />
                <div className="ml-[20px]">
                    <p className="text-[16px] font-bold mb-[6px]">{nickname}</p>
                    <p className="text-[12px]">{jobCategory} | {detailedJob}</p>
                    <p className="text-[12px]">{experience}년차</p>
                </div>
            </div>

            <div className="bg-white/80 flex justify-around mt-5 p-2 rounded-[15px]">
                <div className="flex flex-col items-center ml-7">
                    <p className="text-[12px] text-black">멘토링 횟수</p>
                    <p className="text-[16px] font-bold text-primary-1">{count}회</p>
                </div>
                <div className="border-r-[1px] border-black"></div>
                <div className="flex flex-col items-center mr-7">
                    <p className="text-[12px] text-black">응답률</p>
                    <p className="text-[16px] font-bold text-primary-1">100%</p>
                </div>
            </div>
        </div>
    );
};

export default MentorInfoProfile;