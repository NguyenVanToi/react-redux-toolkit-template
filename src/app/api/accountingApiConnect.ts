import { API_URL } from '../ pages/utils/environment';
import { Api } from './api';
// import storage from './../storage';

export class AccountingApi extends Api<any> {
  constructor() {
    // const authorization = storage.load("authorization");
    const authorization: any = undefined;

    super({
      baseUrl: API_URL,
      baseApiParams: {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
      },
    });
  }
}

// {"transactionInformation":"textarasasd"}
