import backimg from '../../../../src/assets/back.png';
import profile from '../../../../src/assets/profile.png';
import nothing from '../../../../src/assets/nothing.png';

import { Button } from '@/global/ui';

const Payment = () => {
  return (
    <div className="p-4">

        {/* 헤더 */}
        <div className="flex justify-between w-full mt-[16px] items-center">
            <img className="h-[24px] w-[24px] cursor-pointer" src={backimg}></img>
            <div className="text-[20px] items-center"> 결제 </div>
            <img className="h-[24px] w-[24px]" src={nothing}></img>

        </div>

        {/* 제안 멘토 */}
        <div className="">
            <div className="text-[18px] mb-[8px]">제안 멘토</div>
            <div className="border-[1px] border-gray-10 bg-paymentblue rounded-[8px] flex p-[16px]">
                <img className="w-[86px] h-[86px]" src={profile}></img>
                <div className="ml-3">
                    <div className="text-[20px]">바이</div>
                    <div className="text-[14px] text-gray-9">브랜드 마케팅 | 카피라이팅 6년차</div>
                    <div className="text-[12px] mt-[5px]">"브랜드 마케팅에 대해 알려드립니다."</div>
                    <div className="text-[12px] mt-[5px]"></div>
                </div>
            </div>
        </div>

        {/* 희망 날짜 */}
        <div className="">
            <div className="">희망 날짜</div>
            <div className="">
                <div className="">2025.01.12 19:00~19:30</div>
                <div className="">2025.01.13 20:30~21:00</div>
            </div>
        </div>

        {/* 쿠폰 */}
        <div className="">
            <div className="">쿠폰</div>
            <div className="border">선택</div>
        </div>

        {/* 결제 수단 */}
        <div className="">
         <div className="">결제 수단</div> 
            <div className="">
                <div className="">신용/체크카드</div>
                <div className="">카카오 페이</div>
                <div className="">무통장 입금</div>
            </div>
        </div>

        {/* 정책 */}
        <div className="">
            <div className="">
                <div className="">노쇼 정책</div>
                <div className="">자세히 알아보기</div>
            </div>
            <div className="">
             <div className="">환불 정책</div>
                <div className="">자세히 알아보기</div>
            </div>
        </div>

        {/* 버튼 */}
        <Button className="">결제하기</Button>
    </div>
  );
};

export default Payment;