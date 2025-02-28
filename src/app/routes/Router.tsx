import { Routes, Route } from 'react-router-dom';

import { RootLayout } from '@/global/layouts/RootLayout';
import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { UserLayout } from '@/user/layouts/UserLayout';
import { MentorshipLayout } from '@/mentorship/layouts/MentorshipLayout';

import HomePage from '@/home/pages/HomePage';
import LandingPage from '@/auth/pages/LandingPage';
import SignInPage from '@/auth/pages/SignInPage';
import SignUpPage from '@/auth/pages/SignUpPage';
import SignupFinish from '@/auth/components/signup/SignupFinish';
import MentorInfo from '@/mentorship/pages/MentorInfo';
import MentorProfileEdit from '@/user/pages/ProfileEdit/MentorProfileEdit';
import Mypage from '@/user/pages/Mypage';
import MentorList from '@/mentorship/pages/mentorlist/MentorshipList';
import UpdateProfile from '@/user/pages/UpdateProfile';
import PaymentPage from '@/user/pages/payment/Payment';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<HomePage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="finish" element={<SignupFinish />} />
      </Route>

      <Route path="/user" element={<UserLayout />}>
        <Route path="" element={<Mypage />} />
        <Route path="profile" element={<UpdateProfile />} />
        <Route path="mentoredit" element={<MentorProfileEdit />}></Route>
        <Route path="payment" element={<PaymentPage />} />
      </Route>

      <Route path="/mentorship" element={<MentorshipLayout />}>
        <Route path="" element={<MentorList />} />
        <Route path="info" element={<MentorInfo />} />
      </Route>
    </Routes>
  );
};
