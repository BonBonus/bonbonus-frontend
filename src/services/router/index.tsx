import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout'
import { CheckToken } from '../../views/CheckToken/CheckToken'
import { Dashboard } from '../../views/Dashboard/Dashboard'

import {
  CHECK_TOKEN_ROUTE_PATH,
  DASHBOARD_ROUTE_PATH, FAQ_ROUTE_PATH,
  ROOT_ROUTE,
} from './routes';
import { FAQ } from '../../views/FAQ/FAQ'

export const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD_ROUTE_PATH,
        element: <Dashboard />,
      },
      {
        path: CHECK_TOKEN_ROUTE_PATH,
        element: <CheckToken />,
      },
      {
        path: FAQ_ROUTE_PATH,
        element: <FAQ />,
      },
    ],
  },
]);
