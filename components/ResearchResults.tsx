import { useState } from "react";
import { ExternalLink, Users, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

interface ResearchTask {
  id: string;
  name: string;
  type: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
  results?: {
    company?: {
      name: string;
      industry: string;
      marketCap: string;
      employees: string;
      headquarters: string;
      description: string;
      keyMetrics: Array<{ label: string; value: string; trend: "up" | "down" | "neutral" }>;
    };
    networkInsights?: {
      directConnections: number;
      indirectConnections: number;
      keyContacts: Array<{ name: string; role: string; company: string; relationship: string }>;
      referralOpportunities: Array<{ contact: string; strength: "high" | "medium" | "low"; path: string }>;
    };
    financialAnalysis?: {
      score: number;
      risk: "low" | "medium" | "high";
      recommendation: string;
      keyFinancials: Array<{ metric: string; value: string; benchmark: string }>;
      concerns: string[];
      opportunities: string[];
    };
    competitorAnalysis?: {
      mainCompetitors: Array<{ name: string; marketShare: string; strength: string }>;
      marketPosition: string;
      competitiveAdvantages: string[];
      threats: string[];
    };
  };
}

interface ResearchResultsProps {
  task: ResearchTask;
}

export function ResearchResults({ task }: ResearchResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!task.results) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg">Processing Research...</h3>
        <p className="text-muted-foreground">AI is analyzing the data and generating insights</p>
      </div>
    );
  }

  const { company, networkInsights, financialAnalysis } = task.results;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                {task.name}
              </CardTitle>
              <CardDescription>
                Research completed • {task.createdAt}
              </CardDescription>
            </div>
            <Badge variant="secondary">{task.type}</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Company Overview */}
      {company && (
        <Card>
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p>{company.industry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p>{company.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p>{company.employees}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Headquarters</p>
                <p>{company.headquarters}</p>
              </div>
            </div>

            <div>
              <h4 className="mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{company.description}</p>
            </div>

            <div>
              <h4 className="mb-3">Key Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {company.keyMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p>{metric.value}</p>
                    </div>
                    <TrendingUp className={`w-4 h-4 ${
                      metric.trend === "up" ? "text-green-500" : 
                      metric.trend === "down" ? "text-red-500" : "text-gray-500"
                    }`} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Network Insights */}
      {networkInsights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Network Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3">Connection Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Direct Connections</span>
                    <span>{networkInsights.directConnections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Indirect Connections</span>
                    <span>{networkInsights.indirectConnections}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Referral Opportunities</h4>
                <div className="space-y-2">
                  {networkInsights.referralOpportunities.map((opp, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant={opp.strength === "high" ? "default" : opp.strength === "medium" ? "secondary" : "outline"}>
                        {opp.strength}
                      </Badge>
                      <span className="text-sm">{opp.contact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3">Key Contacts</h4>
              <div className="space-y-3">
                {networkInsights.keyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p>{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.role} at {contact.company}</p>
                    </div>
                    <Badge variant="outline">{contact.relationship}</Badge>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Analysis */}
      {financialAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${
                  financialAnalysis.score >= 80 ? "bg-green-100 text-green-600" :
                  financialAnalysis.score >= 60 ? "bg-yellow-100 text-yellow-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {financialAnalysis.score}
                </div>
                <p className="text-sm text-muted-foreground">Investment Score</p>
              </div>

              <div className="text-center">
                <Badge className={`${
                  financialAnalysis.risk === "low" ? "bg-green-100 text-green-800" :
                  financialAnalysis.risk === "medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {financialAnalysis.risk.toUpperCase()} RISK
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">Risk Level</p>
              </div>

              <div>
                <h5 className="mb-2">Recommendation</h5>
                <p className="text-sm text-muted-foreground">{financialAnalysis.recommendation}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3">Opportunities</h4>
                <ul className="space-y-2">
                  {financialAnalysis.opportunities.map((opp, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3">Concerns</h4>
                <ul className="space-y-2">
                  {financialAnalysis.concerns.map((concern, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}