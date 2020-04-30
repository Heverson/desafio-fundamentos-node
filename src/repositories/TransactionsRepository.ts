import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outCometransactions = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((sum, { value }) => sum + value, 0);

    const inCometransactions = this.transactions
      .filter(item => item.type === 'income')
      .reduce((sum, { value }) => sum + value, 0);

    const balance = {
      income: inCometransactions,
      outcome: outCometransactions,
      total: inCometransactions - outCometransactions,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
