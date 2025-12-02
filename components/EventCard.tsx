"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface EventCardProps {
  event: Event;
  onPredict: (event: EventCardProps["event"], type: "yes" | "no") => void;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  endsAt: Date;
  participants: number;
}

const EventCard = ({ event, onPredict }: EventCardProps) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const end = event.endsAt.getTime();
    const distance = end - now;

    if (distance < 0) {
      return "Ended";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.endsAt]);

  return (
    <Card className="border-2 hover:border-primary/50 transition-smooth hover:shadow-hover group">
      <CardHeader>
        <CardTitle className="text-lg leading-tight transition-smooth">
          {event.title}
        </CardTitle>
        <CardDescription className="mt-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{timeLeft}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">
              {event.participants.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onPredict(event, "yes")}
            className="bg-primary hover:bg-primary/90 transition-smooth shadow-card hover:shadow-hover"
          >
            YES
          </Button>
          <Button
            onClick={() => onPredict(event, "no")}
            variant="outline"
            className="border-2 hover:bg-muted hover:text-white transition-smooth"
          >
            NO
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
