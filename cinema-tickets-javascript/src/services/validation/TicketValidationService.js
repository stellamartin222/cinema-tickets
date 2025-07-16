import InvalidPurchaseException from "../../pairtest/lib/InvalidPurchaseException";
import TicketRequest from "../../pairtest/lib/TicketRequest";
import { logger } from '../../pairtest/lib/logger';

export default class TicketValidationService{
  #serviceName;
  #maxSeatTotal;
  #ticketRequest;

  constructor(maxSeatTotal){
    this.#serviceName = 'validateTicketTypeRequest';
    this.#maxSeatTotal = maxSeatTotal;
    this.#ticketRequest = new TicketRequest();
  }

  validateTickets(ticketRequests){

    if(this.#isTicketRequestsUndefined(ticketRequests)){
      throw new InvalidPurchaseException(this.#serviceName, 'No tickets requested.');
    }

    ticketRequests.forEach(ticket =>{{

      let type = ticket.getTicketType();
      let noOfTickets = ticket.getNoOfTickets();

      switch (type) {
        case 'ADULT':
          this.#ticketRequest.addNoOfAdultTickets(noOfTickets)
          break;
        case 'CHILD':
          this.#ticketRequest.addNoOfChildTickets(noOfTickets)
          break;
        case 'INFANT':
          this.#ticketRequest.addNoOfInfantTickets(noOfTickets)
          break;
      }
    }})

    if(this.#isTotalOrderLessThanOne()){
      throw new InvalidPurchaseException(this.#serviceName, 'Cannot request zero tickets.')
    } else if (this.#isTotalOrderMoreThanMax()){
      throw new InvalidPurchaseException(this.#serviceName, 'Total ticket number cannot exceed 25.')
    }
    
    if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfInfantTickets()){
      throw new InvalidPurchaseException(this.#serviceName, 'Must be one adult per infant ticket purchased.')
    } else if(this.#ticketRequest.getNoOfChildTickets() > 0 && this.#ticketRequest.getNoOfAdultTickets() === 0){ 
      throw new InvalidPurchaseException(this.#serviceName, 'Children must be accompanied by at least one adult.')
    }

    logger.log('info',{
      type: this.#serviceName,
      title: 'Success',
      detail: `
      ${this.#ticketRequest.getNoOfInfantTickets()} Adult, 
      ${this.#ticketRequest.getNoOfInfantTickets()} Child and 
      ${this.#ticketRequest.getNoOfInfantTickets()} Infant tickets validated
      `
    })

    return this.#ticketRequest
  }

  #isTicketRequestsUndefined(ticketRequests){{
    return ticketRequests === undefined ? true : false;
  }}

  #isTotalOrderLessThanOne(){
    return this.#ticketRequest.getTotalNoOfTickets() <= 0 ? true : false;
  }

  #isTotalOrderMoreThanMax(){
    return this.#ticketRequest.getTotalNoOfTickets() > this.#maxSeatTotal ? true : false
  }
}