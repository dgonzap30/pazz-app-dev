import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/core';
import { PazzLogo } from '@/ui/pazz-logo';

interface AuthHeaderProps {
  isFixed?: boolean;
}

export function AuthHeader({ isFixed = true }: AuthHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login' || location.pathname === '/auth';
  const isRegister = location.pathname === '/registro' || location.pathname === '/auth/register';

  // Check scroll position for glass effect (only when fixed)
  useEffect(() => {
    if (!isFixed) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFixed]);

  return (
    <header className={cn(
      "px-4 py-4",
      isFixed ? "fixed top-0 left-0 right-0 z-50" : "relative"
    )}>
      <nav className={cn(
        "mx-auto max-w-7xl transition-all duration-300 rounded-full px-6 py-3",
        isFixed && isScrolled 
          ? "backdrop-blur-md bg-white/95 shadow-lg" 
          : "bg-white shadow-lg"
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <PazzLogo size="sm" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="relative transition-all duration-300 group text-slate-600 hover:text-primary font-medium flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
            </Link>
            <a 
              href="/#how-it-works"
              className="relative transition-all duration-300 group text-slate-600 hover:text-primary font-medium"
            >
              ¿Cómo funciona?
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
            <a 
              href="/#faq"
              className="relative transition-all duration-300 group text-slate-600 hover:text-primary font-medium"
            >
              Preguntas frecuentes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop buttons */}
            <div className="hidden md:block">
              {isLogin ? (
                <Link to="/registro">
                  <button
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/40 font-medium flex items-center gap-2"
                    aria-label="Crear cuenta"
                  >
                    Aplica a Partner+
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              ) : isRegister ? (
                <Link to="/auth/login">
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400/40 font-medium"
                    aria-label="Ya soy Partner+"
                  >
                    Ya soy Partner+
                  </button>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/auth/login">
                    <button
                      className="text-slate-600 hover:text-primary px-4 py-2 rounded-full transition-all duration-300 font-medium"
                      aria-label="Iniciar sesión"
                    >
                      Iniciar sesión
                    </button>
                  </Link>
                  <Link to="/registro">
                    <button
                      className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/40 font-medium"
                      aria-label="Registrarse"
                    >
                      Unirse a Partner+
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40"
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 backdrop-blur-md bg-white/95 rounded-2xl shadow-xl p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="text-slate-700 py-2 hover:text-primary transition-colors duration-300 font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
              <a 
                href="/#how-it-works"
                className="text-slate-700 py-2 hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                ¿Cómo funciona?
              </a>
              <a 
                href="/#faq"
                className="text-slate-700 py-2 hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preguntas frecuentes
              </a>
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isLogin ? (
                  <Link to="/registro" onClick={() => setMobileMenuOpen(false)} className="block">
                    <button className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-sm transition-all duration-300 font-medium flex items-center justify-center gap-2">
                      Aplica a Partner+
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </Link>
                ) : isRegister ? (
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-3 rounded-full shadow-sm transition-all duration-300 font-medium">
                      Ya soy Partner+
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block">
                      <button className="w-full border border-gray-200 hover:bg-gray-50 text-slate-700 px-6 py-3 rounded-full transition-all duration-300 font-medium">
                        Iniciar sesión
                      </button>
                    </Link>
                    <Link to="/registro" onClick={() => setMobileMenuOpen(false)} className="block">
                      <button className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-sm transition-all duration-300 font-medium">
                        Unirse a Partner+
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}