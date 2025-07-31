import { useState } from "react";
import { Plus, Filter, Search, MoreVertical, Brain, TrendingUp, Users, Clock, CheckCircle, Send, Calendar, Home, ChevronUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ResearchForm, ResearchFormData } from "./ResearchForm";
import { ResearchDetailPage } from "./ResearchDetailPage";

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewResearch, setShowNewResearch] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);

  const [companies, setCompanies] = useState<any[]>([
    {
      id: "1",
      companyName: "Tesla Inc.",
      industrySector: "Automotive",
      name: "Tesla Inc.",
      type: "Financial Analysis",
      status: "completed",
      createdAt: "Feb 14, 2024",
      lastUpdated: "Feb 20, 2024",
      priority: "high",
      priorityLevel: "high",
      assignee: "Sarah Chen",
      assignedTo: "Sarah Chen",
      researchFocusAreas: [
        "competitor-benchmarking",
        "product-competitiveness",
        "business-model-analysis"
      ],
      additionalNotes: "Complete financial analysis of Tesla's market position",
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
      companyName: "Rivian",
      industrySector: "Automotive",
      name: "Rivian",
      type: "Market Research",
      status: "processing",
      createdAt: "Feb 15, 2024",
      lastUpdated: "Feb 15, 2024",
      priority: "medium",
      priorityLevel: "medium",
      assignee: "Alex Park",
      assignedTo: "Alex Park",
      researchFocusAreas: [
        "competitor-benchmarking",
        "market-share-data",
        "funding-activity"
      ],
      additionalNotes: "Market research on electric vehicle startup positioning"
    },
    {
      id: "3",
      companyName: "SpaceX",
      industrySector: "Aerospace",
      name: "SpaceX",
      type: "Network Analysis",
      status: "completed",
      createdAt: "Feb 13, 2024",
      lastUpdated: "Feb 18, 2024",
      priority: "high",
      priorityLevel: "high",
      assignee: "Maria Rodriguez",
      assignedTo: "Maria Rodriguez",
      researchFocusAreas: [
        "competitor-benchmarking",
        "funding-activity",
        "technical-stack"
      ],
      additionalNotes: "Network analysis and competitive positioning in aerospace",
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
      id: 4,
      companyName: "Tesla Inc.",
      industrySector: "Automotive",
      status: "completed" as const,
      priorityLevel: "high" as const,
      assignedTo: "John Smith",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      company: "Tesla Inc.",
      dueDate: "Completed Jan 20, 2024",
      researchFocusAreas: [
        "competitor-benchmarking",
        "product-competitiveness", 
        "business-model-analysis",
        "market-share-data",
        "industry-trends",
        "market-sizing"
      ],
      additionalNotes: "Comprehensive analysis of Tesla's market position and competitive landscape.",
      badges: [
        { label: "Automotive", color: "bg-blue-100 text-blue-600" },
        { label: "High Priority", color: "bg-red-100 text-red-600" },
        { label: "Completed", color: "bg-green-100 text-green-600" }
      ],
      members: 3
    },
    {
      id: 5,
      companyName: "SpaceX",
      industrySector: "Aerospace",
      status: "completed" as const,
      priorityLevel: "medium" as const,
      assignedTo: "Sarah Johnson",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-18",
      company: "SpaceX",
      dueDate: "Completed Jan 18, 2024",
      researchFocusAreas: [
        "competitor-benchmarking",
        "funding-activity",
        "technical-stack",
        "industry-trends"
      ],
      additionalNotes: "Analysis of SpaceX's competitive position in commercial space industry.",
      badges: [
        { label: "Aerospace", color: "bg-purple-100 text-purple-600" },
        { label: "Medium Priority", color: "bg-yellow-100 text-yellow-600" },
        { label: "Completed", color: "bg-green-100 text-green-600" }
      ],
      members: 2
    },
    {
      id: 6,
      companyName: "OpenAI",
      industrySector: "Technology",
      status: "processing" as const,
      priorityLevel: "high" as const,
      assignedTo: "Mike Wilson",
      createdAt: "2024-01-22",
      lastUpdated: "2024-01-23",
      company: "OpenAI",
      dueDate: "Due Jan 30, 2024",
      researchFocusAreas: [
        "competitor-benchmarking",
        "product-competitiveness",
        "funding-activity",
        "technical-stack"
      ],
      additionalNotes: "Research on OpenAI's competitive position in AI/ML market.",
      badges: [
        { label: "Technology", color: "bg-blue-100 text-blue-600" },
        { label: "High Priority", color: "bg-red-100 text-red-600" },
        { label: "Processing", color: "bg-yellow-100 text-yellow-600" }
      ],
      members: 4
    },
    {
      id: 7,
      companyName: "Netflix",
      industrySector: "Entertainment",
      status: "completed" as const,
      priorityLevel: "low" as const,
      assignedTo: "Emma Davis",
      createdAt: "2024-01-08",
      lastUpdated: "2024-01-15",
      company: "Netflix",
      dueDate: "Completed Jan 15, 2024",
      researchFocusAreas: [
        "competitor-benchmarking",
        "market-share-data",
        "business-model-analysis"
      ],
      additionalNotes: "Streaming market analysis and competitive positioning.",
      badges: [
        { label: "Entertainment", color: "bg-pink-100 text-pink-600" },
        { label: "Low Priority", color: "bg-green-100 text-green-600" },
        { label: "Completed", color: "bg-green-100 text-green-600" }
      ],
      members: 2
    },
    {
      id: 8,
      companyName: "Amazon",
      industrySector: "E-commerce",
      status: "completed" as const,
      priorityLevel: "medium" as const,
      assignedTo: "Alex Brown",
      createdAt: "2024-01-05",
      lastUpdated: "2024-01-12",
      company: "Amazon",
      dueDate: "Completed Jan 12, 2024",
      researchFocusAreas: [
        "competitor-benchmarking",
        "business-model-analysis",
        "market-share-data",
        "product-deep-dives"
      ],
      additionalNotes: "E-commerce and cloud services competitive analysis.",
      badges: [
        { label: "E-commerce", color: "bg-orange-100 text-orange-600" },
        { label: "Medium Priority", color: "bg-yellow-100 text-yellow-600" },
        { label: "Completed", color: "bg-green-100 text-green-600" }
      ],
      members: 3
    }
  ];

  const handleNewResearch = (formData: ResearchFormData) => {
    const newCompany = {
      id: Date.now().toString(),
      name: formData.companyName,
      type: "Market Research",
      status: "processing" as const,
      createdAt: new Date().toLocaleDateString(),
      lastUpdated: new Date().toLocaleDateString(),
      priority: formData.priorityLevel,
      assignee: formData.assignedTo,
      companyName: formData.companyName,
      industrySector: formData.industrySector,
      researchFocusAreas: formData.researchFocusAreas,
      additionalNotes: formData.additionalNotes,
      priorityLevel: formData.priorityLevel,
      assignedTo: formData.assignedTo
    };

    setCompanies([newCompany, ...companies]);
    setShowNewResearch(false);
    setSelectedCompany(newCompany);

    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setCompanies(prev => prev.map(company => 
        company.id === newCompany.id 
          ? { ...company, status: "completed" as const }
          : company
      ));
      if (selectedCompany?.id === newCompany.id) {
        setSelectedCompany({ ...newCompany, status: "completed" as const });
      }
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

  // Show Research Form
  if (showNewResearch) {
    return (
      <ResearchForm
        onBack={() => setShowNewResearch(false)}
        onSubmit={handleNewResearch}
      />
    );
  }

  // Show Edit Research Form
  if (editingCompany) {
    return (
      <ResearchForm
        onBack={() => setEditingCompany(null)}
        onSubmit={(formData) => {
          // Update existing company
          setCompanies(prev => prev.map(company => 
            company.id === editingCompany.id 
              ? { ...company, ...formData, lastUpdated: new Date().toLocaleDateString() }
              : company
          ));
          setEditingCompany(null);
          setSelectedCompany({ ...editingCompany, ...formData });
        }}
        initialData={editingCompany}
      />
    );
  }

  if (selectedCompany) {
    return (
      <ResearchDetailPage
        onBack={() => setSelectedCompany(null)}
        onEdit={() => setEditingCompany(selectedCompany)}
        researchData={selectedCompany}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col">

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
              <div className="flex gap-2 items-center">
                <input 
                  type="text" 
                  placeholder="👋 Ask me about any company or contact"
                  className="flex-1 px-3 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                  readOnly
                />
                <Button size="sm" className="bg-[#0f1951] hover:bg-[#0f1951]/90 h-12 px-4 text-sm">
                  Ask
                </Button>
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