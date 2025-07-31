
import { Search, Bell, Calendar, Settings, Home, Users, TrendingUp, Database, Brain, Target, Plus, User, LogOut, Cog, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
      <div className="w-56 bg-[#0f1951] flex flex-col fixed h-full z-10">
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
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          
        </div>

        {/* Bottom Section */}
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-white/10">
                <div className="flex items-center gap-3 w-full py-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs text-black font-medium">AI</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-white">AI Assistant</p>
                    <p className="text-xs text-white/60">Always-On</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" side="top">
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>User Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Cog className="w-4 h-4" />
                <span>Configuration</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Fixed Top Navigation */}
      <div className="fixed top-0 left-56 right-0 z-20 border-b border-gray-200 bg-white px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search companies..."
                className="pl-10 bg-white border border-gray-300 h-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-green-300 rounded-lg">
              <div className="w-3 h-3 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-green-600 text-sm">All Systems Operational</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 rounded-full bg-gray-300 p-0 hover:bg-gray-400">
                  <User className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>User Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Cog className="w-4 h-4" />
                  <span>Configuration</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-56 pt-16">
        {children}
      </div>
    </div>
  );
}
