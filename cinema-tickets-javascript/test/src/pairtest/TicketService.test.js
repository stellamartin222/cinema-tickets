import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
  let ticketService;

  const VALID_ACCOUNT_ID = 1234;
  
  beforeEach(async () => {
      ticketService = new TicketService;
  });

  it('will return success object on successful ticket purchase', async () => {
    expect.assertions(2);
      expect(await ticketService.purchaseTickets(VALID_ACCOUNT_ID, {ADULT: 1}, {CHILD: 1}, {INFANT: 1}))
      .toEqual({status: 201, message: 'Thank you for your order.'});
      expect(await ticketService.purchaseTickets(VALID_ACCOUNT_ID, {ADULT: 1}, {CHILD: 0}, {INFANT: 1}))
      .toEqual({status: 201, message: 'Thank you for your order.'});
  });
});