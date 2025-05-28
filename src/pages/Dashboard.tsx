
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/components/AuthProvider';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ClientLayout from "@/components/ClientLayout";
import DashboardHome from "@/components/DashboardHome";
import Portfolio from "@/components/Portfolio";
import Documents from "@/components/Documents";
import Proposals from "@/components/Proposals";
import Support from "@/components/Support";
import ProfileSettings from "@/components/ProfileSettings";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

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
      case "profile":
        return <ProfileSettings />;
      default:
        return <DashboardHome onTabChange={setActiveTab} />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </ClientLayout>
    </div>
  );
};

export default Dashboard;
