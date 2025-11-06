import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Camera, DollarSign, FileText, Target, TrendingUp, Home } from "lucide-react";

export function DashboardMockup() {
  const categories = [
    { name: "Photo Quality", score: 85, icon: Camera, color: "text-blue-600" },
    { name: "Pricing Strategy", score: 72, icon: DollarSign, color: "text-green-600" },
    { name: "Description", score: 78, icon: FileText, color: "text-purple-600" },
    { name: "Market Position", score: 68, icon: Target, color: "text-orange-600" },
    { name: "Curb Appeal", score: 92, icon: Home, color: "text-pink-600" },
    { name: "Value Proposition", score: 76, icon: TrendingUp, color: "text-indigo-600" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-gray-50 to-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg text-gray-900">Property Analysis</h3>
            <p className="text-sm text-gray-500">AI-Powered Listing Report</p>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Active
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
        {/* Property Image Card */}
        <Card className="overflow-hidden border-gray-200">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjE5ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Property"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h4 className="text-gray-900 mb-1">Modern Luxury Estate</h4>
            <p className="text-sm text-gray-600">Beverly Hills, CA • $2,495,000</p>
            <div className="flex gap-4 mt-3 text-sm text-gray-500">
              <span>4 Beds</span>
              <span>3.5 Baths</span>
              <span>3,200 sqft</span>
            </div>
          </div>
        </Card>

        {/* Overall Score Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="text-center space-y-3">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
              AI Overall Score
            </Badge>
            <div className="flex items-center justify-center gap-2">
              <div className="text-5xl text-blue-600">78</div>
              <div className="text-2xl text-gray-400">/100</div>
            </div>
            <Progress value={78} className="h-2.5 bg-blue-100" />
            <p className="text-sm text-gray-600">Above average listing performance</p>
          </div>
        </Card>

        {/* Analytics Categories */}
        <div>
          <h4 className="text-sm text-gray-700 mb-3">Category Breakdown</h4>
          <div className="space-y-3">
            {categories.map((category, i) => (
              <Card key={i} className="p-4 border-gray-200 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <category.icon className={`w-4 h-4 ${category.color}`} />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <span className={`text-sm ${category.color}`}>{category.score}/100</span>
                  </div>
                  <Progress value={category.score} className="h-1.5" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Insights Preview */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Premium Marketing Plan Available</p>
              <p className="text-xs text-gray-600">Get your 30-day action plan</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
