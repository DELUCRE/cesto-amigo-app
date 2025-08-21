import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'vendedor'>('vendedor');

  const handleLogin = (cpf: string, type: 'admin' | 'vendedor') => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('vendedor');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard userType={userType} onLogout={handleLogout} />;
};

export default Index;
