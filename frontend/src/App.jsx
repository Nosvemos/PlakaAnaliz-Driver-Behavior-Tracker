import { ToastContainer } from 'react-toastify'
import { Navigate, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import PlatePage from './pages/PlatePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import { useThemeStore } from "./store/useThemeStore.js";

const authUser = null;

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/register" element={!authUser ? <RegisterPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/plate/:plate" element={<PlatePage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer toastClassName={'!bg-base-100 !shadow-xl !text-base-content/80'} position="top-center" autoClose={3000}/>
    </div>
  )
}

export default App