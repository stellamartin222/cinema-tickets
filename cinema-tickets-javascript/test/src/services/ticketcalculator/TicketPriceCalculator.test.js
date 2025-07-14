import TicketPriceCalculator from "../../../../src/services/ticketcalculator/TicketPriceCalculatorService";
import TicketRequest from "../../../../src/pairtest/lib/TicketRequest";

describe('TicketPriceCalculator', () => {
  let ticketPriceCalculator;
  const TICKET_PRICES = {ADULT: 25, CHILD: 15, INFANT: 0};
  
  beforeEach(async () => {
      ticketPriceCalculator = new TicketPriceCalculator(TICKET_PRICES);
  });

  it('returns the total for a single adult request ', () => {
    let ticketRequest = new TicketRequest()
    ticketRequest.addNoOfAdultTickets(1);
    expect(ticketPriceCalculator.calculate(ticketRequest)).toBe(TICKET_PRICES.ADULT)
  });

  it('returns the total for adult and child request ', () => {
    let ticketRequest = new TicketRequest()
    ticketRequest.addNoOfAdultTickets(1);
    ticketRequest.addNoOfChildTickets(1);
    expect(ticketPriceCalculator.calculate(ticketRequest))
    .toBe(TICKET_PRICES.ADULT + TICKET_PRICES.CHILD)
  });
});