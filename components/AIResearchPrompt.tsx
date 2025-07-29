import { useState } from "react";
import { Send, Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface AIResearchPromptProps {
  onSubmit: (prompt: string, type: string) => void;
}

export function AIResearchPrompt({ onSubmit }: AIResearchPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const researchTypes = [
    {
      id: "company",
      title: "Company Research",
      description: "Deep dive into company financials, leadership, and market position",
      icon: TrendingUp,
      color: "bg-blue-500"
    },
    {
      id: "network",
      title: "Network Analysis",
      description: "Find connections, referrals, and relationship mapping",
      icon: Users,
      color: "bg-green-500"
    },
    {
      id: "financial",
      title: "Financial Analysis",
      description: "Valuation, financial health, and investment metrics",
      icon: DollarSign,
      color: "bg-purple-500"
    },
  ];

  const examplePrompts = [
    "Research Tesla Inc. for potential investment opportunity",
    "Analyze the competitive landscape for EV manufacturers",
    "Find connections to SpaceX executives in our network",
    "Evaluate the financial health of Rivian vs competitors"
  ];

  const handleSubmit = () => {
    if (prompt.trim() && selectedType) {
      onSubmit(prompt, selectedType);
      setPrompt("");
      setSelectedType(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Research Assistant
        </CardTitle>
        <CardDescription>
          Start a research task by describing what you need. Our AI will gather insights, find connections, and provide analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Research Type Selection */}
        <div>
          <h4 className="mb-3">Research Type</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {researchTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 ${type.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm">{type.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <h4>Research Prompt</h4>
          <div className="relative">
            <Textarea
              placeholder="Describe what you want to research... (e.g., 'Research Apple Inc for potential acquisition, focus on their AI capabilities and recent partnerships')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] pr-12 resize-none"
            />
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!prompt.trim() || !selectedType}
              className="absolute bottom-3 right-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Example Prompts */}
        <div>
          <h4 className="mb-3">Example Prompts</h4>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => setPrompt(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}