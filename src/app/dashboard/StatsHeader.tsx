import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, CheckCircle, Heart } from "lucide-react";

interface StatsProps {
  projects: any[];
}

export default function StatsHeader({ projects }: StatsProps) {
  // Calculate revenue based on tiers
  const totalRevenue = projects.reduce((acc, project) => {
    if (project.status === 'unpaid') return acc;
    const prices = { social: 29, cinematic: 59, legacy: 99 };
    return acc + (prices[project.order_tier as keyof typeof prices] || 0);
  }, 0);

  const pendingCount = projects.filter(p => p.status === 'pending').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      description: "Gross lifetime earnings"
    },
    {
      title: "Pending Memories",
      value: pendingCount,
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      description: "Awaiting Gemini analysis"
    },
    {
      title: "Completed",
      value: completedCount,
      icon: <CheckCircle className="h-4 w-4 text-indigo-600" />,
      description: "Delivered to families"
    },
    {
      title: "Impact",
      value: "100%",
      icon: <Heart className="h-4 w-4 text-red-600" />,
      description: "Smile & tear-jerker rate"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
