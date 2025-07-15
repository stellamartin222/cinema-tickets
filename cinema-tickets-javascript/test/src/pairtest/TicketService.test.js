import TicketService from '../../../src/pairtest/TicketService';
import mockTicketPaymentService from '../../../src/thirdparty/paymentgateway/TicketPaymentService';

jest.mock('../../../src/thirdparty/paymentgateway/TicketPaymentService', () => jest.fn());

describe('TicketService', () => {
  let ticketService;

  const VALID_ACCOUNT_ID = 1234;
  
  beforeEach(async () => {
      ticketService = new TicketService;
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('will return success object on successful ticket purchase', () => {
    expect.assertions(2);
      expect(ticketService.purchaseTickets(VALID_ACCOUNT_ID, {ADULT: 1}, {CHILD: 1}, {INFANT: 1}))
      .toEqual({status: 201, message: 'Thank you for your order.'});
      expect(ticketService.purchaseTickets(VALID_ACCOUNT_ID, {ADULT: 1}, {CHILD: 0}, {INFANT: 1}))
      .toEqual({status: 201, message: 'Thank you for your order.'});
  });

  it('calls the ticket payment service with account number and price', () => {
    ticketService.purchaseTickets(VALID_ACCOUNT_ID, {ADULT: 1}, {CHILD: 1}, {INFANT: 1})

    expect(mockTicketPaymentService).toHaveBeenCalledWith(VALID_ACCOUNT_ID, 40)
  })
});