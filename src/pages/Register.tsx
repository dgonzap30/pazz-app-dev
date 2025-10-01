import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { ApplicationForm } from "@/components/auth/ApplicationForm";
import { AuthHeader } from "@/components/layouts/AuthHeader";
import { Card } from "@/ui/card";
import { useAuth } from "@/core/hooks/useAuth";
import { AuthTrustBadges } from "@/components/auth/AuthTrustBadges";

const Register = () => {
  const { user } = useAuth();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Header - Non-fixed for better centering */}
      <AuthHeader isFixed={false} />
      
      {/* Main Auth Layout */}
      <AuthLayout>
        {/* Left side - Showcase (hidden on mobile) */}
        <AuthShowcase />
        
        {/* Right side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
          }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <Card className="relative p-6 sm:p-8 lg:p-10 shadow-xl border-0 overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl -mr-24 -mt-24" />
            {/* Header - more spacious for better balance */}
            <div className="relative text-center mb-6 lg:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                Aplica y conviértete en{" "}
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Partner+</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium">
                Únete al programa exclusivo de socios premium
              </p>
            </div>

            {/* Application Form */}
            <div className="relative">
              <ApplicationForm />
            </div>

            {/* Trust Badges */}
            <div className="relative mt-6 pt-6 border-t border-gray-100">
              <AuthTrustBadges />
            </div>

            {/* Login Link */}
            <div className="relative mt-6 text-center">
              <p className="text-sm text-slate-600">
                ¿Ya eres Partner+?{" "}
                <a 
                  href="/auth/login" 
                  className="font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Inicia sesión
                </a>
              </p>
            </div>
          </Card>
        </motion.div>
      </AuthLayout>
    </div>
  );
};

export default Register;