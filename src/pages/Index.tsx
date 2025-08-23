import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Dashboard } from "@/components/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, loading, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Carregando...
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Acesso restrito</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Você precisa estar logado para acessar esta página.</p>
            <Button onClick={() => navigate("/auth")}>
              Fazer login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Para este momento, vamos assumir que todos os usuários são vendedores
  // Futuramente isso pode ser expandido com roles
  return <Dashboard userType="vendedor" onLogout={handleLogout} />;
};

export default Index;
