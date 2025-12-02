"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const { connectWallet, isConnected, account, isConnecting } = useWallet();

  useEffect(() => {
    if (isConnected) router.push("/markets");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-muted/20 to-background">
      <Card className="w-full max-w-md border-2 shadow-card">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Login to <span className="text-primary">Certus</span>
          </CardTitle>
          <CardDescription className="text-base">
            Secure, private, and instant access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {account ? (
              <p className="text-center text-sm font-medium p-4 bg-primary/10 border border-primary rounded-lg relative">
                Connected: {account.slice(0, 7)}...{account.slice(-5)}
                <span className="block absolute -top-1 -right-1 size-4 rounded-full bg-primary animate-pulse"></span>
              </p>
            ) : (
              <>
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 shadow-hover transition-smooth"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Supports MetaMask, Phantom, and Ethereum-compatible wallets
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
