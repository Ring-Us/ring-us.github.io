import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import React, { useState } from 'react';
import MentoringStepBar from '@/user/components/status/MentoringStepBar';

import SuggestTime from '@/mentorship/components/suggestion/SuggestTime';
import SuggestSubject from '@/mentorship/components/suggestion/SuggestSubject';
import ErrorModal from '@/global/ui/ErrorModal';

const MentorRequestStatus: React.FC = () => {
  const navigate = useNavigate();

  // 모달 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });

  // 백엔드에서 받은 status 예시
  const status = 'payment_pending';

  // 상태를 숫자 단계로 변환
  const statusToStep: Record<string, number> = {
    payment_pending: 0,
    waiting_for_mentor: 1,
    confirmed: 2,
  };

  const currentStep = statusToStep[status];

  // 수락/거절 버튼 클릭 시
  const handleAccept = () => {
    setModalInfo({
      title: '수락하기',
      message: '멘토링 요청을 수락하시겠습니까?',
    });
    setModalVisible(true);
  };

  const handleReject = () => {
    setModalInfo({
      title: '거절하기',
      message: '두두 님의 멘토링 요청을 거절하시겠습니까?',
    });
    setModalVisible(true);
  };

  return (
    <div className="min-h-screen h-auto flex flex-col relative pb-40">
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
          제안 멘티
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
                  수락 대기
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-semibold text-[18px]">두두</span>
              </div>
              <span className="text-sm text-gray-2">
                테스트 입니다! 이부분에는 짧은 자기소개
              </span>
            </div>
          </div>
          <span className="text-sm">
            안녕하세요! 이건 테스트입니다! 잘부탁드려요! 백엔드 연결 후 멘토에게
            하고싶은말 부분입니다! 더 긴 테스트 입니다 확인!
          </span>
        </div>
      </div>

      <SuggestTime />

      <SuggestSubject />

      <div className="fixed bottom-0 w-full bg-white px-4 py-3 space-y-2 max-w-[600px] mx-auto">
        <GlobalButton variant="default" onClick={handleAccept}>
          수락하기
        </GlobalButton>

        <GlobalButton variant="dark_transparent" onClick={handleReject}>
          거절하기
        </GlobalButton>
      </div>

      {modalVisible && (
        <ErrorModal
          title={modalInfo.title}
          message={modalInfo.message}
          onConfirm={handleAccept}
          onCancel={() => setModalVisible(false)}
          mode="reject"
        />
      )}
    </div>
  );
};

export default MentorRequestStatus;
