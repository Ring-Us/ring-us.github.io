import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import React, { useState } from 'react';
import MentoringStepBar from '@/user/components/status/MentoringStepBar';
import ErrorModal from '@/global/ui/ErrorModal';
import DateTimeSelectModal from '@/mentorship/components/suggestion/DateTimeSelectModal';

const MenteeRequestStatus: React.FC = () => {
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false); // DateTimeModal 상태 추가
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null); // 선택된 시간 저장 상태

  // 백엔드에서 받은 status 예시
  const status = 'payment_pending';

  // 상태를 숫자 단계로 변환
  const statusToStep: Record<string, number> = {
    payment_pending: 0,
    waiting_for_mentor: 1,
    confirmed: 2,
  };

  const currentStep = statusToStep[status];
  const handleReject = () => {
    alert('신청이 취소되었습니다');
  };

  const handleTimeChange = (dateTime: string) => {
    setSelectedDateTime(dateTime); // 선택된 날짜와 시간 저장
    setIsDateTimeModalOpen(false); // Modal 닫기
  };

  const handleCancelRequest = () => {
    setModalInfo({
      title: '취소 요청',
      message: '"바이" 님의 멘토링 신청을 취소하시겠습니까?',
    });
    setModalVisible(true);
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* 헤더 영역 */}
      <div className="bg-[#F8F7FF] rounded-b-[30px]">
        <div className="flex justify-between items-center px-4 py-3 h-[55px]">
          <ArrowLeft
            size={24}
            strokeWidth={1.0}
            className="cursor-pointer"
            onClick={() => navigate('/user')}
          />
          <span className="text-[20px] font-[500]">멘토링 신청현황</span>
          <div className="w-6 h-6"></div>
        </div>

        {/* 단계 진행 바 */}
        <MentoringStepBar currentStep={currentStep} />
      </div>

      <div className="flex flex-col items-center mt-16 relative w-full">
        <p className="absolute left-4 -top-10 text-[18px] font-semibold bg-white px-2">
          제안 멘토
        </p>

        <div className="max-w-[600px] w-[90%] border border-gray-3 rounded-lg p-4 flex flex-col gap-2 shadow-sm relative">
          <div className="flex items-center gap-4">
            <img
              src="/assets/ringusprofile.png"
              alt="mentor"
              className="w-14 h-14 rounded-[50px] border object-cover"
            />
            <div className="flex flex-col">
              <div className="absolute top-3 right-3">
                <div className="bg-paymentblue text-primary-6 rounded-[30px] px-3 h-[26px] text-[12px] flex items-center justify-center">
                  결제 대기
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-semibold text-[18px]">바이</span>
              </div>
              <span className="text-sm text-gray-2">
                브랜드 마케팅 / 카피라이팅 ｜ 6년차
              </span>
            </div>
          </div>
          <button className="mt-3 bg-[#7C6FF6] text-white text-sm rounded-md py-3">
            멘토링 신청 이어서 하기
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white px-4 py-3 space-y-2 max-w-[600px] mx-auto">
        <GlobalButton
          variant="transparent"
          onClick={() => setIsDateTimeModalOpen(true)}
        >
          시간대 변경
        </GlobalButton>

        <GlobalButton variant="dark_transparent" onClick={handleCancelRequest}>
          취소 요청
        </GlobalButton>
      </div>

      {/* 취소 요청 모달 */}
      {modalVisible && (
        <ErrorModal
          title={modalInfo.title}
          message={modalInfo.message}
          onConfirm={handleReject} // 예 버튼이 눌리면 handleReject 호출
          onCancel={() => setModalVisible(false)} // 아니오 버튼이 눌리면 모달 닫기
          mode="reject"
        />
      )}

      {/* 시간대 선택 모달 */}
      <DateTimeSelectModal
        isOpen={isDateTimeModalOpen}
        onClose={() => setIsDateTimeModalOpen(false)}
        onSelect={handleTimeChange}
      />
    </div>
  );
};

export default MenteeRequestStatus;
