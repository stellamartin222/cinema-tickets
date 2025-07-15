import TicketValidationService from "../../../../src/services/validation/TicketValidationService";
import InvalidPurchaseException from "../../../../src/pairtest/lib/InvalidPurchaseException";
import TicketRequest from "../../../../src/pairtest/lib/TicketRequest";

// jest.mock('../../../../src/pairtest/lib/InvalidPurchaseException', () => jest.fn());

describe('validateTicketTypeRequest', () => { 
  const ERROR_NAME = 'validateTicketTypeRequest';
  const ERROR_STATUS = 400;

  let ticketValidationService;
  
  beforeEach(async () => {
      ticketValidationService = new TicketValidationService;
  });

  it('returns 200 and one adult ticket for a valid ticket request', () => {
    const result = ticketValidationService.validateTickets([{ADULT: 1}]);
    expect(result).toBeInstanceOf(TicketRequest)
    expect(result.getNoOfAdultTickets()).toBe(1)
    expect(result.getNoOfChildTickets()).toBe(0)
    expect(result.getNoOfInfantTickets()).toBe(0)
    expect(result.getTotalNoOfTickets()).toBe(1)
    expect(result.getTotalNoOfSeats()).toBe(1)
  });
  
  it('throws error when no ticketTypeRequest', () => {
    expect(() => ticketValidationService.validateTickets()
      .toThrow(InvalidPurchaseException))
      
      try {
        ticketValidationService.validateTickets()
      } catch (err) {
        expect(err.globalExceptionHandler().type).toBe(ERROR_NAME);
        expect(err.globalExceptionHandler().statusCode).toBe(ERROR_STATUS);
        expect(err.globalExceptionHandler().detail).toBe('No tickets requested.');
      }
  });

  
  it('throws error when total ticket number is zero', () => {
    expect(() => ticketValidationService.validateTickets([{ADULT: 0}])
      .toThrow(InvalidPurchaseException))
      
      try {
        ticketValidationService.validateTickets([{ADULT: 0}])
      } catch (err) {
        expect(err.globalExceptionHandler().type).toBe(ERROR_NAME);
        expect(err.globalExceptionHandler().statusCode).toBe(ERROR_STATUS);
        expect(err.globalExceptionHandler().detail).toBe('Cannot request zero tickets.');
      }
  });
  
  it('throws an error if less adults than infants', () => {
    expect(() => ticketValidationService.validateTickets([{ADULT: 1}, {INFANT: 4}])
    .toThrow(InvalidPurchaseException))
    
    try {
      ticketValidationService.validateTickets([{ADULT: 1}, {INFANT: 4}])
    } catch (err) {
      expect(err.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(err.globalExceptionHandler().statusCode).toBe(ERROR_STATUS);
      expect(err.globalExceptionHandler().detail).toBe('Must be one adult per infant ticket purchased.');
    }
  });

  it('throws error if children without adults', () => {
    expect(() => ticketValidationService.validateTickets([{CHILD: 1}])
    .toThrow(InvalidPurchaseException))
    
    try {
      ticketValidationService.validateTickets([{CHILD: 1}])
    } catch (err) {
      expect(err.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(err.globalExceptionHandler().statusCode).toBe(ERROR_STATUS);
      expect(err.globalExceptionHandler().detail).toBe('A child must be accompanied by an adult.');
    }
  });

  it.each([
    [{ADULT: 26}, {CHILD: 0}],
    [{ADULT: 15}, {CHILD: 15}],
    [{ADULT: 9007199254740991}, {CHILD: 9007199254740991}], //max value of integer
  ])(
    'throws error if ticket total exceeds 25',
    (adultTickets, childTickets) => {
      expect(() => ticketValidationService.validateTickets([adultTickets, childTickets])
      .toThrow(InvalidPurchaseException))
      
      try {
        ticketValidationService.validateTickets([adultTickets, childTickets])
      } catch (err) {
        expect(err.globalExceptionHandler().type).toBe(ERROR_NAME);
        expect(err.globalExceptionHandler().statusCode).toBe(ERROR_STATUS);
        expect(err.globalExceptionHandler().detail).toBe('Total ticket number cannot exceed 25.');
      }
    }
  );

  it.each([
    [[{someKey: 1}], 'Ticket type must be ADULT, CHILD or INFANT.'],
    [[{ADULT: 'someValue'}], 'Number of tickets must be an integer.'],
  ])(
    'handles TicketTypeRequest errors',
    (tickets, errorMessage) => {
      expect(() => ticketValidationService.validateTickets(tickets)
      .toThrow(InvalidPurchaseException))
      
      try {
        ticketValidationService.validateTickets(tickets)
      } catch (err) {
        expect(err.globalExceptionHandler().type).toBe(ERROR_NAME);
        expect(err.globalExceptionHandler().statusCode).toBe(ERROR_STATUS);
        expect(err.globalExceptionHandler().detail).toBe(errorMessage);
      }
    }
  );
});