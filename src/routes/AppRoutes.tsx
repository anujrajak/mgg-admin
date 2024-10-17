import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthPage from "../pages/auth/AuthPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AuthProvider from "../providers/AuthProvider";
import CategoryPage from "../pages/category/CategoryPage";
import ProfilePage from "../pages/profile/ProfilePage";
import BlogPage from "../pages/blog/BlogPage";
import DealsPage from "../pages/deals/DealsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="blog" element={<BlogPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="deal" element={<DealsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
