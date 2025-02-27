import { useState } from "react";

interface EditProfileSectionProps {
  mentorData: {
    nickname: string;
    email: string;
    education: {
      schoolName: string;
      major: string;
    };
    organization: {
      name: string;
      role: string;
      experience: number;
    };
  };
}

const EditProfileSection = ({ mentorData }: EditProfileSectionProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 프로필 사진 업로드
  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="px-4 my-2">
      <div className="font-bold text-[16px] my-4">프로필</div>

        {/* 사진 & 이름 & 메일 */}
        <div className="flex items-center ml-5">

          {/* 프로필 사진 */}
          <label className="relative w-20 h-20 rounded-[50px] border-[1px] object-cover overflow-hidden cursor-pointer">
            <img 
              src={profileImage || "/assets/ringusprofile.png"}
              alt="멘토 프로필"
              className="w-full h-full object-cover"
            />

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfileUpload}
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <img src="/assets/camera.png" alt="camera" className="w-6 h-6" />
            </div>
          </label>
          
          {/* 이름 & 메일 */}
          <div className="ml-5 flex-1">
            <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2">
              <img src="/assets/profilename.png" alt="profilename" className="w-6 h-6 mr-3" />
              <span className="text-[#94939B] text-[14px]">{mentorData.nickname}</span>
            </div>
            <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2">
              <img src="/assets/profileemail.png" alt="profileemail" className="w-6 h-6 mr-3" />
              <span className="text-[#94939B] text-[14px]">{mentorData.email}</span>
            </div>
          </div>
        </div>

        {/* 학력 & 회사/직무/경력 */}
        <div className="mt-6">
          <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2">
            <img src="/assets/profileschool.png" alt="profileschool" className="w-6 h-6 mr-3" />
            <span className="text-[#94939B] text-[14px]">{mentorData.education.schoolName}</span>
          </div>
          <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2">
            <img src="/assets/profilejob.png" alt="profilejob" className="w-6 h-6 mr-3" />
            <span className="text-[#94939B] text-[14px]">{mentorData.organization.role} {mentorData.organization.experience}</span>
          </div>
          <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2">
            <img src="/assets/profilejob.png" alt="profilejob" className="w-6 h-6 mr-3" />
            <span className="text-[#94939B] text-[14px]">{mentorData.organization.name}</span>
          </div>
        </div>
      </div>
    );
};

export default EditProfileSection;