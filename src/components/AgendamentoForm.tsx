import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AgendamentoFormProps {
  onSave: () => void;
}

export function AgendamentoForm({ onSave }: AgendamentoFormProps) {
  const { profile } = useAuth();
  const [date, setDate] = useState<Date>();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cliente: "",
    tipo: "",
    horario: "",
    endereco: "",
    observacoes: ""
  });

  useEffect(() => {
    fetchClients();
  }, [profile]);

  const fetchClients = async () => {
    if (!profile) return;
    
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('seller_id', profile.user_id);
      
    if (!error && data) {
      setClients(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !profile) return;
    
    setLoading(true);
    
    try {
      const appointmentDate = new Date(date);
      appointmentDate.setHours(
        parseInt(formData.horario.split(':')[0]),
        parseInt(formData.horario.split(':')[1])
      );

      const { error } = await supabase
        .from('appointments')
        .insert({
          client_id: formData.cliente,
          seller_id: profile.user_id,
          appointment_date: appointmentDate.toISOString(),
          notes: `${formData.tipo} - ${formData.endereco}${formData.observacoes ? '. ' + formData.observacoes : ''}`
        });

      if (error) throw error;

      toast.success("Agendamento criado com sucesso!");
      onSave();
    } catch (error) {
      toast.error("Erro ao criar agendamento");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Select value={formData.cliente} onValueChange={(value) => setFormData({...formData, cliente: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tipo">Tipo de Agendamento</Label>
          <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entrega">Entrega</SelectItem>
              <SelectItem value="visita">Visita</SelectItem>
              <SelectItem value="reuniao">Reunião</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Data</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="horario">Horário</Label>
          <Input
            id="horario"
            type="time"
            value={formData.horario}
            onChange={(e) => setFormData({...formData, horario: e.target.value})}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => setFormData({...formData, endereco: e.target.value})}
          placeholder="Digite o endereço completo"
          required
        />
      </div>

      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
          placeholder="Observações adicionais (opcional)"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" className="bg-gradient-primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Agendamento"}
        </Button>
      </div>
    </form>
  );
}