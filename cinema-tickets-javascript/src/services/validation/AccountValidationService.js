import InvalidPurchaseException from '../../pairtest/lib/InvalidPurchaseException.js';
import { logger } from '../../pairtest/lib/logger.js';

export default class AccountValidationService {
  validateAccountId(accountId) {
    const serviceName = 'validateAccountId';

    if (isNaN(accountId) || !Number.isInteger(accountId)) {
      throw new InvalidPurchaseException(serviceName, 'Account ID must be a number.');
    } else if (accountId <= 0) {
      throw new InvalidPurchaseException(serviceName, 'Account ID must be greater than zero.');
    }

    this.#accountService();

    logger.log('info', {
      type: serviceName,
      title: 'Success',
      detail: `account ID ${accountId} is valid`,
    });

    return { status: 200 };
  }

  #accountService() {
    //In a production system this would be an aditional check to confirm the
    //account number exists, is valid ect. But this is outside of the scope of this tech test.

    return;
  }
}
