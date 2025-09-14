import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  LayoutDashboard,
  Users, 
  UserCheck, 
  ShoppingBasket, 
  Calendar, 
  FileText,
  Settings,
  UserPlus,
  ChevronDown,
  X
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  userType: 'admin' | 'vendedor';
  activeSection: string;
  onSectionChange: (section: string) => void;
  onClose?: () => void;
}

export function Navigation({ userType, activeSection, onSectionChange, onClose }: NavigationProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(['main']);
  const adminMenuCategories = [
    {
      id: "main",
      label: "Principal",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ]
    },
    {
      id: "management",
      label: "Gerenciamento",
      items: [
        { id: "clientes", label: "Clientes", icon: Users },
        { id: "vendedores", label: "Vendedores", icon: UserCheck },
        { id: "cestas", label: "Cestas Básicas", icon: ShoppingBasket },
      ]
    },
    {
      id: "operations",
      label: "Operações",
      items: [
        { id: "agenda", label: "Agenda", icon: Calendar },
        { id: "relatorios", label: "Relatórios", icon: FileText },
        { id: "cadastro", label: "Cadastrar Usuário", icon: UserPlus },
      ]
    },
    {
      id: "system",
      label: "Sistema",
      items: [
        { id: "configuracoes", label: "Configurações", icon: Settings },
      ]
    }
  ];

  const vendedorMenuCategories = [
    {
      id: "main",
      label: "Principal",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ]
    },
    {
      id: "work",
      label: "Meu Trabalho",
      items: [
        { id: "clientes", label: "Meus Clientes", icon: Users },
        { id: "cestas", label: "Cestas Básicas", icon: ShoppingBasket },
        { id: "agenda", label: "Agenda", icon: Calendar },
        { id: "cadastro", label: "Cadastrar Cliente", icon: UserPlus },
      ]
    }
  ];

  const menuCategories = userType === 'admin' ? adminMenuCategories : vendedorMenuCategories;

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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

      <nav className="p-4 space-y-3 overflow-y-auto h-full">
        {menuCategories.map((category) => (
          <Collapsible
            key={category.id}
            open={openCategories.includes(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left text-sm font-medium hover:bg-accent/50 rounded-lg transition-colors">
              <span className="flex items-center gap-2">
                <span>{category.label}</span>
              </span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  openCategories.includes(category.id) ? 'rotate-180' : ''
                }`} 
              />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2 space-y-1">
              {category.items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-11 pl-6 ${
                    activeSection === item.id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-accent/70 text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => {
                    onSectionChange(item.id);
                    onClose?.();
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
    </aside>
  );
}