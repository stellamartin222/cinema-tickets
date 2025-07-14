import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPriceCalculator from '../services/ticketcalculator/TicketPriceCalculatorService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #totalTickets = 0;
  #adultTickets = 0;
  #childTickets = 0;
  #infantTickets = 0;
  #MAX_TICKET_ORDER;

  constructor(){{
    this.#MAX_TICKET_ORDER = 25;
  }}

  purchaseTickets(accountId, ...ticketTypeRequests) {
    try{
      this.#validateAccountId(accountId)
      this.#validateTicketTypeRequests(ticketTypeRequests)
    } catch(err){
      return err.globalExceptionHandler()
    }
    // TicketPriceCalculator(this.#adultTickets, this.#childTickets);
    return {status: 201, message: 'Thank you for your order.'}
  }

  #validateAccountId(accountId) {
    let errorName = 'validateAccountId';

    if(isNaN(accountId)){
      throw new InvalidPurchaseException(errorName, 400, 'Account ID must be a number.')
    } else if (accountId <= 0){
      throw new InvalidPurchaseException(errorName, 400, 'Account ID must be greater than zero.')
    }
    //In a production system there would be an aditional check to confirm the 
    //account number exists, in valid ect. but this is outside of the scope of this tech test.
  }

  
  #validateTicketTypeRequests(ticketTypeRequests) {
    let errorName = 'validateTicketTypeRequest';

    //No ticket requests.
    if(ticketTypeRequests.length < 1){
      throw new InvalidPurchaseException(errorName, 400, 'No tickets requested.')
    }

    this.#ticketHandler(ticketTypeRequests);

    //Child and Infant tickets cannot be purchased without purchasing an Adult ticket.
    //Infants will be sitting on an Adult's lap.
    if(this.#adultTickets < this.#infantTickets){
      throw new InvalidPurchaseException(
        errorName, 400, 'Must be one adult per infant ticket purchased.'
      )
    } else if(this.#adultTickets < this.#childTickets){ 
      throw new InvalidPurchaseException(
        errorName, 400, 'A child must be accompanied by an adult.'
      )
    }

    //Cannot purchase less than one ticket.
    //Only a maximum of 25 tickets that can be purchased at a time.
    if(this.#totalTickets <= 0){
      throw new InvalidPurchaseException(errorName, 400, 'Cannot request zero tickets.')
    } else if (this.#totalTickets > this.#MAX_TICKET_ORDER) {
      throw new InvalidPurchaseException(errorName, 400, 'Total ticket number cannot exceed 25.')
    }
  }

  #ticketHandler(ticketTypeRequests) {
    let errorName = 'validateTicketTypeRequest';

    ticketTypeRequests.forEach(ticketRequest => {
      let type = Object.keys(ticketRequest)[0];
      let noOfTickets = ticketRequest[type];

      try{
        new TicketTypeRequest(type, noOfTickets)
      } catch (err) {
        if(err.message === 'type must be ADULT, CHILD, or INFANT'){
          throw new InvalidPurchaseException(errorName, 400, 'Ticket type must be ADULT, CHILD or INFANT.')
        } else {
          throw new InvalidPurchaseException(errorName, 400, 'Number of tickets must be an integer.')
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

  #calculateTotalTicketCost(){


    return ((ADULT_TICKET_PRICE * this.#adultTickets)+(CHILD_TICKET_PRICE * this.#childTickets))
  }
}
