import SeatCalculator from "../../../../src/services/seatcalculator/SeatCalculator";
import TicketRequest from "../../../../src/pairtest/lib/TicketRequest";

describe('SeatCalculator', () => {
  let seatCalculator;

  beforeEach(() => {
    seatCalculator = new SeatCalculator()
  })
  
  it('calculates seat number for one adult ticket', () => {
    let ticketRequest = new TicketRequest();
    ticketRequest.addNoOfAdultTickets(1);
    expect(seatCalculator.calculate(ticketRequest)).toBe(1)
  });

  it('calculates seat number for multiple tickets', () => {
    let ticketRequest = new TicketRequest();
    ticketRequest.addNoOfAdultTickets(1);
    ticketRequest.addNoOfChildTickets(2);
    expect(seatCalculator.calculate(ticketRequest)).toBe(3)
  });

  it('does not include infants when calculating tickets', () => {
    let ticketRequest = new TicketRequest();
    ticketRequest.addNoOfAdultTickets(1);
    ticketRequest.addNoOfInfantTickets(1);
    expect(seatCalculator.calculate(ticketRequest)).toBe(1)
  });
});