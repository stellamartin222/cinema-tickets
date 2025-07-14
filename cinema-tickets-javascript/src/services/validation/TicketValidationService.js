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
      return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'No tickets requested.')
    }

    ticketRequests.forEach(ticket =>{{
      let type = Object.keys(ticket)[0];
      let noOfTickets = ticket[type];

      try{
        new TicketTypeRequest(type, noOfTickets)
      } catch (err) {
        if(err.message === 'type must be ADULT, CHILD, or INFANT'){
          return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Ticket type must be ADULT, CHILD or INFANT.')
        } else {
          return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Number of tickets must be an integer.')
        }
      }

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
      return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Cannot request zero tickets.')
    } else if (this.#isTotalOrderMoreThanTwentyFive()){
      return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Total ticket number cannot exceed 25.')
    }
    
    if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfInfantTickets()){
      return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'Must be one adult per infant ticket purchased.')
    } else if(this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfChildTickets()){ 
      return new InvalidPurchaseException(this.#ERROR_NAME, this.#ERROR_STATUS, 'A child must be accompanied by an adult.')
    }

    return {status: 200, ticketRequest: this.#ticketRequest}
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

  // #isTicketRequestPermitted(){
  //   let errorMessage;
    
  //   if(this.#adultTickets < this.#infantTickets){
  //     throw new InvalidPurchaseException(
  //       errorName, 400, 'Must be one adult per infant ticket purchased.'
  //     )
  //   } else if(this.#adultTickets < this.#childTickets){ 
  //     throw new InvalidPurchaseException(
  //       errorName, 400, 'A child must be accompanied by an adult.'
  //     )
  //   }

  //   return errorMessage
  // }
}