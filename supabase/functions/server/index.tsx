// index.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import Stripe from "stripe";
import * as kv from "./kv_store.tsx"; // your KV helper
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = new Hono();

// Initialize Stripe
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-10-28.acacia",
});

// Logger and CORS
app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Health check
app.get("/make-server-52cdd920/health", (c) => c.json({ status: "ok" }));

// --- Stripe Endpoints ---
app.post("/make-server-52cdd920/create-payment-intent", async (c) => {
  try {
    const { amount, address } = await c.req.json();
    if (!amount) return c.json({ error: "Amount is required" }, 400);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: {
        address: address || "N/A",
        service: "listing-analytics-premium",
      },
      automatic_payment_methods: { enabled: true },
    });

    return c.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-52cdd920/verify-payment", async (c) => {
  try {
    const { paymentIntentId } = await c.req.json();
    if (!paymentIntentId)
      return c.json({ error: "Payment intent ID is required" }, 400);

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const userId = paymentIntent.metadata.address || paymentIntentId;
      await kv.set(`subscription:${userId}`, {
        status: "active",
        paymentIntentId,
        createdAt: new Date().toISOString(),
        address: paymentIntent.metadata.address,
      });
      return c.json({ success: true, status: paymentIntent.status });
    }

    return c.json({ success: false, status: paymentIntent.status });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-52cdd920/check-subscription", async (c) => {
  try {
    const { address } = await c.req.json();
    if (!address) return c.json({ error: "Address is required" }, 400);

    const subscription = await kv.get(`subscription:${address}`);
    return c.json({ hasSubscription: !!subscription, subscription });
  } catch (error: any) {
    console.error("Error checking subscription:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- Google Places Autocomplete ---
app.post("/make-server-52cdd920/places-autocomplete", async (c) => {
  try {
    const { input } = await c.req.json();
    if (!input) return c.json({ error: "Input is required" }, 400);

    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return c.json({ error: "API key not configured" }, 500);

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=address&components=country:us&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return c.json({ error: `Places API error: ${data.status}` }, 500);
    }

    return c.json({ predictions: data.predictions || [] });
  } catch (error: any) {
    console.error("Error in places autocomplete:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- Google Places Details ---
app.post("/make-server-52cdd920/places-details", async (c) => {
  try {
    const { placeId } = await c.req.json();
    if (!placeId) return c.json({ error: "Place ID is required" }, 400);

    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return c.json({ error: "API key not configured" }, 500);

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,address_components,geometry&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK")
      return c.json({ error: `Places API error: ${data.status}` }, 500);

    return c.json({ result: data.result });
  } catch (error: any) {
    console.error("Error in places details:", error);
    return c.json({ error: error.message }, 500);
  }
});

// --- AI Listing Analysis ---
app.post("/make-server-52cdd920/analyze-listing", async (c) => {
  try {
    const { address } = await c.req.json();
    if (!address) return c.json({ error: "Address is required" }, 400);

    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return c.json({ error: "Gemini API key not configured" }, 500);

    const prompt = `You are a real estate listing analysis AI. Analyze this property address and provide JSON output. Address: ${address}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    });

    const geminiData = await geminiResponse.json();
    const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiText) throw new Error("No response from AI");

    const jsonText = aiText.trim().replace(/```json\n?|```/g, "");
    const aiAnalysis = JSON.parse(jsonText);

    return c.json(aiAnalysis);
  } catch (error: any) {
    console.error("Error generating AI analysis:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Start server (Node.js)
const port = process.env.PORT ? Number(process.env.PORT) : 8787;
app.fire(); // Hono entry point in Node.js
console.log(`Server running on http://localhost:${port}`);
