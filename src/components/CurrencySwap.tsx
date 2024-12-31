import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';

export interface TokenPrice {
  date: string;
  currency: string;
  price: number;
}

export const formSchema = z.object({
  fromCurrency: z.string().min(1, "From currency is required"),
  toCurrency: z.string().min(1, "To currency is required"),
  amount: z.number().positive("Amount must be positive"),
});

interface CurrencySwapProps {
  prices: TokenPrice[];
  onSwap: (values: z.infer<typeof formSchema>) => void;
}

const CurrencySwap: React.FC<CurrencySwapProps> = ({ prices, onSwap }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Swap Currencies</CardTitle>
        <CardDescription>Enter the details to swap currencies</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSwap)} className="space-y-8">
            <FormField
              control={form.control}
              name="fromCurrency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select currency" className="select-placeholder" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {prices.map(p => (
                        <SelectItem key={p.currency} value={p.currency} className="select-item">
                          <div className="flex items-center">
                            <img
                              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${p.currency}.svg`}
                              alt={p.currency}
                              className="w-6 h-6 mr-2"
                            />
                            {p.currency}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the currency you want to swap from.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toCurrency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Select currency" className="select-placeholder" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {prices.map(p => (
                        <SelectItem key={p.currency} value={p.currency} className="select-item">
                          <div className="flex items-center">
                            <img
                              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${p.currency}.svg`}
                              alt={p.currency}
                              className="w-6 h-6 mr-2"
                            />
                            {p.currency}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select the currency you want to swap to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you want to swap.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Swap</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CurrencySwap;
