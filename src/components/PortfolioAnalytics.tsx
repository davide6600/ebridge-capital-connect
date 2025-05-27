
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const PortfolioAnalytics = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('executed_at', { ascending: false });

      if (error) {
        console.error('Error loading transactions:', error);
      } else {
        setTransactions(data || []);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const totalValue = transactions.reduce((sum, t) => sum + (parseFloat(t.total_value) || 0), 0);
  const totalFees = transactions.reduce((sum, t) => sum + (parseFloat(t.fees) || 0), 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Analytics</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Portfolio Value</CardTitle>
            <CardDescription>Current value of all holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
            <CardDescription>Number of completed trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Fees Paid</CardTitle>
            <CardDescription>All transaction fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{transaction.transaction_type} {transaction.asset_name}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.amount} @ ${transaction.price_per_unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${parseFloat(transaction.total_value).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.executed_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytics;
