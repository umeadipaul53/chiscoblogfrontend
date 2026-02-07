import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const location = useLocation();

  // Still checking auth → wait
  if (loading) {
    return <p style={{ padding: "20px" }}>Checking authentication...</p>;
  }

  // Auth check done & not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in
  return <Outlet />;
};

export default ProtectedRoute;
