import { Search, Bookmark } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // 애니메이션 추가
import Footer from '@/global/components/Footer';
import { useAuthStore } from '@/auth/store/useAuthStore';

export default function HomePage() {
  const { isAuthenticated, checkSession } = useAuthStore();
  const [sessionChecked, setSessionChecked] = useState(false);
  const location = useLocation();
  const [showLoginMessage, setShowLoginMessage] = useState(
    location.state?.loginSuccess || false,
  );
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
      name: '김철수',
      field: '퍼포먼스 마케팅 / 브랜드 마케팅',
      experience: '5년차',
      rating: 5.0,
      reviews: 235,
      successRate: '98%',
      image: '/src/assets/thumbnail.png',
    },
    {
      name: '이영희',
      field: 'UX/UI 디자인',
      experience: '3년차',
      rating: 4.8,
      reviews: 180,
      successRate: '95%',
      image: '/src/assets/thumbnail.png',
    },
    {
      name: '박지훈',
      field: '프론트엔드 개발',
      experience: '4년차',
      rating: 4.9,
      reviews: 210,
      successRate: '97%',
      image: '/src/assets/thumbnail.png',
    },
  ];

  const categories = [
    { name: '마케팅', icon: '📢' },
    { name: '서비스 기획', icon: '📅' },
    { name: '디자인', icon: '✏️' },
    { name: '개발', icon: '💻' },
    { name: '대학원', icon: '🎓' },
    { name: '인사', icon: '👤' },
    { name: '영업', icon: '📊' },
    { name: '금융', icon: '💰' },
    { name: '데이터', icon: '📈' },
    { name: '의료', icon: '💜' },
    { name: '법률', icon: '🏛️' },
    { name: '전체', icon: '🌍' },
  ];

  // 세션 체크가 끝나기 전에는 로딩 화면 표시
  if (!sessionChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
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

      {/* 검색창 */}
      <div className="px-7 mt-14">
        <div className="flex items-center w-full h-[46px] bg-gray-4 rounded-[30px] px-4">
          <Search className="w-5 h-5 text-gray-2" />
          <input
            type="text"
            className="w-full bg-gray-4 px-2 text-sm outline-none ml-2"
            placeholder="회사, 직무, 대학원으로 검색하기"
          />
        </div>
      </div>

      {/* 카테고리 아이콘 목록 */}
      <div className="grid grid-cols-4 gap-5 px-8 mt-9 text-center">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center">
            <span className="text-2xl">{category.icon}</span>
            <span className="mt-2 text-sm text-gray-1">{category.name}</span>
          </div>
        ))}
      </div>

      {/* 추천 멘토 섹션 */}
      <div className="mt-14 px-7">
        <h2 className="text-lg font-semibold">
          회원님이 관심있어 할 멘토 추천
        </h2>
        <div className="flex gap-4 mt-4 overflow-x-scroll scrollbar-hide">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="min-w-[250px] border border-gray-4 rounded-lg p-4 flex flex-col"
            >
              <div className="relative w-full h-[140px] rounded-lg overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-[80px] h-[80px] object-cover"
                />
                <Bookmark className="absolute top-2 right-2 text-white" />
              </div>
              <h3 className="mt-2 text-lg font-semibold">{mentor.name}</h3>
              <p className="text-sm text-gray-2">{mentor.field}</p>
              <p className="text-sm text-gray-2">{mentor.experience}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-2">
                <span>
                  ⭐ {mentor.rating} ({mentor.reviews})
                </span>
                <span>응답률 {mentor.successRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 글로벌 Footer */}
      <Footer />
    </div>
  );
}
