import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateAccountId(accountId)
    this.#validateTicketTypeRequests(ticketTypeRequests)
    return {status: 201, message: 'Thank you for your order.'}
  }

  #validateAccountId(accountId) {
    let errorName = 'validateAccountId';

    if(isNaN(accountId)){
      throw new InvalidPurchaseException(errorName, 400, 'Account ID must be a number.')
      .globalExceptionHandler();
    } else if (accountId <= 0){
      throw new InvalidPurchaseException(errorName, 400, 'Account ID must be greater than zero.')
      .globalExceptionHandler();
    }
  }

  
  #validateTicketTypeRequests(ticketTypeRequests) {
    let errorName = 'validateTicketTypeRequest';
    let totalRequestedTickets = 0;

    if(!ticketTypeRequests.length){
      throw new InvalidPurchaseException(errorName, 400, 'No tickets requested.')
        .globalExceptionHandler();
    }

    ticketTypeRequests.forEach(ticketRequest => {
      let type = Object.keys(ticketRequest)[0]
      let noOfTickets = ticketRequest[type]
      totalRequestedTickets += noOfTickets;

      try{
        new TicketTypeRequest(type, noOfTickets)
      } catch (errMessage) {
        throw new InvalidPurchaseException(errorName, 400, errMessage)
        .globalExceptionHandler();
      }
    });

    if(totalRequestedTickets <= 0){
      throw new InvalidPurchaseException(errorName, 400, 'Cannot request zero tickets.')
      .globalExceptionHandler();
    }
  }
}
