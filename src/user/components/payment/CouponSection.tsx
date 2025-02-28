import { useState } from 'react';
import { IoChevronDownSharp } from "react-icons/io5";

const CouponSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('선택');
  const coupons = ['신규 가입 10% 할인', '새내기 반값 할인', '졸업생 4,000원 할인'];

  return (
    <div className="relative">
      <div className="text-[18px] font-semibold">쿠폰</div>
      <div className="flex justify-between border mt-[8px] p-2 px-5 rounded-[10px] h-[52px] items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className={selectedCoupon === "선택" ? "text-gray-2" : "text-[#000]"}>
          {selectedCoupon}
        </div>
        <IoChevronDownSharp 
          className="h-[24px] w-[24px] text-gray-2 stroke-[3]" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
        />
      </div>
      {isOpen && (
        <ul className="absolute top-[89px] left-0 w-full border rounded-[10px] bg-[#fff]">
          {coupons.map((coupon, index) => (
            <li 
              key={index} 
              className="p-3 px-4 h-[52px] items-center justify-center cursor-pointer" 
              onClick={() => {
                setSelectedCoupon(coupon);
                setIsOpen(false);
              }}
            >
              {coupon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CouponSection;