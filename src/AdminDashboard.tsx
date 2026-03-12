import { 
  ShieldCheck, 
  LogOut,
  LayoutDashboard,
  Menu,
  ChevronLeft
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  // Basic RBAC Protection
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-6 py-4 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-primary hover:scale-105 transition-transform">
              <ShieldCheck size={32} />
            </Link>
            <h2 className="text-xl font-black tracking-tighter">SafeGuard Admin</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 mr-4 border-r border-white/10 pr-4">
              <div className="text-right">
                <p className="text-xs font-bold text-white">{user?.username}</p>
                <p className="text-[10px] text-primary uppercase tracking-tighter font-black">System Administrator</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 lg:px-20 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors text-sm font-medium">
          <ChevronLeft size={16} /> Back to Public Site
        </Link>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 lg:p-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20">
                <LayoutDashboard size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black mb-1">Command Center</h1>
                <p className="text-slate-400">Real-time infrastructure and compliance oversight.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary px-6">System Logs</button>
              <button className="btn-primary px-6">New Audit</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Fleet Capacity", value: "14,502", trend: "+8.2%", detail: "Across 128 Carriers" },
              { label: "Compliance Rate", value: "99.4%", trend: "+1.2%", detail: "Critical threshold: 95%" },
              { label: "Active Incidents", value: "0", trend: "-100%", detail: "Last incident 14 days ago" }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-8 border-white/5 hover:border-primary/30 transition-all cursor-default group">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black tracking-tighter">{stat.value}</span>
                  <span className="text-sm font-bold text-emerald-500">{stat.trend}</span>
                </div>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Menu size={20} className="text-primary" /> Recent System Activities
            </h3>
            <div className="space-y-6">
              {[
                { user: "System", action: "Database optimization complete", time: "2 mins ago" },
                { user: "admin_user", action: "Updated compliance rules for Region 4", time: "45 mins ago" },
                { user: "auto_bot", action: "Generated monthly safety report", time: "2 hours ago" }
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-bold text-white">{log.action}</p>
                    <p className="text-xs text-slate-500">By {log.user}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-600">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-white/[0.01]">
            <h3 className="text-xl font-bold mb-6">Carrier Distribution</h3>
            <div className="space-y-4">
              {[
                { region: "North America", count: 84, percentage: 65 },
                { region: "Europe", count: 32, percentage: 25 },
                { region: "Asia Pacific", count: 12, percentage: 10 }
              ].map((region, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{region.region}</span>
                    <span className="font-bold">{region.count} Carriers</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
