import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HeaderPage from './components/layout/header';
import WatchPage from './components/layout/watch';
import Home from './components/layout/index';
// import LoginPage from './components/auth/login';
// import RegisterPage from './components/auth/register';
import ForgotPasswordPage from './components/auth/forgotPassword';
import MenuPage from './components/layout/menu';
import FooterPage from './components/layout/footer';
import CommentPage from './components/layout/comment';
import LoginAdminPage from './components/admin/loginAdmin';
import AdminPage from './components/admin/admin';
import StaffPage from './components/satff/staff';
import LoginStaffPage from './components/satff/loginStaff';
import MoviePage from './components/layout/movie';
import ProfilePage from './components/auth/profile';
import UploadVideoPage from './components/layout/uploadVideo';

// Thành phần hiển thị trang không tồn tại
const NotFoundPage = () => {
  return (
    <div className="text-center mt-[200px]">
      <h1>Trang không tồn tại</h1>
      {/* Bạn có thể tùy chỉnh nội dung và giao diện của trang lỗi ở đây */}
    </div>
  );
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<HeaderPage />}></Route>
        <Route path="/watch" element={<WatchPage />}></Route>
        <Route path="/watch/:id" element={<WatchPage />}></Route>

        {/* <Route path="/register" element={<RegisterPage />}></Route> */}
        {/* <Route path="/login" element={<LoginPage />}></Route> */}
        <Route path="/login/admin" element={<LoginAdminPage />}></Route>
        <Route path="/login/staff" element={<LoginStaffPage />}></Route>

        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/staff" element={<StaffPage />}></Route>

        <Route path="/forgotPassword" element={<ForgotPasswordPage />}></Route>
        <Route path="/movie" element={<MoviePage />}></Route>

        <Route path="/menu" element={<MenuPage />}></Route>
        <Route path="/footer" element={<FooterPage />}></Route>
        <Route path="/comment" element={<CommentPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>

        <Route path="/upload/video" element={<UploadVideoPage />}></Route>

        {/* Xử lý trang lỗi */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
