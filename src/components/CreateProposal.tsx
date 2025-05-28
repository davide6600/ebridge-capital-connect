
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/components/AuthProvider';

interface CreateProposalProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CreateProposal = ({ onBack, onSuccess }: CreateProposalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    investment_amount: '',
    expected_return: '',
    risk_level: '',
    time_horizon: '',
    additional_notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('investment_proposals')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          investment_amount: parseFloat(formData.investment_amount),
          expected_return: formData.expected_return,
          risk_level: formData.risk_level,
          time_horizon: formData.time_horizon,
          additional_notes: formData.additional_notes
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Proposta Inviata",
        description: "La tua proposta di investimento è stata inviata con successo.",
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast({
        title: "Errore",
        description: "Impossibile inviare la proposta. Riprova.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alle Proposte
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Nuova Proposta di Investimento</h1>
          <p className="text-sm text-gray-600">Invia una richiesta personalizzata al tuo consulente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dettagli della Proposta</CardTitle>
            <CardDescription className="text-sm">Compila tutti i campi per inviare la tua richiesta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titolo della Proposta *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="es. Diversificazione Portfolio Crypto"
                required
                className="text-sm"
              />
            </div>

            <div>
              <Label htmlFor="description">Descrizione *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Descrivi in dettaglio la tua richiesta di investimento..."
                required
                rows={4}
                className="text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="investment_amount">Importo di Investimento (€) *</Label>
                <Input
                  id="investment_amount"
                  type="number"
                  value={formData.investment_amount}
                  onChange={(e) => handleChange('investment_amount', e.target.value)}
                  placeholder="50000"
                  required
                  min="0"
                  step="0.01"
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="expected_return">Rendimento Atteso</Label>
                <Input
                  id="expected_return"
                  value={formData.expected_return}
                  onChange={(e) => handleChange('expected_return', e.target.value)}
                  placeholder="es. 8-12% annuo"
                  className="text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="risk_level">Livello di Rischio *</Label>
                <Select value={formData.risk_level} onValueChange={(value) => handleChange('risk_level', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Seleziona livello di rischio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Basso</SelectItem>
                    <SelectItem value="Medium">Medio</SelectItem>
                    <SelectItem value="High">Alto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time_horizon">Orizzonte Temporale</Label>
                <Input
                  id="time_horizon"
                  value={formData.time_horizon}
                  onChange={(e) => handleChange('time_horizon', e.target.value)}
                  placeholder="es. 5-10 anni"
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="additional_notes">Note Aggiuntive</Label>
              <Textarea
                id="additional_notes"
                value={formData.additional_notes}
                onChange={(e) => handleChange('additional_notes', e.target.value)}
                placeholder="Aggiungi eventuali specifiche o preferenze..."
                rows={3}
                className="text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onBack} className="text-sm">
                Annulla
              </Button>
              <Button type="submit" disabled={loading} className="text-sm">
                <Send className="mr-2 h-4 w-4" />
                {loading ? 'Invio...' : 'Invia Proposta'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateProposal;
