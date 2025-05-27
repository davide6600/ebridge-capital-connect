
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/components/AuthProvider';
import { ProfileTest } from '@/components/ProfileTest';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ClientLayout from "@/components/ClientLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    if (!loading && !user) {
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user.email}!
            </h1>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ClientLayout activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">User ID: {user.id}</p>
            </div>
            
            <ProfileTest />
          </div>
        </ClientLayout>
      </div>
    </div>
  );
};

export default Dashboard;
