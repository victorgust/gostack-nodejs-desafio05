import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // public getBalance(): Balance {
  public getBalance(): Balance {
    // 'income' | 'outcome';
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let valIncome = 0;
    let valOutcome = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        valIncome += transaction.value;
      } else if (transaction.type === 'outcome') {
        valOutcome += transaction.value;
      }
      return 0;
    });

    /*
    const TransactionIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    valIncome = TransactionIncome.reduce(
      (accumulator: Transaction, currentValue: Transaction) => {
        return {
          id: accumulator.id,
          value: accumulator.value + currentValue.value,
          title: accumulator.title,
          type: accumulator.type,
        };
      },
    );

    const TransactionOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    valOutcome = TransactionOutcome.reduce(
      (accumulator: Transaction, currentValue: Transaction) => {
        return {
          id: accumulator.id,
          value: accumulator.value + currentValue.value,
          title: accumulator.title,
          type: accumulator.type,
        };
      },
      0,
    );

    */

    const balance: Balance = {
      income: valIncome,
      outcome: valOutcome,
      total: valIncome - valOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const balance: Balance = this.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error(`Don't have enough balance`);
    }

    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
