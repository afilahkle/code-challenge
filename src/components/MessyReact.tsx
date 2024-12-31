import React from 'react';
import { CodeBlock, dracula } from "react-code-blocks";

const MessyReact: React.FC = () => {
  const messyCode = `interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) {
        if (balance.amount <= 0) {
          return true;
        }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}`;

  const refactoredCode = `interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => balance.amount > 0 && BLOCKCHAIN_PRIORITY[balance.blockchain] !== undefined)
      .sort((a, b) => BLOCKCHAIN_PRIORITY[b.blockchain] - BLOCKCHAIN_PRIORITY[a.blockchain]);
  }, [balances]);

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
  }, [sortedBalances]);

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow
          key={balance.currency}
          className={classes.row}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};`;

  const issues = [
    {
      line: 11,
      issue: "unnecessary extended Props interface since no additional properties are added",
    },
    {
      line: 18,
      issue: "Incorrect type usage: 'any' should be avoided",
    },
    {
      line: 38,
      issue: "Incorrect variable usage: 'lhsPriority' is undefined",
    },
    {
      line: 53,
      issue: "Unnecessary dependency: 'prices' in useMemo",
    },
    {
      line: 39,
      issue: "Incorrect filtering logic: should filter out balances <= 0",
    },
    {
      line: 67,
      issue: "Incorrect key usage: using index as key",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Inefficiencies and Anti-patterns:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>unnecessary extended Props interface since no additional properties are added</li>
          <li>Unnecessary re-renders due to improper use of useMemo</li>
          <li>Inconsistent and inefficient sorting logic</li>
          <li>Redundant calculations and transformations</li>
          <li>Incorrect TypeScript usage and type assertions</li>
          <li>Inefficient filtering of balances</li>
        </ol>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Messy Code with Highlighted Issues:</h3>
        <div className="relative">
          <CodeBlock
            text={messyCode}
            language="typescript"
            showLineNumbers={true}
            theme={dracula}
          />
          <div className="absolute top-0 right-0 bottom-0 overflow-y-auto w-full md:w-1/3 bg-background bg-opacity-75 text-foreground p-4">
            {issues.map((issue, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">Line {issue.line}:</p>
                <p>{issue.issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Refactored Code:</h3>
        <CodeBlock
          text={refactoredCode}
          language="typescript"
          showLineNumbers={true}
          theme={dracula}
        />
      </div>
    </div>
  );
};

export default MessyReact;

