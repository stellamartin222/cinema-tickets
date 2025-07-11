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
    if(isNaN(accountId)){
      throw {
        status: 400,
        message: 'Account ID must be a number.'
      }
    }
  }
}
