import { LiaArrowLeftSolid } from "react-icons/lia";
import nothing from '../../../../public/assets/nothing.png';

const PaymentHeader = () => {
  return (
    <div className="sticky top-0 left-0 w-full flex justify-between items-center h-[56px]  z-50 bg-[#fff] bg-opacity-90">
      <LiaArrowLeftSolid className="h-[24px] w-[24px] cursor-pointer" />
      <div className="text-[20px]">결제</div>
      <img className="h-[24px] w-[24px]" src={nothing} alt="nothing" />
    </div>
  );
};

export default PaymentHeader;