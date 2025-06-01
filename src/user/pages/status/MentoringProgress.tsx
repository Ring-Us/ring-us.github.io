import { useEffect, useState } from 'react';
import { useAuthStore } from '@/auth/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import StatusTabs from '@/user/components/status/mentee/StatusTabs';
import MentorList from '@/user/components/status/mentee/MenteeList';
import Footer from '@/global/components/Footer';
import MypageModal from '@/user/components/MypageModal'; // 로그인 필요 모달

const MentoringProgress = () => {
  const { isAuthenticated, isSessionChecked } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    '미확정' | '확정' | '완료'
  >('미확정');
  const navigate = useNavigate();

  // 예시 데이터
  const menteeData = {
    미확정: [],
    확정: [],
    완료: [],
  };
  const emptyMessages = {
    미확정: '미확정된 멘토링이 없습니다.',
    확정: '확정된 멘토링이 없습니다.',
    완료: '완료된 멘토링이 없습니다.',
  };

  // 세션 체크 완료 후 비로그인일 때 모달 띄우기
  useEffect(() => {
    if (isSessionChecked && !isAuthenticated) {
      setShowModal(true);
    }
  }, [isSessionChecked, isAuthenticated]);

  // 모달 핸들러
  const handleConfirm = () => {
    setShowModal(false);
    navigate('/auth/signin');
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="max-w-[600px] min-h-screen h-auto pb-[80px] bg-gray-4">
      {/* 로그인 필요 모달 */}
      {showModal && (
        <MypageModal
          title="로그인 필요"
          message="로그인이 필요합니다.<br> 로그인 페이지로 이동하시겠습니까?"
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}

      {/* 고정 헤더와 탭 영역 */}
      <div className="sticky top-0 bg-[#fff] z-20">
        <div className="flex text-[16px] h-[56px] font-semibold text-center justify-center items-center">
          멘토링 신청현황
        </div>
        <StatusTabs
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      {/* 멘토링 데이터들 */}
      <div>
        <MentorList
          mentees={menteeData[selectedStatus]}
          emptyMessage={emptyMessages[selectedStatus]}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MentoringProgress;
