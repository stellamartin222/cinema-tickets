import InvalidPurchaseException from "../../pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../../pairtest/lib/TicketTypeRequest";
import TicketRequest from "../../pairtest/lib/TicketRequest";

export default class TicketValidationService{
  #ERROR_NAME;
  #ERROR_STATUS;
  #ticketRequest;

  constructor(){
    this.#ERROR_NAME = 'validateTicketTypeRequest';
    this.#ERROR_STATUS = 400;
    this.#ticketRequest = new TicketRequest();
  }

  validateTickets(ticketRequests){

    if(this.#isTicketRequestsUndefined(ticketRequests)){
      throw new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'No tickets requested.')
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
      throw new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Cannot request zero tickets.')
    } else if (this.#isTotalOrderMoreThanTwentyFive()){
      throw new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Total ticket number cannot exceed 25.')
    }
    
    if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfInfantTickets()){
      throw new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Must be one adult per infant ticket purchased.')
    } else if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfChildTickets()){ 
      throw new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'A child must be accompanied by an adult.')
    }

    return this.#ticketRequest
  }

  #isTicketRequestsUndefined(ticketRequests){{
    return ticketRequests === undefined ? true : false;
  }}

  #isTotalOrderLessThanOne(){
    return this.#ticketRequest.getTotalNoOfTickets() <= 0 ? true : false;
  }

  #isTotalOrderMoreThanTwentyFive(){
    return this.#ticketRequest.getTotalNoOfTickets() > 25 ? true : false
  }
}