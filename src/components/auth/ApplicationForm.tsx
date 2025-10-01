import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Mail, User, ArrowRight, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/ui/button";
import { IconInput } from "@/ui/icon-input";
import { Label } from "@/ui/label";
import { useAuth } from "@/core/hooks/useAuth";
import { cn } from '@/core/utils/cn';

const applicationSchema = z.object({
  firstName: z.string().min(2, "Por favor ingresa tu nombre"),
  lastName: z.string().min(2, "Por favor ingresa tu apellido"),
  email: z.string().email("Por favor ingresa un correo válido"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

type ApplicationStatus = 'idle' | 'submitting' | 'success';

export function ApplicationForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [status, setStatus] = React.useState<ApplicationStatus>('idle');
  const [submittedEmail, setSubmittedEmail] = React.useState<string>('');
  const [currentStep, setCurrentStep] = React.useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    getValues,
    clearErrors,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onTouched', // Validate when field is touched
    reValidateMode: 'onSubmit', // Don't revalidate on change
    shouldFocusError: false, // Don't auto-focus errors
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const handleNextStep = async () => {
    const isValid = await trigger(['firstName', 'lastName']);
    if (isValid) {
      clearErrors('email'); // Clear any existing email errors
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setStatus('submitting');
    setSubmittedEmail(data.email);
    
    try {
      // In real implementation, this would send the initial application
      // and trigger an email with the full application form
      const tempPassword = `Contact${Date.now()}!`;

      await signUp(data.email, tempPassword, {
        fullName: `${data.firstName} ${data.lastName}`,
        contactStatus: 'pending',
        submittedAt: new Date().toISOString(),
      });
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      // Error toast is handled by useAuth
    }
  };

  if (status === 'success') {
    return (
      <div className="space-y-5">
        {/* Success header */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              ¡Solicitud enviada!
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1 sm:mt-2">
              Revisa tu correo: <strong className="text-slate-900 break-all">{submittedEmail}</strong>
            </p>
          </div>
        </div>
        
        {/* Info box */}
        <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <p className="text-sm sm:text-base text-slate-600">Te contactaremos pronto con más información</p>
          </div>
        </div>
        
        {/* Timeline indicator - Mobile optimized */}
        <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 p-3 sm:p-4">
          {/* Mobile layout - Compact vertical */}
          <div className="sm:hidden">
            <div className="flex justify-between items-start">
              {/* Step 1 - Mobile */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs text-slate-700 mt-1 text-center">Enviado</span>
              </div>
              
              {/* Connector line */}
              <div className="flex-1 max-w-[60px] h-[1px] bg-slate-200 mt-4"></div>
              
              {/* Step 2 - Mobile */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">2</span>
                </div>
                <span className="text-xs font-semibold text-primary mt-1 text-center">Espera</span>
              </div>
              
              {/* Connector line */}
              <div className="flex-1 max-w-[60px] h-[1px] bg-slate-200 mt-4"></div>
              
              {/* Step 3 - Mobile */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-slate-500">3</span>
                </div>
                <span className="text-xs text-slate-600 mt-1 text-center">24-48h</span>
              </div>
            </div>
          </div>
          
          {/* Desktop layout - Full horizontal */}
          <div className="hidden sm:flex items-center justify-between">
            {/* Step 1 - Desktop */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Formulario enviado</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-slate-300 mx-2" />
            
            {/* Step 2 - Desktop */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">2</span>
              </div>
              <span className="text-sm font-semibold text-primary">Espera confirmación</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-slate-300 mx-2" />
            
            {/* Step 3 - Desktop */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-slate-500">3</span>
              </div>
              <span className="text-sm text-slate-600">24-48h respuesta</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="w-full h-11"
        >
          Volver al inicio
        </Button>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 2) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-5 lg:space-y-6"
    >
      {/* Visual Process Steps - Redesigned for better mobile experience */}
      <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100 p-2.5 sm:p-3 md:p-4">
        {/* Mobile layout - Grid based */}
        <div className="sm:hidden">
          <div className="grid grid-cols-3 gap-0">
            {/* Step 1 - Mobile */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                currentStep >= 1 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-slate-100 text-slate-500"
              )}>
                {currentStep > 1 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">1</span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-1.5 text-center",
                currentStep >= 1 ? "font-medium text-slate-900" : "text-slate-600"
              )}>Datos</span>
            </div>
            
            {/* Step 2 - Mobile */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                currentStep >= 2 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-slate-100 text-slate-500"
              )}>
                {currentStep > 2 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">2</span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-1.5 text-center",
                currentStep >= 2 ? "font-medium text-slate-900" : "text-slate-600"
              )}>Email</span>
            </div>
            
            {/* Step 3 - Mobile */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-500">3</span>
              </div>
              <span className="text-xs text-slate-600 mt-1.5 text-center">Enviar</span>
            </div>
          </div>
        </div>
        
        {/* Desktop layout - Grid based */}
        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
          {/* Step 1 - Desktop */}
          <div className="flex items-center gap-2 justify-center">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0",
              currentStep >= 1 
                ? "bg-primary text-white shadow-sm" 
                : "bg-slate-100 text-slate-500"
            )}>
              {currentStep > 1 ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-sm font-bold">1</span>
              )}
            </div>
            <span className={cn(
              "text-sm font-medium whitespace-nowrap",
              currentStep >= 1 ? "text-slate-900" : "text-slate-500"
            )}>Tu nombre</span>
          </div>
          
          {/* Step 2 - Desktop */}
          <div className="flex items-center gap-2 justify-center">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0",
              currentStep >= 2 
                ? "bg-primary text-white shadow-sm" 
                : "bg-slate-100 text-slate-500"
            )}>
              {currentStep > 2 ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-sm font-bold">2</span>
              )}
            </div>
            <span className={cn(
              "text-base font-medium",
              currentStep >= 2 ? "text-slate-900" : "text-slate-500"
            )}>Correo</span>
          </div>
          
          {/* Step 3 - Desktop */}
          <div className="flex items-center gap-2 justify-center">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-slate-500">3</span>
            </div>
            <span className="text-sm font-medium text-slate-500">Revisión</span>
          </div>
        </div>
      </div>

      {/* Form fields - conditional based on step */}
      {currentStep === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
              Nombre
            </Label>
            <IconInput
              id="firstName"
              type="text"
              placeholder="Tu nombre"
              icon={<User className="h-4 w-4" />}
              className={cn(
                "h-11 text-base",
                errors.firstName ? "border-red-500 focus:ring-red-500" : ""
              )}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
              Apellido
            </Label>
            <IconInput
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              icon={<User className="h-4 w-4" />}
              className={cn(
                "h-11 text-base",
                errors.lastName ? "border-red-500 focus:ring-red-500" : ""
              )}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Welcome message with user's name */}
          <div className="text-center mb-3 sm:mb-4">
            <p className="text-base sm:text-lg font-medium text-slate-900 break-words">
              Hola {getValues('firstName')} {getValues('lastName')}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Solo necesitamos tu correo para continuar
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Correo electrónico
            </Label>
          <IconInput
            id="email"
            type="email"
            placeholder="tu@email.com"
            icon={<Mail className="h-4 w-4" />}
            className={cn(
              "h-11 text-base",
              touchedFields.email && errors.email ? "border-red-500 focus:ring-red-500" : ""
            )}
            {...register("email")}
          />
            {touchedFields.email && errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Inline process explanation - conditional based on step */}
      {currentStep === 2 && (
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-primary/5 rounded-lg border border-primary/10">
          <Send className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Te contactaremos por correo.
            <span className="font-medium text-slate-800 ml-0.5 sm:ml-1">
              Respuesta en 24-48h.</span>
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {currentStep === 2 && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousStep}
            className="h-12 px-5 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </Button>
        )}
        
        {currentStep === 1 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Siguiente
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
            isLoading={status === 'submitting'}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        )}
      </div>

      {/* Helper text */}
      <p className="text-center text-xs sm:text-sm text-slate-500 font-medium">
        Proceso seguro • Sin compromiso • Decisión rápida
      </p>
    </form>
  );
}