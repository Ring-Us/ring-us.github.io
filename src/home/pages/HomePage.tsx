import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // 애니메이션 추가
import { Bell, Bookmark } from 'lucide-react'; // 알림 아이콘 추가
import Footer from '@/global/components/Footer';
import { useAuthStore } from '@/auth/store/useAuthStore';
import { fetchMentors, Mentor } from '@/mentorship/api/fetchMentors';

export default function HomePage() {
  const { isAuthenticated, checkSession } = useAuthStore();
  const [sessionChecked, setSessionChecked] = useState(false);
  const location = useLocation();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showLoginMessage, setShowLoginMessage] = useState(
    location.state?.loginSuccess || false,
  );
  const [bookmarked, setBookmarked] = useState<{ [key: number]: boolean }>({});

  const navigate = useNavigate(); // << 추가!
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

  useEffect(() => {
    const getMentors = async () => {
      try {
        const data = await fetchMentors(50, 5, 'mentorId');
        setMentors(data.data.content.sort((a, b) => b.mentorId - a.mentorId));
      } catch (e) {
        setMentors([]);
      } finally {
        setIsLoading(false);
      }
    };
    getMentors();
  }, []);

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
        <Bell
          strokeWidth={1}
          className="text-white w-6 h-6 cursor-pointer"
          onClick={() => navigate('/notification')}
        />
      </div>

      {/* 카테고리 아이콘 리스트 */}
      <div className="bg-[#765BFD]">
        <div className="max-w-[600px] bg-white min-h-screen rounded-t-[30px] relative z-15 ">
          <motion.div
            className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-[#130c0c] text-[#ffffff] bg-opacity-80 text-sm py-2 px-4 rounded-lg shadow-lg"
            initial={{ y: 0, opacity: 0.7 }}
            animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            해당 직무 선택 후 멘토링 신청하기!
          </motion.div>
          <div className="grid grid-cols-4 gap-5 px-8 pt-10 text-center z-10">
            {/* {categories.map((category) => (
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
            ))} */}
            {/*아래 코드 멘토 아이콘 클릭시 필터링된 멘토목록으로 넘어감*/}
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate(
                    `/mentorship?category=${encodeURIComponent(category.name)}`
                  )
                }}
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
          <div className="mt-14 px-7 pb-20">
            <h2 className="text-lg font-semibold">최근에 가입한 멘토 목록</h2>
            <div className="flex gap-4 mt-4 overflow-x-scroll scrollbar-hide">
              {isLoading ? (
                <div>로딩중...</div>
              ) : (
                mentors.map((mentor, index) => (
                  <div
                    key={mentor.mentorId}
                    className="min-w-[250px] h-auto border border-gray-3 rounded-lg p-4 pt-0 flex flex-col justify-between shadow-md relative"
                  >
                    {/* 북마크 아이콘, 프로필 이미지, 멘토 정보 등 기존 코드와 동일하게 랜더링 */}
                    <Bookmark
                      strokeWidth={1.5}
                      className={`absolute right-3 top-3 w-6 h-6 cursor-pointer z-10 ${
                        bookmarked[mentor.mentorId]
                          ? 'fill-[#765BFD] text-[#765BFD]'
                          : 'text-gray-2'
                      }`}
                      onClick={() => toggleBookmark(mentor.mentorId)}
                    />
                    <div className="flex items-center mt-2">
                      <img
                        src={
                          mentor.image.filePath || '/assets/ringusprofile.png'
                        }
                        alt={mentor.nickname}
                        className="w-[70px] h-[70px] border border-gray-3 rounded-[50px] object-cover"
                      />
                      <div className="p-3">
                        <h3 className="mt-3 text-lg font-bold">
                          {mentor.nickname}
                        </h3>
                        <p className="text-sm text-gray-1 line-clamp-1">
                          {mentor.organization.jobCategory}
                        </p>
                        <p className="text-sm text-gray-1 line-clamp-1">
                          {mentor.organization.experience}년차
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm italic">
                      “
                      {mentor.introduction?.content.length > 40
                        ? mentor.introduction.content.slice(0, 40) + '...'
                        : mentor.introduction?.content}
                      ”
                    </p>
                    <div className="mt-3">
                      <span className="p-1.5 text-sm bg-white border border-gray-3 text-[#765BFD] rounded-md">
                        멘토링 횟수
                        <span className="ml-2 text-gray-2">
                          {mentor.mentoringCount}회
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 글로벌 Footer */}
      <Footer />
    </div>
  );
}
