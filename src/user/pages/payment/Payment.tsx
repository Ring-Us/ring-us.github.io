import PaymentHeader from '@/user/components/payment/PaymentHeader';
import MentorSection from '@/user/components/payment/PaymentMentor';
import DateSection from '@/user/components/payment/DateSection';
import CouponSection from '@/user/components/payment/CouponSection';
import PaymentMethodSection from '@/user/components/payment/PaymentMethodSection';
import PolicySection from '@/user/components/payment/PolicySection';
import { GlobalButton } from '@/global/ui/GlobalButton';

const PaymentPage = () => {
  return (
    <div className="p-4 pt-0 min-h-screen flex flex-col overflow-auto">
      {/* 헤더 */}
      <PaymentHeader />
      
      <div className="flex flex-col gap-[28px] mt-[56px]">
        {/* 제안 멘토 */}
        <MentorSection />

        {/* 희망 날짜 */}
        <DateSection />

        {/* 쿠폰 */}
        <CouponSection />

        {/* 결제 수단 */}
        <PaymentMethodSection />
      </div>

        {/* 정책 */}
        <PolicySection />

        <div className="flex bottom-0 left-0 w-full mx-auto bg-white py-4 z-50">
            <GlobalButton>
                결제하기
            </GlobalButton>
        </div>
    </div>
  );
};

export default PaymentPage;