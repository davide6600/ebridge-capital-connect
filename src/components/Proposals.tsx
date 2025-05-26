
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  XCircle,
  Bitcoin,
  BarChart3,
  AlertTriangle,
  FileSignature,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Proposals = () => {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  const proposals = [
    {
      id: "PROP-001",
      type: "BUY",
      asset: "Bitcoin (BTC)",
      amount: 0.5,
      price: 65400,
      totalValue: 32700,
      reasoning: "Following the recent market correction and technical analysis showing strong support levels, we recommend increasing Bitcoin allocation to capitalize on potential upward momentum.",
      riskLevel: "Medium",
      deadline: "2024-01-20",
      status: "pending",
      submittedDate: "2024-01-15",
      icon: Bitcoin,
      color: "text-orange-500"
    },
    {
      id: "PROP-002",
      type: "SELL",
      asset: "STRF ETF",
      amount: 50,
      price: 125.30,
      totalValue: 6265,
      reasoning: "Profit-taking opportunity as STRF has reached our target price levels. We recommend realizing gains and rebalancing portfolio allocation.",
      riskLevel: "Low",
      deadline: "2024-01-22",
      status: "pending",
      submittedDate: "2024-01-16",
      icon: BarChart3,
      color: "text-blue-500"
    },
    {
      id: "PROP-003",
      type: "BUY",
      asset: "STRK Stocks",
      amount: 25,
      price: 89.50,
      totalValue: 2237.50,
      reasoning: "Strong quarterly earnings and positive market sentiment make this an opportune time to increase STRK position before expected price appreciation.",
      riskLevel: "High",
      deadline: "2024-01-18",
      status: "accepted",
      submittedDate: "2024-01-10",
      acceptedDate: "2024-01-12",
      icon: TrendingUp,
      color: "text-green-500"
    }
  ];

  const actionHistory = [
    {
      id: "ACT-001",
      proposalId: "PROP-003",
      action: "ACCEPTED",
      asset: "STRK Stocks",
      amount: 25,
      value: 2237.50,
      date: "2024-01-12",
      signature: "0x1a2b3c4d5e6f7890abcdef1234567890"
    },
    {
      id: "ACT-002",
      proposalId: "PROP-004",
      action: "REJECTED",
      asset: "Ethereum (ETH)",
      amount: 2.5,
      value: 6200,
      date: "2024-01-08",
      reason: "Current market volatility"
    }
  ];

  const handleProposalAction = (proposal: any, action: 'accept' | 'reject') => {
    if (action === 'accept' && !confirmationChecked) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that you understand the legal implications.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: `Proposal ${action === 'accept' ? 'Accepted' : 'Rejected'}`,
      description: `Your decision has been recorded and digitally signed.`,
    });

    setSelectedProposal(null);
    setConfirmationChecked(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case "accepted":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const pendingProposals = proposals.filter(p => p.status === "pending");
  const completedProposals = proposals.filter(p => p.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investment Proposals</h1>
        <p className="text-gray-600 mt-1">Review and respond to investment recommendations</p>
      </div>

      {/* Pending Proposals */}
      {pendingProposals.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Your Review</h2>
          <div className="grid gap-4">
            {pendingProposals.map((proposal) => {
              const Icon = proposal.icon;
              return (
                <Card key={proposal.id} className="border-l-4 border-l-yellow-400">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gray-100 ${proposal.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{proposal.type} {proposal.asset}</span>
                            {getRiskBadge(proposal.riskLevel)}
                          </CardTitle>
                          <CardDescription>
                            Proposal ID: {proposal.id} • Submitted: {proposal.submittedDate}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${proposal.totalValue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          {proposal.amount} units @ ${proposal.price}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Investment Rationale</h4>
                        <p className="text-gray-600 text-sm">{proposal.reasoning}</p>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-amber-600" />
                          <span className="text-amber-800 text-sm font-medium">
                            Response Required by {proposal.deadline}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => setSelectedProposal({ ...proposal, action: 'accept' })}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Accept Proposal
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Investment Decision</DialogTitle>
                              <DialogDescription>
                                Please review the proposal details and confirm your decision.
                              </DialogDescription>
                            </DialogHeader>
                            <ProposalConfirmationDialog 
                              proposal={proposal}
                              action="accept"
                              onConfirm={handleProposalAction}
                              confirmationChecked={confirmationChecked}
                              setConfirmationChecked={setConfirmationChecked}
                            />
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => setSelectedProposal({ ...proposal, action: 'reject' })}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Proposal
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Investment Proposal</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to reject this investment proposal?
                              </DialogDescription>
                            </DialogHeader>
                            <ProposalConfirmationDialog 
                              proposal={proposal}
                              action="reject"
                              onConfirm={handleProposalAction}
                              confirmationChecked={confirmationChecked}
                              setConfirmationChecked={setConfirmationChecked}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Action History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSignature className="h-5 w-5" />
            <span>Action History</span>
          </CardTitle>
          <CardDescription>Audit log of all confirmed investment decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionHistory.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${action.action === 'ACCEPTED' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {action.action === 'ACCEPTED' ? 
                      <CheckCircle className="h-4 w-4 text-green-600" /> : 
                      <XCircle className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{action.action} - {action.asset}</p>
                    <p className="text-sm text-gray-500">
                      {action.amount} units • ${action.value.toLocaleString()}
                    </p>
                    {action.reason && (
                      <p className="text-sm text-gray-500">Reason: {action.reason}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{action.date}</p>
                  {action.signature && (
                    <p className="text-xs text-gray-500 font-mono">
                      Signed: {action.signature.substring(0, 12)}...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Proposals */}
      {completedProposals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Proposals</CardTitle>
            <CardDescription>Previously reviewed investment proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedProposals.map((proposal) => {
                const Icon = proposal.icon;
                return (
                  <div key={proposal.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white ${proposal.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{proposal.type} {proposal.asset}</p>
                        <p className="text-sm text-gray-500">
                          {proposal.amount} units • ${proposal.totalValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm">{proposal.acceptedDate || proposal.submittedDate}</p>
                      </div>
                      {getStatusBadge(proposal.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const ProposalConfirmationDialog = ({ 
  proposal, 
  action, 
  onConfirm, 
  confirmationChecked, 
  setConfirmationChecked 
}: any) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Proposal Summary</h4>
        <div className="space-y-1 text-sm">
          <p><strong>Action:</strong> {action.toUpperCase()}</p>
          <p><strong>Asset:</strong> {proposal.asset}</p>
          <p><strong>Amount:</strong> {proposal.amount} units</p>
          <p><strong>Total Value:</strong> ${proposal.totalValue.toLocaleString()}</p>
        </div>
      </div>

      {action === 'accept' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Legal Confirmation Required</h4>
              <p className="text-sm text-amber-700 mb-3">
                By accepting this proposal, you confirm that you understand the investment risks 
                and authorize E-Bridge Capital to execute this transaction on your behalf.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="legal-confirmation"
                  checked={confirmationChecked}
                  onCheckedChange={setConfirmationChecked}
                />
                <Label htmlFor="legal-confirmation" className="text-sm text-amber-800">
                  I confirm my full understanding and accept legal responsibility
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setConfirmationChecked(false)}
        >
          Cancel
        </Button>
        <Button 
          className={`flex-1 ${action === 'accept' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
          onClick={() => onConfirm(proposal, action)}
          disabled={action === 'accept' && !confirmationChecked}
        >
          {action === 'accept' ? 'Confirm & Accept' : 'Confirm Rejection'}
        </Button>
      </div>
    </div>
  );
};

export default Proposals;
