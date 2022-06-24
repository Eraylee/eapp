import React, { useEffect, Suspense, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Loading';

export interface AuthorizedRouteProps {
  element: ReactNode;
}

export const AuthorizedRoute = ({ element }: AuthorizedRouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const TOKEN = localStorage.getItem('TOKEN');
    if (!TOKEN) {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </>
  );
};
