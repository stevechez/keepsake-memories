import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Pricing() {
  const tiers = [
    {
      name: "Social Reel",
      price: "$29",
      description: "Perfect for sharing the joy on Instagram or TikTok.",
      features: ["30-second vertical video", "Upbeat AI-selected music", "3 Gemini-powered captions", "48-hour delivery"],
      cta: "Start Reel",
      highlighted: false,
    },
    {
      name: "Cinematic Legacy",
      price: "$59",
      description: "Our signature narrative experience for a lifetime of memories.",
      features: [
        "2-3 minute cinematic video",
        "Full Gemini narrative script",
        "Emotional soundtrack layering",
        "4K high-definition export",
        "Priority AI processing"
      ],
      cta: "Create Legacy",
      highlighted: true,
    },
    {
      name: "The Keepsake Box",
      price: "$99",
      description: "A digital and physical tribute to your best friend.",
      features: ["Everything in Cinematic Legacy", "Custom QR-code Gift Card", "Permanent cloud hosting", "Personalized video intro"],
      cta: "Get the Bundle",
      highlighted: false,
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Memory</h2>
          <p className="text-lg text-slate-600">From quick reels to cinematic stories, we have a way to honor every pet.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col ${tier.highlighted ? 'border-indigo-600 shadow-xl scale-105' : 'border-slate-200'}`}>
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="text-4xl font-bold mt-4">{tier.price}</div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-slate-600">
                      <Check className="h-4 w-4 text-indigo-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${tier.highlighted ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`} variant={tier.highlighted ? 'default' : 'outline'}>
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
