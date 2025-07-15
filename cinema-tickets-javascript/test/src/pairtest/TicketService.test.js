import TicketService from '../../../src/pairtest/TicketService';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest';

describe('TicketService', () => {
  let ticketService;

  const VALID_ACCOUNT_ID = 1234;
  
  beforeEach(() => {
      ticketService = new TicketService;
  });

  it('handles ticket type request when type invalid', () => {
    try {
      new TicketTypeRequest('someKey', 1)
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error.message).toEqual('type must be ADULT, CHILD, or INFANT')
    }
  });

  it('handles ticket type request when number of tickets invalid', () => {
    try {
      new TicketTypeRequest('ADULT', 'someValue')
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error.message).toEqual('noOfTickets must be an integer')
    }
  });

  it('will return success object on successful ticket purchase', () => {
    expect.assertions(2);
      expect(ticketService.purchaseTickets(
        VALID_ACCOUNT_ID, 
        new TicketTypeRequest('ADULT', 1), 
        new TicketTypeRequest('CHILD', 1), 
        new TicketTypeRequest('INFANT', 1))
      )
      .toEqual({status: 201, message: 'Thank you for your order.'});
      expect(ticketService.purchaseTickets(
        VALID_ACCOUNT_ID,
        new TicketTypeRequest('ADULT', 1), 
        new TicketTypeRequest('CHILD', 0), 
        new TicketTypeRequest('INFANT', 1)))
      .toEqual({status: 201, message: 'Thank you for your order.'});
  });
});