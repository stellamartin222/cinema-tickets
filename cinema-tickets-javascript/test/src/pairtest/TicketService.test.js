import InvalidPurchaseException from '../../../src/pairtest/lib/InvalidPurchaseException';
import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
  let ticketService;
  
  beforeEach(async () => {
      ticketService = new TicketService;
  });

  it('will return success object on successful ticket purchase', () => {
    expect.assertions(2);
      expect(ticketService.purchaseTickets(1234, {ADULT: 1}, {CHILD: 1}, {INFANT: 1}))
      .toEqual({status: 201, message: 'Thank you for your order.'});
      expect(ticketService.purchaseTickets(1234, {ADULT: 1}, {CHILD: 0}, {INFANT: 1}))
      .toEqual({status: 201, message: 'Thank you for your order.'});
  });

  describe('validateAccountId', () => {
    let errorObj = {
      statusCode: 400,
      type: 'validateAccountId',
      title: "An error occured",
    }

    it.each([
      [NaN],
      ['someString'],
      [{}]
    ])(
      'throws error when accountId not a number',
      (input) => {
        expect.assertions(1);
        try{
          ticketService.purchaseTickets(input, {ADULT: 1})
        } catch (err) {
          expect(err).toEqual({detail: 'Account ID must be a number.', ...errorObj})
        }
      }
    );
  
  
    it.each([
      [0,],
      [-10]
    ])(
      'throws an error when accountId less than one',
      (input) => {
        expect.assertions(1);
        try{
          ticketService.purchaseTickets(input, {ADULT: 1})
        } catch (err) {
          expect(err).toEqual({detail: 'Account ID must be greater than zero.', ...errorObj})
        }
      }
    );
  
  });

  describe('validateTicketTypeRequest', () => { 
    let errorObj = {
      statusCode: 400,
      type: 'validateTicketTypeRequest',
      title: "An error occured",
    }
    
    it('throws error when no ticketTypeRequest', () => {
      expect.assertions(1);
      try{
        ticketService.purchaseTickets(1234)
      } catch (err) {
        expect(err).toEqual({detail: 'No tickets requested.', ...errorObj})
      }
    });

    it('throws error when total ticket number is zero', () => {
      expect.assertions(1);
      try{
        ticketService.purchaseTickets(1234, {ADULT: 0})
      } catch (err) {
        expect(err).toEqual({detail: 'Cannot request zero tickets.', ...errorObj})
      }
    });

    it('throws an error if less adults than infants', () => {
      expect.assertions(1);
      try{
        ticketService.purchaseTickets(1234,  {ADULT: 1}, {INFANT: 4})
      } catch (err) {
        expect(err).toEqual({detail: 'Must be one adult per infant ticket purchased.', ...errorObj})
      }
    });

    it('throws error if children without adults', () => {
      expect.assertions(1);
      try{
        ticketService.purchaseTickets(1234, {CHILD: 1})
      } catch (err) {
        expect(err).toEqual({detail: 'A child must be accompanied by an adult.', ...errorObj})
      }
    });

    it.each([
      [{ADULT: 26}, {CHILD: 0}],
      [{ADULT: 15}, {CHILD: 15}],
    ])(
      'throws error if ticket total exceeds 25',
      (adultTickets, childTickets) => {
        expect.assertions(1);
        try{
          ticketService.purchaseTickets(1234, adultTickets, childTickets)
        } catch (err) {
          expect(err).toEqual({detail: 'Total ticket number cannot exceed 25.', ...errorObj})
        }
      }
    );

    it.each([
      [{someKey: 1}, 'Ticket type must be ADULT, CHILD or INFANT.'],
      [{ADULT: 'someValue'}, 'Number of tickets must be an integer.'],
    ])(
      'handles TicketTypeRequest errors',
      (tickets, errorMessage) => {
        expect.assertions(1);
        try{
          ticketService.purchaseTickets(1234, tickets)
        } catch (err) {
          expect(err).toEqual({detail: errorMessage, ...errorObj})
        }
      }
    );
  });
});