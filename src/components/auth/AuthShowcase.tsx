import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  TrendingUp,
  Star
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Rápido y Eficiente"
  },
  {
    icon: Shield,
    title: "Seguro y Confiable"
  },
  {
    icon: TrendingUp,
    title: "Crecimiento Continuo"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function AuthShowcase() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative hidden lg:flex lg:flex-col lg:justify-center"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-3xl" />

      <div className="relative space-y-4 lg:space-y-5 p-4 sm:p-6 xl:p-8 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide">
        {/* Hero Title - Responsive sizing */}
        <motion.div variants={itemVariants} className="space-y-3 lg:space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
            Transforma tu negocio con{" "}
            <span className="text-primary relative inline-block">
              Pazz
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl xl:text-2xl text-slate-600 font-medium leading-relaxed">
            Potencia tu crecimiento con la plataforma profesional
          </p>
        </motion.div>

        {/* Benefits - Horizontal Pills Side by Side */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Horizontal pill card */}
              <div className="relative bg-white rounded-full p-3 pr-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex items-center gap-3">
                {/* Gradient background accent */}
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon - compact and on the left */}
                <div className="relative flex-shrink-0">
                  <div className="relative w-9 h-9">
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-full blur-md scale-125 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Icon container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <benefit.icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content - title only */}
                <div className="relative flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-gray-900 leading-tight">{benefit.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators & Testimonial - Combined section */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Datos protegidos</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Crecimiento garantizado</span>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-700 italic">
                  "Una plataforma profesional que facilita todo el proceso."
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-2">Cliente Satisfecho</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
