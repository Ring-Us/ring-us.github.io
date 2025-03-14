import { useState } from 'react';
import { GlobalButton } from '@/global/ui/GlobalButton';

const RoleSelection = ({
  onNext,
}: {
  onNext: (role: string | null) => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelectRole = (role: string) => {
    setSelectedRole(role); // 선택한 역할 저장
  };

  const roles = [
    {
      key: 'ROLE_MENTOR',
      label: (
        <>
          준비된 <br /> 멋진 멘토님
        </>
      ),
      image: '/assets/mentor.png',
    },
    {
      key: 'ROLE_MENTEE',
      label: (
        <>
          성실한 <br /> 멘티님
        </>
      ),
      image: '/assets/mentee.png',
    },
  ];

  return (
    <div className="relative flex flex-col w-full">
      {/* 제목 */}
      <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold mt-10">
        당신은 <br /> 어떤 역할인가요?
      </h3>

      {/* 역할 선택 카드 */}
      <div className="flex flex-row justify-center gap-6 mt-12">
        {roles.map((role) => (
          <div
            key={role.key}
            onClick={() => handleSelectRole(role.key)}
            className={`flex flex-col items-center justify-center w-[calc(600px*0.37)] aspect-square text-gray-2 border rounded-[20px] cursor-pointer transition-all ${
              selectedRole === role.key
                ? 'border-primary-1 text-primary-1 bg-[#f0f9ff]'
                : 'border-[#DEDEDE] text-gray-2 hover:border-gray-1'
            }`}
          >
            <img className="h-[70px] mb-3" src={role.image} />
            <div className="font-semibold text-center sm:text-xl text-sm mb-2">
              {role.label}
            </div>
          </div>
        ))}
      </div>

      {/* 다음으로 버튼 */}
      <div className="absolute bottom-[34px] w-full">
        <GlobalButton
          onClick={() => onNext(selectedRole)}
          variant={selectedRole ? 'default' : 'secondary'} // 역할이 선택되었을 때만 활성화
          disabled={!selectedRole}
        >
          다음으로
        </GlobalButton>
      </div>
    </div>
  );
};

export default RoleSelection;
