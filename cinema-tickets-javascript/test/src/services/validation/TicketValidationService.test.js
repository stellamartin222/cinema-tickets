import TicketValidationService from "../../../../src/services/validation/TicketValidationService";
import mockInvalidPurchaseException from "../../../../src/pairtest/lib/InvalidPurchaseException";
import TicketRequest from "../../../../src/pairtest/lib/TicketRequest";

jest.mock('../../../../src/pairtest/lib/InvalidPurchaseException', () => jest.fn());

describe('validateTicketTypeRequest', () => { 
  const ERROR_NAME = 'validateTicketTypeRequest';
  const ERROR_STATUS = 400;

  let ticketValidationService;
  
  beforeEach(async () => {
      ticketValidationService = new TicketValidationService;
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns 200 and one adult ticket for a valid ticket request', () => {
    let result = ticketValidationService.validateTickets([{ADULT: 1}]);
    expect(result.status).toEqual(200)
    expect(result.ticketRequest).toBeInstanceOf(TicketRequest)
    expect(result.ticketRequest.getNoOfAdultTickets()).toBe(1)
    expect(result.ticketRequest.getNoOfChildTickets()).toBe(0)
    expect(result.ticketRequest.getNoOfInfantTickets()).toBe(0)
    expect(result.ticketRequest.getTotalNoOfTickets()).toBe(1)
    expect(result.ticketRequest.getTotalNoOfSeats()).toBe(1)
  });
  
  it('throws error when no ticketTypeRequest', () => {
    ticketValidationService.validateTickets()
    
    expect(mockInvalidPurchaseException)
      .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'No tickets requested.')
  });

  
  it('throws error when total ticket number is zero', () => {
    ticketValidationService.validateTickets([{ADULT: 0}])
    
    expect(mockInvalidPurchaseException)
      .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'Cannot request zero tickets.')
  });
  
  it('throws an error if less adults than infants', () => {
    ticketValidationService.validateTickets([{ADULT: 1}, {INFANT: 4}])
    
    expect(mockInvalidPurchaseException)
      .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'Must be one adult per infant ticket purchased.')
  });

  it('throws error if children without adults', () => {
    ticketValidationService.validateTickets([{CHILD: 1}])
    
    expect(mockInvalidPurchaseException)
      .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'A child must be accompanied by an adult.')
  });

  it.each([
    [{ADULT: 26}, {CHILD: 0}],
    [{ADULT: 15}, {CHILD: 15}],
    [{ADULT: 9007199254740991}, {CHILD: 9007199254740991}], //max value of integer
  ])(
    'throws error if ticket total exceeds 25',
    (adultTickets, childTickets) => {
      ticketValidationService.validateTickets([adultTickets, childTickets])
    
      expect(mockInvalidPurchaseException)
        .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, 'Total ticket number cannot exceed 25.')
    }
  );

  it.each([
    [[{someKey: 1}], 'Ticket type must be ADULT, CHILD or INFANT.'],
    [[{ADULT: 'someValue'}], 'Number of tickets must be an integer.'],
  ])(
    'handles TicketTypeRequest errors',
    (tickets, errorMessage) => {
      ticketValidationService.validateTickets(tickets)
    
      expect(mockInvalidPurchaseException)
        .toHaveBeenCalledWith(ERROR_NAME, ERROR_STATUS, errorMessage)
    }
  );
});