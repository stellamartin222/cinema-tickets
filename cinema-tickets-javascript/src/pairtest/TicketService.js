import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #totalTickets = 0;
  #adultTickets = 0;
  #infantTickets = 0;

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

    if(!ticketTypeRequests.length){
      throw new InvalidPurchaseException(errorName, 400, 'No tickets requested.')
        .globalExceptionHandler();
    }

    this.#ticketTypeRequestHandler(ticketTypeRequests);

    console.log(ticketTypeRequests.INFANT)

    if(this.#adultTickets < this.#infantTickets){
      throw new InvalidPurchaseException(errorName, 400, 'Cannot request ticket for infant without adult.')
      .globalExceptionHandler();
    }

    if(this.ticketTotal <= 0){
      throw new InvalidPurchaseException(errorName, 400, 'Cannot request zero tickets.')
      .globalExceptionHandler();
    }
  }

  #ticketTypeRequestHandler(ticketTypeRequests) {
    let ticketTotal = 0;

    ticketTypeRequests.forEach(ticketRequest => {
      let type = Object.keys(ticketRequest)[0]
      let noOfTickets = ticketRequest[type]
      ticketTotal += noOfTickets

      try{
        new TicketTypeRequest(type, noOfTickets)
      } catch (errMessage) {
        throw new InvalidPurchaseException(errorName, 400, errMessage)
        .globalExceptionHandler();
      }

      switch (type) {
        case 'ADULT':
          this.#adultTickets += noOfTickets
          this.#totalTickets += noOfTickets
          break;
        case 'INFANT':
          this.#infantTickets += noOfTickets
          this.#totalTickets += noOfTickets
      }

      return
    });
  }
}
