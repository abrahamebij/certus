"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cloud, Bitcoin } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { useMarketStore } from "@/stores/marketStore";

const NewMarket = () => {
  const router = useRouter();
  const addMarket = useMarketStore((state) => state.addMarket);
  const [category, setCategory] = useState<"weather" | "crypto" | null>(
    "weather"
  );
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [coin, setCoin] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");
  const [eventDate, setEventDate] = useState("");

  const generateTitle = () => {
    if (category === "weather") {
      if (condition === "temp") return `Will temperature in ${city} exceed ${price}°C?`;
      if (condition === "sunny") return `Will it be sunny in ${city}?`;
      if (condition === "rain") return `Will it rain in ${city}?`;
    }
    if (category === "crypto") {
      return `Will ${coin} price be above $${price}?`;
    }
    return "";
  };

  const handleCreate = () => {
    if (!category || !deadline || !eventDate) {
      toast.error("Please fill required fields");
      return;
    }

    addMarket({
      title: generateTitle(),
      description: `${category} prediction market`,
      category,
      city,
      condition,
      coin,
      price,
      deadline,
      eventDate
    });

    toast.success("Market created!");
    router.push("/markets");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <FaArrowLeft className="text-3xl" />
            </Button>
            <h1 className="text-2xl font-bold flex-1 text-center">Create New Market</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Market Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="mb-3 block">Category</Label>
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer border-2 ${
                    category === "weather"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() => setCategory("weather")}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <Cloud className="h-8 w-8 mb-2 text-primary" />
                    <span className="font-medium">Weather</span>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer border-2 ${
                    category === "crypto"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() => setCategory("crypto")}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <Bitcoin className="h-8 w-8 mb-2 text-primary" />
                    <span className="font-medium">Crypto</span>
                  </CardContent>
                </Card>
              </div>
            </div>

            {category === "weather" && (
              <div className="flex flex-col gap-4">
                <div>
                  <Label className="mb-2 block">City</Label>
                  <Input
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Condition</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="">Select condition</option>
                    <option value="sunny">Will it be sunny?</option>
                    <option value="rain">Will it rain?</option>
                    <option value="temp">Will temperature exceed X°C?</option>
                  </select>
                </div>
              </div>
            )}

            {category === "crypto" && (
              <div className="flex flex-col gap-4">
                <div>
                  <Label className="mb-2 block">Coin</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={coin}
                    onChange={(e) => setCoin(e.target.value)}
                  >
                    <option value="">Select coin</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="SOL">Solana (SOL)</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-2 block">Target Price ($)</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="mb-2 block">Deadline</Label>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Event Date</Label>
              <Input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <Button onClick={handleCreate} className="w-full" size="lg">
              Create Market
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewMarket;
