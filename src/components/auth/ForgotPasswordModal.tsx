import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { CheckCircle, Loader2, Mail, Clock } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/ui/modal";
import { useAuth } from "@/core/hooks/useAuth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordModal({ open, onOpenChange }: ForgotPasswordModalProps) {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Motion values for swipe
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 150], [1, 0.5]);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const emailValue = watch("email");

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      setIsSuccess(true);
    } catch (error) {
      // Error toast is handled by useAuth
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSuccess(false);
      reset();
      y.set(0);
    }, 300);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 120;
    if (info.offset.y > threshold) {
      handleClose();
    }
  };

  const isValidEmail = emailValue && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent className="w-full sm:max-w-md p-0 overflow-hidden">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.2 }}
          onDragEnd={handleDragEnd}
          style={{ y, opacity }}
          className="px-5 py-6 sm:px-8 sm:py-8"
        >
          {/* Swipe Indicator - Mobile Only */}
          <div className="flex justify-center mb-5 sm:hidden">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ModalHeader className="pb-6 sm:pb-8">
                  <ModalTitle className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    Recupera tu cuenta
                  </ModalTitle>
                  <ModalDescription className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-3 leading-relaxed">
                    Te enviaremos un enlace para crear una nueva contraseña
                  </ModalDescription>
                </ModalHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                  <div className="space-y-2.5">
                    <label htmlFor="reset-email" className="text-sm sm:text-base font-medium text-gray-700 block">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      {/* Email Icon */}
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

                      {/* Input Field */}
                      <input
                        id="reset-email"
                        type="email"
                        placeholder="tu@email.com"
                        className={`w-full pl-10 pr-10 py-3.5 sm:py-4 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none text-base sm:text-lg
                          ${errors.email
                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          }`}
                        {...register("email")}
                        autoFocus
                        autoComplete="email"
                      />

                      {/* Success Checkmark */}
                      {isValidEmail && (
                        <motion.div
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                        </motion.div>
                      )}
                    </div>

                    {/* Error Message */}
                    {touchedFields.email && errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs sm:text-sm text-red-500 mt-1.5"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 sm:h-14 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-base sm:text-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar enlace"
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-center py-6 sm:py-10"
              >
                {/* Success Icon */}
                <motion.div
                  className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
                </motion.div>

                {/* Success Message */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                  ¡Revisa tu correo!
                </h3>

                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
                  Hemos enviado un enlace de recuperación a tu correo electrónico.
                </p>

                {/* Expiration Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white stroke-2" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs sm:text-sm font-semibold text-blue-900 leading-tight">
                      Enlace válido por 1 hora
                    </span>
                    <span className="text-xs text-blue-700/80 leading-tight">
                      Revisa tu bandeja de entrada
                    </span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  <button
                    onClick={handleClose}
                    className="w-full h-12 sm:h-14 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-base sm:text-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                  >
                    Entendido
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="w-full text-sm sm:text-base text-primary hover:text-primary-dark transition-colors font-medium"
                  >
                    ¿No recibiste el correo? Intenta de nuevo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </ModalContent>
    </Modal>
  );
}