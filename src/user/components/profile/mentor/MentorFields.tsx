import { MentorProfileData } from '@/user/types/profileTypes';

interface MentorFieldsProps {
  mentorData: MentorProfileData;
  onChange: (updatedData: MentorProfileData) => void;
}

const mentoringFieldMap: Record<string, string> = {
  '취업 준비': 'JOB_PREPARATION',
  '업계 동향': 'PRACTICAL_SKILLS',
  '면접 대비': 'INTERVIEW_PREPARATION',
  '커리어 고민': 'PORTFOLIO',
};

const MentorFields = ({ mentorData, onChange }: MentorFieldsProps) => {
  const toggleSelection = (field: string) => {
    const fieldKey = mentoringFieldMap[field];

    const updatedFields = mentorData.mentoringField.includes(fieldKey)
      ? mentorData.mentoringField.filter((f) => f !== fieldKey)
      : [...mentorData.mentoringField, fieldKey];

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
        {fields.map((field) => {
          const isSelected = mentorData.mentoringField.includes(
            mentoringFieldMap[field.title],
          );

          return (
            <button
              key={field.title}
              className={`text-[14px] border-[1px] rounded-[10px] flex flex-col items-center justify-center p-2 
                ${isSelected ? 'bg-[#F2EFFF] text-primary-1 border-primary-1' : 'border-gray-2 text-gray-2'}`}
              onClick={() => toggleSelection(field.title)}
            >
              <img
                src={field.img}
                alt={field.title}
                className={`w-[60px] h-[60px] transition-all duration-300 ${
                  isSelected ? 'filter-none' : 'filter grayscale'
                }`}
              />
              <span>{field.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MentorFields;
