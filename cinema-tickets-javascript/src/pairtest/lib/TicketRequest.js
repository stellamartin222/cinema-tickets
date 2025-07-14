export default class TicketRequest {
  #noOfAdultTickets = 0;
  #noOfChildTickets = 0;
  #noOfInfantTickets = 0;

  getNoOfAdultTickets(){
    return this.#noOfAdultTickets;
  }

  addNoOfAdultTickets(noOfTickets){
    this.#noOfAdultTickets += noOfTickets
  }

  getNoOfChildTickets(){
    return this.#noOfChildTickets;
  }

  addNoOfChildTickets(noOfTickets){
    this.#noOfChildTickets += noOfTickets
  }

  getNoOfInfantTickets(){
    return this.#noOfInfantTickets;
  }

  addNoOfInfantTickets(noOfTickets){
    this.#noOfInfantTickets += noOfTickets
  }

  getTotalNoOfTickets(){
    return this.#noOfAdultTickets + this.#noOfChildTickets + this.#noOfInfantTickets;
  }

  getTotalNoOfSeats(){
    return this.#noOfAdultTickets + this.#noOfChildTickets;
  }
}