import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/ui/card";
import { useAuth } from "@/core/hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import { PazzLogo } from "@/ui/pazz-logo";

const StandaloneLogin = () => {
  const { user } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-6">
        <nav className="mx-auto max-w-6xl flex items-center justify-between">
          <PazzLogo size="md" />
          <a
            href="https://pazz.mx"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver</span>
          </a>
        </nav>
      </header>


      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Simplified Welcome */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
              >
                Bienvenido{" "}
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Partner+
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-base sm:text-lg text-gray-600"
              >
                Ingresa a tu cuenta de afiliados
              </motion.p>
            </div>

            {/* Clean Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card className="p-6 sm:p-8 shadow-lg border border-gray-200 bg-white rounded-xl">
                <LoginForm />
              </Card>
            </motion.div>


            {/* Minimal Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-8 text-center text-xs text-gray-500"
            >
              <div className="flex items-center justify-center gap-4">
                <a href="/privacidad" className="hover:text-gray-700 transition-colors">
                  Privacidad
                </a>
                <span>•</span>
                <a href="/terminos" className="hover:text-gray-700 transition-colors">
                  Términos
                </a>
              </div>
              <p className="mt-4">© 2024 Pazz. Todos los derechos reservados.</p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default StandaloneLogin;