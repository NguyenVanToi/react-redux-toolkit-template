import { AccountingApi } from './accountingApiConnect';
import { Lender } from './api';

export async function fetchLenders(): Promise<Lender[]> {
  const api = new AccountingApi();
  return new Promise(async (resolve, reject) => {
    try {
      const response: any =
        await api.lender.lenderControllerLendersWithTransactions();
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}
