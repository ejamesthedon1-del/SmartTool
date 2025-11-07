import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Home, Users, TrendingUp, Award, Shield, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const infoCards = [
  {
    id: 1,
    icon: Home,
    title: "Property Intelligence",
    description: "Advanced AI analyzes your property's unique characteristics, market position, and competitive advantages to provide actionable insights.",
    stats: "98% Accuracy",
    highlight: "Market-Ready Analysis"
  },
  { 
    id: 2,
    icon: Users, 
    title: "Buyer Targeting",
    description: "Identify and understand your ideal buyers with detailed demographic profiles, purchasing power, and motivation factors.",
    stats: "40% Faster Sales",
    highlight: "Precision Marketing"
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Price Optimization", 
    description: "Data-driven pricing strategies based on real market conditions, comparable properties, and demand indicators.",
    stats: "12% Higher Value",
    highlight: "Max ROI Pricing"
  },
  {
    id: 4,
    icon: Award,
    title: "Quality Score",
    description: "Comprehensive evaluation of your listing across 10 critical factors that impact selling time and final price.",
    stats: "A+ Rating System",
    highlight: "Professional Grade"
  },
  {
    id: 5,
    icon: Shield,
    title: "Risk Assessment",
    description: "Identify potential market risks, timing issues, and competitive threats before they impact your sale.",
    stats: "Risk Mitigated",
    highlight: "Proactive Strategy"
  },
  {
    id: 6,
    icon: Zap,
    title: "Action Plans",
    description: "Week-by-week marketing strategies with specific tactics, channels, and messaging tailored to your property.",
    stats: "30-Day Roadmap",
    highlight: "Results Focused"
  }
];

export function SlidingInfoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Swiped right
      setCurrentIndex((prev) => (prev - 1 + infoCards.length) % infoCards.length);
    } else if (info.offset.x < -threshold) {
      // Swiped left
      setCurrentIndex((prev) => (prev + 1) % infoCards.length);
    }
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return 0; // Center
    if (diff === 1 || diff === -(infoCards.length - 1)) return 1; // Right
    if (diff === -1 || diff === infoCards.length - 1) return -1; // Left
    return diff > 0 ? 2 : -2; // Far right or far left
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            AI-Powered Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Transform Your Real Estate Strategy
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to analyze properties, target buyers, and optimize your selling approach with data-driven precision.
          </p>
        </div>

        {/* Sliding Cards Container - Desktop & Mobile */}
        <div className="relative h-[500px] md:h-[450px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {infoCards.map((card, index) => {
              const position = getCardPosition(index);
              const Icon = card.icon;
              
              return (
                <motion.div
                  key={card.id}
                  className="absolute w-[85%] md:w-[400px]"
                  initial={false}
                  animate={{
                    x: `${position * 110}%`,
                    scale: position === 0 ? 1 : 0.85,
                    opacity: Math.abs(position) > 1 ? 0 : position === 0 ? 1 : 0.5,
                    zIndex: position === 0 ? 20 : 10 - Math.abs(position),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag={position === 0 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  style={{
                    cursor: position === 0 ? 'grab' : 'default',
                  }}
                >
                  <Card className={`p-6 md:p-8 bg-white border-slate-200 transition-all duration-300 ${
                    position === 0 ? "shadow-2xl border-blue-300" : "shadow-md"
                  }`}>
                    {/* Icon and Stats */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 font-semibold text-xs">
                        {card.stats}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                        {card.highlight}
                      </Badge>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                        {card.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-4" />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Swipe hint */}
        <div className="text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="inline-flex items-center gap-2 text-sm text-slate-500 px-4 py-2 bg-slate-50 rounded-full"
          >
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </motion.svg>
            Swipe to navigate
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}