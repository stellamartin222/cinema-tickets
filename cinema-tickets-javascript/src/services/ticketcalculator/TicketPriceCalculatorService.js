export default class TicketPriceCalculator{
  #ticketPrices;

  constructor(ticketPrices){
    this.#ticketPrices = ticketPrices;
  }

  calculate(ticketRequest){
    let total = 0;

    total += (ticketRequest.getNoOfAdultTickets() * this.#ticketPrices.ADULT);
    total += (ticketRequest.getNoOfChildTickets() * this.#ticketPrices.CHILD);
    total += (ticketRequest.getNoOfInfantTickets() * this.#ticketPrices.INFANT);

    return total;
  }
}