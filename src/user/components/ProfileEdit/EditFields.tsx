import { MentorData } from '@/user/types';

interface EditFieldsProps {
  mentorData: MentorData;
  setMentorData: React.Dispatch<React.SetStateAction<MentorData | null>>;
}

const EditFields = ({ mentorData, setMentorData }: EditFieldsProps) => {
  const toggleSelection = (field: string) => {
    setMentorData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        mentoringField: prev.mentoringField.includes(field)
          ? prev.mentoringField.filter((f) => f !== field)
          : [...prev.mentoringField, field],
      };
    });
  };

  const fields = [
    { img: '/assets/mentorinfo1.png', title: '취업 준비' },
    { img: '/assets/mentorinfo2.png', title: '업계 동향' },
    { img: '/assets/mentorinfo3.png', title: '면접 대비' },
    { img: '/assets/mentorinfo4.png', title: '커리어 고민' },
  ];

  return (
    <div className="px-4 py-2">
      <div className="font-bold text-[16px] my-4">멘토링 분야</div>
      <div className="grid grid-cols-2 gap-4 px-7">
        {fields.map((field) => (
          <button
            key={field.title}
            className={`text-[14px] border-[1px] rounded-[10px] flex flex-col items-center justify-center p-2 
              ${mentorData.mentoringField.includes(field.title) ? 'bg-[#F2EFFF] text-primary-1 border-primary-1' : 'border-[#94939B] text-[#94939B]'}`}
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

export default EditFields;
