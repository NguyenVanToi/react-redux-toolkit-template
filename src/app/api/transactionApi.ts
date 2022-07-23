import { AccountingApi } from './accountingApiConnect';
import { Transaction } from './api';

export async function fetchTransactions(filter: any): Promise<Transaction[]> {
  const api = new AccountingApi();
  return new Promise(async (resolve, reject) => {
    try {
      const response: any =
        await api.transaction.getManyBaseTransactionControllerTransaction({
          filter: [...filter],
          join: ['lender||name'],
        });
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}
