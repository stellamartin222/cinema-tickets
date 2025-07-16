export default class SeatCalculator {
  calculate(ticketRequest) {
    let total = 0;

    total += ticketRequest.getNoOfAdultTickets();
    total += ticketRequest.getNoOfChildTickets();
    //infants are required to sit on an adults lap so are not included in this seat calculator

    return total;
  }
}
