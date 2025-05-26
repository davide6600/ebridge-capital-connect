
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  Bitcoin,
  BarChart3,
  TrendingUp,
  Filter,
  Search,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProposalManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const proposals = [
    {
      id: "PROP-001",
      clientId: "CL-001",
      clientName: "Marco Rossi",
      type: "BUY",
      asset: "Bitcoin (BTC)",
      amount: 0.5,
      price: 65400,
      totalValue: 32700,
      status: "pending",
      created: "2024-01-15",
      deadline: "2024-01-20",
      reasoning: "Following the recent market correction...",
      riskLevel: "Medium"
    },
    {
      id: "PROP-002",
      clientId: "CL-001",
      clientName: "Marco Rossi",
      type: "SELL",
      asset: "STRF ETF",
      amount: 50,
      price: 125.30,
      totalValue: 6265,
      status: "pending",
      created: "2024-01-16",
      deadline: "2024-01-22",
      reasoning: "Profit-taking opportunity as STRF has reached target levels...",
      riskLevel: "Low"
    },
    {
      id: "PROP-003",
      clientId: "CL-003",
      clientName: "Hans Mueller",
      type: "BUY",
      asset: "STRK Stocks",
      amount: 100,
      price: 89.50,
      totalValue: 8950,
      status: "accepted",
      created: "2024-01-10",
      deadline: "2024-01-18",
      acceptedDate: "2024-01-12",
      reasoning: "Strong quarterly earnings and positive sentiment...",
      riskLevel: "High"
    },
    {
      id: "PROP-004",
      clientId: "CL-002",
      clientName: "Anna Korhonen",
      type: "BUY",
      asset: "Ethereum (ETH)",
      amount: 2.5,
      price: 2480,
      totalValue: 6200,
      status: "rejected",
      created: "2024-01-08",
      deadline: "2024-01-15",
      rejectedDate: "2024-01-14",
      reasoning: "Diversification into Ethereum following recent upgrades...",
      riskLevel: "Medium"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "accepted":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAssetIcon = (asset: string) => {
    if (asset.includes("Bitcoin") || asset.includes("BTC")) {
      return <Bitcoin className="h-5 w-5 text-orange-500" />;
    } else if (asset.includes("ETF")) {
      return <BarChart3 className="h-5 w-5 text-blue-500" />;
    } else {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    }
  };

  const filteredProposals = proposals.filter(proposal =>
    proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = proposals.filter(p => p.status === "pending").length;
  const acceptedCount = proposals.filter(p => p.status === "accepted").length;
  const rejectedCount = proposals.filter(p => p.status === "rejected").length;
  const totalValue = proposals.reduce((sum, p) => p.status === "accepted" ? sum + p.totalValue : sum, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proposal Management</h1>
          <p className="text-gray-600 mt-1">Create and track investment proposals for clients</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <CreateProposalDialog onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-yellow-600">
              Awaiting client response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedCount}</div>
            <p className="text-xs text-green-600">
              Ready for execution
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-red-600">
              Client declined
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Proposals</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search proposals by client, asset, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getAssetIcon(proposal.asset)}
                    <div>
                      <h3 className="font-semibold">
                        {proposal.type} {proposal.asset}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Client: {proposal.clientName} • ID: {proposal.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {proposal.amount} units @ ${proposal.price} = ${proposal.totalValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(proposal.status)}
                    {getStatusBadge(proposal.status)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Investment Rationale</h4>
                    <p className="text-sm text-gray-600">{proposal.reasoning}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span>Created: {proposal.created}</span>
                      <span>Deadline: {proposal.deadline}</span>
                      <Badge variant="outline">{proposal.riskLevel} Risk</Badge>
                    </div>
                    
                    {proposal.status === "pending" && (
                      <div className="flex items-center space-x-2 text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Awaiting response</span>
                      </div>
                    )}
                  </div>

                  {proposal.status !== "pending" && (
                    <div className="text-sm text-gray-500">
                      {proposal.status === "accepted" && proposal.acceptedDate && (
                        <span>Accepted on {proposal.acceptedDate}</span>
                      )}
                      {proposal.status === "rejected" && proposal.rejectedDate && (
                        <span>Rejected on {proposal.rejectedDate}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CreateProposalDialog = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    clientId: "",
    type: "",
    asset: "",
    amount: "",
    price: "",
    reasoning: "",
    riskLevel: "",
    deadline: ""
  });

  const handleSubmit = () => {
    toast({
      title: "Proposal Created",
      description: "Investment proposal has been sent to the client.",
    });
    onClose();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Create Investment Proposal</DialogTitle>
        <DialogDescription>
          Create a new investment proposal to send to a client
        </DialogDescription>
      </DialogHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CL-001">Marco Rossi</SelectItem>
              <SelectItem value="CL-002">Anna Korhonen</SelectItem>
              <SelectItem value="CL-003">Hans Mueller</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Transaction Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BUY">Buy</SelectItem>
              <SelectItem value="SELL">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="asset">Asset</Label>
          <Select value={formData.asset} onValueChange={(value) => setFormData({...formData, asset: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bitcoin (BTC)">Bitcoin (BTC)</SelectItem>
              <SelectItem value="STRF ETF">STRF ETF</SelectItem>
              <SelectItem value="STRK Stocks">STRK Stocks</SelectItem>
              <SelectItem value="Ethereum (ETH)">Ethereum (ETH)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price per Unit</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            placeholder="Enter price"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="risk">Risk Level</Label>
          <Select value={formData.riskLevel} onValueChange={(value) => setFormData({...formData, riskLevel: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Response Deadline</Label>
        <Input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reasoning">Investment Rationale</Label>
        <Textarea
          id="reasoning"
          value={formData.reasoning}
          onChange={(e) => setFormData({...formData, reasoning: e.target.value})}
          placeholder="Provide detailed reasoning for this investment recommendation..."
          rows={4}
        />
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={handleSubmit}>
          <Send className="mr-2 h-4 w-4" />
          Send Proposal
        </Button>
      </div>
    </div>
  );
};

export default ProposalManagement;
