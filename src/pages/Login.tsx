import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthHeader } from "@/components/layouts/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/ui/card";
import { useAuth } from "@/core/hooks/useAuth";
import { Sparkles, TrendingUp, Users } from "lucide-react";

const Login = () => {
  const { user } = useAuth();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const stats = [
    { icon: Users, value: "+500", label: "Partners activos" },
    { icon: TrendingUp, value: "2.5%", label: "Comisión máxima" },
    { icon: Sparkles, value: "72h", label: "Pagos rápidos" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation Header - Non-fixed for better centering */}
      <AuthHeader isFixed={false} />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-start justify-center px-4 pt-6 lg:pt-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Welcome Back Message */}
            <div className="text-center mb-6">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight leading-tight"
              >
                Bienvenido de{" "}
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">vuelta</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg sm:text-xl text-slate-600 font-medium"
              >
                Accede a tu portal de Partner+
              </motion.p>
            </div>

            {/* Login Card */}
            <Card className="p-6 shadow-xl border-0 backdrop-blur-sm bg-white/95">
              <LoginForm />
            </Card>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange-muted mb-2 shadow-sm">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Sign Up Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-base text-slate-600">
                ¿Aún no tienes cuenta?{" "}
                <a 
                  href="/registro" 
                  className="font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Aplica para ser Partner+
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Login;