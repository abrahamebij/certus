import { create } from 'zustand';

interface Market {
  id: number;
  title: string;
  description: string;
  category: 'weather' | 'crypto';
  city?: string;
  condition?: string;
  coin?: string;
  price?: string;
  deadline: string;
  eventDate: string;
  participants: number;
  creator: string;
  status: 'active' | 'resolving' | 'resolved';
  createdAt: Date;
  outcome?: boolean;
  userPrediction?: boolean;
  resolvedAt?: Date;
}

interface MarketStore {
  markets: Market[];
  addMarket: (marketData: Omit<Market, 'id' | 'participants' | 'creator' | 'status' | 'createdAt'>) => void;
  addPrediction: (marketId: number, prediction: 'yes' | 'no') => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  markets: [
    {
      id: 1,
      title: "Will Bitcoin reach $100k by end of 2024?",
      description: "Prediction based on verified exchange data from major platforms.",
      category: 'crypto' as const,
      coin: 'BTC',
      price: '100000',
      deadline: "2024-12-31T23:59",
      eventDate: "2024-12-31T23:59",
      participants: 1234,
      creator: '0x1234...5678',
      status: 'active' as const,
      createdAt: new Date()
    },
    {
      id: 201,
      title: "Will Tesla stock hit $300 by year end?",
      description: "Market closes December 31st, resolution pending final trading data.",
      category: 'crypto' as const,
      coin: 'TSLA',
      price: '300',
      deadline: "2024-12-30T23:59",
      eventDate: "2024-12-31T23:59",
      participants: 892,
      creator: '0x1234...5678',
      status: 'resolving' as const,
      createdAt: new Date()
    },
    {
      id: 101,
      title: "Would AI pass the Turing test in 2024?",
      description: "AI prediction market",
      category: 'crypto' as const,
      deadline: "2024-11-14T23:59",
      eventDate: "2024-11-15T23:59",
      participants: 567,
      creator: '0x1234...5678',
      status: 'resolved' as const,
      outcome: true,
      userPrediction: true,
      resolvedAt: new Date('2024-11-15'),
      createdAt: new Date()
    },
    {
      id: 102,
      title: "Will Ethereum 2.0 launch in Q3 2024?",
      description: "Ethereum upgrade prediction",
      category: 'crypto' as const,
      coin: 'ETH',
      deadline: "2024-09-30T23:59",
      eventDate: "2024-10-01T23:59",
      participants: 892,
      creator: '0x1234...5678',
      status: 'resolved' as const,
      outcome: false,
      userPrediction: true,
      resolvedAt: new Date('2024-10-01'),
      createdAt: new Date()
    },
    {
      id: 103,
      title: "Will it rain in New York on Christmas?",
      description: "Weather prediction for NYC",
      category: 'weather' as const,
      city: 'New York',
      condition: 'rain',
      deadline: "2024-12-24T23:59",
      eventDate: "2024-12-25T23:59",
      participants: 234,
      creator: '0x1234...5678',
      status: 'resolved' as const,
      outcome: false,
      userPrediction: false,
      resolvedAt: new Date('2024-12-25'),
      createdAt: new Date()
    }
  ],
  addMarket: (marketData) => set((state) => ({
    markets: [...state.markets, {
      ...marketData,
      id: Date.now(),
      participants: 0,
      creator: '0x1234...5678',
      status: 'active',
      createdAt: new Date()
    }]
  })),
  addPrediction: (marketId, prediction) => set((state) => ({
    markets: state.markets.map(market => 
      market.id === marketId 
        ? { ...market, participants: market.participants + 1, status: 'resolving' as const }
        : market
    )
  }))
}));