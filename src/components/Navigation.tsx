import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  Users, 
  UserCheck, 
  ShoppingBasket, 
  Calendar, 
  FileText,
  Settings
} from "lucide-react";

interface NavigationProps {
  userType: 'admin' | 'vendedor';
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ userType, activeSection, onSectionChange }: NavigationProps) {
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "vendedores", label: "Vendedores", icon: UserCheck },
    { id: "cestas", label: "Cestas Básicas", icon: ShoppingBasket },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "relatorios", label: "Relatórios", icon: FileText },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  const vendedorMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clientes", label: "Meus Clientes", icon: Users },
    { id: "cestas", label: "Cestas Básicas", icon: ShoppingBasket },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "relatorios", label: "Relatórios", icon: FileText },
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : vendedorMenuItems;

  return (
    <aside className="w-64 bg-card border-r border-border h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 ${
              activeSection === item.id 
                ? "bg-gradient-primary text-primary-foreground shadow-elegant" 
                : "hover:bg-accent"
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}