import { ExternalLink, Users, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

interface ResearchTask {
  id: string;
  title: string;
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
  if (task.status === "processing") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            {task.name || task.title}
          </CardTitle>
          <CardDescription>Research in progress...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={65} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Analyzing data sources, gathering insights, and building connections...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (task.status === "failed") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            {task.name || task.title}
          </CardTitle>
          <CardDescription>Research failed</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Unable to complete research. Please try again or contact support.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { results } = task;
  if (!results) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                {task.name || task.title}
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
      {results.company && (
        <Card>
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p>{results.company.industry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p>{results.company.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p>{results.company.employees}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Headquarters</p>
                <p>{results.company.headquarters}</p>
              </div>
            </div>

            <div>
              <h4 className="mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{results.company.description}</p>
            </div>

            <div>
              <h4 className="mb-3">Key Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.company.keyMetrics.map((metric, index) => (
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
      {results.networkInsights && (
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
                    <span>{results.networkInsights.directConnections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Indirect Connections</span>
                    <span>{results.networkInsights.indirectConnections}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Referral Opportunities</h4>
                <div className="space-y-2">
                  {results.networkInsights.referralOpportunities.map((opp, index) => (
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
                {results.networkInsights.keyContacts.map((contact, index) => (
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
      {results.financialAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${
                  results.financialAnalysis.score >= 80 ? "bg-green-100 text-green-600" :
                  results.financialAnalysis.score >= 60 ? "bg-yellow-100 text-yellow-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {results.financialAnalysis.score}
                </div>
                <p className="text-sm text-muted-foreground">Investment Score</p>
              </div>

              <div className="text-center">
                <Badge className={`${
                  results.financialAnalysis.risk === "low" ? "bg-green-100 text-green-800" :
                  results.financialAnalysis.risk === "medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {results.financialAnalysis.risk.toUpperCase()} RISK
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">Risk Level</p>
              </div>

              <div>
                <h5 className="mb-2">Recommendation</h5>
                <p className="text-sm text-muted-foreground">{results.financialAnalysis.recommendation}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3">Opportunities</h4>
                <ul className="space-y-2">
                  {results.financialAnalysis.opportunities.map((opp, index) => (
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
                  {results.financialAnalysis.concerns.map((concern, index) => (
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