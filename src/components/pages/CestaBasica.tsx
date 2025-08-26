import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBasket, 
  CreditCard, 
  FileText, 
  DollarSign,
  Package,
  Wheat,
  Apple,
  Milk
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function CestaBasica() {
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const basketItems = [
    { name: "Arroz 5kg", icon: Wheat, quantity: 1 },
    { name: "Feijão 1kg", icon: Package, quantity: 2 },
    { name: "Óleo de Soja 900ml", icon: Package, quantity: 2 },
    { name: "Açúcar 1kg", icon: Package, quantity: 1 },
    { name: "Sal 1kg", icon: Package, quantity: 1 },
    { name: "Farinha de Trigo 1kg", icon: Wheat, quantity: 1 },
    { name: "Macarrão 500g", icon: Package, quantity: 3 },
    { name: "Molho de Tomate 340g", icon: Package, quantity: 2 },
    { name: "Sardinha 125g", icon: Package, quantity: 3 },
    { name: "Leite Integral 1L", icon: Milk, quantity: 2 },
    { name: "Café 500g", icon: Package, quantity: 1 },
    { name: "Biscoito Cream Cracker", icon: Package, quantity: 2 },
    { name: "Banana 1kg", icon: Apple, quantity: 1 },
    { name: "Batata 1kg", icon: Apple, quantity: 1 },
    { name: "Cebola 1kg", icon: Apple, quantity: 1 },
  ];

  const paymentOptions = [
    {
      id: "cartao-3x",
      title: "3x no Cartão",
      description: "Sem juros",
      value: "R$ 233,33",
      total: "R$ 700,00",
      icon: CreditCard,
      badge: "Sem juros"
    },
    {
      id: "boleto-2x",
      title: "2x no Boleto",
      description: "Boleto bancário",
      value: "R$ 350,00",
      total: "R$ 700,00",
      icon: FileText,
      badge: "Tradicional"
    },
    {
      id: "avista",
      title: "À Vista",
      description: "Pagamento à vista",
      value: "R$ 700,00",
      total: "R$ 700,00",
      icon: DollarSign,
      badge: "Melhor opção"
    }
  ];

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cesta Básica</h1>
          <p className="text-muted-foreground">Cesta completa para suas necessidades básicas</p>
        </div>
      </div>

      {/* Basket Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Details */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <ShoppingBasket className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl">Cesta Básica Completa</CardTitle>
                  <p className="text-muted-foreground">15 itens essenciais para alimentação</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basketItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Valor Total</p>
                  <p className="text-sm text-muted-foreground">Todos os itens inclusos</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">R$ 700,00</p>
                  <p className="text-sm text-muted-foreground">Preço especial</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Options */}
        <div>
          <Card className="bg-gradient-card-subtle shadow-soft border-0">
            <CardHeader>
              <CardTitle>Formas de Pagamento</CardTitle>
              <p className="text-sm text-muted-foreground">Escolha a melhor opção para você</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedPayment === option.id 
                      ? "border-primary bg-primary/5 shadow-soft" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handlePaymentSelect(option.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedPayment === option.id ? "bg-primary" : "bg-muted"
                    }`}>
                      <option.icon className={`w-5 h-5 ${
                        selectedPayment === option.id ? "text-primary-foreground" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{option.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {option.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{option.value}</span>
                        {option.id !== "avista" && (
                          <span className="text-sm text-muted-foreground">Total: {option.total}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                className="w-full bg-gradient-primary text-lg h-12 font-semibold"
                disabled={!selectedPayment}
              >
                {selectedPayment ? "Finalizar Pedido" : "Selecione uma forma de pagamento"}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Ver Detalhes dos Produtos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Detalhes da Cesta Básica</DialogTitle>
                    <DialogDescription>
                      Confira todos os itens inclusos na sua cesta básica completa
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {basketItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantidade: {item.quantity} unidade(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Incluído</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Itens Inclusos</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6 text-center">
            <Wheat className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold">30</p>
            <p className="text-sm text-muted-foreground">Dias de Alimentação</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">R$ 23,33</p>
            <p className="text-sm text-muted-foreground">Custo por Dia</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}