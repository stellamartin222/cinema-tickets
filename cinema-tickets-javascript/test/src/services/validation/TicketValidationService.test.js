import TicketValidationService from '../../../../src/services/validation/TicketValidationService';
import InvalidPurchaseException from '../../../../src/pairtest/lib/InvalidPurchaseException';
import TicketRequest from '../../../../src/pairtest/lib/TicketRequest';
import TicketTypeRequest from '../../../../src/pairtest/lib/TicketTypeRequest';
import { logger } from '../../../../src/pairtest/lib/logger';

jest.mock('../../../../src/pairtest/lib/logger.js', () => ({
  logger: {
    log: jest.fn(),
  },
}));

describe('validateTicketTypeRequest', () => {
  const ERROR_NAME = 'validateTicketTypeRequest';
  const MAX_SEAT_TOTAL = 25;

  let ticketValidationService;

  beforeEach(() => {
    jest.clearAllMocks();
    ticketValidationService = new TicketValidationService(MAX_SEAT_TOTAL);
  });

  it('returns 200 and one adult ticket for a valid ticket request', () => {
    const result = ticketValidationService.validateTickets([new TicketTypeRequest('ADULT', 1)]);
    expect(result).toBeInstanceOf(TicketRequest);
    expect(result.getNoOfAdultTickets()).toBe(1);
    expect(result.getNoOfChildTickets()).toBe(0);
    expect(result.getNoOfInfantTickets()).toBe(0);
    expect(result.getTotalNoOfTickets()).toBe(1);
    expect(result.getTotalNoOfSeats()).toBe(1);
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith('info', {
      type: 'validateTicketTypeRequest',
      title: 'Success',
      detail: '1 Adult, 0 Child and 0 Infant tickets validated',
    });
  });

  it('throws error when no ticketTypeRequest', () => {
    expect(() => ticketValidationService.validateTickets()).toThrow(InvalidPurchaseException);

    try {
      ticketValidationService.validateTickets();
    } catch (error) {
      expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(error.globalExceptionHandler().detail).toBe('No tickets requested.');
      expect(logger.log).toHaveBeenCalledWith('error', {
        statusCode: 400,
        type: ERROR_NAME,
        title: 'An error occured',
        detail: 'No tickets requested.',
      });
    }
  });

  it('throws error when total ticket number is zero', () => {
    expect(() =>
      ticketValidationService
        .validateTickets([new TicketTypeRequest('ADULT', 0)])
        .toThrow(InvalidPurchaseException)
    );

    try {
      ticketValidationService.validateTickets([new TicketTypeRequest('ADULT', 0)]);
    } catch (error) {
      expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(error.globalExceptionHandler().detail).toBe('Cannot request zero tickets.');
      expect(logger.log).toHaveBeenCalledWith('error', {
        statusCode: 400,
        type: ERROR_NAME,
        title: 'An error occured',
        detail: 'Cannot request zero tickets.',
      });
    }
  });

  it('throws an error if less adults than infants', () => {
    expect(() =>
      ticketValidationService
        .validateTickets([new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('INFANT', 4)])
        .toThrow(InvalidPurchaseException)
    );

    try {
      ticketValidationService.validateTickets([
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('INFANT', 4),
      ]);
    } catch (error) {
      expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(error.globalExceptionHandler().detail).toBe(
        'Must be one adult per infant ticket purchased.'
      );
      expect(logger.log).toHaveBeenCalledWith('error', {
        statusCode: 400,
        type: ERROR_NAME,
        title: 'An error occured',
        detail: 'Must be one adult per infant ticket purchased.',
      });
    }
  });

  it('throws error if children without adults', () => {
    expect(() =>
      ticketValidationService
        .validateTickets([new TicketTypeRequest('CHILD', 1)])
        .toThrow(InvalidPurchaseException)
    );

    try {
      ticketValidationService.validateTickets([new TicketTypeRequest('CHILD', 1)]);
    } catch (error) {
      expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(error.globalExceptionHandler().detail).toBe(
        'Children must be accompanied by at least one adult.'
      );
      expect(logger.log).toHaveBeenCalledWith('error', {
        statusCode: 400,
        type: ERROR_NAME,
        title: 'An error occured',
        detail: 'Children must be accompanied by at least one adult.',
      });
    }
  });

  it('returns 200 if at least one adult accompanies multiple child tickets', () => {
    expect(
      ticketValidationService.validateTickets([
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 4),
      ])
    ).toBeInstanceOf(TicketRequest);
  });

  it.each([
    [new TicketTypeRequest('ADULT', 26), new TicketTypeRequest('CHILD', 0)],
    [new TicketTypeRequest('ADULT', 15), new TicketTypeRequest('CHILD', 15)],
    [
      new TicketTypeRequest('ADULT', 9007199254740991),
      new TicketTypeRequest('CHILD', 9007199254740991),
    ], //max value of integer
  ])('throws error if ticket total exceeds 25', (adultTickets, childTickets) => {
    expect(() =>
      ticketValidationService
        .validateTickets([adultTickets, childTickets])
        .toThrow(InvalidPurchaseException)
    );

    try {
      ticketValidationService.validateTickets([adultTickets, childTickets]);
    } catch (error) {
      expect(error.globalExceptionHandler().type).toBe(ERROR_NAME);
      expect(error.globalExceptionHandler().detail).toBe('Total ticket number cannot exceed 25.');
      expect(logger.log).toHaveBeenCalledWith('error', {
        statusCode: 400,
        type: ERROR_NAME,
        title: 'An error occured',
        detail: 'Total ticket number cannot exceed 25.',
      });
    }
  });
});
