import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, _password: string) => {
    setLoading(true);
    try {
      // Stub implementation - will be replaced with real backend
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser({ id: '1', email });
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      toast.error('Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, _password: string, _metadata?: Record<string, unknown>) => {
    setLoading(true);
    try {
      // Stub implementation - will be replaced with real backend
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser({ id: '1', email });
      toast.success('Registro exitoso');
    } catch (error) {
      toast.error('Error al registrarse');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Stub implementation - will be replaced with real backend
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      toast.success('Sesión cerrada');
    } catch (error) {
      toast.error('Error al cerrar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // Stub implementation - will be replaced with real backend
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`Se ha enviado un correo de recuperación a ${email}`);
    } catch (error) {
      toast.error('Error al enviar correo de recuperación');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
