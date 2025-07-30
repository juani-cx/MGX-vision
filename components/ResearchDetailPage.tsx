
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
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{researchData.companyName}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-600">{researchData.industrySector}</span>
                <Badge className={getStatusColor(researchData.status)}>
                  {researchData.status}
                </Badge>
                <Badge className={getPriorityColor(researchData.priorityLevel)}>
                  {researchData.priorityLevel} priority
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={onEdit} className="bg-[#0f1951] hover:bg-[#0f1951]/90 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Research
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Research Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-medium">{researchData.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{researchData.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium">{researchData.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Focus Areas</p>
                  <div className="space-y-1 mt-1">
                    {researchData.researchFocusAreas?.map(area => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {focusAreaLabels[area]}
                      </Badge>
                    )) || <p className="text-sm text-gray-500">No focus areas defined</p>}
                  </div>
                </div>
                {researchData.additionalNotes && (
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-sm mt-1">{researchData.additionalNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <Tabs defaultValue={researchData.researchFocusAreas?.[0] || "overview"} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-2 h-auto p-1">
                {researchData.researchFocusAreas?.slice(0, 6).map(area => (
                  <TabsTrigger
                    key={area}
                    value={area}
                    className="text-xs px-2 py-2 data-[state=active]:bg-[#0f1951] data-[state=active]:text-white"
                  >
                    {focusAreaLabels[area]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {researchData.researchFocusAreas?.map(area => {
                const mockData = mockDataMap[area];
                if (!mockData) return null;

                return (
                  <TabsContent key={area} value={area}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{mockData.title}</CardTitle>
                            <CardDescription>
                              AI-generated insights and analysis
                            </CardDescription>
                          </div>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Section
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none">
                          {/* Render specific content based on area type */}
                          {area === "competitor-benchmarking" && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold mb-3">Main Competitors</h4>
                                <div className="space-y-2">
                                  {mockData.content.mainCompetitors.map((competitor: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-3">
                                      <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-medium">{competitor.name}</h5>
                                        <Badge variant="outline">{competitor.marketShare}</Badge>
                                      </div>
                                      <p className="text-sm text-gray-600">{competitor.strength}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3">Competitive Advantages</h4>
                                <ul className="space-y-1">
                                  {mockData.content.competitiveAdvantages.map((advantage: string, index: number) => (
                                    <li key={index} className="text-sm">• {advantage}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {area === "market-share-data" && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 border rounded-lg">
                                  <div className="text-2xl font-bold text-blue-600">
                                    {mockData.content.globalEVMarket.teslaShare}
                                  </div>
                                  <div className="text-sm text-gray-600">Global EV Market Share</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                  <div className="text-2xl font-bold text-green-600">
                                    #{mockData.content.globalEVMarket.rank}
                                  </div>
                                  <div className="text-sm text-gray-600">Market Position</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                  <div className="text-2xl font-bold text-purple-600">
                                    {mockData.content.globalEVMarket.yearOverYear}
                                  </div>
                                  <div className="text-sm text-gray-600">YoY Growth</div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3">Regional Breakdown</h4>
                                <div className="space-y-2">
                                  {mockData.content.regionalBreakdown.map((region: any, index: number) => (
                                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                                      <span>{region.region}</span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{region.share}</span>
                                        <Badge variant={region.trend === "growing" ? "default" : "secondary"}>
                                          {region.trend}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Default content structure for other areas */}
                          {!["competitor-benchmarking", "market-share-data"].includes(area) && (
                            <div className="space-y-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Key Insights</h4>
                                <p className="text-sm text-gray-600">
                                  This section contains AI-generated analysis for {mockData.title.toLowerCase()}. 
                                  The content will be populated based on research findings and data analysis.
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                  <h5 className="font-medium mb-2">Primary Data Points</h5>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div>• Data point 1</div>
                                    <div>• Data point 2</div>
                                    <div>• Data point 3</div>
                                  </div>
                                </div>
                                
                                <div className="border rounded-lg p-4">
                                  <h5 className="font-medium mb-2">Analysis Summary</h5>
                                  <p className="text-sm text-gray-600">
                                    Comprehensive analysis results will appear here once the AI research is complete.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Editable Notes Section */}
                          <div className="mt-6 border-t pt-6">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">Additional Notes</h4>
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
                                className="min-h-[100px]"
                              />
                            ) : (
                              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                                Click edit to add your notes and observations for this section.
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              }) || (
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Research Overview</CardTitle>
                      <CardDescription>
                        This research task is still being configured.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 rounded-lg p-4">
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

          {/* AI Assistant Panel */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">AI</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI Assistant</CardTitle>
                      <p className="text-sm text-gray-600">Ready to help with analysis</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 mb-3">Quick Actions:</p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => {/* Handle summary generation */}}
                    >
                      📊 Generate Summary
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => {/* Handle financial report */}}
                    >
                      💼 Financial Report
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => {/* Handle competitor analysis */}}
                    >
                      🏢 Competitor Analysis
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => {/* Handle market insights */}}
                    >
                      📈 Market Insights
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => {/* Handle risk assessment */}}
                    >
                      ⚠️ Risk Assessment
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> Click any action above to get AI-powered insights for this research.
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">Ask me anything:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Type your question..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button size="sm" className="bg-[#0f1951] hover:bg-[#0f1951]/90">
                        Ask
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
