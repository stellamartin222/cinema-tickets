export default class SeatCalculator {
  calculate(ticketRequest){
    let total = 0;

    total = ticketRequest.getNoOfAdultTickets();

    return total;
  }
}