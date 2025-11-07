import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
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
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + infoCards.length) % infoCards.length;
    setCurrentIndex(newIndex);
    setPage([page + newDirection, newDirection]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 50,
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
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

        {/* Sliding Cards Container */}
        <div className="relative">
          {/* Desktop View - 3 cards visible, swipeable */}
          <div {...handlers} className="hidden md:block mb-8 cursor-grab active:cursor-grabbing">
            <div className="grid grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % infoCards.length;
                const card = infoCards[index];
                const Icon = card.icon;
                const isCenter = offset === 1;
                
                return (
                  <motion.div
                    key={card.id}
                    animate={{
                      scale: isCenter ? 1.05 : 0.95,
                      opacity: isCenter ? 1 : 0.7,
                      y: isCenter ? -8 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Card className={`p-8 bg-white border-slate-200 transition-all duration-300 ${
                      isCenter ? "shadow-xl border-blue-300" : "shadow-md"
                    }`}>
                      {/* Icon and Stats */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 font-semibold">
                          {card.stats}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          {card.highlight}
                        </Badge>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                          {card.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
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

          {/* Mobile View - Single card with swipe */}
          <div {...handlers} className="md:hidden mb-8 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                <Card className="p-6 bg-white border-slate-200 shadow-xl">
                  {(() => {
                    const card = infoCards[currentIndex];
                    const Icon = card.icon;
                    return (
                      <>
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 font-semibold text-xs">
                            {card.stats}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            {card.highlight}
                          </Badge>
                          <h3 className="text-lg font-bold text-slate-900 mb-3">
                            {card.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                      </>
                    );
                  })()}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {infoCards.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  const diff = index - currentIndex;
                  paginate(diff);
                }}
                className="h-2 rounded-full bg-slate-300 cursor-pointer"
                animate={{
                  width: index === currentIndex ? 32 : 8,
                  backgroundColor: index === currentIndex ? "rgb(37 99 235)" : "rgb(203 213 225)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Swipe hint for mobile */}
          <div className="md:hidden text-center">
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
      </div>
    </section>
  );
}