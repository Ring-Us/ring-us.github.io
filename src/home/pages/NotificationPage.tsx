import { useEffect, useState } from 'react';
import TopNavbar from '@/global/ui/TopNavbar';
import Footer from '@/global/components/Footer';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NotificationPage() {
  const [messages, setMessages] = useState<string[]>([]);
  // 초기 알림 배열
  const [notifications, setNotifications] = useState([
    {
      imageUrl: '/assets/ringusprofile.png',
      text: '트레블 님과의 멘토링 신청이 완료되었습니다',
    },
    {
      imageUrl: '/assets/ringusprofile.png',
      text: '오늘은 멘토링이 있는 날입니다',
    },
    {
      imageUrl: '/assets/ringusprofile.png',
      text: '잠시 후에 멘토링이 시작될 예정입니다',
    },
    {
      imageUrl: '/assets/ringusprofile.png',
      text: (
        <>
          트레블 님과의 멘토링이 확정되었습니다
          <br />
          일정을 확인해 주세요
        </>
      ),
    },
  ]);

  useEffect(() => {
    // 실제 SSE 서버 엔드포인트로 변경하세요!
    const sse = new window.EventSource(
      `${import.meta.env.VITE_API_BASE_URL}/v1/notifications/subscribe`,
      { withCredentials: true },
    );

    sse.onmessage = (e) => {
      console.log(e);
    };

    sse.onerror = (e) => {
      console.error('SSE 에러:', e);
      sse.close();
    };
  }, []); // 의존성 배열 필요 시 수정

  return (
    <div className="min-h-screen flex flex-col items-center">
      <TopNavbar title="알림" />
      <div className="w-full max-w-[600px] bg-gray-4 px-4 py-6 pt-20 flex flex-col min-h-[100dvh]">
        <div className="flex flex-col gap-4 flex-1">
          {notifications.map((notification, idx) => (
            <div
              key={idx}
              className="flex items-center bg-white rounded-lg shadow rounded-xl px-4 py-4 gap-3"
            >
              <img
                src={notification.imageUrl}
                className="w-10 h-10 rounded-full object-cover"
                alt="알림 이미지"
              />
              <div className="flex-1 text-gray-1 text-[15px] leading-snug">
                {notification.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
