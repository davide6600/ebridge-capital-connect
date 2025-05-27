
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/components/AuthProvider';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import ClientManagement from "@/components/admin/ClientManagement";
import ProposalManagement from "@/components/admin/ProposalManagement";
import DocumentReview from "@/components/admin/DocumentReview";
import Analytics from "@/components/admin/Analytics";

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("clients");

  useEffect(() => {
    if (!loading && (!user || user.email !== "admin@ebridge.ee")) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || user.email !== "admin@ebridge.ee") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Panel - Welcome, {user.email}!
            </h1>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </AdminLayout>
    </div>
  );
};

export default Admin;
