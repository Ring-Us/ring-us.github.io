import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@/app/routes/Router';
import SplashScreen from '@/auth/components/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // SplashScreen을 2초 동안 유지
  }, []);

  return (
    <BrowserRouter>{isLoading ? <SplashScreen /> : <Router />}</BrowserRouter>
  );
}

// import { useState, useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { Router } from '@/app/routes/Router';
// import SplashScreen from '@/auth/components/SplashScreen';

// export default function App() {
//   const [isLoading, setIsLoading] = useState(
//     process.env.NODE_ENV === 'development' ? false : true, // 개발 모드에서는 Splash 비활성화
//   );

//   useEffect(() => {
//     if (process.env.NODE_ENV !== 'development') {
//       setTimeout(() => setIsLoading(false), 2000); // 배포 환경에서는 Splash 유지
//     }
//   }, []);

//   return (
//     <BrowserRouter>{isLoading ? <SplashScreen /> : <Router />}</BrowserRouter>
//   );
// }
