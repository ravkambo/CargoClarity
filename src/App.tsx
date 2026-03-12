import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import { ShieldCheck } from "lucide-react";

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-primary animate-pulse flex flex-col items-center gap-4">
          <ShieldCheck size={48} />
          <p className="font-bold tracking-widest uppercase text-sm">Loading SafeGuard...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public/Auth Route */}
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" replace />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/" 
        element={user ? <Home /> : <Navigate to="/login" replace />} 
      />
      
      <Route 
        path="/admin" 
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
