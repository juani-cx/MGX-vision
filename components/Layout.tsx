
import { Search, Bell, Calendar, Settings, Home, Users, TrendingUp, Database, Brain, Target, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function Layout({ children, currentPage = "dashboard" }: LayoutProps) {
  const mainMenuItems = [
    { id: "notifications", label: "Notifications", icon: Bell, badge: "99+" },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const mainPages = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "research", label: "AI Research", icon: Brain },
    { id: "clients", label: "Client Network", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "data", label: "Data Sources", icon: Database },
    { id: "targets", label: "Investment Targets", icon: Target },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-56 bg-[#0f1951] flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#20308e]">
          <div className="flex items-center justify-center">
            <img 
              src="/attached_assets/image_1753890145556.png" 
              alt="IIGX InvestAI" 
              className="w-32 h-20 object-contain"
            />
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs text-white/60 mb-3 px-2">Main menu</h3>
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-2 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-[#e3982f] text-white text-xs px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs text-white/60 mb-3 px-2">Main pages</h3>
            <div className="space-y-1">
              {mainPages.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 px-2 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                      isActive 
                        ? "bg-[#504b95] text-white" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded text-xs flex items-center justify-center ${
                      isActive ? "bg-white text-[#504b95]" : "bg-[#030213]"
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
            <Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              Create new
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#20308e]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-black font-medium">AI</span>
            </div>
            <div>
              <p className="text-sm text-white">AI Assistant</p>
              <p className="text-xs text-white/60">Ready to help</p>
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
