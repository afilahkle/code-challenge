import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

const codeStyle = "bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto";

export const sumToNFunctions = {
  sum_to_n_a: (n: number): number => {
    return (n * (n + 1)) / 2;
  },
  sum_to_n_b: (n: number): number => {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
  },
  sum_to_n_c: (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }
};

const SumToN: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Approach 1: Mathematical Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={codeStyle}>
            {`const sum_to_n_a = (n: number): number => {
  return (n * (n + 1)) / 2;
};`}
          </pre>
          <CardDescription className="mt-4">
            This approach uses the mathematical formula (n * (n + 1)) / 2 to calculate the sum.
          </CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Approach 2: Array Reduction</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={codeStyle}>
            {`const sum_to_n_b = (n: number): number => {
  return Array.from({ length: n }, (_, i) => i + 1)
    .reduce((sum, num) => sum + num, 0);
};`}
          </pre>
          <CardDescription className="mt-4">
            This approach creates an array of numbers from 1 to n and then uses the reduce method to sum them up.
          </CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Approach 3: For Loop</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={codeStyle}>
            {`const sum_to_n_c = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};`}
          </pre>
          <CardDescription className="mt-4">
            This approach uses a for loop to iterate from 1 to n and sum up the numbers.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default SumToN;

