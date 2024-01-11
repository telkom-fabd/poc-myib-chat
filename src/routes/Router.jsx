import {Route, Routes} from 'react-router-dom';
import ChatListPage from "../pages/Chat/ChatListPage.jsx";
import LoginPage from "../pages/Auth/LoginPage.jsx";
import RegisterPage from "../pages/Auth/RegisterPage.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import PrivateLayout from "../layouts/PrivateLayout.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={
                <AuthLayout>
                    <LoginPage/>
                </AuthLayout>
            }/>
            <Route path="/register" element={
                <AuthLayout>
                    <RegisterPage/>
                </AuthLayout>
            }/>
            <Route path="/chat" element={
                <PrivateLayout>
                    <ChatListPage/>
                </PrivateLayout>
            }/>
        </Routes>
    );
};

export default AppRouter;
