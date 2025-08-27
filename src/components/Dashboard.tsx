import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBasket, 
  Users, 
  UserCheck, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Plus,
  LogOut
} from "lucide-react";
import { Navigation } from "./Navigation";
import { UserRegistration } from "./UserRegistration";
import { Clientes } from "./pages/Clientes";
import { Vendedores } from "./pages/Vendedores";
import { CestaBasica } from "./pages/CestaBasica";
import { Agenda } from "./pages/Agenda";
import { Relatorio } from "./pages/Relatorio";
import { Configuracoes } from "./pages/Configuracoes";

interface DashboardProps {
  userType: 'admin' | 'vendedor';
  onLogout: () => void;
}

export function Dashboard({ userType, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const stats = [
    {
      title: "Total de Cestas",
      value: "1,234",
      icon: ShoppingBasket,
      color: "bg-gradient-primary",
      change: "+12%"
    },
    {
      title: "Clientes Ativos",
      value: "456",
      icon: Users,
      color: "bg-gradient-secondary",
      change: "+5%"
    },
    {
      title: "Vendedores",
      value: userType === 'admin' ? "23" : "1",
      icon: UserCheck,
      color: "bg-accent",
      change: "+2%"
    },
    {
      title: "Pendências",
      value: "12",
      icon: AlertCircle,
      color: "bg-destructive",
      change: "-8%"
    }
  ];

  const recentTransactions = [
    { id: 1, client: "Maria Santos", amount: "R$ 85,00", status: "Pago", date: "Hoje" },
    { id: 2, client: "João Silva", amount: "R$ 75,00", status: "Pendente", date: "Ontem" },
    { id: 3, client: "Ana Costa", amount: "R$ 90,00", status: "Atrasado", date: "2 dias" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago": return "bg-primary text-primary-foreground";
      case "Pendente": return "bg-secondary text-secondary-foreground";
      case "Atrasado": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-gradient-card-subtle border-b border-border/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingBasket className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Cesta Porto</h1>
              <p className="text-sm text-muted-foreground capitalize">{userType}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <Navigation 
          userType={userType} 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-gradient-card-subtle shadow-soft border-0 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${stat.color}`}>
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-sm text-primary font-medium">
                          {stat.change}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Transactions */}
              <Card className="bg-gradient-card-subtle shadow-soft border-0 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.client}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{transaction.amount}</p>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeSection === "cadastro" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Cadastrar Usuário</h2>
              <UserRegistration />
            </div>
          )}
          
          {activeSection === "clientes" && <Clientes />}
          {activeSection === "vendedores" && <Vendedores />}
          {activeSection === "cestas" && <CestaBasica />}
          {activeSection === "agenda" && <Agenda />}
          {activeSection === "relatorios" && <Relatorio />}
          {activeSection === "configuracoes" && <Configuracoes />}
          
          {!["dashboard", "cadastro", "clientes", "vendedores", "cestas", "agenda", "relatorios", "configuracoes"].includes(activeSection) && (
            <Card className="bg-gradient-card-subtle shadow-soft border-0 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="capitalize">{activeSection}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Seção em Desenvolvimento</p>
                  <p className="text-muted-foreground">
                    A seção "{activeSection}" será implementada em breve.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}