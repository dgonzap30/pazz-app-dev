import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { useAuth } from "@/core/hooks/useAuth";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;


export function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      // Error toast is handled by useAuth
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill for development
  const handleAutoFill = () => {
    setValue("email", "test@example.com");
    setValue("password", "test123");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form space-y-5"
    >
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </Label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400 transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${errors.email ? "border-red-500" : "border-gray-300 hover:border-gray-400"}`}
          {...register("email")}
          autoComplete="email"
        />
        {touchedFields.email && errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </Label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            className={`w-full px-4 py-3 pr-12 rounded-lg border bg-white text-gray-900 placeholder-gray-400 transition-colors
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              ${errors.password ? "border-red-500" : "border-gray-300 hover:border-gray-400"}`}
            {...register("password")}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors p-1"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-600">Recordarme</span>
        </label>
        <button
          type="button"
          className="text-sm text-primary hover:text-primary-dark transition-colors"
          onClick={() => setShowForgotPassword(true)}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium"
          size="default"
          isLoading={isLoading}
        >
          Iniciar sesión
        </Button>
      </div>

      {/* Dev Auto-fill */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Usar credenciales de prueba
          </button>
        </div>
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        open={showForgotPassword} 
        onOpenChange={setShowForgotPassword} 
      />
    </form>
  );
}