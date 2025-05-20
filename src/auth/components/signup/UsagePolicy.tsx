import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import Checkbox from '@/auth/components/Checkbox';

const UsagePolicy = ({
  onNext,
  onAgree,
}: {
  onNext: () => void;
  onAgree: (tag: string, agreed: boolean) => void;
}) => {
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 모달 열기용 상태
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  const isAllRequiredChecked = checkedItems.terms && checkedItems.privacy;
  const allChecked =
    checkedItems.terms && checkedItems.privacy && checkedItems.marketing;

  const handleSingleCheck = (name: string) => {
    setCheckedItems((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    onAgree('TERMS_OF_SERVICE', checkedItems.terms);
    onAgree('PRIVACY_POLICY', checkedItems.privacy);
    onAgree('MARKETING_CONSENT', checkedItems.marketing);
  }, [checkedItems]);

  const handleAllCheck = () => {
    const newState = !allChecked;
    setCheckedItems({
      terms: newState,
      privacy: newState,
      marketing: newState,
    });
    onAgree('TERMS_OF_SERVICE', newState);
    onAgree('PRIVACY_POLICY', newState);
    onAgree('MARKETING_CONSENT', newState);
    console.log('모두 동의:', newState);
  };

  // 상세보기 모달 열린 경우 렌더
  const renderModal = () => {
    if (!modalType) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-3/4 max-w-xl">
          <h4 className="text-lg font-bold mb-4">
            {modalType === 'terms'
              ? '링어스 이용약관'
              : '개인정보 수집 및 이용 동의'}
          </h4>
          <div className="h-64 overflow-auto mb-6">
            {/* 실제 약관 텍스트를 여기 로드하세요 */}
            <p>
              여기에{' '}
              {modalType === 'terms'
                ? '서비스 이용 약관...'
                : '개인정보 처리 방침...'}{' '}
              내용을 표시합니다.
            </p>
          </div>
          <button
            className="px-4 py-2 bg-primary-1 rounded-lg text-white rounded"
            onClick={() => setModalType(null)}
          >
            닫기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col w-full">
      <h3 className="text-xl sm:text-2xl font-bold mt-10">
        서비스 이용 약관에 동의해 주세요.
      </h3>

      <div className="mt-12 space-y-5">
        {/* 전체 동의 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAllCheck}
            className="w-5 h-5 accent-primary-1"
          />
          <label className="ml-2 text-[14px] sm:text-[16px] 2xl:text-[18px]">
            네, 모두 동의합니다.
          </label>
        </div>
        <hr />

        {/* 개별 약관 동의 + 상세보기 */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="링어스 이용약관"
            isChecked={checkedItems.terms}
            type="required"
            onChange={() => handleSingleCheck('terms')}
          />
          <button
            onClick={() => setModalType('terms')}
            className="text-sm hover:text-gray-1 text-gray-3 underline ml-2"
          >
            상세보기
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="개인정보 수집 및 이용 동의"
            isChecked={checkedItems.privacy}
            type="required"
            onChange={() => handleSingleCheck('privacy')}
          />
          <button
            onClick={() => setModalType('privacy')}
            className="text-sm hover:text-gray-1 text-gray-3 underline ml-2"
          >
            상세보기
          </button>
        </div>

        {/* 선택 약관 */}
        <Checkbox
          label="마케팅 정보 수신"
          isChecked={checkedItems.marketing}
          type="optional"
          onChange={() => handleSingleCheck('marketing')}
        />
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-[34px] w-full">
        <GlobalButton
          variant={isAllRequiredChecked ? 'default' : 'secondary'}
          onClick={onNext}
          disabled={!isAllRequiredChecked}
        >
          다음으로
        </GlobalButton>
      </div>

      {renderModal()}
    </div>
  );
};

export default UsagePolicy;
