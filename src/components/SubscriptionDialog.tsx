import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { PaymentForm } from "./PaymentForm";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscribe?: () => void;
  address?: string;
}

export function SubscriptionDialog({ open, onOpenChange, onSubscribe, address = "" }: SubscriptionDialogProps) {
  const [showPayment, setShowPayment] = useState(false);
  const features = [
    "Complete 30-Day Action Plan",
    "Week-by-Week Marketing Strategy",
    "4 Target Buyer Demographic Profiles",
    "Investment ROI Documentation Templates",
    "Rental Income Projection Models",
    "Twilight Photography Session Guide",
    "Strategic Price Positioning Analysis",
    "Austin Metro Luxury Marketing Campaign",
    "VIP Preview Event Planning",
    "Seasonal Timing Compensatory Strategies",
    "Competitive Differentiation Messaging",
    "Enhanced Visual Marketing Package",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Get your complete strategy to increase sale probability from 40% to 85% in 30 days
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl">$99</span>
              <span className="text-muted-foreground">/listing</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              One-time payment • Full access • No subscription
            </p>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Most Popular
            </Badge>
          </Card>

          <div>
            <h3 className="mb-4">Everything included:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {!showPayment ? (
            <div className="pt-4 space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowPayment(true)}
              >
                Continue to Payment
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Secure payment • 30-day money-back guarantee
              </p>
            </div>
          ) : (
            <div className="pt-4">
              <PaymentForm
                amount={99}
                address={address}
                onSuccess={() => {
                  if (onSubscribe) {
                    onSubscribe();
                  }
                }}
                onCancel={() => setShowPayment(false)}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
