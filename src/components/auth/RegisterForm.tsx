import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/ui/button";
import { IconInput } from "@/ui/icon-input";
import { Label } from "@/ui/label";
import { useAuth } from "@/core/hooks/useAuth";

const registerSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const formVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fieldVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, {
        fullName: data.fullName,
        phone: data.phone,
      });
      navigate("/auth/login");
    } catch (error) {
      // Error toast is handled by useAuth
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      variants={formVariants}
      initial="initial"
      animate="animate"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Responsive grid for name and email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name Field */}
        <motion.div variants={fieldVariants} className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
            Nombre Completo
          </Label>
          <IconInput
            id="fullName"
            type="text"
            placeholder="Juan Pérez"
            icon={<User className="h-4 w-4" />}
            className={`${errors.fullName ? "border-red-500 focus:ring-red-500" : ""}`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div variants={fieldVariants} className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Correo Electrónico
          </Label>
          <IconInput
            id="email"
            type="email"
            placeholder="tu@email.com"
            icon={<Mail className="h-4 w-4" />}
            className={`${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
            {...register("email")}
          />
          {touchedFields.email && errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </motion.div>
      </div>

      {/* Phone Field */}
      <motion.div variants={fieldVariants} className="space-y-1.5">
        <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
          Teléfono
        </Label>
        <IconInput
          id="phone"
          type="tel"
          placeholder="5512345678"
          icon={<Phone className="h-4 w-4" />}
          className={`h-10 ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </motion.div>

      {/* Password fields in grid on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Password Field */}
        <motion.div variants={fieldVariants} className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">
            Contraseña
          </Label>
          <IconInput
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            className={`${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500 line-clamp-2">{errors.password.message}</p>
          )}
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div variants={fieldVariants} className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
            Confirmar Contraseña
          </Label>
          <IconInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            className={`${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </motion.div>
      </div>

      {/* Terms - more compact */}
      <motion.div variants={fieldVariants} className="flex items-start space-x-2">
        <input
          id="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 mt-0.5 cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-slate-600 leading-normal cursor-pointer select-none">
          Acepto los{" "}
          <a href="#" className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-1 font-medium">
            términos y condiciones
          </a>{" "}
          y la{" "}
          <a href="#" className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-1 font-medium">
            política de privacidad
          </a>
        </label>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fieldVariants} className="pt-2">
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Enviar Aplicación
        </Button>
      </motion.div>
    </motion.form>
  );
}