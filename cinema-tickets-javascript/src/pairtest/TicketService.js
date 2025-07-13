import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateAccountId(accountId)
    this.#validateTicketTypeRequest(ticketTypeRequests)
    return {status: 201, message: 'Thank you for your order.'}
  }

  #validateAccountId(accountId) {
    let name = 'validateAccountId';

    if(isNaN(accountId)){
      throw new InvalidPurchaseException(
        name, 
        400, 
        'Account ID must be a number.'
      ).globalExceptionHandler();
    } else if (accountId <= 0){
      throw new InvalidPurchaseException(
        name, 
        400, 
        'Account ID must be greater than zero.'
      ).globalExceptionHandler();
    }
  }

  #validateTicketTypeRequest(ticketTypeRequest) {
    let name = 'validateTicketTypeRequest';

    if (!ticketTypeRequest.length) {
      throw new InvalidPurchaseException(
        name, 
        400, 
        'Account ID must be a number.'
      ).globalExceptionHandler();
    }
  }
}
