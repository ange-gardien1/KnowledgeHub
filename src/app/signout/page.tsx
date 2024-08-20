
'use client'
import { signOut } from '@/app/auth';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/signin'); 
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full py-3 px-4 border border-transparent text-black font-semibold rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
