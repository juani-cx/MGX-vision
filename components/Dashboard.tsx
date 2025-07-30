import { useState } from "react";
import { Plus, Filter, Search, MoreVertical, Brain, TrendingUp, Users, Clock, CheckCircle, Send, Calendar, Home, ChevronUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AIResearchPrompt } from "./AIResearchPrompt";
import { ResearchResults } from "./ResearchResults";

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewResearch, setShowNewResearch] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);

  const [companies, setCompanies] = useState<any[]>([
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

  const activeResearchData = [
    {
      id: 1,
      company: "Big Kahuna Burger Ltd.",
      dueDate: "Due Date 24 Jan 2023",
      badges: [
        { label: "Internal", color: "bg-orange-100 text-orange-600" },
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" },
        { label: "Urgent", color: "bg-red-100 text-red-600" }
      ],
      members: 4
    },
    {
      id: 2,
      company: "Acme Co.",
      dueDate: "Due Date 18 Jan 2023",
      badges: [
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" },
        { label: "Event", color: "bg-purple-100 text-purple-600" },
        { label: "Urgent", color: "bg-red-100 text-red-600" }
      ],
      members: 3
    },
    {
      id: 3,
      company: "Binford Ltd.",
      dueDate: "Due Date 31 Jan 2023",
      badges: [
        { label: "Internal", color: "bg-orange-100 text-orange-600" },
        { label: "Document", color: "bg-blue-100 text-blue-600" },
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" }
      ],
      members: 4
    }
  ];

  const latestAnalysisData = [
    {
      id: 1,
      company: "Binford Ltd.",
      dueDate: "Due Date 11 Jan 2023",
      badges: [
        { label: "Report", color: "bg-green-100 text-green-600" },
        { label: "Event", color: "bg-purple-100 text-purple-600" },
        { label: "Urgent", color: "bg-red-100 text-red-600" }
      ],
      members: 2
    },
    {
      id: 2,
      company: "Barone LLC.",
      dueDate: "Due Date 09 Jan 2023",
      badges: [
        { label: "Report", color: "bg-green-100 text-green-600" },
        { label: "Document", color: "bg-blue-100 text-blue-600" },
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" }
      ],
      members: 3
    },
    {
      id: 3,
      company: "Binford Ltd.",
      dueDate: "Due Date 12 Jan 2023",
      badges: [
        { label: "Internal", color: "bg-orange-100 text-orange-600" },
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" },
        { label: "Urgent", color: "bg-red-100 text-red-600" }
      ],
      members: 4
    },
    {
      id: 4,
      company: "Abstergo Ltd.",
      dueDate: "Due Date 15 Jan 2023",
      badges: [
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" },
        { label: "Event", color: "bg-purple-100 text-purple-600" },
        { label: "Urgent", color: "bg-red-100 text-red-600" }
      ],
      members: 3
    },
    {
      id: 5,
      company: "Biffco Enterprises Ltd.",
      dueDate: "Due Date 13 Jan 2023",
      badges: [
        { label: "Internal", color: "bg-orange-100 text-orange-600" },
        { label: "Document", color: "bg-blue-100 text-blue-600" },
        { label: "Marketing", color: "bg-yellow-100 text-yellow-600" }
      ],
      members: 2
    }
  ];

  const handleNewResearch = (prompt: string, type: string) => {
    const companyName = prompt.split(' ')[0]; // Extract company name from prompt
    const newCompany = {
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
          ? { ...company, status: "completed", results: { /* mock results */ } }
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

  const renderMemberAvatars = (count: number) => {
    return (
      <div className="flex -space-x-2">
        {Array.from({ length: Math.min(count, 4) }).map((_, index) => (
          <div
            key={index}
            className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white"
          />
        ))}
      </div>
    );
  };

  const renderListItem = (item: any, isHeader = false) => (
    <div key={item.id} className={`border border-gray-200 rounded p-4 flex items-center gap-4 ${isHeader ? 'bg-gray-50' : 'bg-white'}`}>
      <input type="checkbox" className="w-5 h-5 rounded border border-gray-300" />
      <div className="flex-1 font-medium text-sm">{item.company}</div>
      <div className="flex items-center gap-2 text-sm text-gray-600 w-48">
        <Calendar className="w-4 h-4" />
        <span>{item.dueDate}</span>
      </div>
      <div className="flex gap-2 w-60">
        {item.badges.map((badge: any, index: number) => (
          <span key={index} className={`px-2 py-1 rounded text-xs ${badge.color}`}>
            {badge.label}
          </span>
        ))}
      </div>
      <div className="w-20 flex justify-end">
        {renderMemberAvatars(item.members)}
      </div>
      <button className="p-1">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );

  // New Research Modal Component
  const NewResearchModal = () => {
    if (!showNewResearch) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">New Research Task</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowNewResearch(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-6">
            <AIResearchPrompt onSubmit={handleNewResearch} />
          </div>
        </div>
      </div>
    );
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
      <NewResearchModal />
      
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border border-gray-300 h-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-green-300 rounded-lg">
              <div className="w-3 h-3 text-green-600">
                <CheckCircle className="w-3 h-3" />
              </div>
              <span className="text-green-600 text-sm">All Systems Operational</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {/* Page Header */}
        <div className="bg-gray-100 border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Home className="w-4 h-4" />
                <span>Home Page</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Activity summary</h1>
            </div>
            <Button onClick={() => setShowNewResearch(true)} className="bg-[#0f1951] hover:bg-[#0f1951]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Research
            </Button>
          </div>

          {/* AI Assistant Card */}
          <Card className="mt-6 shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Assistant</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Always-On</span>
                  </div>
                </div>
                <button className="p-2">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-700">👋 Ask me about any company or contact</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          {/* Research History */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <div>
                  <h2 className="text-xl font-medium">Research History</h2>
                  <p className="text-sm text-gray-600">{companies.length} companies analyzed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="financial">Financial Analysis</SelectItem>
                    <SelectItem value="market">Market Research</SelectItem>
                    <SelectItem value="network">Network Analysis</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Sort By
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {companies.map(company => (
                <div 
                  key={company.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedCompany(company)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium">{company.name}</h3>
                        <Badge className={getStatusColor(company.status)}>
                          {company.status === "processing" && <Clock className="w-3 h-3 mr-1" />}
                          {company.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {company.status}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(company.priority)}>
                          {company.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Type: {company.type}</span>
                        <span>Created: {company.createdAt}</span>
                        <span>Assignee: {company.assignee}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {company.status === "completed" && (
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Research */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div>
                  <h2 className="text-xl font-medium">Active researchs</h2>
                  <p className="text-sm text-gray-600">3 companies listed</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Sort By
              </Button>
            </div>
            <div className="space-y-4">
              {activeResearchData.map(item => renderListItem(item, item.id === 1))}
            </div>
          </section>

          {/* Latest Analysis */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ChevronUp className="w-6 h-6 text-gray-400" />
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div>
                <h2 className="text-xl font-medium">Latest analysis</h2>
                <p className="text-sm text-gray-600">5 companies listed</p>
              </div>
            </div>
            <div className="space-y-4">
              {latestAnalysisData.map(item => renderListItem(item))}
            </div>
          </section>
        </div>

        {/* Floating AI Assistant */}
        <div className="fixed bottom-8 right-8">
          <Card className="w-96 shadow-xl">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Ask me anything</p>
                </div>
                <button className="p-2">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 flex-1">
                  <p className="text-sm text-gray-700">Ask me about any company or contact</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}