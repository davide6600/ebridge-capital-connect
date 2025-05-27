
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, XCircle, Clock, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Proposals = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProposals(getStaticProposals());
        setLoading(false);
        return;
      }

      // Always use static data since database tables may not exist
      setProposals(getStaticProposals());
      setLoading(false);
    } catch (error) {
      console.error('Error loading proposals:', error);
      setProposals(getStaticProposals());
      setLoading(false);
    }
  };

  // Static proposals data
  const getStaticProposals = () => [
    {
      id: "PROP-001",
      title: "Bitcoin Investment Strategy 2024",
      description: "Diversified cryptocurrency portfolio focusing on Bitcoin and major altcoins",
      status: "pending",
      created_at: "2024-01-10T09:00:00Z",
      investment_amount: 50000,
      expected_return: "12-18%",
      risk_level: "Medium",
      file_url: null
    },
    {
      id: "PROP-002", 
      title: "STRF ETF Allocation",
      description: "Strategic allocation to emerging market ETFs with focus on technology sector",
      status: "approved",
      created_at: "2024-01-05T14:30:00Z",
      investment_amount: 25000,
      expected_return: "8-12%",
      risk_level: "Low",
      file_url: null,
      digital_signature: "John Doe - 2024-01-08T16:45:00Z",
      client_decision_date: "2024-01-08T16:45:00Z"
    },
    {
      id: "PROP-003",
      title: "STRK Stock Portfolio",
      description: "Blue-chip stock selection with dividend focus for long-term growth",
      status: "rejected", 
      created_at: "2023-12-20T11:15:00Z",
      investment_amount: 75000,
      expected_return: "6-10%",
      risk_level: "Low",
      file_url: null,
      client_decision_date: "2023-12-22T09:30:00Z"
    }
  ];

  const handleAcceptProposal = async (proposalId: string) => {
    try {
      // In a real app, this would update the database
      setProposals(prev => 
        prev.map(p => 
          p.id === proposalId 
            ? { 
                ...p, 
                status: "approved",
                digital_signature: "Digital Signature Applied",
                client_decision_date: new Date().toISOString()
              }
            : p
        )
      );

      toast({
        title: "Proposal Accepted",
        description: "Your digital signature has been applied.",
      });
    } catch (error) {
      console.error('Error accepting proposal:', error);
      toast({
        title: "Error",
        description: "Failed to accept proposal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectProposal = async (proposalId: string) => {
    try {
      // In a real app, this would update the database
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

      toast({
        title: "Proposal Rejected",
        description: "The proposal has been declined.",
      });
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      toast({
        title: "Error", 
        description: "Failed to reject proposal. Please try again.",
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
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading proposals...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Investment Proposals</h2>
        <div className="text-sm text-gray-500">
          {proposals.length} proposal{proposals.length !== 1 ? 's' : ''} total
        </div>
      </div>

      {proposals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Proposals Yet</h3>
            <p className="text-gray-500 text-center">
              Your investment advisor will create personalized proposals for you.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(proposal.status)}
                      {proposal.title}
                    </CardTitle>
                    <CardDescription>{proposal.description}</CardDescription>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Investment Amount</p>
                    <p className="text-lg font-bold">${proposal.investment_amount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expected Return</p>
                    <p className="text-lg font-bold text-green-600">{proposal.expected_return}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Risk Level</p>
                    <p className="text-lg">{proposal.risk_level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-lg">{new Date(proposal.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {proposal.digital_signature && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Digital Signature Applied</p>
                    <p className="text-sm text-green-600">{proposal.digital_signature}</p>
                  </div>
                )}

                {proposal.client_decision_date && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Decision Date</p>
                    <p className="text-sm">{new Date(proposal.client_decision_date).toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {proposal.file_url && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  )}
                  
                  {proposal.status === "pending" && (
                    <>
                      <Button 
                        onClick={() => handleAcceptProposal(proposal.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept & Sign
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleRejectProposal(proposal.id)}
                        size="sm"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Decline
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
