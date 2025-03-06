import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Navigate, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ThemePage from './pages/ThemePage.jsx'
import PlatePage from './pages/PlatePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import Loading from './components/Loading.jsx'

import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { user, checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !user) return (
    <Loading></Loading>
  );

  return (
    <div data-theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={!user || !isAuthenticated ? <RegisterPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!user || !isAuthenticated ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/theme" element={<ThemePage/>} />
        <Route path="/:plate" element={<PlatePage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer toastClassName={'!bg-base-100 !shadow-xl !text-base-content/80'} position="top-center" autoClose={2000}/>
    </div>
  )
}

export default App