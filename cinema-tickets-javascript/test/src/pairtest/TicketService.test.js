import TicketService from '../../../src/pairtest/TicketService';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest';
import { logger } from '../../../src/pairtest/lib/logger';

jest.mock('../../../src/pairtest/lib/logger.js', () => ({
  logger: {
    log: jest.fn(),
  },
}));

describe('TicketService', () => {
  let ticketService;

  const VALID_ACCOUNT_ID = 1234;

  const SUCCESS_OBJ = {
    detail: 'ticket purchase successful',
    statusCode: 200,
    title: 'Success',
    type: 'purchaseTickets',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ticketService = new TicketService();
  });

  it('handles ticket type request when type invalid', () => {
    try {
      new TicketTypeRequest('someKey', 1);
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
      expect(error.message).toEqual('type must be ADULT, CHILD, or INFANT');
    }
  });

  it('handles ticket type request when number of tickets invalid', () => {
    try {
      new TicketTypeRequest('ADULT', 'someValue');
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
      expect(error.message).toEqual('noOfTickets must be an integer');
    }
  });

  it('will return success object on successful ticket purchase', () => {
    expect.assertions(3);
    expect(
      ticketService.purchaseTickets(
        VALID_ACCOUNT_ID,
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 1),
        new TicketTypeRequest('INFANT', 1)
      )
    ).toEqual(SUCCESS_OBJ);

    expect(
      ticketService.purchaseTickets(
        VALID_ACCOUNT_ID,
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 0),
        new TicketTypeRequest('INFANT', 1)
      )
    ).toEqual(SUCCESS_OBJ);

    expect(logger.log).toHaveBeenCalledWith('info', { ...SUCCESS_OBJ });
  });

  it('handles errors', () => {
    let result = ticketService.purchaseTickets(
      VALID_ACCOUNT_ID,
      new TicketTypeRequest('ADULT', 0),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1)
    );

    expect(result).toHaveProperty('statusCode', 400);
    expect(result).toHaveProperty('type', 'validateTicketTypeRequest');
    expect(result).toHaveProperty('title', 'An error occured');
    expect(result).toHaveProperty('detail', 'Must be one adult per infant ticket purchased.');
    expect(logger.log).toHaveBeenCalledWith('error', {
      statusCode: 400,
      type: 'validateTicketTypeRequest',
      title: 'An error occured',
      detail: 'Must be one adult per infant ticket purchased.',
    });
  });
});
