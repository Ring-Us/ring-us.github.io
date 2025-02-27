const mentorData = {
    profileImage: '/assets/Profile.png',  // 멘토 프로필 이미지
    name: '바이',  
    jobTitle: '브랜드 마케팅 | 카피라이팅 6년차',
    description: '브랜드 마케팅에 대해 알려드립니다',
    mentoringCount: 129
  };
  
  const PaymentMentor = () => {
    return (
      <div className="mt-[12px]">
        <div className="text-[18px] mb-[8px] font-semibold">제안 멘토</div>
        <div className="border-[1px] border-gray-10 bg-paymentblue rounded-[8px] flex items-center p-[16px]">
          <img className="w-[86px] h-[86px]" src={mentorData.profileImage} alt="profile" />
          <div className="ml-3">
            <div className="text-[20px] font-semibold">{mentorData.name}</div>
            <div className="text-[14px] text-gray-9">{mentorData.jobTitle}</div>
            <div className="text-[12px] mt-[5px]">{mentorData.description}</div>
            <div className="flex items-center justify-between border border-gray-8 px-3 py-0.5 rounded-[4px] mt-[5px] h-[30px] w-[135px] bg-[#fff]">
              <span className="text-primary-3 text-[12px]">멘토링 횟수</span>
              <span className="text-gray-5 text-[12px]">{mentorData.mentoringCount}회</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentMentor;