import Utils from '../../../../src/pairtest/lib/Utils';
import { logger } from '../../../../src/pairtest/lib/logger';

jest.mock('../../../../src/pairtest/lib/logger.js', () => ({
  logger: {
    log: jest.fn(),
  },
}));

describe('Utils', () => {
  let utils;

  beforeEach(async () => {
    jest.clearAllMocks();
    utils = new Utils();
  });

  it('calls the ticket payment service', async () => {
    const accountId = 1234;
    const totalOrderPrice = 25;

    expect(() => utils.callTicketPaymentService(accountId, totalOrderPrice)).not.toThrow();
    expect(logger.log).toHaveBeenCalledWith('info', `Order total: £${totalOrderPrice}`);
  });

  it.each([
    ['Invalid account number', 25, 'TypeError: accountId must be an integer'],
    [1234, 'Invalid ticket price', 'TypeError: totalAmountToPay must be an integer'],
  ])(
    'catches errors thrown by ticket payment service',
    async (accountId, totalOrderPrice, errorMessage) => {
      try {
        utils.callTicketPaymentService(accountId, totalOrderPrice);
      } catch (error) {
        expect(error.globalExceptionHandler().type).toBe('callTicketPaymentService');
        expect(error.globalExceptionHandler().detail).toBe(
          `Ticket payment service error: ${errorMessage}`
        );
        expect(logger.log).toHaveBeenCalledWith('error', {
          statusCode: 400,
          type: 'callTicketPaymentService',
          title: 'An error occured',
          detail: `Ticket payment service error: ${errorMessage}`,
        });
      }
    }
  );

  it('calls the seat reservation service', () => {
    const accountId = 1234;
    const totalSeatsToAllocate = 1;

    expect(() => utils.callSeatReservationService(accountId, totalSeatsToAllocate)).not.toThrow();
  });

  it.each([
    ['Invalid account number', 25, 'TypeError: accountId must be an integer'],
    [1234, 'Invalid seat input', 'TypeError: totalSeatsToAllocate must be an integer'],
  ])(
    'catches errors thrown by seat reservation service',
    async (accountId, totalSeatsToAllocate, errorMessage) => {
      try {
        utils.callSeatReservationService(accountId, totalSeatsToAllocate);
      } catch (error) {
        expect(error.globalExceptionHandler().type).toBe('callSeatReservationService');
        expect(error.globalExceptionHandler().detail).toBe(
          `Seat reservation service error: ${errorMessage}`
        );
        expect(logger.log).toHaveBeenCalledWith('error', {
          statusCode: 400,
          type: 'callSeatReservationService',
          title: 'An error occured',
          detail: `Seat reservation service error: ${errorMessage}`,
        });
      }
    }
  );
});
