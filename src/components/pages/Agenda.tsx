import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Calendar, 
  Clock, 
  Plus, 
  MapPin, 
  User,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AgendamentoForm } from "@/components/AgendamentoForm";

export function Agenda() {
  const { profile } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (profile) {
      fetchAppointments();
    }
  }, [profile]);

  const fetchAppointments = async () => {
    if (!profile) return;
    
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        clients(name)
      `)
      .eq('seller_id', profile.user_id)
      .order('appointment_date', { ascending: true });
      
    if (!error && data) {
      setAppointments(data);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado": return "bg-primary text-primary-foreground";
      case "Agendado": return "bg-secondary text-secondary-foreground";
      case "Pendente": return "bg-muted text-muted-foreground";
      case "Cancelado": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Entrega": return "🚚";
      case "Visita": return "👥";
      case "Reunião": return "💼";
      default: return "📅";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long' 
    });
  };

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date).toDateString() === new Date().toDateString()
  );

  const tomorrowAppointments = appointments.filter(apt => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(apt.appointment_date).toDateString() === tomorrow.toDateString();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">Gerencie seus compromissos e entregas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
              <DialogDescription>
                Crie um novo compromisso na sua agenda
              </DialogDescription>
            </DialogHeader>
            <AgendamentoForm onSave={() => {
              setIsDialogOpen(false);
              fetchAppointments();
            }} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hoje</p>
                <p className="text-2xl font-bold">{todayAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Amanhã</p>
                <p className="text-2xl font-bold">{tomorrowAppointments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Esta Semana</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card-subtle shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="bg-gradient-card-subtle shadow-soft border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Hoje - {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long',
                year: 'numeric'
              })}
            </CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <div className="text-2xl">📅</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{appointment.clients?.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(appointment.appointment_date).toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {appointment.notes?.split(' - ')[1]?.split('.')[0] || "Endereço não informado"}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        Agendado
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Nenhum compromisso hoje</p>
              <p className="text-muted-foreground">Aproveite para planejar suas próximas atividades</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tomorrow's Schedule */}
      <Card className="bg-gradient-card-subtle shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Amanhã - {(() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              return tomorrow.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long'
              });
            })()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tomorrowAppointments.length > 0 ? (
            <div className="space-y-4">
              {tomorrowAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <div className="text-2xl">📅</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{appointment.clients?.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(appointment.appointment_date).toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {appointment.notes?.split(' - ')[1]?.split('.')[0] || "Endereço não informado"}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        Agendado
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Nenhum compromisso agendado para amanhã</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}