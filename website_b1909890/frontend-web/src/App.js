import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderPage from './components/layout/header';
import WatchPage from './components/layout/watch';
import Home from './components/layout/index';
import LoginPage from './components/auth/login';
import RegisterPage from './components/auth/register';
import ForgotPasswordPage from './components/auth/forgotPassword';
import MenuPage from './components/layout/menu';
import MyChannel from './components/layout/myChannel';
import FooterPage from './components/layout/footer';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<HeaderPage />}></Route>
        <Route path="/watch" element={<WatchPage />}></Route>
        <Route path="/watch/:id" element={<WatchPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/forgotPassword" element={<ForgotPasswordPage />}></Route>
        <Route path="/menu" element={<MenuPage />}></Route>
        <Route path="/myChannel" element={<MyChannel />}></Route>
        <Route path="/footer" element={<FooterPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
