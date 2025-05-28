
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreateTicketProps {
  onBack: () => void;
}

const CreateTicket = ({ onBack }: CreateTicketProps) => {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    category: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.priority || !formData.category || !formData.description) {
      toast({
        title: "Errore",
        description: "Per favore compila tutti i campi richiesti.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simula l'invio del ticket
    setTimeout(() => {
      toast({
        title: "Ticket Creato",
        description: "Il tuo ticket è stato creato con successo. Riceverai una risposta entro 24 ore.",
      });
      setIsSubmitting(false);
      onBack();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna al Support
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Crea Nuovo Ticket</h1>
        <p className="text-gray-600 mt-1">Descrivi il tuo problema e ti aiuteremo a risolverlo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informazioni Ticket</CardTitle>
          <CardDescription>
            Fornisci tutti i dettagli necessari per aiutarci a comprendere il tuo problema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="subject">Oggetto *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Descrivi brevemente il problema"
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priorità *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleziona priorità" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Bassa</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kyc">Verifica KYC</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="transactions">Transazioni</SelectItem>
                    <SelectItem value="documents">Documenti</SelectItem>
                    <SelectItem value="proposals">Proposte Investimento</SelectItem>
                    <SelectItem value="technical">Problema Tecnico</SelectItem>
                    <SelectItem value="other">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrizione *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descrivi dettagliatamente il problema che stai riscontrando..."
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annulla
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Invio...' : 'Crea Ticket'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicket;
