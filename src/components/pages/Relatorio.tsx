import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Download, 
  Calendar,
  DollarSign,
  Users,
  ShoppingBasket,
  BarChart3,
  PieChart,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Relatorio() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes");

  const monthlyStats = {
    totalSales: "R$ 45.320,00",
    totalOrders: 324,
    totalClients: 89,
    avgOrderValue: "R$ 139,88",
    growth: {
      sales: 12.5,
      orders: 8.3,
      clients: 15.2,
      avgOrder: -2.1
    }
  };

  const topClients = [
    { name: "Maria Santos", orders: 12, value: "R$ 8.400,00", growth: 15 },
    { name: "João Silva", orders: 8, value: "R$ 5.600,00", growth: 22 },
    { name: "Ana Costa", orders: 6, value: "R$ 4.200,00", growth: -5 },
    { name: "Carlos Mendes", orders: 5, value: "R$ 3.500,00", growth: 8 },
  ];

  const salesByPeriod = [
    { period: "Semana 1", value: 12500 },
    { period: "Semana 2", value: 15200 },
    { period: "Semana 3", value: 9800 },
    { period: "Semana 4", value: 7820 },
  ];

  const productPerformance = [
    { product: "Cesta Básica Completa", sold: 245, revenue: "R$ 171.500,00", percentage: 78 },
    { product: "Cesta Premium", sold: 56, revenue: "R$ 56.000,00", percentage: 18 },
    { product: "Cesta Light", sold: 23, revenue: "R$ 11.500,00", percentage: 4 },
  ];

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? TrendingUp : TrendingDown;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-primary" : "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análise completa do desempenho do negócio</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Esta Semana</SelectItem>
              <SelectItem value="mes">Este Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-primary" />
              <div className="flex items-center gap-1">
                {(() => {
                  const GrowthIcon = getGrowthIcon(monthlyStats.growth.sales);
                  return <GrowthIcon className={`w-4 h-4 ${getGrowthColor(monthlyStats.growth.sales)}`} />;
                })()}
                <span className={`text-sm font-medium ${getGrowthColor(monthlyStats.growth.sales)}`}>
                  {monthlyStats.growth.sales}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{monthlyStats.totalSales}</p>
            <p className="text-sm text-muted-foreground">Vendas Totais</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBasket className="w-8 h-8 text-secondary" />
              <div className="flex items-center gap-1">
                {(() => {
                  const GrowthIcon = getGrowthIcon(monthlyStats.growth.orders);
                  return <GrowthIcon className={`w-4 h-4 ${getGrowthColor(monthlyStats.growth.orders)}`} />;
                })()}
                <span className={`text-sm font-medium ${getGrowthColor(monthlyStats.growth.orders)}`}>
                  {monthlyStats.growth.orders}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{monthlyStats.totalOrders}</p>
            <p className="text-sm text-muted-foreground">Pedidos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-accent" />
              <div className="flex items-center gap-1">
                {(() => {
                  const GrowthIcon = getGrowthIcon(monthlyStats.growth.clients);
                  return <GrowthIcon className={`w-4 h-4 ${getGrowthColor(monthlyStats.growth.clients)}`} />;
                })()}
                <span className={`text-sm font-medium ${getGrowthColor(monthlyStats.growth.clients)}`}>
                  {monthlyStats.growth.clients}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{monthlyStats.totalClients}</p>
            <p className="text-sm text-muted-foreground">Clientes Ativos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
              <div className="flex items-center gap-1">
                {(() => {
                  const GrowthIcon = getGrowthIcon(monthlyStats.growth.avgOrder);
                  return <GrowthIcon className={`w-4 h-4 ${getGrowthColor(monthlyStats.growth.avgOrder)}`} />;
                })()}
                <span className={`text-sm font-medium ${getGrowthColor(monthlyStats.growth.avgOrder)}`}>
                  {Math.abs(monthlyStats.growth.avgOrder)}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{monthlyStats.avgOrderValue}</p>
            <p className="text-sm text-muted-foreground">Ticket Médio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Vendas por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByPeriod.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.period}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary transition-all duration-300"
                        style={{ width: `${(item.value / Math.max(...salesByPeriod.map(s => s.value))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold min-w-20 text-right">
                      R$ {(item.value / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.orders} pedidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{client.value}</p>
                    <div className="flex items-center gap-1">
                      {(() => {
                        const GrowthIcon = getGrowthIcon(client.growth);
                        return <GrowthIcon className={`w-3 h-3 ${getGrowthColor(client.growth)}`} />;
                      })()}
                      <span className={`text-xs ${getGrowthColor(client.growth)}`}>
                        {Math.abs(client.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <Card className="bg-gradient-card-subtle shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Performance por Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{product.product}</span>
                  <span className="text-sm text-muted-foreground">{product.sold} vendidos</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold min-w-24 text-right">{product.revenue}</span>
                  <Badge variant="secondary" className="min-w-12 justify-center">
                    {product.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-gradient-card-subtle shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Relatórios Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">Relatório de Vendas</p>
                <p className="text-xs text-muted-foreground">Dados detalhados de vendas</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-8 h-8 text-secondary" />
              <div className="text-center">
                <p className="font-medium">Relatório de Clientes</p>
                <p className="text-xs text-muted-foreground">Análise do comportamento</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BarChart3 className="w-8 h-8 text-accent" />
              <div className="text-center">
                <p className="font-medium">Relatório Financeiro</p>
                <p className="text-xs text-muted-foreground">Dados financeiros completos</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}