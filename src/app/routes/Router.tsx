import { Routes, Route } from 'react-router-dom';

import { RootLayout } from '@/global/layouts/RootLayout';
import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { UserLayout } from '@/user/layouts/UserLayout';
import { MentorshipLayout } from '@/mentorship/layouts/MentorshipLayout';
import { StatusLayout } from '@/user/layouts/StatusLayout';

import HomePage from '@/home/pages/HomePage';
import LandingPage from '@/auth/pages/LandingPage';
import SignInPage from '@/auth/pages/SignInPage';
import SignUpPage from '@/auth/pages/SignUpPage';
import SignupFinish from '@/auth/components/signup/SignupFinish';
import MentorInfoView from '@/mentorship/pages/MentorInfoView';
import Suggestion from '@/mentorship/pages/Suggestion';
import MentorInfo from '@/user/pages/ProfileEdit/MentorInfo';
import MentorProfileEdit from '@/user/pages/ProfileEdit/MentorProfileEdit';
import MenteeInfo from '@/user/pages/ProfileEdit/MenteeInfo';
import MenteeProfileEdit from '@/user/pages/ProfileEdit/MenteeProfileEdit';
import Mypage from '@/user/pages/Mypage';
import MentorList from '@/mentorship/pages/mentorlist/MentorshipList';
import MentorProfile from '@/user/pages/MentorProfileRegistration';
import MenteeProfile from '@/user/pages/MenteeProfileRegistration';
import PaymentPage from '@/user/pages/payment/Payment';
import MenteeStatus from '@/user/pages/status/mentee/MenteeStatus';
import MenteeRequestStatus from '@/user/pages/status/mentee/MenteeRequestStatus';
import MentorStatus from '@/user/pages/status/mentor/MentorStatus';
import MentorRequestStatus from '@/user/pages/status/mentor/MentorRequestStatus';

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
        <Route path="mentor-profile" element={<MentorProfile />} />
        <Route path="mentee-profile" element={<MenteeProfile />} />
        <Route path="mentorinfo" element={<MentorInfo />}></Route>
        <Route path="mentoredit" element={<MentorProfileEdit />}></Route>
        <Route path="menteeinfo" element={<MenteeInfo />}></Route>
        <Route path="menteeedit" element={<MenteeProfileEdit />}></Route>
        <Route path="payment" element={<PaymentPage />} />
        <Route path="status" element={<StatusLayout />}>
          {/* <Route path="mentee" element={<MenteeStatus />}>
            <Route
              path="mentee/progress/:mentorId"
              element={<MenteeRequestStatus />}
            />
          </Route>

          <Route path="mentor" element={<MentorStatus />}>
            <Route
              path="mentor/progress/:menteeId"
              element={<MentorRequestStatus />}
            />
          </Route> */}
          <Route path="mentee" element={<MenteeStatus />} />
          <Route path="mentor" element={<MentorStatus />} />
          <Route path="progress_tee" element={<MenteeRequestStatus />} />
          <Route path="progress_tor" element={<MentorRequestStatus />} />
        </Route>
      </Route>
      <Route path="/mentorship" element={<MentorshipLayout />}>
        <Route path="" element={<MentorList />} />
        <Route path="info/:mentorId" element={<MentorInfoView />} />
        <Route path="suggestion" element={<Suggestion />} />
      </Route>
    </Routes>
  );
};
