
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

interface PortfolioAnalyticsProps {
  onBack: () => void;
}

const PortfolioAnalytics = ({ onBack }: PortfolioAnalyticsProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setTransactions(getStaticTransactions());
        setLoading(false);
        return;
      }

      setTransactions(getStaticTransactions());
      setLoading(false);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions(getStaticTransactions());
      setLoading(false);
    }
  };

  const getStaticTransactions = () => [
    {
      id: "TX-001",
      transaction_type: "BUY",
      asset_name: "Bitcoin (BTC)",
      amount: 0.1532,
      price_per_unit: 65400,
      total_value: 10016.88,
      fees: 25.04,
      executed_at: "2024-01-15T10:30:00Z"
    },
    {
      id: "TX-002",
      transaction_type: "SELL",
      asset_name: "STRF ETF",
      amount: 25.0,
      price_per_unit: 125.50,
      total_value: 3137.50,
      fees: 7.84,
      executed_at: "2024-01-14T14:20:00Z"
    },
    {
      id: "TX-003",
      transaction_type: "BUY",
      asset_name: "STRK Stocks",
      amount: 15.0,
      price_per_unit: 89.30,
      total_value: 1339.50,
      fees: 3.35,
      executed_at: "2024-01-13T09:15:00Z"
    }
  ];

  // Generate performance data for charts
  const performanceData = [
    { date: '2024-01-01', value: 100000, btc: 45000, strf: 30000, strk: 25000 },
    { date: '2024-01-05', value: 105200, btc: 47000, strf: 31200, strk: 27000 },
    { date: '2024-01-10', value: 108900, btc: 49000, strf: 32500, strk: 27400 },
    { date: '2024-01-15', value: 125430, btc: 56443, strf: 37629, strk: 31358 },
  ];

  const allocationData = [
    { name: 'Bitcoin (BTC)', value: 45, amount: 56443, color: '#F97316' },
    { name: 'STRF ETF', value: 30, amount: 37629, color: '#3B82F6' },
    { name: 'STRK Stocks', value: 25, amount: 31358, color: '#10B981' },
  ];

  const monthlyReturns = [
    { month: 'Sep', return: 2.1 },
    { month: 'Oct', return: 4.8 },
    { month: 'Nov', return: -1.2 },
    { month: 'Dec', return: 6.3 },
    { month: 'Jan', return: 8.7 },
  ];

  const riskMetrics = [
    { metric: 'Volatility (30d)', value: '12.4%' },
    { metric: 'Sharpe Ratio', value: '1.85' },
    { metric: 'Max Drawdown', value: '-8.2%' },
    { metric: 'Beta', value: '0.92' },
  ];

  const chartConfig = {
    value: {
      label: "Portfolio Value",
      color: "#3B82F6",
    },
    btc: {
      label: "Bitcoin",
      color: "#F97316",
    },
    strf: {
      label: "STRF ETF",
      color: "#3B82F6",
    },
    strk: {
      label: "STRK Stocks",
      color: "#10B981",
    },
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const totalValue = transactions.reduce((sum, t) => sum + (parseFloat(t.total_value) || 0), 0);
  const totalFees = transactions.reduce((sum, t) => sum + (parseFloat(t.fees) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>
        <h2 className="text-2xl font-bold">Portfolio Analytics</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Portfolio Value</CardTitle>
            <CardDescription className="text-sm">Current value of all holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Transactions</CardTitle>
            <CardDescription className="text-sm">Number of completed trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Fees Paid</CardTitle>
            <CardDescription className="text-sm">All transaction fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Portfolio Performance</CardTitle>
          <CardDescription className="text-sm">Historical portfolio value over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Asset Allocation</CardTitle>
            <CardDescription className="text-sm">Current portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Returns */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Returns</CardTitle>
            <CardDescription className="text-sm">Performance over the last 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="return" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Metrics</CardTitle>
          <CardDescription className="text-sm">Portfolio risk analysis and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {riskMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-lg font-bold">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.metric}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Asset Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Asset Performance Comparison</CardTitle>
          <CardDescription className="text-sm">Individual asset performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="btc" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="strf" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="strk" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">{transaction.transaction_type} {transaction.asset_name}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.amount} @ ${transaction.price_per_unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${parseFloat(transaction.total_value).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
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
