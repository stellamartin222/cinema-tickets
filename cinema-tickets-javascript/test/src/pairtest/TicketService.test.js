import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
  let ticketService;
  
  beforeEach(async () => {
      ticketService = new TicketService;
  });

  it('will return success object on successful ticket purchase', () => {
      expect(ticketService.purchaseTickets(1234, [{ADULT: 1}])).toEqual({status: 201, message: 'Thank you for your order.'});
  });

  it('throws an error when the accountId is not a number', () => {
    expect(() => {
      ticketService.purchaseTickets([{ADULT: 1}])
    }).toThrow()
    expect(() => {
      ticketService.purchaseTickets('someString', [{ADULT: 1}])
    }).toThrow()
    expect(() => {
      ticketService.purchaseTickets(NaN, [{ADULT: 1}])
    }).toThrow()
  });

  it('throws an error when the accountId is zero or below', () => {
    expect(() => {
      ticketService.purchaseTickets(0, [{ADULT: 1}])
    }).toThrow()
    expect(() => {
      ticketService.purchaseTickets(-5, [{ADULT: 1}])
    }).toThrow()
  });

  it('throws an error when no ticketTypeRequest ', () => {
    expect(() => {
      ticketService.purchaseTickets(1234)
    }).toThrow()
  });
});