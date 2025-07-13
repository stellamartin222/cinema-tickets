import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateAccountId(accountId)
    // throws InvalidPurchaseException
    return {status: 201, message: 'Thank you for your order.'}
  }

  #validateAccountId(accountId) {
    let name = 'validateAccountId';
    let status;
    let message;

    if(isNaN(accountId)){
      throw new InvalidPurchaseException(
        name, 
        status = 400, 
        message = 'Account ID must be a number.'
      ).globalExceptionHandler();
    }
  }
}
