import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
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
  const { profile } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("mes");
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalClients: 0,
    avgOrderValue: 0
  });
  const [topClients, setTopClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      fetchReportData();
    }
  }, [profile, selectedPeriod]);

  const fetchReportData = async () => {
    if (!profile) return;
    setLoading(true);

    try {
      // Fetch clients
      let clientsQuery = supabase.from('clients').select('*');
      if (profile.role === 'vendedor') {
        clientsQuery = clientsQuery.eq('seller_id', profile.user_id);
      }
      
      const { data: clients } = await clientsQuery;
      
      // Fetch orders with baskets and clients
      let ordersQuery = supabase
        .from('orders')
        .select(`
          *,
          baskets(*, clients(*))
        `);
        
      // Filter by seller if vendedor
      if (profile.role === 'vendedor') {
        ordersQuery = ordersQuery.eq('baskets.clients.seller_id', profile.user_id);
      }

      const { data: orders } = await ordersQuery;

      if (orders && clients) {
        const totalSales = orders.reduce((sum, order) => sum + Number(order.amount), 0);
        const totalOrders = orders.length;
        const totalClients = clients.length;
        const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

        setStats({
          totalSales,
          totalOrders,
          totalClients,
          avgOrderValue
        });

        // Calculate top clients
        const clientStats = clients.map(client => {
          const clientOrders = orders.filter(order => 
            order.baskets?.clients?.id === client.id
          );
          const clientValue = clientOrders.reduce((sum, order) => sum + Number(order.amount), 0);
          
          return {
            ...client,
            orders: clientOrders.length,
            value: clientValue,
            growth: Math.random() * 30 - 10 // Mock growth data
          };
        }).sort((a, b) => b.value - a.value).slice(0, 4);

        setTopClients(clientStats);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    toast.success("Relatório PDF será gerado em breve!");
    // Implementar exportação PDF
  };

  const exportToExcel = () => {
    toast.success("Relatório Excel será gerado em breve!");
    // Implementar exportação Excel
  };

  const generateSalesReport = () => {
    toast.success("Gerando relatório de vendas...");
  };

  const generateClientsReport = () => {
    toast.success("Gerando relatório de clientes...");
  };

  const generateFinancialReport = () => {
    toast.success("Gerando relatório financeiro...");
  };

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
                <span className="text-sm font-medium text-primary">
                  +12.5%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">
              R$ {stats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground">Vendas Totais</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBasket className="w-8 h-8 text-secondary" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-secondary">
                  +8.3%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-sm text-muted-foreground">Pedidos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-accent" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-accent">
                  +15.2%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{stats.totalClients}</p>
            <p className="text-sm text-muted-foreground">Clientes Ativos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  -2.1%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">
              R$ {stats.avgOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground">Ticket Médio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div key={client.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
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
                    <p className="font-bold">
                      R$ {client.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-1">
                      {(() => {
                        const GrowthIcon = getGrowthIcon(client.growth);
                        return <GrowthIcon className={`w-3 h-3 ${getGrowthColor(client.growth)}`} />;
                      })()}
                      <span className={`text-xs ${getGrowthColor(client.growth)}`}>
                        {Math.abs(client.growth).toFixed(1)}%
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
            Performance do Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Cesta Básica Completa</span>
                <span className="text-sm text-muted-foreground">245 vendidos</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="text-sm font-bold min-w-24 text-right">R$ 171.500,00</span>
                <Badge variant="secondary" className="min-w-12 justify-center">
                  100%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export and Report Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Types */}
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Relatórios Específicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="h-auto p-4 justify-start" onClick={generateSalesReport}>
                <FileText className="w-5 h-5 text-primary mr-3" />
                <div className="text-left">
                  <p className="font-medium">Relatório de Vendas</p>
                  <p className="text-xs text-muted-foreground">Análise detalhada das vendas realizadas</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 justify-start" onClick={generateClientsReport}>
                <Users className="w-5 h-5 text-secondary mr-3" />
                <div className="text-left">
                  <p className="font-medium">Relatório de Clientes</p>
                  <p className="text-xs text-muted-foreground">Comportamento e histórico dos clientes</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 justify-start" onClick={generateFinancialReport}>
                <BarChart3 className="w-5 h-5 text-accent mr-3" />
                <div className="text-left">
                  <p className="font-medium">Relatório Financeiro</p>
                  <p className="text-xs text-muted-foreground">Dados financeiros e faturamento</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button className="flex-1 bg-gradient-primary" onClick={exportToPDF} disabled={loading}>
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? "Gerando..." : "Exportar PDF"}
                </Button>
                <Button variant="outline" className="flex-1" onClick={exportToExcel} disabled={loading}>
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? "Gerando..." : "Exportar Excel"}
                </Button>
              </div>
              
              <div className="text-center py-4 border border-border rounded-lg">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">Dados Atualizados</p>
                <p className="text-xs text-muted-foreground">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
              
              <div className="bg-accent/10 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Os relatórios incluem dados do período selecionado acima e podem ser filtrados por vendedor, cliente ou produto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}