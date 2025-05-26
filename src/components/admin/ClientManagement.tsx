
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Send
} from "lucide-react";

const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const clients = [
    {
      id: "CL-001",
      name: "Marco Rossi",
      email: "cliente@ebridge.ee",
      joinDate: "2024-01-10",
      kycStatus: "completed",
      portfolioValue: 125430.50,
      documentsUploaded: 3,
      documentsRequired: 3,
      lastActivity: "2024-01-15",
      riskProfile: "Medium",
      country: "Italy"
    },
    {
      id: "CL-002",
      name: "Anna Korhonen",
      email: "anna.k@email.com",
      joinDate: "2024-01-08",
      kycStatus: "pending",
      portfolioValue: 89250.75,
      documentsUploaded: 2,
      documentsRequired: 3,
      lastActivity: "2024-01-14",
      riskProfile: "Conservative",
      country: "Finland"
    },
    {
      id: "CL-003",
      name: "Hans Mueller",
      email: "h.mueller@email.de",
      joinDate: "2024-01-05",
      kycStatus: "completed",
      portfolioValue: 256890.25,
      documentsUploaded: 4,
      documentsRequired: 3,
      lastActivity: "2024-01-15",
      riskProfile: "Aggressive",
      country: "Germany"
    },
    {
      id: "CL-004",
      name: "Sophie Dubois",
      email: "sophie.d@email.fr",
      joinDate: "2024-01-12",
      kycStatus: "rejected",
      portfolioValue: 0,
      documentsUploaded: 1,
      documentsRequired: 3,
      lastActivity: "2024-01-13",
      riskProfile: "Not Set",
      country: "France"
    }
  ];

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClients = clients.length;
  const verifiedClients = clients.filter(c => c.kycStatus === "completed").length;
  const pendingClients = clients.filter(c => c.kycStatus === "pending").length;
  const totalAUM = clients.reduce((sum, client) => sum + client.portfolioValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage client accounts, KYC status, and portfolios</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Clients</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedClients}</div>
            <p className="text-xs text-green-600">
              {Math.round((verifiedClients / totalClients) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingClients}</div>
            <p className="text-xs text-yellow-600">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAUM.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              +8.2% this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Client Directory</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Client List */}
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">ID: {client.id}</span>
                      <span className="text-xs text-gray-500">Joined: {client.joinDate}</span>
                      <span className="text-xs text-gray-500">{client.country}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold">${client.portfolioValue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Portfolio Value</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      {getKycStatusIcon(client.kycStatus)}
                      {getKycStatusBadge(client.kycStatus)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Docs: {client.documentsUploaded}/{client.documentsRequired}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <ClientDetailDialog client={client} />
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ClientDetailDialog = ({ client }: { client: any }) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Client Profile: {client.name}</DialogTitle>
        <DialogDescription>
          Complete client information and account management
        </DialogDescription>
      </DialogHeader>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Client ID</span>
              <p className="font-medium">{client.id}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Email</span>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Country</span>
              <p className="font-medium">{client.country}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Risk Profile</span>
              <p className="font-medium">{client.riskProfile}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Join Date</span>
              <p className="font-medium">{client.joinDate}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Last Activity</span>
              <p className="font-medium">{client.lastActivity}</p>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Total Value</span>
              <p className="text-2xl font-bold">${client.portfolioValue.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Monthly P&L</span>
              <p className="font-medium text-green-600">+$2,347 (+8.2%)</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Asset Allocation</span>
              <div className="space-y-1 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Bitcoin</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ETFs</span>
                  <span>35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Stocks</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            KYC Verification Status
            {client.kycStatus === "completed" ? (
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            ) : client.kycStatus === "pending" ? (
              <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">Rejected</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Passport</p>
                <p className="text-sm text-gray-500">Verified</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Proof of Address</p>
                <p className="text-sm text-gray-500">Verified</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {client.kycStatus === "completed" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">Source of Funds</p>
                <p className="text-sm text-gray-500">
                  {client.kycStatus === "completed" ? "Verified" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button className="flex-1">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
        <Button variant="outline" className="flex-1">
          <FileText className="mr-2 h-4 w-4" />
          View Documents
        </Button>
        <Button variant="outline" className="flex-1">
          <TrendingUp className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </div>
    </div>
  );
};

export default ClientManagement;
