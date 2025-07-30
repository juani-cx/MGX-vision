
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
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <button onClick={onBack} className="hover:text-gray-900">Dashboard</button>
              <span>/</span>
              <span className="text-gray-900">{initialData ? "Edit Research Task" : "New Research Task"}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
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
              <Send className="w-4 h-4 mr-2" />
              Start Research
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
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
  );
}
