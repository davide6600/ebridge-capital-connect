
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign,
  Calendar,
  Target,
  PieChart,
  ArrowLeft
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  asset_symbol: string;
  asset_name: string;
  amount: number;
  current_value: number;
  purchase_price: number;
  purchase_date: string;
}

interface AnalyticsProps {
  onBack: () => void;
}

const PortfolioAnalytics = ({ onBack }: AnalyticsProps) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('portfolio_data')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setPortfolioData(data || []);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    const totalCurrentValue = portfolioData.reduce((sum, item) => sum + item.current_value, 0);
    const totalInvested = portfolioData.reduce((sum, item) => sum + (item.purchase_price || 0), 0);
    const totalGainLoss = totalCurrentValue - totalInvested;
    const gainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    return {
      totalCurrentValue,
      totalInvested,
      totalGainLoss,
      gainLossPercentage
    };
  };

  const metrics = calculateMetrics();

  const getPerformanceData = () => {
    return portfolioData.map(item => ({
      ...item,
      gainLoss: item.current_value - (item.purchase_price || 0),
      gainLossPercentage: item.purchase_price > 0 ? 
        ((item.current_value - item.purchase_price) / item.purchase_price) * 100 : 0
    }));
  };

  const performanceData = getPerformanceData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed analysis of your investment performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalCurrentValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current portfolio value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Amount invested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            {metrics.totalGainLoss >= 0 ? 
              <TrendingUp className="h-4 w-4 text-green-500" /> : 
              <TrendingDown className="h-4 w-4 text-red-500" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(metrics.totalGainLoss).toLocaleString()}
            </div>
            <p className={`text-xs ${metrics.gainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.gainLossPercentage >= 0 ? '+' : ''}{metrics.gainLossPercentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Count</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.length}</div>
            <p className="text-xs text-muted-foreground">Different assets</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Performance</CardTitle>
              <CardDescription>Individual asset gains and losses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((asset) => (
                  <div key={asset.asset_symbol} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-semibold">{asset.asset_symbol}</div>
                      <div>
                        <p className="text-sm text-gray-600">{asset.asset_name}</p>
                        <p className="text-xs text-gray-500">
                          {asset.amount} units • Bought at ${asset.purchase_price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${asset.current_value.toLocaleString()}</p>
                      <div className={`text-sm flex items-center space-x-1 ${
                        asset.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {asset.gainLoss >= 0 ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span>
                          {asset.gainLoss >= 0 ? '+' : ''}${Math.abs(asset.gainLoss).toLocaleString()} 
                          ({asset.gainLossPercentage >= 0 ? '+' : ''}{asset.gainLossPercentage.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Current distribution of your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.map((asset) => {
                  const percentage = (asset.current_value / metrics.totalCurrentValue) * 100;
                  return (
                    <div key={asset.asset_symbol} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{asset.asset_symbol} - {asset.asset_name}</span>
                        <span className="text-sm text-gray-600">
                          {percentage.toFixed(1)}% (${asset.current_value.toLocaleString()})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Timeline</CardTitle>
              <CardDescription>When you made your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData
                  .sort((a, b) => new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime())
                  .map((asset) => (
                    <div key={asset.asset_symbol} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium">{asset.asset_name} ({asset.asset_symbol})</p>
                        <p className="text-sm text-gray-600">
                          {new Date(asset.purchase_date).toLocaleDateString()} • 
                          ${asset.purchase_price?.toLocaleString()} invested
                        </p>
                      </div>
                      <Badge variant="outline">
                        {asset.amount} units
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioAnalytics;
