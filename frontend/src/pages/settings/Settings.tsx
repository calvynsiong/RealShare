import React from 'react';
import { useParams } from 'react-router';
import { useUserContext } from '../../App';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import MainLayout from './../../components/layouts/MainLayout';

const Settings = () => {
  const { pid } = useParams<{ pid: string }>();
  const { setUserData, userData } = useUserContext();
  const [token, loaded] = useProtectedRoute(setUserData, userData!);

  return (
    <MainLayout>
      <section className='container mt-24'>hello</section>{' '}
    </MainLayout>
  );
};

export default Settings;
