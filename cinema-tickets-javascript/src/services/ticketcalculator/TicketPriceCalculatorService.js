export default class TicketPriceCalculator{
  #ticketPrices;

  constructor(ticketPrices){
    this.#ticketPrices = ticketPrices;
  }

  calculate(ticketRequest){
    let total = 0

    total += ticketRequest.getNoOfAdultTickets() * this.#ticketPrices.ADULT;
    
    return total
  }
}