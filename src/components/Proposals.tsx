
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, XCircle, Clock, Download, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/components/AuthProvider';
import CreateProposal from "./CreateProposal";

const Proposals = () => {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadProposals();
  }, [user]);

  const loadProposals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('investment_proposals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading proposals:', error);
        setProposals(getStaticProposals());
      } else {
        // Combina i dati reali con quelli statici per demo
        const combinedData = [...(data || []), ...getStaticProposals()];
        setProposals(combinedData);
      }
    } catch (error) {
      console.error('Error loading proposals:', error);
      setProposals(getStaticProposals());
    } finally {
      setLoading(false);
    }
  };

  const getStaticProposals = () => [
    {
      id: "PROP-001",
      title: "Strategia di Investimento Bitcoin 2024",
      description: "Portfolio diversificato di criptovalute con focus su Bitcoin e principali altcoin",
      status: "pending",
      created_at: "2024-01-10T09:00:00Z",
      investment_amount: 50000,
      expected_return: "12-18%",
      risk_level: "Medium",
      file_url: null
    },
    {
      id: "PROP-002", 
      title: "Allocazione STRF ETF",
      description: "Allocazione strategica in ETF di mercati emergenti con focus su settore tecnologico",
      status: "approved",
      created_at: "2024-01-05T14:30:00Z",
      investment_amount: 25000,
      expected_return: "8-12%",
      risk_level: "Low",
      file_url: null,
      digital_signature: "Mario Rossi - 2024-01-08T16:45:00Z",
      client_decision_date: "2024-01-08T16:45:00Z"
    }
  ];

  const handleAcceptProposal = async (proposalId: string) => {
    try {
      if (proposalId.startsWith('PROP-')) {
        // Gestisci proposte statiche
        setProposals(prev => 
          prev.map(p => 
            p.id === proposalId 
              ? { 
                  ...p, 
                  status: "approved",
                  digital_signature: "Firma Digitale Applicata",
                  client_decision_date: new Date().toISOString()
                }
              : p
          )
        );
      } else {
        // Aggiorna proposte nel database
        const { error } = await supabase
          .from('investment_proposals')
          .update({ 
            status: 'approved',
            updated_at: new Date().toISOString()
          })
          .eq('id', proposalId);

        if (error) throw error;
        await loadProposals();
      }

      toast({
        title: "Proposta Accettata",
        description: "La tua firma digitale è stata applicata.",
      });
    } catch (error) {
      console.error('Error accepting proposal:', error);
      toast({
        title: "Errore",
        description: "Impossibile accettare la proposta. Riprova.",
        variant: "destructive",
      });
    }
  };

  const handleRejectProposal = async (proposalId: string) => {
    try {
      if (proposalId.startsWith('PROP-')) {
        // Gestisci proposte statiche
        setProposals(prev => 
          prev.map(p => 
            p.id === proposalId 
              ? { 
                  ...p, 
                  status: "rejected",
                  client_decision_date: new Date().toISOString()
                }
              : p
          )
        );
      } else {
        // Aggiorna proposte nel database
        const { error } = await supabase
          .from('investment_proposals')
          .update({ 
            status: 'rejected',
            updated_at: new Date().toISOString()
          })
          .eq('id', proposalId);

        if (error) throw error;
        await loadProposals();
      }

      toast({
        title: "Proposta Rifiutata",
        description: "La proposta è stata declinata.",
      });
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      toast({
        title: "Errore", 
        description: "Impossibile rifiutare la proposta. Riprova.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "default" as const,
      approved: "default" as const, 
      rejected: "destructive" as const
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status === 'pending' ? 'In Attesa' : status === 'approved' ? 'Approvata' : 'Rifiutata'}
      </Badge>
    );
  };

  if (showCreateForm) {
    return (
      <CreateProposal 
        onBack={() => setShowCreateForm(false)}
        onSuccess={() => {
          setShowCreateForm(false);
          loadProposals();
        }}
      />
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Caricamento proposte...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Proposte di Investimento</h2>
          <p className="text-sm text-gray-500">
            {proposals.length} proposta{proposals.length !== 1 ? 'e' : ''} in totale
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="text-sm">
          <Plus className="mr-2 h-4 w-4" />
          Nuova Proposta
        </Button>
      </div>

      {proposals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-base font-medium text-gray-900 mb-2">Nessuna Proposta</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Il tuo consulente per gli investimenti creerà proposte personalizzate per te.
            </p>
            <Button onClick={() => setShowCreateForm(true)} className="text-sm">
              <Plus className="mr-2 h-4 w-4" />
              Crea la Prima Proposta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {getStatusIcon(proposal.status)}
                      {proposal.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{proposal.description}</CardDescription>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Importo Investimento</p>
                    <p className="text-base font-bold">€{proposal.investment_amount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rendimento Atteso</p>
                    <p className="text-base font-bold text-green-600">{proposal.expected_return}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Livello di Rischio</p>
                    <p className="text-base">{proposal.risk_level === 'Low' ? 'Basso' : proposal.risk_level === 'Medium' ? 'Medio' : 'Alto'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Creata</p>
                    <p className="text-base">{new Date(proposal.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {proposal.digital_signature && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Firma Digitale Applicata</p>
                    <p className="text-sm text-green-600">{proposal.digital_signature}</p>
                  </div>
                )}

                {proposal.client_decision_date && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Data Decisione</p>
                    <p className="text-sm">{new Date(proposal.client_decision_date).toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {proposal.file_url && (
                    <Button variant="outline" size="sm" className="text-sm">
                      <Download className="mr-2 h-4 w-4" />
                      Scarica PDF
                    </Button>
                  )}
                  
                  {proposal.status === "pending" && (
                    <>
                      <Button 
                        onClick={() => handleAcceptProposal(proposal.id)}
                        className="bg-green-600 hover:bg-green-700 text-sm"
                        size="sm"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accetta e Firma
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleRejectProposal(proposal.id)}
                        size="sm"
                        className="text-sm"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rifiuta
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposals;
