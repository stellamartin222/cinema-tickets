import InvalidPurchaseException from '../../../src/pairtest/lib/InvalidPurchaseException';
import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
  let ticketService;
  
  beforeEach(async () => {
      ticketService = new TicketService;
  });

  it('will return success object on successful ticket purchase', () => {
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
      try{
        ticketService.purchaseTickets(1234)
      } catch (err) {
        expect(err).toEqual({detail: 'No tickets requested.', ...errorObj})
      }
    });

    it('throws error when total ticket number is zero', () => {
      try{
        ticketService.purchaseTickets(1234, {ADULT: 0})
      } catch (err) {
        expect(err).toEqual({detail: 'Cannot request zero tickets.', ...errorObj})
      }
    });

    it('throws an error if infant with no adult', () => {
      expect(() => {
        ticketService.purchaseTickets('someString', {INFANT: 1})
      }).toThrow()
      try{
        ticketService.purchaseTickets(1234, {INFANT: 1})
      } catch (err) {
        expect(err).toEqual({detail: 'Cannot request ticket for infant without adult.', ...errorObj})
      }
    });
  });
});