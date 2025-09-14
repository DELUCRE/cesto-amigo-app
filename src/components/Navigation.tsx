import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  Users, 
  UserCheck, 
  ShoppingBasket, 
  Calendar, 
  FileText,
  Settings,
  UserPlus,
  X
} from "lucide-react";

interface NavigationProps {
  userType: 'admin' | 'vendedor';
  activeSection: string;
  onSectionChange: (section: string) => void;
  onClose?: () => void;
}

export function Navigation({ userType, activeSection, onSectionChange, onClose }: NavigationProps) {
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "vendedores", label: "Vendedores", icon: UserCheck },
    { id: "cestas", label: "Cestas Básicas", icon: ShoppingBasket },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "relatorios", label: "Relatórios", icon: FileText },
    { id: "cadastro", label: "Cadastrar Usuário", icon: UserPlus },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  const vendedorMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clientes", label: "Meus Clientes", icon: Users },
    { id: "cestas", label: "Cestas Básicas", icon: ShoppingBasket },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "cadastro", label: "Cadastrar Cliente", icon: UserPlus },
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : vendedorMenuItems;

  return (
    <aside className="w-80 bg-card/95 border-r border-border/50 h-screen backdrop-blur-md shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h2 className="font-semibold text-lg">Menu</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto h-full">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start gap-3 h-12 ${
              activeSection === item.id 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "hover:bg-accent/70 text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              onSectionChange(item.id);
              onClose?.();
            }}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}