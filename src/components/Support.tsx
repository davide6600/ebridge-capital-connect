
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  FileText,
  Shield,
  CreditCard
} from "lucide-react";
import CreateTicket from "./CreateTicket";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Support = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqData: FAQ[] = [
    {
      id: "kyc-process",
      question: "Come funziona il processo di verifica KYC?",
      answer: "Il processo KYC (Know Your Customer) è obbligatorio per legge e serve a verificare la tua identità. Dovrai fornire un documento d'identità valido, un codice fiscale e una prova di residenza. Il processo richiede solitamente 2-3 giorni lavorativi. Una volta completato, potrai accedere a tutti i servizi di investimento.",
      category: "Verifica",
      icon: Shield
    },
    {
      id: "investment-minimum",
      question: "Qual è l'investimento minimo richiesto?",
      answer: "L'investimento minimo varia in base al tipo di prodotto finanziario. Per i portafogli gestiti, l'investimento minimo è di €1.000. Per investimenti diretti in azioni o ETF, non c'è un minimo specifico. Ti consigliamo di consultare la sezione Portfolio per vedere tutte le opzioni disponibili.",
      category: "Investimenti",
      icon: CreditCard
    },
    {
      id: "fees-structure",
      question: "Quali sono le commissioni applicate?",
      answer: "Le nostre commissioni sono trasparenti: 0,8% annuo per la gestione del portafoglio, commissioni di transazione variabili dallo 0,1% allo 0,3% in base al tipo di strumento finanziario. Non applichiamo commissioni di ingresso o uscita. Tutte le commissioni sono dettagliate nel documento informativo che riceverai prima di ogni investimento.",
      category: "Commissioni",
      icon: FileText
    },
    {
      id: "withdraw-funds",
      question: "Come posso prelevare i miei fondi?",
      answer: "Puoi richiedere un prelievo in qualsiasi momento tramite la sezione Portfolio. I prelievi vengono elaborati entro 2-3 giorni lavorativi e trasferiti sul conto corrente che hai registrato durante l'apertura del conto. Per prelievi superiori a €10.000 potrebbero essere necessari documenti aggiuntivi per motivi di sicurezza.",
      category: "Prelievi",
      icon: CreditCard
    },
    {
      id: "portfolio-performance",
      question: "Come posso monitorare le performance del mio portafoglio?",
      answer: "Nella sezione Portfolio trovi un dashboard completo con grafici in tempo reale, performance storiche, allocazione degli asset e confronti con benchmark di mercato. Ricevi anche report mensili via email con un'analisi dettagliata delle performance e delle strategie implementate.",
      category: "Portfolio",
      icon: HelpCircle
    },
    {
      id: "risk-management",
      question: "Come gestite il rischio degli investimenti?",
      answer: "Utilizziamo un approccio di gestione del rischio multi-livello: diversificazione geografica e settoriale, stop-loss automatici, ribilanciamento periodico del portafoglio e analisi quantitativa continua. Ogni portafoglio è costruito secondo il tuo profilo di rischio determinato durante l'onboarding.",
      category: "Rischio",
      icon: Shield
    }
  ];

  const tickets = [
    {
      id: "T001",
      subject: "Problema accesso account",
      status: "in_progress",
      priority: "high",
      created_at: "2024-01-15",
    },
    {
      id: "T002", 
      subject: "Domanda su commissioni",
      status: "completed",
      priority: "medium",
      created_at: "2024-01-12",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Completato</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Clock className="mr-1 h-3 w-3" />In Corso</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertCircle className="mr-1 h-3 w-3" />In Attesa</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgente</Badge>;
      case "high":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Alta</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Media</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Bassa</Badge>;
      default:
        return <Badge variant="secondary">Normale</Badge>;
    }
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  if (showCreateTicket) {
    return <CreateTicket onBack={() => setShowCreateTicket(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Centro Assistenza</h1>
          <p className="text-gray-600 mt-1">Trova risposte alle tue domande o contatta il nostro team</p>
        </div>
        <Button onClick={() => setShowCreateTicket(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Crea Nuovo Ticket</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Domande Frequenti</span>
            </CardTitle>
            <CardDescription>
              Trova risposte immediate alle domande più comuni
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqData.map((faq) => {
              const Icon = faq.icon;
              const isExpanded = expandedFAQ === faq.id;
              
              return (
                <div key={faq.id} className="border rounded-lg">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{faq.question}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t bg-gray-50">
                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                        {faq.answer}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {faq.category}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>I Tuoi Ticket</span>
            </CardTitle>
            <CardDescription>
              Monitora lo stato delle tue richieste di assistenza
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tickets.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nessun ticket di supporto attivo</p>
                <Button 
                  onClick={() => setShowCreateTicket(true)}
                  variant="outline" 
                  className="mt-3"
                >
                  Crea il tuo primo ticket
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-sm">{ticket.subject}</h3>
                        <p className="text-xs text-gray-500">ID: {ticket.id}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Creato il {new Date(ticket.created_at).toLocaleDateString('it-IT')}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Search className="h-3 w-3 mr-1" />
                        Dettagli
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni di Contatto</CardTitle>
          <CardDescription>
            Altri modi per raggiungerci
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Chat Live</h3>
              <p className="text-sm text-gray-600 mb-3">Lun-Ven 9:00-18:00</p>
              <Button variant="outline" size="sm">Avvia Chat</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Telefono</h3>
              <p className="text-sm text-gray-600 mb-3">+39 02 1234 5678</p>
              <Button variant="outline" size="sm">Chiama Ora</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-sm text-gray-600 mb-3">support@e-bridge.com</p>
              <Button variant="outline" size="sm">Invia Email</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
