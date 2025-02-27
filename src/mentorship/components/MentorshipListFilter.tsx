import React, { useEffect } from 'react';
import { X } from 'lucide-react'; // X 닫기 버튼 추가

interface MentorshipListFilterProps {
  filterType: string;
  onClose: () => void;
  selectedField: string | null;
  onFieldSelect: (field: string) => void;
  selectedSubField: string | null;
  onSubFieldSelect: (field: string | null) => void;
}

const fieldOptions: string[] = [
  '전체',
  '마케팅',
  '서비스 기획',
  '디자인',
  '개발',
  '대학원',
  '인사',
  '영업',
  '금융',
  '데이터',
  '의료',
  '법률',
];

const subFieldOptions: { [key: string]: string[] } = {
  전체: [],
  마케팅: [
    '브랜드 마케팅',
    '퍼포먼스 마케팅',
    '디지털/소셜 마케팅',
    '그로스 마케팅',
    'PR',
    'AE',
    '콘텐츠 마케팅',
    '크리에이티브 디렉팅',
    '카피라이터',
    '미디어 플래너',
    '방송PD/영상PD',
    '기타',
  ],
  '서비스 기획': [
    '서비스기획',
    'PM/PO',
    '전략 기획',
    '운영/기획',
    '사업 개발',
    'CX 매니저',
    '창업',
    '기타',
  ],
  디자인: [
    'UX/UI디자인',
    '그래픽 디자인',
    '상품 디자인',
    '브랜드 디자인',
    '웹 디자인',
    '아트 디렉터',
    '기타',
  ],
  개발: [
    '프론트엔드',
    '백엔드',
    '풀스택 개발자',
    'iOS/Android 개발자',
    'DevOps 엔지니어',
    '클라우드 엔지니어',
    '시스템/네트워크 엔지니어',
    '보안 엔지니어',
    '기타',
  ],
  대학원: ['국내 대학원', '해외 대학원', '기타'],
  인사: [
    '인사기획',
    '채용담당',
    '인재육성/교육담당',
    '조직문화담당',
    '노무담당',
    '총무/경영지원',
    '인사운영',
    '리크루터',
    '기타',
  ],
  영업: [
    '기업영업(B2B)',
    '개인영업(B2C)',
    '해외영업',
    '기술영업',
    '솔루션 컨설턴트',
    '주요고객관리(KAM)',
    '영업관리/지원',
    'CSM/CX',
    '기타',
  ],
  금융: [
    '컨설턴트',
    'VC/투자',
    'IB/PE/대체투자',
    '에널리스트',
    '회계/재무',
    '기타',
  ],
  데이터: [
    '데이터 사이언티스트',
    '데이터 엔지니어',
    '데이터 애널리스트',
    'BI 엔지니어',
    '머신러닝 엔지니어',
    '데이터 아키텍트',
    '리서치 애널리스트',
    '기타',
  ],
  의료: [
    '임상의사',
    '임상연구원',
    '의료기기 연구개발',
    '제약회사 연구원',
    '바이오 연구원',
    '기타',
  ],
  법률: [
    '변호사',
    '법무담당',
    '특허담당',
    '준법감시인(컴플라이언스)',
    '법무법인 사무직',
    '법률자문',
    '특허엔지니어',
    '기타',
  ],
};

const MentorshipListFilter: React.FC<MentorshipListFilterProps> = ({
  filterType,
  onClose,
  selectedField,
  onFieldSelect,
  selectedSubField,
  onSubFieldSelect,
}) => {
  useEffect(() => {
    // '세부직무'가 아닌 경우 세부직무 선택값 초기화
    if (filterType !== '세부직무') {
      onSubFieldSelect(null);
    }
  }, [filterType, onSubFieldSelect]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] h-full bg-[#000] bg-opacity-75 flex justify-center items-end z-50">
      <div className="bg-[#fff] w-full rounded-t-[20px] p-4 min-h-[366px]">
        <div className="pl-3 mt-[10px]">
          {/* 필터 제목 */}
          <div className="flex justify-between items-center">
            <h2 className="text-[16px] font-bold">
              {filterType === '직무' && '직무 선택'}
              {filterType === '세부직무' && '세부직무 선택'}
            </h2>
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="p-1">
              <X className="w-6 h-6 text-gray-1" />
            </button>
          </div>
        </div>

        {/* 직무 필터 */}
        {filterType === '직무' && (
          <div className="grid grid-cols-3 gap-x-[11px] mt-[34px] gap-y-[13px]">
            {fieldOptions.map((field) => (
              <button
                key={field}
                onClick={() => {
                  onFieldSelect(field);
                  onClose();
                }}
                className={`p-[12px] border rounded-[8px] text-[14px] text-center min-w-[113px] h-[43px] flex justify-center items-center ${
                  selectedField === field
                    ? 'border-primary-1 text-primary-1'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        )}

        {/* 세부직무 필터 */}
        {filterType === '세부직무' && (
          <div className="flex flex-col gap-[20px] mt-[34px] mx-auto px-3 mb-[10px]">
            {selectedField &&
            subFieldOptions[selectedField] &&
            subFieldOptions[selectedField].length > 0 ? (
              subFieldOptions[selectedField].map((subField) => (
                <button
                  key={subField}
                  onClick={() => {
                    onSubFieldSelect(subField);
                    onClose();
                  }}
                  className={`rounded-[8px] text-[12px] text-start text-gray-2 ${
                    selectedSubField === subField
                      ? ' text-primary-1'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {subField}
                </button>
              ))
            ) : (
              <div className="text-center text-gray-600">
                먼저 직무를 선택하세요.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipListFilter;
