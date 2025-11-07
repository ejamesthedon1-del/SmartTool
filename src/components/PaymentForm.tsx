import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface PaymentFormProps {
  amount: number;
  address: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentForm({
  amount,
  address,
  onSuccess,
  onCancel,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found");
      return;
    }

    setLoading(true);

    try {
      // Get project ID and anon key
      const { projectId, publicAnonKey } = await import(
        "../utils/supabase/info.tsx"
      );

      // Create payment intent
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-52cdd920/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            amount,
            address,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = await response.json();

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message || "Payment failed");
      }

      if (paymentIntent.status === "succeeded") {
        // Verify payment on server
        const verifyResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-52cdd920/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              paymentIntentId,
            }),
          }
        );

        if (!verifyResponse.ok) {
          throw new Error("Failed to verify payment");
        }

        const { success } = await verifyResponse.json();

        if (success) {
          toast.success("Payment successful!");
          onSuccess();
        } else {
          throw new Error("Payment verification failed");
        }
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Cardholder Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label>Card Details</Label>
        <div className="border rounded-lg p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#0f172a",
                  "::placeholder": {
                    color: "#94a3b8",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Test card: 4242 4242 4242 4242 • Any future date • Any 3 digits
        </p>
      </div>

      <div className="pt-4 space-y-3">
        <Button type="submit" className="w-full" size="lg" disabled={loading || !stripe}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>Pay ${amount}</>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>
    </form>
  );
}