// Deno Edge Function for Supabase
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.0.0?target=deno";

const stripe = new Stripe(Deno.env.get("VITE_STRIPE_SECRET_KEY") || "", {
  apiVersion: "2024-10-28.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  try {
    // Health check
    if (path.includes("/health")) {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create payment intent
    if (path.includes("/create-payment-intent") && req.method === "POST") {
      const { amount, address } = await req.json();
      
      if (!amount) {
        return new Response(JSON.stringify({ error: "Amount is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        metadata: {
          address: address || "N/A",
          service: "listing-analytics-premium",
        },
        automatic_payment_methods: { enabled: true },
      });

      return new Response(
        JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify payment
    if (path.includes("/verify-payment") && req.method === "POST") {
      const { paymentIntentId } = await req.json();
      
      if (!paymentIntentId) {
        return new Response(JSON.stringify({ error: "Payment intent ID is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      return new Response(
        JSON.stringify({ 
          success: paymentIntent.status === "succeeded", 
          status: paymentIntent.status 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check subscription
    if (path.includes("/check-subscription") && req.method === "POST") {
      const { address } = await req.json();
      
      if (!address) {
        return new Response(JSON.stringify({ error: "Address is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({ hasSubscription: false, subscription: null }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Google Places Autocomplete
    if (path.includes("/places-autocomplete") && req.method === "POST") {
      const { input } = await req.json();
      
      if (!input) {
        return new Response(JSON.stringify({ error: "Input is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const apiKey = Deno.env.get("VITE_GOOGLE_PLACES_API_KEY");
      if (!apiKey) {
        return new Response(JSON.stringify({ error: "API key not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const placesUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&types=address&components=country:us&key=${apiKey}`;

      const response = await fetch(placesUrl);
      const data = await response.json();

      if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
        return new Response(JSON.stringify({ error: `Places API error: ${data.status}` }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ predictions: data.predictions || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Google Places Details
    if (path.includes("/places-details") && req.method === "POST") {
      const { placeId } = await req.json();
      
      if (!placeId) {
        return new Response(JSON.stringify({ error: "Place ID is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const apiKey = Deno.env.get("VITE_GOOGLE_PLACES_API_KEY");
      if (!apiKey) {
        return new Response(JSON.stringify({ error: "API key not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,address_components,geometry&key=${apiKey}`;

      const response = await fetch(detailsUrl);
      const data = await response.json();

      if (data.status !== "OK") {
        return new Response(JSON.stringify({ error: `Places API error: ${data.status}` }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ result: data.result }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // AI Listing Analysis - FIXED VERSION
    if (path.includes("/analyze-listing") && req.method === "POST") {
      const { address } = await req.json();
      
      if (!address) {
        return new Response(JSON.stringify({ error: "Address is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const apiKey = Deno.env.get("VITE_GEMINI_API_KEY");
      if (!apiKey) {
        return new Response(JSON.stringify({ error: "Gemini API key not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const prompt = `You are a real estate listing analysis AI. Analyze this property address and provide a detailed JSON response with the following structure:

{
  "listing": {
    "address": "${address}",
    "city": "City Name",
    "propertyType": "Single Family Home",
    "price": "$XXX,XXX",
    "pricePerSqft": "$XXX/sqft",
    "beds": X,
    "baths": X,
    "sqft": "X,XXX",
    "daysOnMarket": XX
  },
  "overallScore": XX,
  "ratings": [
    {
      "title": "Factor Name",
      "score": XX,
      "maxScore": 100,
      "category": "Category",
      "description": "Description of the factor"
    }
  ],
  "categoryScores": [
    {"category": "Category Name", "score": XX}
  ],
  "radarData": [
    {"subject": "Area", "A": XX, "fullMark": 100}
  ],
  "insights": {
    "summary": "Overall summary",
    "alerts": [
      {"type": "warning", "title": "Alert Title", "message": "Alert message"}
    ],
    "topPriorities": ["Priority 1", "Priority 2", "Priority 3"]
  }
}

Provide realistic data for the address: ${address}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const geminiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            temperature: 0.7, 
            maxOutputTokens: 4096,
            responseMimeType: "application/json"
          },
        }),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error("Gemini API error:", errorText);
        return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const geminiData = await geminiResponse.json();
      const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiText) {
        console.error("No AI response text:", geminiData);
        return new Response(JSON.stringify({ error: "No response from AI" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Parse the JSON response
      let aiAnalysis;
      try {
        const jsonText = aiText.trim().replace(/```json\n?|```/g, "");
        aiAnalysis = JSON.parse(jsonText);
      } catch (parseError) {
        console.error("Failed to parse AI response:", aiText);
        return new Response(JSON.stringify({ error: "Failed to parse AI response" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(aiAnalysis), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});