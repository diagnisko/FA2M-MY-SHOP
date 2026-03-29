import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { api } from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import OrdersPage from "@/pages/OrdersPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminProductEdit from "@/pages/admin/AdminProductEdit";
import AdminOrders from "@/pages/admin/AdminOrders";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const access = useAuthStore((s) => s.access);
  const user = useAuthStore((s) => s.user);
  if (!access) return <Navigate to="/connexion" replace />;
  if (!user)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  return children;
}

function StaffRoute({ children }: { children: React.ReactElement }) {
  const { access, user } = useAuthStore();
  if (!access) return <Navigate to="/connexion" replace />;
  if (!user)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  if (!user.is_staff) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { access, setUser, user, logout } = useAuthStore();

  useEffect(() => {
    if (!access) {
      setUser(null);
      return;
    }
    if (user) return;
    api
      .get("/auth/me/")
      .then((r) => setUser(r.data))
      .catch(() => logout());
  }, [access, setUser, user, logout]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/boutique" element={<ShopPage />} />
        <Route path="/produit/:id" element={<ProductDetailPage />} />
        <Route path="/panier" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/commandes" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/commandes/:id" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
        <Route path="/reinitialiser-mot-de-passe" element={<ResetPasswordPage />} />
        <Route
          path="/admin"
          element={
            <StaffRoute>
              <AdminDashboard />
            </StaffRoute>
          }
        />
        <Route
          path="/admin/produits"
          element={
            <StaffRoute>
              <AdminProducts />
            </StaffRoute>
          }
        />
        <Route
          path="/admin/produits/nouveau"
          element={
            <StaffRoute>
              <AdminProductEdit />
            </StaffRoute>
          }
        />
        <Route
          path="/admin/produits/:id"
          element={
            <StaffRoute>
              <AdminProductEdit />
            </StaffRoute>
          }
        />
        <Route
          path="/admin/commandes"
          element={
            <StaffRoute>
              <AdminOrders />
            </StaffRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
