
import { useState } from "react";
import { ArrowLeft, Edit, Save, Eye, EyeOff, Plus, Download, Share } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ResearchFormData } from "./ResearchForm";

interface ResearchDetailPageProps {
  onBack: () => void;
  onEdit: () => void;
  researchData: ResearchFormData & {
    id: string;
    status: "processing" | "completed" | "draft";
    createdAt: string;
    lastUpdated: string;
  };
}

const mockDataMap: Record<string, any> = {
  "competitor-benchmarking": {
    title: "Competitor Benchmarking",
    content: {
      mainCompetitors: [
        { name: "Ford Motor Company", marketShare: "13.4%", strength: "Traditional manufacturing expertise" },
        { name: "General Motors", marketShare: "16.8%", strength: "Diverse portfolio and infrastructure" },
        { name: "Volkswagen Group", marketShare: "9.2%", strength: "Global presence and EV investment" }
      ],
      competitiveAdvantages: [
        "Industry-leading battery technology and energy density",
        "Vertically integrated manufacturing approach",
        "Strong brand recognition and customer loyalty",
        "Extensive Supercharger network infrastructure"
      ],
      keyMetrics: [
        { metric: "Market Valuation", company: "$612B", competitors: "Ford: $48B, GM: $58B" },
        { metric: "Vehicle Deliveries (2023)", company: "1.81M", competitors: "Ford: 2.0M, GM: 2.2M" },
        { metric: "R&D Investment", company: "8.1% of revenue", competitors: "Ford: 6.2%, GM: 5.8%" }
      ]
    }
  },
  "product-competitiveness": {
    title: "Product Competitiveness",
    content: {
      productAnalysis: [
        {
          category: "Electric Vehicles",
          strengths: ["Superior range and performance", "Advanced autopilot features", "Over-the-air updates"],
          weaknesses: ["Higher price point", "Limited service network", "Build quality concerns"],
          competitorComparison: "Leads in technology but faces pricing pressure from emerging competitors"
        },
        {
          category: "Energy Storage",
          strengths: ["Proven utility-scale deployments", "Cost-effective solutions", "Integrated software platform"],
          weaknesses: ["Supply chain dependencies", "Limited product variants"],
          competitorComparison: "Strong position but facing increased competition from traditional energy companies"
        }
      ],
      innovationIndex: 8.7,
      customerSatisfaction: "87%",
      marketReception: "Strong brand loyalty with growing concerns about value proposition"
    }
  },
  "business-model-analysis": {
    title: "Business Model Analysis",
    content: {
      revenueStreams: [
        { stream: "Automotive Sales", percentage: "81%", growth: "+19%" },
        { stream: "Energy Generation & Storage", percentage: "7%", growth: "+40%" },
        { stream: "Services", percentage: "8%", growth: "+25%" },
        { stream: "Other", percentage: "4%", growth: "+15%" }
      ],
      costStructure: {
        manufacturing: "67%",
        rd: "8%",
        marketing: "3%",
        administrative: "12%",
        other: "10%"
      },
      keyPartners: [
        "Panasonic (Battery manufacturing)",
        "NVIDIA (AI computing)",
        "Various lithium suppliers",
        "Gigafactory partners"
      ],
      valueProposition: "Accelerating the world's transition to sustainable energy through integrated transportation and energy solutions"
    }
  },
  "market-share-data": {
    title: "Market Share Data",
    content: {
      globalEVMarket: {
        teslaShare: "20.8%",
        rank: 1,
        yearOverYear: "+15%"
      },
      regionalBreakdown: [
        { region: "North America", share: "48.5%", trend: "declining" },
        { region: "Europe", share: "16.2%", trend: "stable" },
        { region: "China", share: "8.9%", trend: "growing" },
        { region: "Other", share: "12.1%", trend: "growing" }
      ],
      marketSegments: [
        { segment: "Luxury EV", share: "65%", competition: "High" },
        { segment: "Mid-range EV", share: "23%", competition: "Very High" },
        { segment: "Energy Storage", share: "18%", competition: "Medium" }
      ]
    }
  },
  "industry-trends": {
    title: "Industry Trends and Tailwinds",
    content: {
      majorTrends: [
        {
          trend: "Government EV Incentives",
          impact: "High",
          description: "Global push for EV adoption through subsidies and regulations",
          timeline: "2024-2030"
        },
        {
          trend: "Battery Technology Advancement",
          impact: "High",
          description: "Improved energy density and reduced costs driving adoption",
          timeline: "2024-2027"
        },
        {
          trend: "Charging Infrastructure Expansion",
          impact: "Medium",
          description: "Rapid deployment of charging networks reducing range anxiety",
          timeline: "2024-2028"
        }
      ],
      tailwinds: [
        "Increasing environmental awareness",
        "Declining battery costs",
        "Expanding charging infrastructure",
        "Regulatory support for clean energy"
      ],
      headwinds: [
        "Economic uncertainty affecting luxury purchases",
        "Increasing competition from traditional automakers",
        "Supply chain constraints for key materials",
        "Potential changes in government incentives"
      ]
    }
  },
  "market-sizing": {
    title: "Market Sizing and Growth Rates",
    content: {
      totalAddressableMarket: "$2.3T by 2030",
      serviceableMarket: "$850B by 2030",
      currentMarketSize: "$388B (2024)",
      growthRates: [
        { segment: "Global EV Market", cagr: "22.1%", period: "2024-2030" },
        { segment: "Energy Storage", cagr: "31.8%", period: "2024-2030" },
        { segment: "Autonomous Driving", cagr: "28.4%", period: "2024-2030" }
      ],
      geographicGrowth: [
        { region: "Asia Pacific", growth: "26.3%", drivers: ["Government support", "Manufacturing scale"] },
        { region: "North America", growth: "18.7%", drivers: ["Infrastructure investment", "Consumer adoption"] },
        { region: "Europe", growth: "21.2%", drivers: ["Regulatory requirements", "Environmental consciousness"] }
      ]
    }
  },
  "funding-activity": {
    title: "Funding Activity",
    content: {
      recentFunding: [
        { round: "Secondary Offering", amount: "$5.0B", date: "Q2 2024", valuation: "$580B" },
        { round: "Green Bonds", amount: "$2.0B", date: "Q1 2024", purpose: "Manufacturing expansion" }
      ],
      competitorFunding: [
        { company: "Rivian", amount: "$1.3B", date: "Q1 2024", stage: "Public Company" },
        { company: "Lucid Motors", amount: "$915M", date: "Q4 2023", stage: "Public Company" },
        { company: "NIO", amount: "$2.1B", date: "Q3 2023", stage: "Strategic Investment" }
      ],
      investmentTrends: [
        "Increased focus on manufacturing capacity expansion",
        "Growing investment in battery technology and supply chain",
        "Shift toward sustainable energy solutions integration",
        "Rising interest in autonomous driving capabilities"
      ]
    }
  },
  "product-deep-dives": {
    title: "Product Deep Dives",
    content: {
      products: [
        {
          name: "Model Y",
          category: "Compact SUV",
          specifications: {
            range: "330 miles",
            acceleration: "0-60 mph in 4.8s",
            price: "$47,740",
            autonomy: "Full Self-Driving Capable"
          },
          marketPosition: "Best-selling electric SUV globally",
          competitiveAnalysis: "Competes with BMW iX3, Audi e-tron, Mercedes EQC"
        },
        {
          name: "Cybertruck",
          category: "Electric Pickup",
          specifications: {
            range: "up to 500 miles",
            towingCapacity: "11,000 lbs",
            price: "from $60,990",
            features: "Bulletproof exterior, air suspension"
          },
          marketPosition: "Revolutionary design targeting truck market",
          competitiveAnalysis: "Competes with Ford F-150 Lightning, Rivian R1T"
        }
      ],
      productRoadmap: [
        { product: "Next-Gen Roadster", timeline: "2025", status: "Development" },
        { product: "Semi Truck", timeline: "2024", status: "Limited Production" },
        { product: "Model 2 (Affordable)", timeline: "2025", status: "Design Phase" }
      ]
    }
  },
  "technical-stack": {
    title: "Technical Stack Details",
    content: {
      coreInfrastructure: [
        {
          category: "Manufacturing",
          technologies: ["Advanced robotics", "AI-driven quality control", "Vertical integration"],
          capabilities: "Highly automated production with focus on efficiency and scalability"
        },
        {
          category: "Software Platform",
          technologies: ["Over-the-air updates", "Neural networks", "Real-time data processing"],
          capabilities: "Continuous improvement and feature deployment without service visits"
        },
        {
          category: "Energy Management",
          technologies: ["Battery management systems", "Grid integration", "Energy optimization algorithms"],
          capabilities: "Intelligent energy storage and distribution across products"
        }
      ],
      proprietaryTechnology: [
        "4680 battery cell technology",
        "Full Self-Driving (FSD) neural networks",
        "Supercharger network management system",
        "Integrated manufacturing execution systems"
      ],
      technicalAdvantages: [
        "Vertical integration enabling rapid innovation",
        "Real-time vehicle data collection and analysis",
        "Proprietary battery technology and manufacturing",
        "Advanced AI and machine learning capabilities"
      ]
    }
  }
};

