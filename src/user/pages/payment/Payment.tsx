import { useState } from 'react';
import backimg from '../../../../src/assets/back.png';
import profile from '../../../../src/assets/profile.png';
import nothing from '../../../../src/assets/nothing.png';
import calendar from '../../../../public/assets/calendar.png';
import down from '../../../../public/assets/down.png';

import { Button } from '@/global/ui';


const Payment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState('선택');
    const coupons = ['쿠폰1', '쿠폰2', '쿠폰3'];

  return (
    <div className="p-4 pt-0">

        {/* 헤더 */}
        <div className="flex justify-between w-full items-center h-[56px]">
            <img className="h-[24px] w-[24px] cursor-pointer" src={backimg}></img>
            <div className="text-[20px] items-center"> 결제 </div>
            <img className="h-[24px] w-[24px]" src={nothing}></img>

        </div>

        <div className="flex flex-col gap-[28px]">
        {/* 제안 멘토 */}
        <div className="mt-[12px]">
            <div className="text-[18px] mb-[8px] font-semibold">제안 멘토</div>
            <div className="border-[1px] border-gray-10 bg-paymentblue rounded-[8px] flex p-[16px]">
                <img className="w-[86px] h-[86px]" src={profile}></img>
                <div className="ml-3">
                    <div className="text-[20px] font-semibold">바이</div>
                    <div className="text-[14px] text-gray-9">브랜드 마케팅 | 카피라이팅 6년차</div>
                    <div className="text-[12px] mt-[5px]">"브랜드 마케팅에 대해 알려드립니다."</div>
                    <div className="flex items-center justify-between border border-gray-8 px-3 py-0.5 rounded-[4px] mt-[5px] h-[30px] w-[135px] bg-[#fff]">
                        <span className="text-primary-3 text-[12px]">멘토링 횟수</span>
                        <span className="text-gray-5 text-[12px]">129회</span> {/* 변수명 수정해야함 */}
                    </div>
                </div>
            </div>
        </div>

        {/* 희망 날짜 */}
        <div className="">
            <div className="text-[18px] font-semibold">희망 날짜</div>
            <div className="flex flex-col mt-[8px] gap-[10px]">
                <button className="flex border border-gray-3 rounded-[10px] bg-gray-12 p-[16px] px-[22px] h-[52px] gap-[12px] items-center">
                    <img className="w-[24px] h-[24px]" src={calendar}></img>
                    <div className=" text-[16px]">2025.01.12 19:00~19:30</div>
                </button>
                <button className="flex border border-gray-3 rounded-[10px] bg-gray-12 p-[16px] px-[22px] h-[52px] gap-[12px] items-center">
                    <img className="w-[24px] h-[24px]" src={calendar}></img>
                    <div className=" text-[16px]">2025.01.13 20:30~21:00</div>
                </button>
            </div>
        </div>

        {/* 쿠폰 */}
        <div className="relative">
            <div className="text-[18px] font-semibold">쿠폰</div>
            <div className="flex justify-between border mt-[8px] p-2 px-5 rounded-[10px] h-[52px] items-center" onClick={() => setIsOpen(!isOpen)}>
                <div className={selectedCoupon === "선택" ? "text-gray-2" : "text-[#000]"}>{selectedCoupon}</div>
                <img className="h-[24px] w-[24px]" src={down} alt="드롭다운" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}></img>
            </div>
            {isOpen && (
                <ul className="absolute top-[89px] left-0 w-full border rounded-[10px] bg-[#fff]">
                    {coupons.map((coupon, index) => (
                        <li key={index} 
                            className="p-3 px-4 h-[52px] items-center justify-center" 
                            onClick={() => {setSelectedCoupon(coupon); setIsOpen(false)
                            }}>
                            {coupon}
                        </li>
                    ))}
                </ul>
            )}
        </div>

        {/* 결제 수단 */}
        <div className="gap-[8px] flex flex-col">
         <div className="text-[18px] font-semibold">결제 수단</div> 
            <div className="grid grid-cols-2 gap-x-auto gap-[10px]">
                <button className="border rounded-[10px] p-2 h-[52px] cursor-pointer flex items-center justify-center">신용/체크카드</button>
                <button className="border rounded-[10px] p-2 h-[52px] cursor-pointer flex items-center justify-center">카카오 페이</button>
                <button className="border rounded-[10px] p-2 h-[52px] cursor-pointer flex items-center justify-center">무통장입금</button>
            </div>
        </div>

        </div>

        {/* 정책 */}
        <div className="mt-[38px]">
            <div className="flex justify-between">
                <div className="text-[16px] font-medium">노쇼 정책</div>
                <div className="text-gray-11 cursor-pointer">자세히 알아보기</div>
            </div>
            <div className="flex justify-between">
                <div className="text-[16px] font-medium">환불 정책</div>
                <div className="text-gray-11 cursor-pointer">자세히 알아보기</div>
            </div>
        </div>

        {/* 버튼 하단 고정 */}
        <div className="fixed bottom-0 left-0 w-full bg-white py-4 shadow-md z-50">
            <Button className="w-[95%] max-w-[400px] mx-auto block py-3 bg-primary-1 text-[#fff] text-[16px] text-center rounded-[8px] h-[52px]">
                결제하기
            </Button>
        </div>
    </div>
  );
};

export default Payment;