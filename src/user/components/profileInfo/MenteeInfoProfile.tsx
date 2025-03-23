interface MenteeInfoProfileProps {
  nickname: string;
  schoolName: string;
  major: string;
  image: string;
}

const MenteeInfoProfile = ({ nickname, schoolName, major, image}: MenteeInfoProfileProps) => {
    return (
        <div className="text-white px-10 pb-10 pt-6">
            <div className="flex items-center">
                <img
                    src={image || "/assets/ringusprofile.png"}
                    alt="멘티 프로필"
                    className="w-20 h-20 rounded-[50px] border-[1px] border-white object-cover"
                />
                <div className="ml-[20px]">
                    <p className="text-[16px] font-bold mb-[6px]">{nickname}</p>
                </div>
            </div>

            {/* 학력 & 전공 */}
            <div className="bg-white/80 flex justify-around mt-5 p-2 rounded-[15px]">
                <div className="flex-1 flex flex-col items-center">
                    <p className="text-[14px] text-primary-1 font-[500]">학력</p>
                    <p className="text-[14px] text-black">{schoolName}</p>
                </div>
                <div className="w-[1px] h-8 bg-black mx-2 self-center"></div>
                <div className="flex-1 flex flex-col items-center">
                    <p className="text-[14px] text-primary-1 font-[500]">전공</p>
                    <p className="text-[14px] text-black">{major}</p>
                </div>
            </div>
        </div>
    );
};

export default MenteeInfoProfile;