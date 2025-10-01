import { Shield, Lock, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Shield,
    text: "Datos protegidos",
  },
  {
    icon: Lock,
    text: "Encriptación SSL",
  },
  {
    icon: CreditCard,
    text: "Pagos seguros",
  },
];

export function AuthTrustBadges() {
  return (
    <div className="flex items-center justify-center gap-6">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-1.5 text-xs text-gray-500"
        >
          <badge.icon className="h-3.5 w-3.5" />
          <span>{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
}