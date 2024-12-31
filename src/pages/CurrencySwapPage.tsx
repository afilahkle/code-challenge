import React, { useState, useEffect } from 'react';
import CurrencySwap, { formSchema, TokenPrice } from '../components/CurrencySwap';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { AlertCircle } from 'lucide-react'

const CurrencySwapPage: React.FC = () => {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://interview.switcheo.com/prices.json')
      .then(response => response.json())
      .then(data => {
        const uniquePrices = data.reduce((acc: TokenPrice[], curr: TokenPrice) => {
          const existingIndex = acc.findIndex(item => item.currency === curr.currency);
          if (existingIndex > -1) {
            if (new Date(curr.date) > new Date(acc[existingIndex].date)) {
              acc[existingIndex] = curr;
            }
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        setPrices(uniquePrices);
      })
      .catch(err => setError(`Failed to fetch currency prices. Please try again later: ${err}`));
  }, []);

  const handleSwap = (values: z.infer<typeof formSchema>) => {
    const fromPrice = prices.find(p => p.currency === values.fromCurrency)?.price || 0;
    const toPrice = prices.find(p => p.currency === values.toCurrency)?.price || 0;
    
    if (fromPrice === 0 || toPrice === 0) {
      setError('Invalid currency selection. Please try again.');
      setResult(null);
      return;
    }

    const swapResult = (values.amount * fromPrice) / toPrice;
    setResult(`${swapResult.toFixed(6)} ${values.toCurrency}`);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Currency Swap</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <CurrencySwap prices={prices} onSwap={handleSwap} />
      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-lg text-neutral-800 text-center">
            Swap result: <strong>{result}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencySwapPage;

