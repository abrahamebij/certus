import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import dayjs from "dayjs";

interface ResolvedEvent {
  title: string;
  resolvedAt: Date;
  userPrediction: boolean;
  outcome: boolean;
}

const ResolvedMarketCard = ({event}: {event: ResolvedEvent}) => {
  return (
    <Card
                className={`border-2 ${
                  event.userPrediction === event.outcome
                    ? "border-success/30 bg-success/5"
                    : "border-destructive/30 bg-destructive/5"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription>
                        Resolved on{" "}
                        {dayjs(event.resolvedAt).format("MMM D, YYYY")}
                      </CardDescription>
                    </div>
                    {event.userPrediction === event.outcome ? (
                      <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="space-y-1">
                      <div className="font-medium">Your Prediction</div>
                      <div
                        className={
                          event.userPrediction
                            ? "text-primary font-bold"
                            : "text-muted-foreground font-bold"
                        }
                      >
                        {event.userPrediction ? "YES" : "NO"}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="font-medium">Outcome</div>
                      <div
                        className={
                          event.outcome
                            ? "text-primary font-bold"
                            : "text-muted-foreground font-bold"
                        }
                      >
                        {event.outcome ? "YES" : "NO"}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="font-medium">Result</div>
                      <div
                        className={
                          event.userPrediction === event.outcome
                            ? "text-success font-bold"
                            : "text-destructive font-bold"
                        }
                      >
                        {event.userPrediction === event.outcome
                          ? "WIN"
                          : "LOSE"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
  )
}

export default ResolvedMarketCard