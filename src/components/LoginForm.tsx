import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBasket, User, Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: (cpf: string, userType: 'admin' | 'vendedor') => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would validate against backend
    const userType = cpf === "11111111111" ? "admin" : "vendedor";
    onLogin(cpf, userType);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <Card className="w-full max-w-md shadow-elegant backdrop-blur-sm bg-gradient-card-subtle border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <ShoppingBasket className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Cesta Amigo</CardTitle>
            <CardDescription className="text-base">
              Entre com suas credenciais para continuar
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                maxLength={14}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-smooth">
              Entrar
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo: CPF 111.111.111-11 (Admin)</p>
              <p>Qualquer outro CPF (Vendedor)</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}