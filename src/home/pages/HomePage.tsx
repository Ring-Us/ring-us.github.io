import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // 애니메이션 추가
import { Bell, Bookmark } from 'lucide-react'; // 알림 아이콘 추가
import Footer from '@/global/components/Footer';
import { useAuthStore } from '@/auth/store/useAuthStore';

export default function HomePage() {
  const { isAuthenticated, checkSession } = useAuthStore();
  const [sessionChecked, setSessionChecked] = useState(false);
  const location = useLocation();
  const [showLoginMessage, setShowLoginMessage] = useState(
    location.state?.loginSuccess || false,
  );
  const [bookmarked, setBookmarked] = useState<{ [key: number]: boolean }>({});

  const toggleBookmark = (index: any) => {
    setBookmarked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const checkUserSession = async () => {
      await checkSession(); // 로그인 상태 확인
      setSessionChecked(true); // 세션 체크 완료
    };
    checkUserSession();
  }, []);

  useEffect(() => {
    if (showLoginMessage) {
      setTimeout(() => {
        setShowLoginMessage(false);
      }, 2000);
    }
  }, [showLoginMessage]);

  const mentors = [
    {
      name: '트레블',
      field: '퍼포먼스 마케팅 / 프로모션 마케팅',
      experience: '5년차',
      mentoringCount: 15,
      description: '“퍼포먼스 마케팅에 대해 알려드립니다.”',
      image: '/assets/ringusprofile.png',
    },
    {
      name: '이영희',
      field: 'UX/UI 디자인',
      experience: '3년차',
      mentoringCount: 12,
      description: '“UX/UI 실무 경험을 공유해 드립니다.”',
      image: '/assets/ringusprofile.png',
    },
    {
      name: '박지훈',
      field: '프론트엔드 개발',
      experience: '4년차',
      mentoringCount: 18,
      description: '“프론트엔드 개발의 핵심을 알려드립니다.”',
      image: '/assets/ringusprofile.png',
    },
  ];

  const categories = [
    { name: '마케팅', icon: '/assets/main/marketing.png' },
    { name: '서비스 기획', icon: '/assets/main/service_planning.png' },
    { name: '디자인', icon: '/assets/main/design.png' },
    { name: '개발', icon: '/assets/main/develop.png' },
    { name: '대학원', icon: '/assets/main/graduate_school.png' },
    { name: '인사', icon: '/assets/main/human_resources.png' },
    { name: '영업', icon: '/assets/main/sales.png' },
    { name: '금융', icon: '/assets/main/finance.png' },
    { name: '데이터', icon: '/assets/main/data.png' },
    { name: '의료', icon: '/assets/main/medical.png' },
    { name: '법률', icon: '/assets/main/law.png' },
    { name: '전체', icon: '/assets/main/overall.png' },
  ];

  if (!sessionChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[100dvh] flex flex-col relative overflow-y-auto">
      {/* 로그인 성공 메시지 */}
      {showLoginMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 left-0 right-0 mx-auto w-fit bg-[#130c0c] text-[#ffffff] bg-opacity-80 text-sm py-2 px-4 rounded-lg shadow-lg"
        >
          로그인 되었습니다.
        </motion.div>
      )}

      {/* 상단 헤더 (로고 + 알림 아이콘) */}
      <div className="bg-[#765BFD] p-5 pt-6 pb-6 flex justify-between items-center">
        <img
          src="/assets/main/mainlogo.png"
          alt="mainlogo"
          className="w-auto h-[25px]"
        />
        <Bell strokeWidth={1} className="text-white w-6 h-6" />
      </div>

      {/* 카테고리 아이콘 리스트 */}
      <div className="bg-[#765BFD]">
        <div className="max-w-[600px] bg-white h-full rounded-t-[30px] relative z-15 border-[#765BFD]">
          <motion.div
            className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-[#130c0c] text-[#ffffff] bg-opacity-80 text-sm py-2 px-4 rounded-lg shadow-lg"
            initial={{ y: 0, opacity: 0.7 }}
            animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            해당 직무 선택 후 멘토링 신청하기!
          </motion.div>
          <div className="grid grid-cols-4 gap-5 px-8 pt-10 text-center z-10">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center gap-2"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-sm text-gray-1 mt-3 leading-none">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* 추천 멘토 섹션 */}
          <div className="mt-14 px-7 mb-20">
            <h2 className="text-lg font-semibold">
              회원님이 관심있어 할 멘토 추천
            </h2>
            <div className="flex gap-4 mt-4 overflow-x-scroll scrollbar-hide">
              {mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="min-w-[250px] h-auto border border-gray-3 rounded-lg p-4 pt-0 flex flex-col justify-between shadow-md relative"
                >
                  {/* 북마크 아이콘 - 카드 박스 상단 우측에 고정 */}
                  <Bookmark
                    strokeWidth={1.5}
                    className={`absolute right-3 top-3 w-6 h-6 cursor-pointer z-10 ${
                      bookmarked[index]
                        ? 'fill-[#765BFD] text-[#765BFD]'
                        : 'text-gray-2'
                    }`}
                    onClick={() => toggleBookmark(index)}
                  />

                  {/* 프로필 이미지 */}
                  <div className="flex items-center mt-2">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-[70px] h-[70px] border border-gray-3 rounded-[50px] object-cover"
                    />
                    <div className="p-3">
                      {/* 멘토 정보 */}
                      <h3 className="mt-3 text-lg font-bold">{mentor.name}</h3>
                      <p className="text-sm text-gray-1 line-clamp-1">
                        {mentor.field}
                      </p>
                      <p className="text-sm text-gray-1 line-clamp-1">
                        {mentor.experience}
                      </p>
                    </div>
                  </div>
                  {/* 자기소개 */}
                  <p className="mt-2 text-sm italic">“{mentor.description}”</p>

                  {/* 멘토링 횟수 */}
                  <div className="mt-3">
                    <span className="p-1.5 text-sm bg-white border border-gray-3 text-[#765BFD] rounded-md">
                      멘토링 횟수{' '}
                      <span className="ml-2 text-gray-2">
                        {mentor.mentoringCount}회
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 글로벌 Footer */}
      <Footer />
    </div>
  );
}
