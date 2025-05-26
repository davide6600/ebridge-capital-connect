
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

const Analytics = () => {
  const kycStats = {
    total: 127,
    completed: 98,
    pending: 23,
    rejected: 6,
    completionRate: 77
  };

  const portfolioStats = {
    totalAUM: 15420000,
    monthlyGrowth: 12.4,
    activeClients: 98,
    avgPortfolioSize: 157347
  };

  const assetAllocation = [
    { asset: "Bitcoin (BTC)", allocation: 42, value: 6476400 },
    { asset: "ETFs (STRF)", allocation: 31, value: 4780200 },
    { asset: "Stocks (STRK)", allocation: 19, value: 2929800 },
    { asset: "Other", allocation: 8, value: 1233600 }
  ];

  const monthlyMetrics = [
    { month: "Dec 2023", newClients: 12, aum: 13200000, revenue: 45600 },
    { month: "Jan 2024", newClients: 15, aum: 15420000, revenue: 52800 },
    { month: "Feb 2024", newClients: 8, aum: 16890000, revenue: 58200 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive platform metrics and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(portfolioStats.totalAUM / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{portfolioStats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.activeClients}</div>
            <p className="text-xs text-green-600">
              +12 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Portfolio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioStats.avgPortfolioSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per verified client
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KYC Completion</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kycStats.completionRate}%</div>
            <p className="text-xs text-green-600">
              {kycStats.completed}/{kycStats.total} clients verified
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* KYC Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>KYC Verification Status</CardTitle>
            <CardDescription>Current status of client verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{kycStats.completed}</span>
                  <Badge className="bg-green-100 text-green-800">
                    {Math.round((kycStats.completed / kycStats.total) * 100)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Pending Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{kycStats.pending}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {Math.round((kycStats.pending / kycStats.total) * 100)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Rejected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{kycStats.rejected}</span>
                  <Badge className="bg-red-100 text-red-800">
                    {Math.round((kycStats.rejected / kycStats.total) * 100)}%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{kycStats.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${kycStats.completionRate}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation Overview</CardTitle>
            <CardDescription>Distribution across investment categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetAllocation.map((asset, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{asset.asset}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        ${(asset.value / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{asset.allocation}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${asset.allocation}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-left py-2">New Clients</th>
                  <th className="text-left py-2">AUM</th>
                  <th className="text-left py-2">Revenue</th>
                  <th className="text-left py-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyMetrics.map((metric, index) => {
                  const prevAUM = index > 0 ?  monthlyMetrics[index - 1].aum : metric.aum;
                  const growth = ((metric.aum - prevAUM) / prevAUM * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{metric.month}</td>
                      <td className="py-3">
                        <Badge variant="outline">+{metric.newClients}</Badge>
                      </td>
                      <td className="py-3">${(metric.aum / 1000000).toFixed(1)}M</td>
                      <td className="py-3">${metric.revenue.toLocaleString()}</td>
                      <td className="py-3">
                        {index > 0 && (
                          <div className="flex items-center space-x-1">
                            {parseFloat(growth) >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={parseFloat(growth) >= 0 ? "text-green-600" : "text-red-600"}>
                              {parseFloat(growth) >= 0 ? "+" : ""}{growth}%
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Avg Review Time</span>
                <span className="font-medium">1.2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Approval Rate</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending Documents</span>
                <span className="font-medium text-yellow-600">23</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Proposal Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-medium">47 proposals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Acceptance Rate</span>
                <span className="font-medium text-green-600">76%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Response Time</span>
                <span className="font-medium">2.1 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Open Tickets</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Resolution</span>
                <span className="font-medium text-green-600">4.2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Satisfaction</span>
                <span className="font-medium text-green-600">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
