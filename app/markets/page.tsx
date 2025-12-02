"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, TrendingUp, CheckCircle2 } from "lucide-react";
import EventCard from "@/components/EventCard";
import PredictionModal from "@/components/PredictionModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ResolvedMarketCard from "@/components/ResolvedMarketCard";
import { useWallet } from "@/hooks/useWallet";
import checkSavedAccount from "@/lib/checkSavedAccount";

// Mock data
const activeEvents = [
  {
    id: 1,
    title: "Will Bitcoin reach $100k by end of 2024?",
    description:
      "Prediction based on verified exchange data from major platforms.",
    endsAt: new Date("2024-12-31"),
    participants: 1234,
  },
  {
    id: 2,
    title: "Will SpaceX launch Starship to orbit this quarter?",
    description:
      "Outcome verified through official SpaceX announcements and space agencies.",
    endsAt: new Date("2024-12-31"),
    participants: 856,
  },
  {
    id: 3,
    title: "Will global temperature rise exceed 1.5°C by 2025?",
    description: "Data sourced from verified climate monitoring organizations.",
    endsAt: new Date("2025-01-01"),
    participants: 2341,
  },
];

const resolvingEvents = [
  {
    id: 201,
    title: "Will Tesla stock hit $300 by year end?",
    description:
      "Market closes December 31st, resolution pending final trading data.",
    endsAt: new Date("2024-12-31"),
    participants: 892,
  },
  {
    id: 202,
    title: "Will OpenAI release GPT-5 in 2024?",
    description: "Awaiting official announcement from OpenAI.",
    endsAt: new Date("2024-12-20"),
    participants: 1567,
  },
];

const resolvedEvents = [
  {
    id: 101,
    title: "Would AI pass the Turing test in 2024?",
    outcome: true,
    userPrediction: true,
    resolvedAt: new Date("2024-11-15"),
  },
  {
    id: 102,
    title: "Will Ethereum 2.0 launch in Q3 2024?",
    outcome: false,
    userPrediction: true,
    resolvedAt: new Date("2024-10-01"),
  },
];

const Markets = () => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof activeEvents)[0] | null
  >(null);
  const [predictionType, setPredictionType] = useState<"yes" | "no" | null>(
    null
  );

  const { disconnectWallet } = useWallet();

  const handleLogout = () => {
    disconnectWallet();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handlePredict = (
    event: (typeof activeEvents)[0],
    type: "yes" | "no"
  ) => {
    setSelectedEvent(event);
    setPredictionType(type);
  };

  const handleConfirmPrediction = () => {
    toast.success(`Prediction placed: ${predictionType?.toUpperCase()}`);
    setSelectedEvent(null);
    setPredictionType(null);
  };

  if (!checkSavedAccount()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Card className="w-[350px] text-center p-6">
          <CardHeader>
            <CardTitle className="text-2xl">Not Authenticated</CardTitle>
            <CardDescription>
              Please login to access the markets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-primary">Certus</span>
              </h1>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    0x
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Active Markets */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Active Markets</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPredict={handlePredict}
                />
              ))}
            </div>
          </section>

          {/* Resolving Markets */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-6 rounded-full bg-secondary animate-pulse" />
              <h2 className="text-3xl font-bold">Resolving Markets</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {resolvingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-2 border-secondary/30 bg-secondary/5"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary font-medium">
                        Resolving...
                      </span>
                      <span className="text-muted-foreground">
                        {event.participants} participants
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resolved Markets */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Resolved Markets</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {resolvedEvents.map((event) => (
                <ResolvedMarketCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        </div>

        {/* Prediction Modal */}
        {selectedEvent && predictionType && (
          <PredictionModal
            event={selectedEvent}
            predictionType={predictionType}
            onConfirm={handleConfirmPrediction}
            onCancel={() => {
              setSelectedEvent(null);
              setPredictionType(null);
            }}
          />
        )}
      </div>
    );
  }
};

export default Markets;
