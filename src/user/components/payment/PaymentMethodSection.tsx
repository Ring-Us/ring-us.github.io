import { useState } from 'react';

const PaymentMethodSection = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const paymentMethods = ['신용/체크카드', '카카오 페이', '무통장입금'];

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="text-[18px] font-semibold">결제 수단</div>
      <div className="grid grid-cols-2 gap-[10px]">
        {paymentMethods.map((method, index) => (
          <button 
            key={index}
            className={`border rounded-[10px] p-2 h-[52px] cursor-pointer flex items-center justify-center transition-colors ${
              selectedPayment === method
                ? 'bg-paymentblue text-primary-4 border-primary-4'
                : 'bg-white text-black border-gray-3'
            }`}
            onClick={() => setSelectedPayment(method)}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSection;