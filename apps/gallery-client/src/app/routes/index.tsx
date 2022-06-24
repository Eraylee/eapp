import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  LayoutPage,
  LoginPage,
  NotFoundPage,
  DashboardPage,
} from '@eapp/client/pages';
import { AuthorizedRoute } from '@eapp/client/components';
const Menu = lazy(() => import('@eapp/client/pages/lib/System/Menu/Menu'));
const User = lazy(() => import('@eapp/client/pages/lib/System/User/User'));
const Role = lazy(() => import('@eapp/client/pages/lib/System/Role/Role'));
const DataDictionary = lazy(
  () => import('@eapp/client/pages/lib/System/DataDictionary/DataDictionary')
);

export default () => {
  return useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '',
      element: <AuthorizedRoute element={<LayoutPage />} />,
      children: [
        {
          path: 'dashboard',
          element: <AuthorizedRoute element={<DashboardPage />} />,
        },
        {
          path: 'system/menu',
          element: <AuthorizedRoute element={<Menu />} />,
        },
        {
          path: 'system/user',
          element: <AuthorizedRoute element={<User />} />,
        },
        {
          path: 'system/role',
          element: <AuthorizedRoute element={<Role />} />,
        },
        {
          path: 'system/dataDictionary',
          element: <AuthorizedRoute element={<DataDictionary />} />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};
