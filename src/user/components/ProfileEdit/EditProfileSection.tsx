import { useState, useEffect } from "react";

import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import EditImageModal from "./EditImageModal";
import { uploadProfileImage } from "@/user/api/profileApi";

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
      jobCategory: string;
      detailedJob: string;
      experience: number;
    };
    image: {
      fileName: string;
      filePath: string;
    };
  };
  setMentorData: React.Dispatch<React.SetStateAction<any>>;
}

const EditProfileSection = ({ mentorData, setMentorData }: EditProfileSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 프로필 사진 업로드
  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      try {
        const imageUrl = await uploadProfileImage(file, 'ROLE_MENTOR');
        
        setMentorData((prevData: any) => ({
          ...prevData,
          image: {
            fileName: file.name,
            filePath: imageUrl,
          },
        }));
        
        setIsModalOpen(false);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  // 기본 프로필로 변경
  const resetProfileImage = () => {
    setMentorData((prevData: any) => ({
      ...prevData,
      image: {
        fileName: "",
        filePath: "",
      },
    }));
    
    setIsModalOpen(false);
  };

  return (
    <div className="px-4 py-2">
      <div className="font-bold text-[16px] my-4">프로필</div>

        {/* 사진 & 이름 & 메일 */}
        <div className="flex items-center ml-5">

          {/* 프로필 사진 */}
          <label 
            className="relative w-20 h-20 rounded-[50px] border-[1px] object-cover overflow-hidden cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img 
              src={mentorData?.image?.filePath || "/assets/ringusprofile.png"}
              alt="멘토 프로필"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <ImagePlus
                size={22}
                strokeWidth={1.0}
                color="white"
              />
            </div>
          </label>
          
          {/* 이름 & 메일 */}
          <div className="ml-5 flex-1">
            <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2 h-8">
              <User
                size={24}
                strokeWidth={1.0}
                color="#94939b"
                className="mr-3"
              />
              <span className="text-[#94939B] text-[14px]">{mentorData.nickname}</span>
            </div>
            <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2 h-8">
              <Mail
                size={22}
                strokeWidth={1.0}
                color="#94939b"
                className="mr-3"
              />
              <span className="text-[#94939B] text-[14px]">{mentorData.email}</span>
            </div>
          </div>
        </div>

        {/* 학력 & 회사/직무/경력 */}
        <div className="mt-6">
          <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2 h-8">
            <GraduationCap
              size={26}
              strokeWidth={1.0}
              color="#94939b"
              className="mr-2.5"
            />
            <span className="text-[#94939B] text-[14px]">{mentorData.education.schoolName}</span>
          </div>
          <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2 h-8">
            <BriefcaseBusiness
              size={22}
              strokeWidth={1.0}
              color="#94939b"
              className="mr-3 ml-0.5"
            />
            <span className="text-[#94939B] text-[14px]">{mentorData.organization.jobCategory} / {mentorData.organization.detailedJob} {mentorData.organization.experience}년차</span>
          </div>
          <div className="flex items-center bg-[#F2F2F6] rounded-[10px] px-3 py-1 my-2 h-8">
            <BriefcaseBusiness
              size={22}
              strokeWidth={1.0}
              color="#94939b"
              className="mr-3 ml-0.5"
            />
            <span className="text-[#94939B] text-[14px]">{mentorData.organization.name}</span>
          </div>
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <EditImageModal
            onClose={() => setIsModalOpen(false)}
            onResetProfile={resetProfileImage}
            onUploadProfile={handleProfileUpload}
          />
        )}
    </div>
  );
};

export default EditProfileSection;