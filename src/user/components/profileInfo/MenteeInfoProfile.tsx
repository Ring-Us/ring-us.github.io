interface MenteeInfoProfileProps {
  nickname: string;
  schoolName: string;
  major: string;
  image: string;
}

const MenteeInfoProfile = ({ nickname, schoolName, major, image}: MenteeInfoProfileProps) => {
    return (
        <div className="text-white px-10 pb-8 pt-5">
            <div className="flex items-center">
                <img
                    src={image || "/assets/ringusprofile.png"}
                    alt="멘티 프로필"
                    className="w-20 h-20 rounded-[50px] border-[1px] border-white object-cover"
                />
                <div className="ml-[20px]">
                    <p className="text-[20px] font-bold mb-[6px]">{nickname}</p>
                </div>
            </div>

            {/* 학력 & 전공 */}
            <div className="flex justify-around items-center h-[60px] mt-5 p-2 rounded-[8px] border-[1px] border-white">
                <div className="flex-1 flex flex-col items-center">
                    <p className="text-[14px] text-white font-bold">학력</p>
                    <p className="text-[14px] text-white">{schoolName}</p>
                </div>
                <div className="w-px h-[30px] bg-white mx-4" />
                <div className="flex-1 flex flex-col items-center">
                    <p className="text-[14px] text-white font-bold">전공</p>
                    <p className="text-[14px] text-white">{major}</p>
                </div>
            </div>
        </div>
    );
};

export default MenteeInfoProfile;