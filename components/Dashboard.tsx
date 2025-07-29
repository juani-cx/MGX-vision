import { useState } from "react";
import { Plus, Filter, Search, MoreHorizontal, Brain, TrendingUp, Users, Clock, CheckCircle, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AIResearchPrompt } from "./AIResearchPrompt";
import { ResearchResults } from "./ResearchResults";

interface Company {
  id: string;
  name: string;
  type: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  results?: any;
}

export function Dashboard() {
  const [showNewResearch, setShowNewResearch] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Tesla Inc.",
      type: "Financial Analysis",
      status: "completed",
      createdAt: "Feb 14, 2024",
      priority: "high",
      assignee: "Sarah Chen",
      results: {
        company: {
          name: "Tesla Inc.",
          industry: "Electric Vehicles & Clean Energy",
          marketCap: "$612.2B",
          employees: "140,000+",
          headquarters: "Austin, Texas",
          description: "Tesla designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems, and related services and products.",
          keyMetrics: [
            { label: "Revenue Growth", value: "+19%", trend: "up" },
            { label: "Gross Margin", value: "18.7%", trend: "down" },
            { label: "Cash Flow", value: "$7.5B", trend: "up" }
          ]
        },
        networkInsights: {
          directConnections: 12,
          indirectConnections: 47,
          keyContacts: [
            { name: "Drew Baglino", role: "SVP Powertrain", company: "Tesla", relationship: "Former colleague" },
            { name: "Jerome Guillen", role: "Former VP", company: "Tesla", relationship: "LinkedIn 2nd" },
            { name: "JB Straubel", role: "CEO", company: "Redwood Materials", relationship: "Mutual contact" }
          ],
          referralOpportunities: [
            { contact: "Tom Zhu", strength: "high", path: "via Sarah Chen" },
            { contact: "Lars Moravy", strength: "medium", path: "via Mike Johnson" }
          ]
        },
        financialAnalysis: {
          score: 78,
          risk: "medium",
          recommendation: "STRONG BUY - Despite current market volatility, Tesla's strong fundamentals and growth trajectory make it an attractive long-term investment.",
          keyFinancials: [
            { metric: "P/E Ratio", value: "45.2", benchmark: "Industry: 23.1" },
            { metric: "Debt/Equity", value: "0.17", benchmark: "Industry: 0.45" },
            { metric: "ROE", value: "28.1%", benchmark: "Industry: 15.2%" }
          ],
          opportunities: [
            "Expanding Supercharger network provides competitive moat",
            "Energy storage business showing strong growth potential",
            "FSD technology advancement could unlock significant value"
          ],
          concerns: [
            "High valuation compared to traditional automakers",
            "Increasing competition in EV market",
            "Regulatory risks in key markets"
          ]
        }
      }
    },
    {
      id: "2",
      name: "Rivian",
      type: "Market Research",
      status: "processing",
      createdAt: "Feb 15, 2024",
      priority: "medium",
      assignee: "Alex Park"
    },
    {
      id: "3",
      name: "SpaceX",
      type: "Network Analysis",
      status: "completed",
      createdAt: "Feb 13, 2024",
      priority: "high",
      assignee: "Maria Rodriguez",
      results: {
        networkInsights: {
          directConnections: 8,
          indirectConnections: 23,
          keyContacts: [
            { name: "Gwynne Shotwell", role: "President & COO", company: "SpaceX", relationship: "Conference contact" },
            { name: "Tom Mueller", role: "Former CTO", company: "SpaceX", relationship: "Shared contact" }
          ],
          referralOpportunities: [
            { contact: "Elon Musk", strength: "low", path: "via Tom Mueller" }
          ]
        }
      }
    }
  ]);

  const handleNewResearch = (prompt: string, type: string) => {
    const companyName = prompt.split(' ')[0]; // Extract company name from prompt
    const newCompany: Company = {
      id: Date.now().toString(),
      name: companyName,
      type: type.charAt(0).toUpperCase() + type.slice(1) + " Analysis",
      status: "processing",
      createdAt: new Date().toLocaleDateString(),
      priority: "medium",
      assignee: "Current User"
    };
    
    setCompanies([newCompany, ...companies]);
    setShowNewResearch(false);
    
    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setCompanies(prev => prev.map(company => 
        company.id === newCompany.id 
          ? { ...company, status: "completed" as const, results: { /* mock results */ } }
          : company
      ));
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "processing": return "text-yellow-600 bg-yellow-100";
      case "failed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (selectedCompany) {
    return (
      <div className="flex h-screen">
        {/* Main Content Area - Middle Column */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCompany(null)}
              >
                ← Back to Dashboard
              </Button>
              <Badge variant="secondary">{selectedCompany.type}</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h1 className="text-2xl">{selectedCompany.name}</h1>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <ResearchResults task={selectedCompany} />
          </div>
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div className="w-80 bg-sidebar border-l border-sidebar-border flex flex-col">
          {/* AI Assistant Header */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sidebar-foreground font-medium">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask about this company</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-input-background">
              <Input 
                placeholder="Ask me about this client..."
                className="border-0 bg-transparent focus-visible:ring-0 text-sm"
              />
              <Button size="sm" variant="ghost">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 space-y-2">
            <h4 className="text-xs text-muted-foreground mb-3">Quick Actions</h4>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              Financial Summary
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              <Users className="w-4 h-4 mr-2" />
              Network Analysis
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              <Brain className="w-4 h-4 mr-2" />
              Investment Thesis
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              <CheckCircle className="w-4 h-4 mr-2" />
              Key Metrics
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-4">
            <h4 className="text-xs text-muted-foreground mb-3">Recent Queries</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-sidebar-accent rounded text-sidebar-foreground">
                "What's Tesla's current market position?"
              </div>
              <div className="p-2 bg-muted rounded text-muted-foreground">
                "Show me the competitive analysis"
              </div>
            </div>
          </div>

          {/* Bottom Status */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">AI Online</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">AI Strategic Platform</h1>
            <p className="text-muted-foreground">Company analysis and network intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">AI</span>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-primary-foreground">PA</span>
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-secondary-foreground">AL</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowNewResearch(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Company
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {!showNewResearch && (
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Research</p>
                <p className="text-2xl">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Opportunities</p>
                <p className="text-2xl">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Network Connections</p>
                <p className="text-2xl">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Research Time</p>
                <p className="text-2xl">4.2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {showNewResearch ? (
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Research Details</h2>
              <Button variant="ghost" onClick={() => setShowNewResearch(false)}>
                Cancel
              </Button>
            </div>
            <AIResearchPrompt onSubmit={handleNewResearch} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search companies..." className="pl-9 w-80" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="financial">Financial Analysis</SelectItem>
                    <SelectItem value="network">Network Analysis</SelectItem>
                    <SelectItem value="market">Market Research</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>Companies</CardTitle>
                <CardDescription>Track and manage your company research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => company.status === "completed" && setSelectedCompany(company)}
                    >
                      <div className="w-2 h-8 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <h4>{company.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{company.type}</Badge>
                          <span className="text-sm text-muted-foreground">• {company.createdAt}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(company.status)}>
                        {company.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{company.assignee}</span>
                        <Badge className={getPriorityColor(company.priority)}>
                          {company.priority}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}