import InvalidPurchaseException from "../../pairtest/lib/InvalidPurchaseException";
import TicketRequest from "../../pairtest/lib/TicketRequest";

export default class TicketValidationService{
  #errorName;
  #maxSeatTotal;
  #ticketRequest;

  constructor(maxSeatTotal){
    this.#errorName = 'validateTicketTypeRequest';
    this.#maxSeatTotal = maxSeatTotal;
    this.#ticketRequest = new TicketRequest();
  }

  validateTickets(ticketRequests){

    if(this.#isTicketRequestsUndefined(ticketRequests)){
      throw new InvalidPurchaseException(this.#errorName, 'No tickets requested.');
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
      throw new InvalidPurchaseException(this.#errorName, 'Cannot request zero tickets.')
    } else if (this.#isTotalOrderMoreThanMax()){
      throw new InvalidPurchaseException(this.#errorName, 'Total ticket number cannot exceed 25.')
    }
    
    if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfInfantTickets()){
      throw new InvalidPurchaseException(this.#errorName, 'Must be one adult per infant ticket purchased.')
    } else if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfChildTickets()){ 
      throw new InvalidPurchaseException(this.#errorName, 'A child must be accompanied by an adult.')
    }

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