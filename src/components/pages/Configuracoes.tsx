import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Mail,
  Phone,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function Configuracoes() {
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedColorScheme, setSelectedColorScheme] = useState('default');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });

  const [profile, setProfile] = useState({
    name: "Carlos Oliveira",
    email: "carlos@cestaporte.com",
    phone: "(11) 99999-1111",
    role: "admin",
    company: "Cesta Porto",
    address: "Rua das Flores, 123 - Centro"
  });

  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    setTheme(enabled ? 'dark' : 'light');
  };

  // Definir paletas de cores
  const colorSchemes = {
    default: {
      name: 'Verde Padrão',
      primary: '155 85% 25%',
      secondary: '35 80% 65%',
      accent: '25 70% 85%'
    },
    blue: {
      name: 'Azul Oceano',
      primary: '215 85% 35%',
      secondary: '195 70% 65%',
      accent: '185 60% 85%'
    },
    purple: {
      name: 'Roxo Elegante',
      primary: '270 85% 35%',
      secondary: '290 70% 65%',
      accent: '310 60% 85%'
    },
    orange: {
      name: 'Laranja Vibrante',
      primary: '25 85% 45%',
      secondary: '45 80% 65%',
      accent: '65 70% 85%'
    }
  };

  const applyColorScheme = (scheme: string) => {
    setSelectedColorScheme(scheme);
    const colors = colorSchemes[scheme as keyof typeof colorSchemes];
    
    if (colors) {
      const root = document.documentElement;
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--secondary', colors.secondary);
      root.style.setProperty('--accent', colors.accent);
      
      // Atualizar também as versões do modo escuro
      if (theme === 'dark') {
        // Ajustar cores para modo escuro (mais claras)
        const primaryHsl = colors.primary.split(' ');
        const secondaryHsl = colors.secondary.split(' ');
        const accentHsl = colors.accent.split(' ');
        
        root.style.setProperty('--primary', `${primaryHsl[0]} 70% 45%`);
        root.style.setProperty('--secondary', `${secondaryHsl[0]} 60% 45%`);
        root.style.setProperty('--accent', `${accentHsl[0]} 50% 25%`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
        </div>
        <Button className="bg-gradient-primary">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <Select value={profile.role} onValueChange={(value) => setProfile(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input 
                  id="company" 
                  value={profile.company}
                  onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea 
                  id="address" 
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <div className="relative">
                  <Input 
                    id="current-password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ativar 2FA</p>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select defaultValue="america-sao-paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao-paulo">América/São Paulo</SelectItem>
                      <SelectItem value="america-rio-branco">América/Rio Branco</SelectItem>
                      <SelectItem value="america-manaus">América/Manaus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en-us">English (US)</SelectItem>
                      <SelectItem value="es-es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo Escuro</p>
                    <p className="text-sm text-muted-foreground">Ativar tema escuro do sistema</p>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Backup Automático</p>
                    <p className="text-sm text-muted-foreground">Fazer backup dos dados automaticamente</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Preferences */}
        <div className="space-y-6">
          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-sm text-muted-foreground">Notificações por e-mail</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(value) => handleNotificationChange('email', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Push</p>
                    <p className="text-sm text-muted-foreground">Notificações push</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(value) => handleNotificationChange('push', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SMS</p>
                    <p className="text-sm text-muted-foreground">Notificações por SMS</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(value) => handleNotificationChange('sms', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Marketing</p>
                    <p className="text-sm text-muted-foreground">E-mails promocionais</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(value) => handleNotificationChange('marketing', value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select value={theme || "system"} onValueChange={handleThemeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Paleta de Cores</Label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(colorSchemes).map(([key, scheme]) => (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedColorScheme === key 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => applyColorScheme(key)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: `hsl(${scheme.primary})` }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: `hsl(${scheme.secondary})` }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: `hsl(${scheme.accent})` }}
                        />
                      </div>
                      <p className="text-xs font-medium">{scheme.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle>Sobre o Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versão:</span>
                <span className="font-medium">2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última Atualização:</span>
                <span className="font-medium">15/12/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Licença:</span>
                <span className="font-medium">Premium</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}