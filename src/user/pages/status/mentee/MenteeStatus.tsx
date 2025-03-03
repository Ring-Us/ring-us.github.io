import React, { useState } from 'react';
import StatusTabs from '../../../components/status/mentee/StatusTabs';
import MenteeList from '../../../components/status/mentee/MenteeList';
import Footer from "@/global/components/Footer";
import { Mentee } from '../../../components/status/mentee/types';

const MenteeStatus: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<"미확정" | "확정" | "완료">("미확정");

  const menteeData: Record<"미확정" | "확정" | "완료", Mentee[]> = {
    미확정: [
      {
        profileImage: "/public/assets/profile.png",
        name: "바이",
        jobTitle: "브랜드 마케팅 / 카피라이팅",
        career: "3",
        paymentStatus: "결제 대기",
      },
      {
        profileImage: "/public/assets/profile.png",
        name: "바이",
        jobTitle: "디자이너",
        career: "3",
        paymentStatus: "결제 대기",
      },
      {
        profileImage: "/public/assets/profile.png",
        name: "바이",
        jobTitle: "브랜드 마케팅 / 카피라이팅",
        career: "3",
        paymentStatus: "결제 대기",
      },
      {
        profileImage: "/public/assets/profile.png",
        name: "바이",
        jobTitle: "브랜드 마케팅 / 카피라이팅",
        career: "3",
        paymentStatus: "결제 대기",
      },
      {
        profileImage: "/public/assets/profile.png",
        name: "바이",
        jobTitle: "브랜드 마케팅 / 카피라이팅",
        career: "3",
        paymentStatus: "결제 대기",
      },
      {
        profileImage: "/public/assets/profile.png",
        name: "바이",
        jobTitle: "브랜드 마케팅 / 카피라이팅",
        career: "3",
        paymentStatus: "결제 대기",
      },
     
    ],
    확정: [
      {
        profileImage: "/public/assets/profile.png",
        name: "링어스",
        jobTitle: "기획자",
        career: "4",
        paymentStatus: "결제 완료",
      },
    ],
    완료: [],
  };

  const emptyMessages: Record<"미확정" | "확정" | "완료", string> = {
    미확정: "미확정된 멘토링이 없습니다.",
    확정: "확정된 멘토링이 없습니다.",
    완료: "완료된 멘토링이 없습니다.",
  };

  return (
    <div className="">
      {/* 고정 헤더와 탭 영역 */}
      <div className="sticky top-0 bg-[#fff] z-20">
        <div className="flex text-[16px] h-[56px] font-semibold text-center justify-center items-center">
          멘토링 신청현황
        </div>
        <StatusTabs selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      </div>

      {/* 멘토링 데이터들 */}
      <div className="">
        <MenteeList 
          mentees={menteeData[selectedStatus]} 
          emptyMessage={emptyMessages[selectedStatus]} 
        />
        <Footer />
      </div>
    </div>
  );
};

export default MenteeStatus;