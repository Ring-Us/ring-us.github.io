import { ArrowLeft } from 'lucide-react';
const PaymentHeader = () => {
  return (
    <div className="sticky top-0 left-0 w-full flex justify-between items-center h-[56px] z-50 bg-[#fff] bg-opacity-90 py-3 px-4">
      <ArrowLeft strokeWidth={1} className="h-[24px] w-[24px] cursor-pointer" />
      <div className="text-[20px]">결제</div>
      <div className="h-[24px] w-[24px]"></div> {/* 빈 요소로 공간 유지를 위해 추가 */}
    </div>
  );
};
export default PaymentHeader;