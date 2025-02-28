import { useAuthStore } from '@/auth/store/useAuthStore';
import MenteeProfile from '@/user/components/profile/mentee/MenteeProfile;
import MentorProfile from '@/user/components/profile/mentor/MentorProfile

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="profile-container">
      {user.role === 'mentor' ? (
        <MentorProfile user={user} />
      ) : (
        <MenteeProfile user={user} />
      )}
    </div>
  );
}
