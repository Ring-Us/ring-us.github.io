import { useState, useEffect } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';
import { TERMS_OF_SERVICE } from '@/lib/termsOfService';
import { PRIVACY_POLICY } from '@/lib/privacyPolicy';

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

  const [modalType, setModalType] = useState<null | 'terms' | 'privacy'>(null);

  // 모든 필수 항목이 체크되었는지 확인
  const isAllRequiredChecked = checkedItems.terms && checkedItems.privacy;

  // 모든 항목이 체크되었는지 확인
  const allChecked =
    checkedItems.terms && checkedItems.privacy && checkedItems.marketing;

  // 개별 체크박스 변경 핸들러
  const handleSingleCheck = (name: string) => {
    setCheckedItems((prev: any) => {
      const newState = { ...prev, [name]: !prev[name] };
      return newState;
    });
  };

  // `useEffect`에서 상태 변경을 감지한 후 `onAgree` 호출
  useEffect(() => {
    onAgree('TERMS_OF_SERVICE', checkedItems.terms);
    onAgree('PRIVACY_POLICY', checkedItems.privacy);
    onAgree('MARKETING_CONSENT', checkedItems.marketing);
  }, [checkedItems]); // checkedItems 변경 시 실행

  // "모두 동의" 체크박스 핸들러
  const handleAllCheck = () => {
    const newCheckedState = !allChecked;
    const updatedState = {
      terms: newCheckedState,
      privacy: newCheckedState,
      marketing: newCheckedState,
    };

    setCheckedItems(updatedState);

    // `onAgree` 호출하여 백엔드에 전달될 데이터 업데이트
    onAgree('TERMS_OF_SERVICE', newCheckedState);
    onAgree('PRIVACY_POLICY', newCheckedState);
    onAgree('MARKETING_CONSENT', newCheckedState);

    // 콘솔에서 확인 (현재 상태 출력)
    console.log('"모두 동의" 선택됨:', [
      { tag: 'TERMS_OF_SERVICE', agreed: newCheckedState },
      { tag: 'PRIVACY_POLICY', agreed: newCheckedState },
      { tag: 'MARKETING_CONSENT', agreed: newCheckedState },
    ]);
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

        <div className="flex items-center justify-between">
          <Checkbox
            label="링어스 이용약관"
            isChecked={checkedItems.terms}
            type="required"
            onChange={() => handleSingleCheck('terms')}
          />
          <button
            className="text-sm text-gray-2 hover:text-black underline ml-2"
            onClick={() => setModalType('terms')}
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
            className="text-sm text-gray-2 hover:text-black underline ml-2"
            onClick={() => setModalType('privacy')}
          >
            상세보기
          </button>
        </div>
        <Checkbox
          label="마케팅 정보 수신"
          isChecked={checkedItems.marketing}
          type="optional"
          onChange={() => handleSingleCheck('marketing')}
        />
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90vw] max-w-xl p-6 rounded-lg shadow-xl h-[80vh] flex flex-col">
            <h2 className="font-bold text-xl mb-4">
              {modalType === 'terms'
                ? '링어스 이용약관'
                : '개인정보 수집 및 이용 동의'}
            </h2>
            <div className="overflow-auto flex-1 text-[14px] whitespace-pre-line">
              {modalType === 'terms' ? TERMS_OF_SERVICE : PRIVACY_POLICY}
            </div>
            <button
              className="mt-5 self-end px-4 py-2 rounded-lg bg-primary-1 text-white"
              onClick={() => setModalType(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default UsagePolicy;
