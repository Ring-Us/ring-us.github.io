import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import PaymentHeader from '@/user/components/payment/PaymentHeader';
import MentorSection from '@/user/components/payment/PaymentMentor';
import DateSection from '@/user/components/payment/DateSection';
import CouponSection from '@/user/components/payment/CouponSection';
import PaymentMethodSection from '@/user/components/payment/PaymentMethodSection';
import PolicySection from '@/user/components/payment/PolicySection';
import { GlobalButton } from '@/global/ui/GlobalButton';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const mentor = {
    profileImage: '/assets/profile.png',
    name: '바이',
    jobTitle: '브랜드 마케팅 | 카피라이팅 6년차',
    description: '브랜드 마케팅에 대해 알려드립니다',
    mentoringCount: 129,
  };

  const selectedDates = [
    '2025.05.18 16:00~16:30',
    '2025.05.20 18:30~19:00',
  ];

  const handleFakePayment = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);

    }, 2500); // 2.5초 후 페이지 이동
  };

  return (
    <div className="pt-0 h-screen flex flex-col overflow-auto relative">
      {/* ✅ 애니메이션 알림 */}
      {showToast && (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <motion.div
      className="w-fit bg-[#130c0c] text-white bg-opacity-80 text-sm py-2 px-4 rounded-lg shadow-lg"
      initial={{ y: 0, opacity: 0.7 }}
      animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      결제가 완료되었습니다 🎉
    </motion.div>
  </div>
)}

      <PaymentHeader />

      <div className="px-4 flex flex-col gap-[28px] mt-[12px]">
        <MentorSection mentor={mentor} />
        <DateSection dates={selectedDates} />
        <CouponSection />
        <PaymentMethodSection />
      </div>

      <div className="px-4">
        <PolicySection />
        <div className="flex sticky bottom-0 left-0 w-full mx-auto bg-white p-4 z-50">
          <GlobalButton onClick={handleFakePayment}>
            결제하기
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;