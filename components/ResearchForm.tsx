
import { useState } from "react";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface ResearchFormProps {
  onBack: () => void;
  onSubmit: (formData: ResearchFormData) => void;
  initialData?: Partial<ResearchFormData>;
}

export interface ResearchFormData {
  companyName: string;
  industrySector: string;
  researchFocusAreas: string[];
  additionalNotes: string;
  priorityLevel: "low" | "medium" | "high";
  assignedTo: string;
}

const focusAreaOptions = [
  { id: "competitor-benchmarking", label: "Competitor Benchmarking" },
  { id: "product-competitiveness", label: "Product Competitiveness" },
  { id: "business-model-analysis", label: "Business Model Analysis" },
  { id: "market-share-data", label: "Market Share Data" },
  { id: "industry-trends", label: "Industry Trends and Tailwinds" },
  { id: "market-sizing", label: "Market Sizing and Growth Rates" },
  { id: "funding-activity", label: "Funding Activity" },
  { id: "product-deep-dives", label: "Product Deep Dives" },
  { id: "technical-stack", label: "Technical Stack Details" }
];

const industryOptions = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "E-commerce",
  "Manufacturing",
  "Energy",
  "Transportation",
  "Real Estate",
  "Media & Entertainment",
  "Education",
  "Other"
];

const assigneeOptions = [
  "Sarah Chen",
  "Alex Park",
  "Maria Rodriguez",
  "Current User",
  "Team Lead"
];

export function ResearchForm({ onBack, onSubmit, initialData }: ResearchFormProps) {
  const [formData, setFormData] = useState<ResearchFormData>({
    companyName: initialData?.companyName || "",
    industrySector: initialData?.industrySector || "",
    researchFocusAreas: initialData?.researchFocusAreas || [],
    additionalNotes: initialData?.additionalNotes || "",
    priorityLevel: initialData?.priorityLevel || "medium",
    assignedTo: initialData?.assignedTo || "Current User"
  });

  const handleFocusAreaChange = (areaId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      researchFocusAreas: checked
        ? [...prev.researchFocusAreas, areaId]
        : prev.researchFocusAreas.filter(id => id !== areaId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.companyName && formData.industrySector && formData.researchFocusAreas.length > 0) {
      onSubmit(formData);
    }
  };

  const isValid = formData.companyName && formData.industrySector && formData.researchFocusAreas.length > 0;

  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-20 left-56 right-80 z-30 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <button onClick={onBack} className="hover:text-gray-900">Dashboard</button>
              <span>/</span>
              <span className="text-gray-900">{initialData ? "Edit Research Task" : "New Research Task"}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              {initialData ? "Edit Research Task" : "New Research Task"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Define the scope and focus areas for competitive and market research
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isValid}
              className="bg-[#0f1951] hover:bg-[#0f1951]/90 text-white"
            >
              <Send className="w-4 h-4 mr-1" />
              Start Research
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex pt-[120px] h-full overflow-hidden">
        {/* Content wrapper to account for AI assistant */}
        <div className="flex flex-1 mr-80">
          {/* Form Content */}
          <div className="flex-1 p-6 h-full overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Primary details about the company and research scope
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g., Tesla Inc."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="industrySector">Industry Sector *</Label>
                  <Select
                    value={formData.industrySector}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, industrySector: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map(industry => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Research Focus Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Research Focus Areas *</CardTitle>
              <CardDescription>
                Select all areas you want to include in this research task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {focusAreaOptions.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.researchFocusAreas.includes(option.id)}
                      onCheckedChange={(checked) => handleFocusAreaChange(option.id, checked as boolean)}
                    />
                    <Label 
                      htmlFor={option.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Task Management */}
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Set priority level and assignment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="priorityLevel">Priority Level</Label>
                  <Select
                    value={formData.priorityLevel}
                    onValueChange={(value: "low" | "medium" | "high") => 
                      setFormData(prev => ({ ...prev, priorityLevel: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assigneeOptions.map(assignee => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>
                Any specific requirements, questions, or context for this research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                placeholder="Provide any additional context, specific questions, or requirements for this research task..."
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>
        </form>
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
                  <h3 className="font-semibold text-sm">Research Assistant</h3>
                  <p className="text-xs text-gray-600">Helping you setup research</p>
                </div>
              </div>
            </div>

            {/* Assistant Content */}
            <div className="flex-1 p-4 overflow-y-auto pb-20">
              <div className="space-y-4">
                {/* Dynamic suggestions based on form state */}
                {!formData.companyName && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>💡 Getting Started</strong>
                    </p>
                    <p className="text-xs text-blue-700">
                      Start by entering the company name you want to research. I can help suggest relevant focus areas once you provide the company details.
                    </p>
                  </div>
                )}

                {formData.companyName && !formData.industrySector && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-800 mb-2">
                      <strong>🏢 Industry Selection</strong>
                    </p>
                    <p className="text-xs text-green-700">
                      Great! Now select the industry sector for {formData.companyName}. This helps me recommend the most relevant research focus areas.
                    </p>
                  </div>
                )}

                {formData.companyName && formData.industrySector && formData.researchFocusAreas.length === 0 && (
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 mb-2">
                      <strong>🎯 Focus Areas</strong>
                    </p>
                    <p className="text-xs text-yellow-700">
                      For {formData.industrySector} companies like {formData.companyName}, I recommend starting with:
                    </p>
                    <ul className="text-xs text-yellow-700 mt-2 space-y-1">
                      <li>• Competitor Benchmarking</li>
                      <li>• Market Share Data</li>
                      <li>• Business Model Analysis</li>
                    </ul>
                  </div>
                )}

                {formData.researchFocusAreas.length > 0 && (
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-purple-800 mb-2">
                      <strong>📊 Research Scope</strong>
                    </p>
                    <p className="text-xs text-purple-700">
                      Excellent! You've selected {formData.researchFocusAreas.length} focus areas. This will provide comprehensive insights into {formData.companyName}'s market position.
                    </p>
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 mb-2">Quick Actions:</p>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-8"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        researchFocusAreas: ['competitor-benchmarking', 'market-share-data', 'business-model-analysis']
                      }));
                    }}
                  >
                    📈 Add Core Analysis
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-8"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        researchFocusAreas: [...prev.researchFocusAreas, 'product-competitiveness', 'technical-stack']
                      }));
                    }}
                  >
                    🔧 Add Product Focus
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-8"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        researchFocusAreas: [...prev.researchFocusAreas, 'funding-activity', 'industry-trends']
                      }));
                    }}
                  >
                    💰 Add Financial Focus
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-8"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        priorityLevel: 'high',
                        additionalNotes: 'Comprehensive competitive analysis requested'
                      }));
                    }}
                  >
                    ⚡ Set High Priority
                  </Button>
                </div>

                {/* Tips */}
                <div className="border-t pt-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">
                      <strong>💡 Pro Tip:</strong> Include additional notes about specific questions or competitors you're interested in for more targeted research.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Input at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex gap-2 items-center">
                <input 
                  type="text" 
                  placeholder="👋 Ask me about any company or contact"
                  className="flex-1 px-3 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                />
                <Button size="sm" className="bg-[#0f1951] hover:bg-[#0f1951]/90 h-12 px-4 text-sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
