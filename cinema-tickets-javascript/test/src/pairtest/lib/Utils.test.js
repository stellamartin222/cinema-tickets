import Utils from "../../../../src/pairtest/lib/Utils";

describe('Utils', () => {
  let utils;
  let errStatus = 400
  
  
  beforeEach(async () => {
    utils = new Utils
  });

  it('calls the ticket payment service', async () => {
    expect(() => utils.callTicketPaymentService(1234, 25)).not.toThrow()
  });

  it.each([
    ['Invalid account number', 25, 'TypeError: accountId must be an integer'], 
    [1234, 'Invalid ticket price', 'TypeError: totalAmountToPay must be an integer']
    ])(
    'catches errors thrown by ticket payment service',
    async (accountId, totalOrderPrice, errMessage) => {
      let error;

      try {
        utils.callTicketPaymentService(accountId, totalOrderPrice);
      } catch (err) {
        error = err;
      }

      expect(error.globalExceptionHandler().type).toBe('callTicketPaymentService');
      expect(error.globalExceptionHandler().statusCode).toBe(errStatus);
      expect(error.globalExceptionHandler().detail).toBe(`Ticket payment service error: ${errMessage}`);
    }
  );

  it('calls the seat reservation service', () => {
    expect(() => utils.callSeatReservationService(1234, 1)).not.toThrow();
  });

  it.each([
    ['Invalid account number', 25, 'TypeError: accountId must be an integer'], 
    [1234, 'Invalid seat input', 'TypeError: totalSeatsToAllocate must be an integer']
    ])(
    'catches errors thrown by seat reservation service',
    async (accountId, totalSeatsToAllocate, errMessage) => {
      let error;

      try {
        utils.callSeatReservationService(accountId, totalSeatsToAllocate);
      } catch (err) {
        error = err;
      }

      expect(error.globalExceptionHandler().type).toBe('callSeatReservationService');
      expect(error.globalExceptionHandler().statusCode).toBe(errStatus);
      expect(error.globalExceptionHandler().detail).toBe(`Seat reservation service error: ${errMessage}`);
    }
  );
});