import { lazy, Suspense } from 'react';
import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layouts/AppLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Spinner } from '@/ui/spinner';
import ErrorBoundary from '@/components/layouts/ErrorBoundary';
import Dashboard from '@/pages/Dashboard';
import ComingSoon from '@/pages/ComingSoon';

// Lazy load auth pages
const StandaloneLogin = lazy(() => import('@/pages/StandaloneLogin'));
const Register = lazy(() => import('@/pages/Register'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback component
const PageLoading = () => (
  <div className="flex justify-center items-center h-64">
    <Spinner size="lg" />
  </div>
);

const routerConfig: RouteObject[] = [
  // Root redirect to login
  {
    path: '/',
    index: true,
    element: <Navigate to="/auth/login" replace />
  },
  // Protected app routes
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'account',
        element: <ComingSoon feature="Cuenta" />
      },
      {
        path: 'account/settings',
        element: <ComingSoon feature="Configuración" />
      },
      {
        path: 'settings',
        element: <ComingSoon feature="Configuración" />
      },
      {
        path: 'resources/*',
        element: <ComingSoon feature="Recursos" />
      },
      {
        path: 'seguimiento/*',
        element: <ComingSoon feature="Seguimiento" />
      },
      {
        path: 'leasing/*',
        element: <ComingSoon feature="Leasing" />
      },
      {
        path: 'billing/*',
        element: <ComingSoon feature="Facturación" />
      }
    ]
  },
  // Auth routes (public)
  {
    path: '/auth',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <StandaloneLogin />
        </Suspense>
      </ErrorBoundary>
    )
  },
  {
    path: '/auth/login',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <StandaloneLogin />
        </Suspense>
      </ErrorBoundary>
    )
  },
  {
    path: '/auth/register',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <Register />
        </Suspense>
      </ErrorBoundary>
    )
  },
  {
    path: '/registro',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <Register />
        </Suspense>
      </ErrorBoundary>
    )
  },
  // Catch-all route
  {
    path: '*',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <NotFound />
        </Suspense>
      </ErrorBoundary>
    )
  }
];

// Router configuration
const router = createBrowserRouter(routerConfig) as ReturnType<typeof createBrowserRouter>;

export { router };
