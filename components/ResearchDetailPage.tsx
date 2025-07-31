
import { useState } from "react";
import { ArrowLeft, Edit, Save, Eye, EyeOff, Plus, Download, Share, ExternalLink } from "lucide-react";
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
    summary: "Tesla maintains a strong competitive position in the EV market with superior technology and brand recognition, though faces increasing pressure from traditional automakers entering the space. Key differentiators include battery technology, charging infrastructure, and over-the-air updates.",
    keyMetrics: [
      { metric: "Market Position", value: "#1 EV Brand Globally", benchmark: "20.8% market share" },
      { metric: "Brand Value", value: "$66.2B", benchmark: "vs Ford $13.8B, GM $12.4B" },
      { metric: "Charging Network", value: "50,000+ Superchargers", benchmark: "Largest fast-charging network" },
      { metric: "Technology Lead", value: "8-10 years", benchmark: "In autonomous driving" }
    ],
    competitors: [
      { name: "Ford Motor Company", marketShare: "13.4%", strength: "Traditional manufacturing expertise", weakness: "Limited EV portfolio" },
      { name: "General Motors", marketShare: "16.8%", strength: "Diverse portfolio and infrastructure", weakness: "Late to EV transition" },
      { name: "Volkswagen Group", marketShare: "9.2%", strength: "Global presence and EV investment", weakness: "Software challenges" },
      { name: "BYD", marketShare: "15.7%", strength: "Cost-effective solutions", weakness: "Limited global presence" },
      { name: "Mercedes-Benz", marketShare: "4.8%", strength: "Luxury positioning", weakness: "Premium pricing" }
    ],
    sources: [
      "BloombergNEF EV Outlook 2024",
      "Tesla Q3 2024 Earnings Report",
      "McKinsey Global EV Report",
      "Company financial statements"
    ]
  },
  "product-competitiveness": {
    title: "Product Competitiveness",
    summary: "Tesla's product portfolio leads in technology integration and performance metrics, particularly in battery efficiency and autonomous driving capabilities. However, traditional automakers are closing the gap in build quality and manufacturing scale.",
    keyMetrics: [
      { metric: "Range Leadership", value: "405 miles (Model S)", benchmark: "Best in class" },
      { metric: "Charging Speed", value: "250kW Supercharging", benchmark: "Industry leading" },
      { metric: "Autopilot Miles", value: "8B+ miles driven", benchmark: "Largest dataset" },
      { metric: "OTA Updates", value: "Monthly releases", benchmark: "Most frequent" }
    ],
    features: [
      { 
        category: "Battery Technology", 
        tesla: "4680 cells, 95% efficiency", 
        competitors: "Standard lithium-ion, 85-90%",
        advantage: "15-20% better energy density"
      },
      { 
        category: "Autonomous Driving", 
        tesla: "Full Self-Driving Beta", 
        competitors: "Level 2 ADAS",
        advantage: "Advanced neural networks"
      },
      { 
        category: "Software Platform", 
        tesla: "Integrated OS, OTA updates", 
        competitors: "Third-party systems",
        advantage: "Seamless user experience"
      }
    ],
    sources: [
      "EPA vehicle efficiency ratings",
      "IIHS safety test results",
      "Consumer Reports reliability data"
    ]
  },
  "business-model-analysis": {
    title: "Business Model Analysis",
    summary: "Tesla operates a vertically integrated business model combining automotive manufacturing, energy storage, and services. Revenue diversification beyond vehicles is growing, with energy and services representing increasing portions of total revenue.",
    revenueStreams: [
      { stream: "Automotive Sales", percentage: "81%", amount: "$71.5B", growth: "+19% YoY" },
      { stream: "Energy Generation & Storage", percentage: "7%", amount: "$6.2B", growth: "+40% YoY" },
      { stream: "Services & Other", percentage: "8%", amount: "$7.1B", growth: "+25% YoY" },
      { stream: "Leasing", percentage: "4%", amount: "$3.5B", growth: "+15% YoY" }
    ],
    pricingModel: {
      strategy: "Premium pricing with mass market expansion",
      structure: "Direct-to-consumer sales",
      margins: "Automotive: 16.9%, Energy: 10.2%"
    },
    customerSegments: [
      "Early adopters and tech enthusiasts",
      "Environmentally conscious consumers",
      "Premium vehicle buyers",
      "Commercial fleet operators"
    ],
    sources: [
      "Tesla SEC 10-K filings",
      "Quarterly earnings reports",
      "Industry analysis reports"
    ]
  },
  "market-share-data": {
    title: "Market Share Data",
    summary: "Tesla commands the largest share of the global EV market at 20.8%, though this represents a decline from previous years as competition intensifies. Regional performance varies significantly, with strongest positions in North America and growing presence in China.",
    globalShare: {
      current: "20.8%",
      rank: "#1",
      change: "-2.3% YoY",
      totalEVs: "1.81M vehicles delivered"
    },
    regionalBreakdown: [
      { region: "North America", share: "48.5%", trend: "Declining (-5% YoY)", deliveries: "664K" },
      { region: "China", share: "8.9%", trend: "Growing (+12% YoY)", deliveries: "947K" },
      { region: "Europe", share: "16.2%", trend: "Stable (+1% YoY)", deliveries: "254K" },
      { region: "Other Markets", share: "12.1%", trend: "Growing (+8% YoY)", deliveries: "89K" }
    ],
    marketSegments: [
      { segment: "Luxury EV ($50K+)", share: "65%", competition: "High - Mercedes EQS, BMW iX" },
      { segment: "Mid-range EV ($30-50K)", share: "23%", competition: "Very High - Model Y competitors" },
      { segment: "Energy Storage", share: "18%", competition: "Medium - Utility scale projects" }
    ],
    sources: [
      "EV-Volumes.com quarterly data",
      "Tesla delivery reports",
      "Regional automotive associations"
    ]
  },
  "industry-trends": {
    title: "Industry Trends and Tailwinds",
    summary: "The EV industry benefits from strong regulatory support, declining battery costs, and increasing consumer acceptance. However, supply chain constraints and economic uncertainty present challenges to sustained growth rates.",
    majorTrends: [
      {
        trend: "Government EV Incentives",
        impact: "High Positive",
        description: "IRA tax credits, EU regulations, China NEV mandates driving adoption",
        timeline: "2024-2030",
        effect: "+15-20% demand boost"
      },
      {
        trend: "Battery Cost Reduction",
        impact: "High Positive",
        description: "LFP adoption, manufacturing scale driving 15% annual cost reduction",
        timeline: "2024-2027",
        effect: "Improved margins, lower prices"
      },
      {
        trend: "Charging Infrastructure Expansion",
        impact: "Medium Positive",
        description: "Public and private investment in charging networks",
        timeline: "2024-2028",
        effect: "Reduced range anxiety"
      },
      {
        trend: "Traditional OEM Competition",
        impact: "High Negative",
        description: "Ford F-150 Lightning, GM Ultium, VW ID series gaining traction",
        timeline: "2024-2026",
        effect: "Market share pressure"
      }
    ],
    regulatoryFactors: [
      "EU ban on ICE vehicles by 2035",
      "California zero-emission vehicle mandate",
      "China dual-credit policy"
    ],
    sources: [
      "IEA Global EV Outlook 2024",
      "BloombergNEF battery price survey",
      "Government policy announcements"
    ]
  },
  "market-sizing": {
    title: "Market Sizing and Growth Rates",
    summary: "The global EV market is projected to reach $2.3T by 2030, driven by regulatory mandates, technological improvements, and changing consumer preferences. Tesla's addressable market continues expanding beyond automotive into energy and services.",
    marketSize: {
      tam: "$2.3T by 2030",
      sam: "$850B by 2030",
      som: "$180B by 2030",
      current: "$388B (2024)"
    },
    growthRates: [
      { segment: "Global EV Market", cagr: "22.1%", period: "2024-2030", driver: "Government mandates" },
      { segment: "Battery Storage", cagr: "31.8%", period: "2024-2030", driver: "Grid modernization" },
      { segment: "Autonomous Vehicles", cagr: "28.4%", period: "2024-2030", driver: "Technology maturation" },
      { segment: "Charging Infrastructure", cagr: "25.6%", period: "2024-2030", driver: "Public/private investment" }
    ],
    geographicGrowth: [
      { region: "Asia Pacific", growth: "26.3% CAGR", drivers: ["Government support", "Manufacturing scale", "Urban density"] },
      { region: "North America", growth: "18.7% CAGR", drivers: ["IRA incentives", "Infrastructure investment"] },
      { region: "Europe", growth: "21.2% CAGR", drivers: ["EU regulations", "Environmental consciousness"] }
    ],
    sources: [
      "McKinsey EV Market Analysis",
      "Grand View Research reports",
      "Wood Mackenzie forecasts"
    ]
  },
  "funding-activity": {
    title: "Funding Activity",
    summary: "Tesla has transitioned from frequent capital raises to self-funding growth through operational cash flow. The company maintains strong balance sheet position while competitors and new entrants continue raising significant capital.",
    teslaFunding: {
      totalRaised: "$20.2B lifetime",
      lastRound: "Secondary offering - $5.0B (Q2 2024)",
      currentValuation: "$580B market cap",
      cashPosition: "$18.3B (Q3 2024)"
    },
    recentActivity: [
      { round: "Secondary Offering", amount: "$5.0B", date: "Q2 2024", purpose: "General corporate purposes" },
      { round: "Green Bonds", amount: "$2.0B", date: "Q1 2024", purpose: "Gigafactory expansion" },
      { round: "Credit Facility", amount: "$3.5B", date: "Q4 2023", purpose: "Working capital" }
    ],
    competitorFunding: [
      { company: "Rivian", amount: "$12B IPO + $1.3B", date: "2024", stage: "Public company scaling" },
      { company: "Lucid Motors", amount: "$4.4B SPAC + $915M", date: "2024", stage: "Production ramp" },
      { company: "Fisker", amount: "$1.0B SPAC", date: "2024", stage: "Struggling operations" },
      { company: "Canoo", amount: "$600M", date: "2023", stage: "Pre-production" }
    ],
    investmentTrends: [
      "Focus shifting from startups to scaling production",
      "Traditional OEMs investing heavily in EV transition",
      "Battery and charging infrastructure attracting capital",
      "Autonomous driving technology consolidation"
    ],
    sources: [
      "PitchBook venture data",
      "Company SEC filings",
      "Crunchbase funding tracker"
    ]
  },
  "product-deep-dives": {
    title: "Product Deep Dives",
    summary: "Tesla's product portfolio spans consumer vehicles, commercial transport, and energy solutions. Each product line demonstrates the company's integrated approach to sustainable energy and transportation.",
    vehicles: [
      {
        name: "Model Y",
        category: "Compact Luxury SUV",
        specifications: {
          range: "330 miles EPA",
          acceleration: "0-60 mph in 4.8s",
          price: "$47,740 base",
          features: "Autopilot, OTA updates, glass roof"
        },
        marketPosition: "Best-selling EV globally, competes with BMW X3, Audi Q5",
        performance: "82% customer satisfaction, 5-star safety rating"
      },
      {
        name: "Model 3",
        category: "Luxury Sedan",
        specifications: {
          range: "358 miles EPA",
          acceleration: "0-60 mph in 5.8s",
          price: "$38,990 base",
          features: "Minimalist interior, 15\" touchscreen"
        },
        marketPosition: "Volume leader, competes with BMW 3 Series, Mercedes C-Class",
        performance: "Best-selling luxury sedan globally"
      },
      {
        name: "Cybertruck",
        category: "Electric Pickup",
        specifications: {
          range: "up to 500 miles",
          towingCapacity: "11,000 lbs",
          price: "from $60,990",
          features: "Bulletproof exterior, air suspension, bed power outlets"
        },
        marketPosition: "Revolutionary design targeting Ford F-150, Chevy Silverado",
        performance: "2M+ reservations, production ramping"
      }
    ],
    energyProducts: [
      {
        name: "Solar Roof",
        description: "Integrated solar tiles replacing traditional roofing",
        pricing: "$21.85/sq ft",
        targetMarket: "Premium residential customers"
      },
      {
        name: "Powerwall",
        description: "Home battery storage system",
        capacity: "13.5 kWh usable",
        pricing: "$11,500 before incentives"
      },
      {
        name: "Megapack",
        description: "Utility-scale energy storage",
        capacity: "3.9 MWh",
        applications: "Grid stabilization, renewable integration"
      }
    ],
    roadmap: [
      { product: "Next-Gen Roadster", timeline: "2025", status: "Development", details: "0-60 in 1.9s, 620 mile range" },
      { product: "Semi", timeline: "2024-2025", status: "Limited production", details: "500 mile range, Megacharging" },
      { product: "Model 2", timeline: "2025-2026", status: "Design phase", details: "$25K target price" }
    ],
    sources: [
      "Tesla product specifications",
      "EPA efficiency ratings",
      "Customer reviews and ratings"
    ]
  },
  "technical-stack": {
    title: "Technical Stack Details", 
    summary: "Tesla's technical architecture emphasizes vertical integration, real-time data processing, and continuous software deployment. The company's tech stack enables unique capabilities in vehicle autonomy, energy management, and manufacturing optimization.",
    coreInfrastructure: [
      {
        category: "Vehicle Software Platform",
        technologies: ["Custom Linux OS", "Qt framework", "Neural networks", "Real-time systems"],
        capabilities: "Over-the-air updates, autonomous driving, infotainment integration"
      },
      {
        category: "Manufacturing Systems",
        technologies: ["Advanced robotics", "AI quality control", "MES systems", "IoT sensors"],
        capabilities: "Lights-out manufacturing, predictive maintenance, real-time optimization"
      },
      {
        category: "Energy Management",
        technologies: ["Battery management systems", "Grid integration APIs", "ML optimization"],
        capabilities: "Vehicle-to-grid, smart charging, energy arbitrage"
      },
      {
        category: "Data Platform",
        technologies: ["Distributed computing", "Real-time analytics", "ML pipelines", "Edge computing"],
        capabilities: "Fleet learning, predictive maintenance, usage optimization"
      }
    ],
    proprietaryTechnology: [
      "Full Self-Driving (FSD) neural networks - Custom AI chips and algorithms",
      "4680 battery cell technology - Tabless design, silicon nanowire",
      "Dojo supercomputer - Custom training infrastructure for AI models",
      "Supercharger network management - Load balancing and optimization",
      "Tesla Bot (Optimus) - Humanoid robot leveraging FSD technology"
    ],
    developmentPractices: {
      deployment: "Continuous deployment with staged rollouts",
      testing: "Shadow mode testing, simulation environments",
      monitoring: "Real-time fleet telemetry, predictive analytics",
      security: "Over-the-air security updates, encrypted communications"
    },
    dataArchitecture: {
      collection: "8B+ miles of driving data, manufacturing telemetry",
      processing: "Real-time edge computing, cloud data lakes",
      storage: "Distributed systems, time-series databases",
      analytics: "ML models, statistical analysis, A/B testing"
    },
    sources: [
      "Tesla AI Day presentations",
      "Patent filings and technical papers",
      "Engineering blog posts and interviews"
    ]
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

  // Group focus areas into tabs
  const getTabGroups = () => {
    const focusAreas = researchData.researchFocusAreas || [];
    const tabGroups = {
      overview: { label: "Overview", areas: [] as string[] },
      market: { label: "Market Landscape", areas: ["market-share-data", "market-sizing", "industry-trends"] },
      competitive: { label: "Competitive Analysis", areas: ["competitor-benchmarking", "product-competitiveness", "product-deep-dives"] },
      business: { label: "Business Profile", areas: ["business-model-analysis", "funding-activity"] },
      technical: { label: "Technical Profile", areas: ["technical-stack"] }
    };

    // Filter tab groups to only include those with matching focus areas
    const availableTabs = Object.entries(tabGroups).filter(([key, group]) => {
      if (key === "overview") return true;
      return group.areas.some(area => focusAreas.includes(area));
    });

    return availableTabs;
  };

  const renderMetricsTable = (metrics: any[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium">Metric</th>
            <th className="text-left py-2 font-medium">Value</th>
            <th className="text-left py-2 font-medium">Benchmark</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2">{metric.metric}</td>
              <td className="py-2 font-medium">{metric.value}</td>
              <td className="py-2 text-gray-600">{metric.benchmark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSources = (sources: string[]) => (
    <div className="mt-4 pt-4 border-t">
      <h5 className="font-medium mb-2 text-sm">Sources</h5>
      <div className="space-y-1">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
            <ExternalLink className="w-3 h-3" />
            <span>{source}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentSection = (area: string, data: any) => {
    return (
      <div className="space-y-6">
        {/* Summary */}
        <div>
          <h4 className="font-semibold mb-3 text-base">{data.title}</h4>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        </div>

        {/* Key Metrics */}
        {data.keyMetrics && (
          <div>
            <h5 className="font-medium mb-3 text-sm">Key Metrics & Benchmarks</h5>
            {renderMetricsTable(data.keyMetrics)}
          </div>
        )}

        {/* Specific content based on area */}
        {area === "competitor-benchmarking" && data.competitors && (
          <div>
            <h5 className="font-medium mb-3 text-sm">Competitive Landscape</h5>
            <div className="space-y-3">
              {data.competitors.map((competitor: any, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-medium text-sm">{competitor.name}</h6>
                    <Badge variant="outline" className="text-xs">{competitor.marketShare}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-green-600 font-medium">Strength:</span>
                      <p className="text-gray-600">{competitor.strength}</p>
                    </div>
                    <div>
                      <span className="text-red-600 font-medium">Weakness:</span>
                      <p className="text-gray-600">{competitor.weakness}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {area === "business-model-analysis" && data.revenueStreams && (
          <div>
            <h5 className="font-medium mb-3 text-sm">Revenue Breakdown</h5>
            <div className="space-y-2">
              {data.revenueStreams.map((stream: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{stream.stream}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-medium">{stream.percentage}</span>
                    <span className="text-gray-600">{stream.amount}</span>
                    <Badge variant="outline" className={stream.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {stream.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {area === "market-share-data" && data.regionalBreakdown && (
          <div>
            <h5 className="font-medium mb-3 text-sm">Regional Performance</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.regionalBreakdown.map((region: any, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="font-medium text-sm">{region.region}</h6>
                    <Badge variant="outline">{region.share}</Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Trend:</span>
                      <span className={region.trend.includes('Growing') ? 'text-green-600' : 'text-red-600'}>
                        {region.trend}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deliveries:</span>
                      <span className="font-medium">{region.deliveries}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {area === "industry-trends" && data.majorTrends && (
          <div>
            <h5 className="font-medium mb-3 text-sm">Major Industry Trends</h5>
            <div className="space-y-3">
              {data.majorTrends.map((trend: any, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-medium text-sm">{trend.trend}</h6>
                    <Badge variant="outline" className={
                      trend.impact.includes('Positive') ? 'text-green-600' : 'text-red-600'
                    }>
                      {trend.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{trend.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>Timeline: {trend.timeline}</span>
                    <span className="font-medium">{trend.effect}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {area === "product-deep-dives" && data.vehicles && (
          <div>
            <h5 className="font-medium mb-3 text-sm">Vehicle Portfolio</h5>
            <div className="space-y-4">
              {data.vehicles.map((vehicle: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h6 className="font-medium">{vehicle.name}</h6>
                      <p className="text-xs text-gray-600">{vehicle.category}</p>
                    </div>
                    <Badge variant="outline">{vehicle.specifications.price}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div>
                      <span className="font-medium">Range:</span> {vehicle.specifications.range}
                    </div>
                    <div>
                      <span className="font-medium">Acceleration:</span> {vehicle.specifications.acceleration}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{vehicle.marketPosition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {data.sources && renderSources(data.sources)}

        {/* Editable Notes Section */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-semibold text-sm">Additional Notes</h5>
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
              placeholder="Add your notes and observations for this section..."
              className="min-h-[80px] text-sm"
            />
          ) : (
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
              Click edit to add your notes and observations for this section.
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabGroups = getTabGroups();

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
        {/* Content wrapper to account for AI assistant */}
        <div className="flex flex-1 mr-80">
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
            <Tabs defaultValue={tabGroups[0]?.[0] || "overview"} className="space-y-4">
              {tabGroups.length > 1 && (
                <TabsList className="grid w-full h-auto p-1" style={{ gridTemplateColumns: `repeat(${tabGroups.length}, 1fr)` }}>
                  {tabGroups.map(([key, group]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="text-xs px-3 py-2 data-[state=active]:bg-[#0f1951] data-[state=active]:text-white"
                    >
                      {group.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card className="border shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Research Summary</CardTitle>
                    <CardDescription className="text-sm">
                      Overview of {researchData.companyName} research scope and key findings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-sm mb-2">Research Scope</h4>
                          <p className="text-xs text-gray-600">
                            {researchData.researchFocusAreas?.length || 0} focus areas across market analysis, 
                            competitive intelligence, and business profiling
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-medium text-sm mb-2">Status</h4>
                          <p className="text-xs text-gray-600">
                            Research is {researchData.status} with {researchData.priorityLevel} priority level
                          </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h4 className="font-medium text-sm mb-2">Timeline</h4>
                          <p className="text-xs text-gray-600">
                            Created {researchData.createdAt}, last updated {researchData.lastUpdated}
                          </p>
                        </div>
                      </div>
                      
                      {researchData.additionalNotes && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-sm mb-2">Research Notes</h4>
                          <p className="text-sm text-gray-600">{researchData.additionalNotes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Dynamic tabs based on focus areas */}
              {tabGroups.slice(1).map(([tabKey, tabGroup]) => (
                <TabsContent key={tabKey} value={tabKey}>
                  <div className="space-y-6">
                    {tabGroup.areas
                      .filter(area => researchData.researchFocusAreas?.includes(area))
                      .map(area => {
                        const mockData = mockDataMap[area];
                        if (!mockData) return null;

                        return (
                          <Card key={area} className="border shadow-none">
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
                              {renderContentSection(area, mockData)}
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </TabsContent>
              ))}

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
        </div>

        {/* Fixed AI Assistant Panel */}
        <div className="fixed top-20 right-0 w-80 h-[calc(100vh-80px)] bg-white border-l border-gray-200 z-10">
          <div className="flex flex-col h-full">
            {/* Assistant Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-gray-600">Ready to help with analysis</p>
                </div>
              </div>
            </div>

            {/* Assistant Content */}
            <div className="flex-1 p-4 overflow-y-auto pb-20">
              <div className="space-y-4">
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

                {/* Conversation History would appear here */}
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-700 mb-2">Recent Conversations:</p>
                  <div className="space-y-2">
                    {/* Future conversation messages will be added here dynamically */}
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Input at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask me anything about this research..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button size="sm" className="bg-[#0f1951] hover:bg-[#0f1951]/90 h-10 px-4 text-sm">
                  Ask
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
