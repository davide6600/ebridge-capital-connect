
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  MessageSquare, 
  Search,
  Plus,
  Building2,
  LogOut,
  Shield,
  Download,
  Send
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import ClientManagement from "@/components/admin/ClientManagement";
import ProposalManagement from "@/components/admin/ProposalManagement";
import DocumentReview from "@/components/admin/DocumentReview";
import Analytics from "@/components/admin/Analytics";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("clients");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "proposals":
        return <ProposalManagement />;
      case "documents":
        return <DocumentReview />;
      case "analytics":
        return <Analytics />;
      default:
        return <ClientManagement />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </AdminLayout>
  );
};

export default Admin;
