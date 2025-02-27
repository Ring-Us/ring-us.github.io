import { Routes, Route } from 'react-router-dom';

import { RootLayout } from '@/global/layouts/RootLayout';
import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { MentorshipLayout } from '@/mentorship/layouts/MentorshipLayout';
import { UserLayout } from '@/user/layouts/UserLayout';

import HomePage from '@/home/pages/HomePage';
import LandingPage from '@/auth/pages/LandingPage';
import SignInPage from '@/auth/pages/SignInPage';
import SignUpPage from '@/auth/pages/SignUpPage';
import SignupFinish from '@/auth/components/signup/SignupFinish';
import MentorList from '@/mentorship/pages/mentorlist/MentorshipList';
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
      <Route path="/mentorship" element={<MentorshipLayout />}>
        <Route path="" element={<MentorList/>}/>
      </Route>
      <Route path="/user" element={<UserLayout />}>
        <Route path="payment" element={<PaymentPage/>}/>
      </Route>
    </Routes>
  );
};
