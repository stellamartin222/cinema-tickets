import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #totalTickets = 0;
  #adultTickets = 0;
  #childTickets = 0;
  #infantTickets = 0;
  #MAX_TICKET_ORDER = 25;

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

    if(this.#adultTickets < this.#infantTickets){
      throw new InvalidPurchaseException(
        errorName, 400, 'Must be one adult per infant ticket purchased.'
      )
      .globalExceptionHandler();
    }

    if(this.#adultTickets < this.#childTickets){
      throw new InvalidPurchaseException(
        errorName, 400, 'A child must be accompanied by an adult.'
      )
      .globalExceptionHandler();
    }

    if(this.#totalTickets <= 0){
      throw new InvalidPurchaseException(errorName, 400, 'Cannot request zero tickets.')
      .globalExceptionHandler();
    } else if (this.#totalTickets > this.#MAX_TICKET_ORDER) {
      throw new InvalidPurchaseException(errorName, 400, 'Total ticket number cannot exceed 25.')
      .globalExceptionHandler();
    }
  }

  #ticketTypeRequestHandler(ticketTypeRequests) {
    let errorName = 'validateTicketTypeRequest';

    ticketTypeRequests.forEach(ticketRequest => {
      let type = Object.keys(ticketRequest)[0]
      let noOfTickets = ticketRequest[type]

      try{
        new TicketTypeRequest(type, noOfTickets)
      } catch (err) {
        if(err.message === 'type must be ADULT, CHILD, or INFANT'){
          throw new InvalidPurchaseException(errorName, 400, 'Ticket type must be ADULT, CHILD or INFANT.')
          .globalExceptionHandler();
        } else {
          throw new InvalidPurchaseException(errorName, 400, 'Number of tickets must be an integer.')
          .globalExceptionHandler();
        }
      }

      switch (type) {
        case 'ADULT':
          this.#adultTickets += noOfTickets
          this.#totalTickets += noOfTickets
          break;
        case 'CHILD':
          this.#childTickets += noOfTickets
          this.#totalTickets += noOfTickets
          break;
        case 'INFANT':
          this.#infantTickets += noOfTickets
          this.#totalTickets += noOfTickets
          break;
      }

      return
    });
  }
}
