import { Search, Bell, Calendar, Settings, Home, Users, TrendingUp, Database, Brain, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function Layout({ children, currentPage = "dashboard" }: LayoutProps) {
  const mainMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "research", label: "AI Research", icon: Brain },
    { id: "clients", label: "Client Network", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "data", label: "Data Sources", icon: Database },
    { id: "targets", label: "Investment Targets", icon: Target },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sidebar-foreground">InvestAI</h1>
              <p className="text-xs text-muted-foreground">Strategic Platform</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs text-muted-foreground mb-2 px-2">Main menu</h3>
            <div className="space-y-1">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search" 
                  className="pl-9 bg-input-background border-0 text-sm h-9"
                />
              </div>
              
              <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg cursor-pointer">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded">
                  99+
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
              </div>
              
              <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground mb-2 px-2">Main pages</h3>
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 px-2 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded text-xs flex items-center justify-center ${
                      isActive ? "bg-sidebar-primary-foreground text-sidebar-primary" : "bg-primary text-primary-foreground"
                    }`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              + Create new
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs">AI</span>
            </div>
            <div>
              <p className="text-sm text-sidebar-foreground">AI Assistant</p>
              <p className="text-xs text-muted-foreground">Ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}