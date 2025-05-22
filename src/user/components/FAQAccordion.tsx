import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowLeft } from 'lucide-react';

import Footer from '@/global/components/Footer';

const faqList = [
  {
    question: '링어스 이용 방법',
    answer:
      '링어스 멘토링은 30분을 기본으로 진행됩니다. 동문 기반의 멘토링 서비스를 통해 더욱 깊이 있는 조언과 네트워킹 기회를 얻어보세요! (예시 문구)',
  },
  {
    question: '링어스 신청/확정 후',
    answer:
      '멘토링 신청이 확정되면 알림 메시지와 함께 상세 안내를 받게 됩니다.',
  },
  {
    question: '링어스 환불 정책',
    answer:
      '멘토링 확정 후 환불은 정책에 따라 제한될 수 있습니다. 자세한 환불 규정을 확인해 주세요.',
  },
  {
    question: '링어스 노쇼 정책',
    answer:
      '멘토 또는 멘티의 무단 미참석(노쇼)이 반복될 경우, 서비스 이용이 제한될 수 있습니다.',
  },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const navigate = useNavigate(); // 추가

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-[600px] h-dvh mx-auto pb-28">
      {/* 상단 헤더 */}
      <div className="bg-mentor-gradient p-3 pb-14">
        <div className="flex items-center">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => navigate('/user')}
            className="flex items-center justify-center z-50"
          >
            <ArrowLeft strokeWidth={1} className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1 text-[22px] font-bold text-white text-center ml-6">
            자주 묻는 질문
          </div>
          <div className="w-6" />
        </div>
      </div>
      <div className="bg-white rounded-b-[24px]">
        {faqList.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-3">
            <button
              className="w-full flex justify-between items-center text-left p-5 text-lg text-gray-1 font-medium"
              onClick={() => handleToggle(idx)}
            >
              <span>{faq.question}</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  openIdx === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-5 pt-6 pb-14 text-gray-2 bg-gray-4 text-[14px]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
