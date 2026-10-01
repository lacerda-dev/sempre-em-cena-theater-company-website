import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observeAuthState } from "../../firebase/auth";

export const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <p>Verificando autenticação...</p>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};