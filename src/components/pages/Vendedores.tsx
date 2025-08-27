import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  UserCheck, 
  Phone, 
  Mail, 
  TrendingUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Shield
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Vendedores() {
  const [searchTerm, setSearchTerm] = useState("");

  const sellers = [
    {
      id: 1,
      name: "Carlos Oliveira",
      email: "carlos@cestaporte.com",
      phone: "(11) 99999-1111",
      role: "admin",
      status: "Ativo",
      joinDate: "01/01/2024",
      totalClients: 45,
      totalSales: "R$ 32.500,00",
      monthlyGoal: "R$ 15.000,00",
      achievement: 85
    },
    {
      id: 2,
      name: "Fernanda Lima",
      email: "fernanda@cestaporte.com",
      phone: "(11) 88888-2222",
      role: "vendedor",
      status: "Ativo",
      joinDate: "15/02/2024",
      totalClients: 32,
      totalSales: "R$ 22.400,00",
      monthlyGoal: "R$ 12.000,00",
      achievement: 92
    },
    {
      id: 3,
      name: "Roberto Santos",
      email: "roberto@cestaporte.com",
      phone: "(11) 77777-3333",
      role: "vendedor",
      status: "Inativo",
      joinDate: "10/03/2024",
      totalClients: 18,
      totalSales: "R$ 12.600,00",
      monthlyGoal: "R$ 8.000,00",
      achievement: 65
    },
  ];

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-primary text-primary-foreground";
      case "Inativo": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-destructive text-destructive-foreground";
      case "vendedor": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 90) return "text-primary";
    if (achievement >= 70) return "text-secondary";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Vendedores</h1>
        <p className="text-muted-foreground">Gerencie sua equipe de vendas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendedores</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <UserCheck className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold">19</p>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Meta do Mês</p>
                <p className="text-2xl font-bold">R$ 250k</p>
              </div>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atingimento</p>
                <p className="text-2xl font-bold">82%</p>
              </div>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card className="bg-gradient-card-subtle shadow-soft border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Equipe de Vendas</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Pesquisar vendedores..." 
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Vendas Totais</TableHead>
                <TableHead>Atingimento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">Desde {seller.joinDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{seller.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{seller.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {seller.role === 'admin' && <Shield className="w-3 h-3" />}
                      <Badge className={getRoleColor(seller.role)}>
                        {seller.role === 'admin' ? 'Administrador' : 'Vendedor'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(seller.status)}>
                      {seller.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{seller.totalClients}</TableCell>
                  <TableCell className="font-medium">{seller.totalSales}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getAchievementColor(seller.achievement)}`}>
                        {seller.achievement}%
                      </span>
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(seller.achievement, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Desativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}