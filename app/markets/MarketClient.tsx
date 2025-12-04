/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { LogOut, TrendingUp, CheckCircle2 } from "lucide-react";
import EventCard from "@/components/EventCard";
import PredictionModal from "@/components/PredictionModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ResolvedMarketCard from "@/components/ResolvedMarketCard";
import { useWallet } from "@/hooks/useWallet";
import checkSavedAccount from "@/lib/checkSavedAccount";
import { useMarketStore } from "@/stores/marketStore";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const MarketClient = () => {
  const router = useRouter();
  const markets = useMarketStore((state) => state.markets);
  const addPrediction = useMarketStore((state) => state.addPrediction);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [predictionType, setPredictionType] = useState<"yes" | "no" | null>(
    null
  );

  const { disconnectWallet } = useWallet();

  const handleLogout = () => {
    disconnectWallet();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handlePredict = (event: any, type: "yes" | "no") => {
    setSelectedEvent(event);
    setPredictionType(type);
  };

  const handleConfirmPrediction = () => {
    if (selectedEvent && predictionType) {
      addPrediction(selectedEvent.id, predictionType);
      toast.success(`Prediction placed: ${predictionType?.toUpperCase()}`);
    }
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
      <div className="min-h-screen bg-background relative">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={"/"} className="text-2xl font-bold tracking-tight">
                <span className="text-primary">Certus</span>
              </Link>
              <div className="flex items-center gap-4">
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">Active Markets</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {markets
                .filter((m) => m.status === "active")
                .map((market) => (
                  <EventCard
                    key={market.id}
                    event={{
                      id: market.id,
                      title: market.title,
                      description: market.description,
                      endsAt: new Date(market.deadline),
                      participants: market.participants,
                    }}
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
              {markets
                .filter((m) => m.status === "resolving")
                .map((market) => (
                  <Card
                    key={market.id}
                    className="border-2 border-secondary/30 bg-secondary/5"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{market.title}</CardTitle>
                      <CardDescription>{market.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-medium">
                          Resolving...
                        </span>
                        <span className="text-muted-foreground">
                          {market.participants} participants
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
              {markets
                .filter((m) => m.status === "resolved" && m.resolvedAt)
                .map((market) => (
                  <ResolvedMarketCard key={market.id} event={market as any} />
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

        <Button
          className="flex justify-center items-center size-12 fixed bg-primary text-white bottom-6 right-6 text-5xl rounded-full"
          title="Create a new market"
        >
          <Link href={"/markets/new"}>
            <FaPlus />
          </Link>
        </Button>
      </div>
    );
  }
};

export default MarketClient;
