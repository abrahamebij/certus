import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface PredictionModalProps {
  event: {
    id: number;
    title: string;
    description: string;
  };
  predictionType: "yes" | "no";
  onConfirm: () => void;
  onCancel: () => void;
}

const PredictionModal = ({
  event,
  predictionType,
  onConfirm,
  onCancel,
}: PredictionModalProps) => {
  const [amount, setAmount] = useState("100");

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Confirm Your Prediction
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {event.title}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="prediction" className="text-base font-medium mb-1">
              Your Prediction
            </Label>
            <div
              className={`p-4 rounded-lg border-2 text-center font-bold text-lg ${
                predictionType === "yes"
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-muted border-muted-foreground/20"
              }`}
            >
              {predictionType.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="amount" className="text-base font-medium mb-1">
              Stake Amount (Test Tokens)
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-lg"
              min="1"
            />
            <p className="text-sm text-muted-foreground">
              These are test tokens for demonstration purposes
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
          >
            Confirm Prediction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;
