import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { AuthTrustBadges } from "./AuthTrustBadges";
import { PazzLogo } from "@/ui/pazz-logo";

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function AuthFormCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState<"login" | "register">(
    location.pathname.includes("register") ? "register" : "login"
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "register");
    navigate(`/auth/${value}`);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-8 shadow-xl border-0">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <PazzLogo size="lg" />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <AuthTrustBadges />
        </div>
      </Card>
    </motion.div>
  );
}