export function ResearchDetailPage({ onBack, onEdit, researchData }: ResearchDetailPageProps) {
  const [editMode, setEditMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const focusAreaLabels: Record<string, string> = {
    "competitor-benchmarking": "Competitor Benchmarking",
    "product-competitiveness": "Product Competitiveness",
    "business-model-analysis": "Business Model Analysis",
    "market-share-data": "Market Share Data",
    "industry-trends": "Industry Trends and Tailwinds",
    "market-sizing": "Market Sizing and Growth Rates",
    "funding-activity": "Funding Activity",
    "product-deep-dives": "Product Deep Dives",
    "technical-stack": "Technical Stack Details"
  };

  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden">
      {/* Compact Header */}
      <div className="fixed top-20 left-56 right-80 z-30 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <button onClick={onBack} className="hover:text-gray-900">Dashboard</button>
              <span>/</span>
              <span className="text-gray-900">AI Research</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{researchData.companyName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">{researchData.industrySector}</span>
              <Badge className={getStatusColor(researchData.status)}>
                {researchData.status}
              </Badge>
              <Badge className={getPriorityColor(researchData.priorityLevel)}>
                {researchData.priorityLevel} priority
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button onClick={onEdit} className="bg-[#0f1951] hover:bg-[#0f1951]/90 text-white" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit Research
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex pt-[120px] h-full overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 h-full overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Research Overview</h3>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Assigned To</p>
              <p className="font-medium text-sm">{researchData.assignedTo}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Created</p>
              <p className="font-medium text-sm">{researchData.createdAt}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="font-medium text-sm">{researchData.lastUpdated}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Focus Areas</p>
              <div className="space-y-1">
                {researchData.researchFocusAreas && researchData.researchFocusAreas.length > 0 ? (
                  researchData.researchFocusAreas.map(area => (
                    <div key={area} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {focusAreaLabels[area]}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No focus areas defined</p>
                )}
              </div>
            </div>
            
            {researchData.additionalNotes && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Notes</p>
                <p className="text-sm">{researchData.additionalNotes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 h-full overflow-y-auto">
          <Tabs defaultValue={(researchData.researchFocusAreas && researchData.researchFocusAreas.length > 0) ? researchData.researchFocusAreas[0] : "overview"} className="space-y-4">
            {researchData.researchFocusAreas && researchData.researchFocusAreas.length > 0 && (
              <TabsList className="grid w-full grid-cols-3 gap-1 h-auto p-1">
                {researchData.researchFocusAreas.slice(0, 3).map(area => (
                  <TabsTrigger
                    key={area}
                    value={area}
                    className="text-xs px-3 py-2 data-[state=active]:bg-[#0f1951] data-[state=active]:text-white"
                  >
                    {focusAreaLabels[area]}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}

            {(researchData.researchFocusAreas || []).map(area => {
              const mockData = mockDataMap[area];
              if (!mockData) return null;

              return (
                <TabsContent key={area} value={area}>
                  <Card className="border shadow-none">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{mockData.title}</CardTitle>
                          <CardDescription className="text-sm">
                            AI-generated insights and analysis
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Section
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        {/* Content sections with similar structure as before but more compact */}
                        {area === "competitor-benchmarking" && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Key Insights</h4>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm text-gray-600">
                                  This section contains AI-generated analysis for competitor benchmarking. 
                                  The content will be populated based on research findings and data analysis.
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="border rounded-lg p-3">
                                <h5 className="font-medium mb-2 text-sm">Primary Data Points</h5>
                                <div className="space-y-1 text-xs text-gray-600">
                                  <div>• Data point 1</div>
                                  <div>• Data point 2</div>
                                  <div>• Data point 3</div>
                                </div>
                              </div>

                              <div className="border rounded-lg p-3">
                                <h5 className="font-medium mb-2 text-sm">Analysis Summary</h5>
                                <p className="text-xs text-gray-600">
                                  Comprehensive analysis results will appear here once the AI research is complete.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Default content for other areas */}
                        {area !== "competitor-benchmarking" && (
                          <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <h4 className="font-semibold mb-2 text-sm">Key Insights</h4>
                              <p className="text-sm text-gray-600">
                                This section contains AI-generated analysis for {mockData.title.toLowerCase()}. 
                                The content will be populated based on research findings and data analysis.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="border rounded-lg p-3">
                                <h5 className="font-medium mb-2 text-sm">Primary Data Points</h5>
                                <div className="space-y-1 text-xs text-gray-600">
                                  <div>• Data point 1</div>
                                  <div>• Data point 2</div>
                                  <div>• Data point 3</div>
                                </div>
                              </div>

                              <div className="border rounded-lg p-3">
                                <h5 className="font-medium mb-2 text-sm">Analysis Summary</h5>
                                <p className="text-xs text-gray-600">
                                  Comprehensive analysis results will appear here once the AI research is complete.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Editable Notes Section */}
                        <div className="mt-4 border-t pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">Additional Notes</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditMode(!editMode)}
                            >
                              {editMode ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                            </Button>
                          </div>
                          {editMode ? (
                            <Textarea
                              placeholder="Add your notes and observations..."
                              className="min-h-[80px] text-sm"
                            />
                          ) : (
                            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                              Click edit to add your notes and observations for this section.
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}

            {(!researchData.researchFocusAreas || researchData.researchFocusAreas.length === 0) && (
              <TabsContent value="overview">
                <Card className="border shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Research Overview</CardTitle>
                    <CardDescription className="text-sm">
                      This research task is still being configured.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        No research focus areas have been defined for this task yet. 
                        Click "Edit Research" to add focus areas and configure the analysis scope.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Fixed AI Assistant Panel - Full Height */}
        <div className="fixed top-20 right-0 w-80 h-[calc(100vh-80px)] bg-white border-l border-gray-200 z-10">
          <div className="p-4 h-full overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-gray-600">Ready to help with analysis</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-700 mb-2">Quick Actions:</p>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8"
                  onClick={() => {/* Handle summary generation */}}
                >
                  📊 Generate Summary
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8"
                  onClick={() => {/* Handle financial report */}}
                >
                  💼 Financial Report
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8"
                  onClick={() => {/* Handle competitor analysis */}}
                >
                  🏢 Competitor Analysis
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8"
                  onClick={() => {/* Handle market insights */}}
                >
                  📈 Market Insights
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8"
                  onClick={() => {/* Handle risk assessment */}}
                >
                  ⚠️ Risk Assessment
                </Button>
              </div>

              <div className="border-t pt-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    💡 <strong>Tip:</strong> Click any action above to get AI-powered insights for this research.
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 mb-2">Ask me anything:</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your question..."
                    className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button size="sm" className="bg-[#0f1951] hover:bg-[#0f1951]/90 h-7 px-3 text-xs">
                    Ask
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
