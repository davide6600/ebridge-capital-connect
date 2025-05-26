
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Bitcoin, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign,
  Eye,
  Download
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PortfolioAnalytics from "./PortfolioAnalytics";

const Portfolio = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const totalValue = 125430.50;
  const dailyChange = 2847.32;
  const dailyChangePercent = 2.32;

  const holdings = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.8642,
      value: 56443.21,
      change: 3.2,
      allocation: 45,
      icon: Bitcoin,
      color: "text-orange-500"
    },
    {
      symbol: "STRF",
      name: "STRF ETF",
      amount: 125.0,
      value: 37629.15,
      change: 1.8,
      allocation: 30,
      icon: BarChart3,
      color: "text-blue-500"
    },
    {
      symbol: "STRK",
      name: "STRK Stocks",
      amount: 89.5,
      value: 31358.14,
      change: -0.5,
      allocation: 25,
      icon: TrendingUp,
      color: "text-green-500"
    }
  ];

  const transactions = [
    {
      type: "BUY",
      asset: "BTC",
      amount: 0.1532,
      price: 65400,
      date: "2024-01-15",
      status: "Completed"
    },
    {
      type: "SELL",
      asset: "STRF",
      amount: 25.0,
      price: 125.50,
      date: "2024-01-14",
      status: "Completed"
    },
    {
      type: "BUY",
      asset: "STRK",
      amount: 15.0,
      price: 89.30,
      date: "2024-01-13",
      status: "Pending"
    }
  ];

  const handleExportReport = () => {
    // Generate portfolio report data
    const reportData = {
      totalValue,
      dailyChange,
      dailyChangePercent,
      holdings,
      transactions,
      generatedAt: new Date().toISOString()
    };

    // Create CSV content
    const csvContent = [
      ['Portfolio Report - Generated on', new Date().toLocaleDateString()],
      [''],
      ['Summary'],
      ['Total Portfolio Value', `$${totalValue.toLocaleString()}`],
      ['Daily Change', `$${dailyChange.toLocaleString()}`],
      ['Daily Change %', `${dailyChangePercent}%`],
      [''],
      ['Holdings'],
      ['Symbol', 'Name', 'Amount', 'Value', 'Change %', 'Allocation %'],
      ...holdings.map(h => [h.symbol, h.name, h.amount, `$${h.value.toLocaleString()}`, `${h.change}%`, `${h.allocation}%`]),
      [''],
      ['Recent Transactions'],
      ['Type', 'Asset', 'Amount', 'Price', 'Date', 'Status'],
      ...transactions.map(t => [t.type, t.asset, t.amount, `$${t.price.toLocaleString()}`, t.date, t.status])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Your portfolio report has been downloaded successfully.",
    });
  };

  if (showAnalytics) {
    return <PortfolioAnalytics onBack={() => setShowAnalytics(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Overview</h1>
          <p className="text-gray-600 mt-1">Track your investment performance and allocation</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setShowAnalytics(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className={`text-xs ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
              {dailyChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {dailyChange >= 0 ? '+' : ''}${Math.abs(dailyChange).toLocaleString()} ({dailyChangePercent}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$18,430</div>
            <p className="text-xs text-muted-foreground">
              +17.2% since inception
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
            <Bitcoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BTC</div>
            <p className="text-xs text-green-600">
              +24.5% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diversification</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Asset classes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
          <CardDescription>Your active investment positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {holdings.map((holding) => {
              const Icon = holding.icon;
              return (
                <div key={holding.symbol} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${holding.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{holding.name}</h3>
                        <p className="text-sm text-gray-500">{holding.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${holding.value.toLocaleString()}</p>
                      <p className={`text-sm ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.change >= 0 ? '+' : ''}{holding.change}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Amount: {holding.amount}</span>
                      <span>Allocation: {holding.allocation}%</span>
                    </div>
                    <Progress value={holding.allocation} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest trading activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={transaction.type === "BUY" ? "default" : "secondary"}
                    className={transaction.type === "BUY" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {transaction.type}
                  </Badge>
                  <div>
                    <p className="font-medium">{transaction.asset}</p>
                    <p className="text-sm text-gray-500">{transaction.amount} units</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.price.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                    <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
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

export default Portfolio;
