import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import SumToN, { sumToNFunctions } from '../components/SumToN';

const formSchema = z.object({
  n: z.number().int().positive("n must be a positive integer"),
});

const SumToNPage: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      n: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const resultA = sumToNFunctions.sum_to_n_a(values.n);
    const resultB = sumToNFunctions.sum_to_n_b(values.n);
    const resultC = sumToNFunctions.sum_to_n_c(values.n);

    if (resultA === resultB && resultB === resultC) {
      setResult(resultA);
    } else {
      console.error('Results do not match');
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Three ways to sum to n</h1>
      <SumToN />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Calculate Sum</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="n"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter a number (n)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormDescription>
                      Enter a positive integer to calculate the sum from 1 to n.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Calculate</Button>
            </form>
          </Form>
          {result !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <p className="text-lg text-center">
                Sum to {form.getValues().n}: <strong>{result}</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SumToNPage;

