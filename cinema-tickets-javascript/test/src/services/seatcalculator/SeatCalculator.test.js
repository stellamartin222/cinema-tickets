import SeatCalculator from "../../../../src/services/seatcalculator/SeatCalculator";
import TicketRequest from "../../../../src/pairtest/lib/TicketRequest";

describe('SeatCalculator', () => {
  let seatCalculator;

  beforeEach(() => {
    seatCalculator = new SeatCalculator()
  })
  
  it('returns total seat number for one adult ticket', () => {
    let ticketRequest = new TicketRequest();
    ticketRequest.addNoOfAdultTickets(1);
    expect(seatCalculator.calculate(ticketRequest)).toBe(1)
  });
});