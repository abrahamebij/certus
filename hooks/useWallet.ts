// useWallet.ts
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("connectedAccount");
    if (saved) setAccount(saved);
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("No wallet found. Install MetaMask.");
      }

      setIsConnecting(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (!accounts || accounts.length === 0) {
        toast.error("No accounts found")
        throw new Error("No accounts found");
      }

      const selected = accounts[0];

      setAccount(selected);
      localStorage.setItem("connectedAccount", selected);
      toast.success("Wallet connected successfully")

      return selected;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("connectedAccount");
    router.push("/")
  };

  return {
    account,
    isConnected: !!account,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };
}
