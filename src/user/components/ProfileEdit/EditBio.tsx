import { MentorData } from "@/user/types";
import { MenteeData } from "@/user/menteetypes";

interface EditBioProps {
  mentorData?: MentorData;
  setMentorData?: React.Dispatch<React.SetStateAction<MentorData>>;
  menteeData?: MenteeData;
  setMenteeData?: React.Dispatch<React.SetStateAction<MenteeData>>;
}

const EditBio = ({ mentorData, setMentorData, menteeData, setMenteeData }: EditBioProps) => {

  if (!mentorData && !menteeData) return null;

  return (
    <div className="px-4 my-2">
      <div className="font-bold text-[16px] my-4">자기소개</div>

      {/* 한줄소개 */}
      <textarea
        className="w-full px-5 py-4 border-[1px] border-[#D9D7E0] rounded-[10px] text-[14px] resize-none outline-none focus:border-primary-1"
        rows={1}
        value={mentorData?.introduction.summary || menteeData?.introduction.summary || ""}
        onChange={(e) => {
          if (mentorData && setMentorData) {
            setMentorData({
              ...mentorData,
              introduction: { ...mentorData.introduction, summary: e.target.value }
            });
          } else if (menteeData && setMenteeData) {
            setMenteeData({
              ...menteeData,
              introduction: { ...menteeData.introduction, summary: e.target.value }
            });
          }
        }}
        placeholder="한줄 소개를 작성하세요."
        maxLength={30}
      />

      {/* 자기소개 */}
      <textarea
        className="w-full min-h-[250px] px-5 py-4 mt-2 border-[1px] border-[#D9D7E0] rounded-[10px] text-[14px] resize-none outline-none focus:border-primary-1"
        value={mentorData?.introduction.bio || menteeData?.introduction.bio || ""}
        onChange={(e) => {
          if (mentorData && setMentorData) {
            setMentorData({
              ...mentorData,
              introduction: { ...mentorData.introduction, bio: e.target.value }
            });
          } else if (menteeData && setMenteeData) {
            setMenteeData({
              ...menteeData,
              introduction: { ...menteeData.introduction, bio: e.target.value }
            });
          }
        }}
        placeholder="자기소개를 작성하세요."
        maxLength={500}
      />

      <p className="text-right text-[#94939B] text-[14px] mt-1">
        {mentorData?.introduction.bio.length || menteeData?.introduction.bio.length || 0} / 500
      </p>
    </div>
  );
};

export default EditBio;