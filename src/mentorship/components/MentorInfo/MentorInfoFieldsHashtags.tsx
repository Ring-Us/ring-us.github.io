interface MentorInfoFieldsHashtagsProps {
    mentoringField: string[];
    hashtags: string[];
}

const MentorInfoFieldsHashtags = ({ mentoringField, hashtags }: MentorInfoFieldsHashtagsProps) => {
  return (
    <div className="px-4 my-2">
            <div className="font-bold text-[16px] my-4">멘토링 분야</div>

            <div className="grid grid-cols-2 gap-4 px-7">
                {mentoringField.map((field, index) => (
                    <div key={index} className="text-[14px] border-[1px] border-primary-1 rounded-[10px] flex flex-col items-center justify-center p-2">
                        <img 
                            src={["/assets/mentorinfo1.png", "/assets/mentorinfo2.png", "/assets/mentorinfo3.png", "/assets/mentorinfo4.png"][index]}
                            alt={field} className="w-[60px] h-[60px]"
                        />
                        <div>{field}</div>
                    </div>
                ))}
            </div>

            {hashtags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 px-7">
                    {hashtags.map((tag, index) => (
                        <div key={index} className="px-2 py-1 text-primary-1 bg-[#F2EFFF] rounded-[30px] text-[12px]">
                            #{tag}
                        </div>
                    ))}
                </div>
            )}
        </div>
  );
};

export default MentorInfoFieldsHashtags;