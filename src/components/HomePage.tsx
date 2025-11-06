import {
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { DashboardMockup } from "./DashboardMockup";

interface HomePageProps {
  onGetStarted: () => void;
  onNavigate: (
    view: "home" | "address-input" | "dashboard" | "marketing-plan"
  ) => void;
  onMenuClick?: () => void; // ← ADDED THIS
}

export function HomePage({
  onGetStarted,
  onNavigate,
  onMenuClick,
}: HomePageProps) {
  const features = [
    {
      icon: BarChart3,
      title: "AI-Powered Analysis",
      description:
        "Get instant AI ratings across 10 critical factors that impact your listing's selling time",
    },
    {
      icon: Target,
      title: "Buyer Demographics",
      description:
        "Detailed profiles of your ideal buyers with income levels, motivations, and value drivers",
    },
    {
      icon: Clock,
      title: "30-Day Action Plan",
      description:
        "Week-by-week marketing strategy designed to sell your listing faster",
    },
    {
      icon: DollarSign,
      title: "Price Optimization",
      description:
        "Data-driven pricing recommendations to maximize sale price and reduce market time",
    },
    {
      icon: TrendingUp,
      title: "Investment Analysis",
      description:
        "ROI projections and rental income documentation to attract investor buyers",
    },
    {
      icon: Zap,
      title: "Marketing Strategy",
      description:
        "Tailored marketing plans with targeting, messaging, and channel recommendations",
    },
  ];

  const stats = [
    { value: "85%", label: "Success Rate" },
    { value: "30 Days", label: "Avg. Time to Sell" },
    { value: "10+", label: "Key Factors Analyzed" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Luxury Real Estate Agent",
      content:
        "The AI analysis helped me identify pricing issues I missed. My listing sold 40% faster!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "RE/MAX Broker",
      content:
        "The buyer demographic insights were spot-on. We adjusted our marketing and got multiple offers.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Independent Realtor",
      content:
        "Game changer for my business. The 30-day action plan is worth every penny.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Integrated Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 overflow-hidden">
        {/* Navigation */}
        <div className="relative z-10">
          <div className="container mx-auto max-w-6xl px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="font-semibold">ListingAI</span>
              </div>
              <div className="hidden md:flex items-center gap-8 text-white/90 text-sm">
                <button className="hover:text-white transition-colors">
                  Pricing
                </button>
                <button className="hover:text-white transition-colors">
                  Features
                </button>
                <button className="hover:text-white transition-colors">
                  Blog
                </button>
              </div>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("🍔 Hamburger clicked!");
                  console.log("🍔 onMenuClick exists?", !!onMenuClick);
                  if (onMenuClick) {
                    console.log("🍔 Calling onMenuClick now...");
                    onMenuClick();
                  }
                }}
                className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/20 rounded transition-colors relative z-[9999] cursor-pointer"
                aria-label="Menu"
                type="button"
                style={{ touchAction: "manipulation" }}
              >
                <span className="w-6 h-0.5 bg-white rounded-full block" />
                <span className="w-6 h-0.5 bg-white rounded-full block" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto max-w-4xl px-4 pt-12 pb-32 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            #1 AI assistant
            <br />
            for real estate
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get instant AI-powered analysis of your property listings to sell
            faster, optimize pricing, and create winning marketing strategies.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-blue-700 hover:bg-blue-800 text-white shadow-xl gap-2"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Dashboard Preview */}
        <div className="container mx-auto max-w-6xl px-4 relative z-10 pb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent blur-2xl" />
            <div className="relative transition-transform duration-500 hover:scale-[1.02]">
              <DashboardMockup />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Everything You Need
            </Badge>
            <h2 className="mb-4">Comprehensive Analysis for Every Listing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your property across critical factors that real
              estate professionals need to sell faster and at better prices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Simple Process
            </Badge>
            <h2 className="mb-4">Get Your Analysis in Minutes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">
                1
              </div>
              <h3 className="mb-2">Enter Your Address</h3>
              <p className="text-muted-foreground">
                Input your property address and basic details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">
                2
              </div>
              <h3 className="mb-2">AI Analyzes Your Listing</h3>
              <p className="text-muted-foreground">
                Our AI evaluates 10+ critical factors instantly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">
                3
              </div>
              <h3 className="mb-2">Get Your Action Plan</h3>
              <p className="text-muted-foreground">
                Receive tailored marketing strategy to sell faster
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Trusted by Realtors
            </Badge>
            <h2 className="mb-4">What Real Estate Professionals Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm mb-4">“{testimonial.content}”</p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5">
            <h2 className="mb-4">Ready to Sell Your Listings Faster?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of realtors using AI to optimize their listings and
              close deals faster.
            </p>
            <Button size="lg" onClick={onGetStarted} className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Free analysis</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">ListingAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered analytics for real estate professionals
              </p>
            </div>
            <div>
              <div className="font-medium mb-3">Product</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Demo</div>
              </div>
            </div>
            <div>
              <div className="font-medium mb-3">Company</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Contact</div>
                <div>Support</div>
              </div>
            </div>
            <div>
              <div className="font-medium mb-3">Legal</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy</div>
                <div>Terms</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ListingAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
