
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FileText, 
  TrendingUp, 
  MessageSquare, 
  LogOut, 
  CheckCircle, 
  Clock, 
  Bitcoin,
  DollarSign,
  BarChart3,
  Upload,
  Shield
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ClientLayout from "@/components/ClientLayout";
import Portfolio from "@/components/Portfolio";
import Documents from "@/components/Documents";
import Proposals from "@/components/Proposals";
import Support from "@/components/Support";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState(localStorage.getItem("userName") || "Client");
  const [kycStatus] = useState("pending"); // completed, pending, rejected
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "client") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "portfolio":
        return <Portfolio />;
      case "documents":
        return <Documents />;
      case "proposals":
        return <Proposals />;
      case "support":
        return <Support />;
      default:
        return <DashboardContent userName={userName} kycStatus={kycStatus} />;
    }
  };

  return (
    <ClientLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </ClientLayout>
  );
};

const DashboardContent = ({ userName, kycStatus }: { userName: string, kycStatus: string }) => {
  const portfolioValue = 125430.50;
  const dailyChange = 2.34;
  const dailyChangePercent = 1.87;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}</h1>
        <p className="text-blue-100">Your investment journey continues with E-Bridge Capital</p>
      </div>

      {/* KYC Status Alert */}
      {kycStatus !== "completed" && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-yellow-800">KYC Verification Required</CardTitle>
              </div>
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                {kycStatus === "pending" ? "Pending" : "Required"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 mb-4">
              Please complete your KYC verification to unlock all investment features and higher limits.
            </p>
            <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            <p className={`text-xs ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {dailyChange >= 0 ? '+' : ''}{dailyChange}% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Across 3 asset classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.4%</div>
            <p className="text-xs text-green-600">
              Above benchmark by 3.2%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Your current investment distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <Bitcoin className="mr-2 h-4 w-4 text-orange-500" />
                  Bitcoin (BTC)
                </span>
                <span className="text-sm text-muted-foreground">45% ($56,444)</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-blue-500" />
                  STRF ETF
                </span>
                <span className="text-sm text-muted-foreground">30% ($37,629)</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                  STRK Stocks
                </span>
                <span className="text-sm text-muted-foreground">25% ($31,358)</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest transactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Bitcoin Purchase Executed</p>
                <p className="text-xs text-muted-foreground">0.3 BTC at $65,400 • 2 hours ago</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Completed
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New Investment Proposal</p>
                <p className="text-xs text-muted-foreground">STRK allocation increase • 1 day ago</p>
              </div>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Pending Review
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Document Verification</p>
                <p className="text-xs text-muted-foreground">Proof of address approved • 3 days ago</p>
              </div>
              <Badge variant="outline" className="text-gray-600 border-gray-200">
                Processed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
