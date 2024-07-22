
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Protected Route</h1>
    </div>
  );
};

export default ProtectedRoute;
