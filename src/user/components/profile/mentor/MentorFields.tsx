import { MentorProfileData } from '@/user/types/profileTypes';

interface MentorFieldsProps {
  mentorData: MentorProfileData;
  onChange: (updatedData: MentorProfileData) => void;
}

// 한글 - 영문 변환을 위한 매핑 객체
const mentoringFieldMap: Record<string, string> = {
  '취업 준비': 'JOB_PREPARATION',
  '업계 동향': 'PRACTICAL_SKILLS',
  '면접 대비': 'INTERVIEW_PREPARATION',
  '커리어 고민': 'PORTFOLIO',
};

// // 영문 → 한글 변환 (UI에서 유지)
// const mentoringFieldReverseMap: Record<string, string> = {
//   JOB_PREPARATION: '취업 준비',
//   PRACTICAL_SKILLS: '업계 동향',
//   INTERVIEW_PREPARATION: '면접 대비',
//   PORTFOLIO: '커리어 고민',
// };

const MentorFields = ({ mentorData, onChange }: MentorFieldsProps) => {
  // 필드 선택 토글
  const toggleSelection = (field: string) => {
    const fieldKey = mentoringFieldMap[field]; // 한글 → 영어 변환

    const updatedFields = mentorData.mentoringField.includes(fieldKey)
      ? mentorData.mentoringField.filter((f) => f !== fieldKey) // 선택 해제
      : [...mentorData.mentoringField, fieldKey]; // 선택 추가

    // 변경된 mentorData를 부모로 전달
    onChange({
      ...mentorData,
      mentoringField: updatedFields,
    });
  };

  const fields = [
    { img: '/assets/mentorinfo1.png', title: '취업 준비' },
    { img: '/assets/mentorinfo2.png', title: '업계 동향' },
    { img: '/assets/mentorinfo3.png', title: '면접 대비' },
    { img: '/assets/mentorinfo4.png', title: '커리어 고민' },
  ];

  return (
    <div className="my-3">
      <div className="text-[14px] my-6">멘토링 분야를 선택해주세요!</div>
      <div className="grid grid-cols-2 gap-4 px-9">
        {fields.map((field) => (
          <button
            key={field.title}
            className={`text-[14px] border-[1px] rounded-[10px] flex flex-col items-center justify-center p-2 
              ${
                mentorData.mentoringField.includes(
                  mentoringFieldMap[field.title],
                )
                  ? 'bg-[#F2EFFF] text-primary-1 border-primary-1'
                  : 'border-[#94939B] text-[#94939B]'
              }`}
            onClick={() => toggleSelection(field.title)}
          >
            <img
              src={field.img}
              alt={field.title}
              className="w-[60px] h-[60px]"
            />
            <span>{field.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MentorFields;
