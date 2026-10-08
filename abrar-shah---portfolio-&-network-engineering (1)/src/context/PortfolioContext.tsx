import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { fallbackPortfolioData } from '../data/initialData';
import type { PortfolioData } from '../types';

interface PortfolioContextType {
  data: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
  refreshPortfolio: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(fallbackPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPortfolio = useCallback(async () => {
    try {
      setError(null);
      const res = await api.getPortfolio();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err: unknown) {
      console.warn('API unavailable, falling back to local portfolio data:', err);
      // Use fallback data so site always displays beautifully on static hosts like Netlify
      setData(prev => prev || fallbackPortfolioData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  return (
    <PortfolioContext.Provider value={{ data, isLoading, error, refreshPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextType {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
