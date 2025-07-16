import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService';
import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService';
import InvalidPurchaseException from './InvalidPurchaseException';
import { logger } from '../../pairtest/lib/logger';

export default class Utils {
  callTicketPaymentService(accountId, totalOrderPrice) {
    try {
      let ticketPaymentService = new TicketPaymentService();
      ticketPaymentService.makePayment(accountId, totalOrderPrice);
    } catch (error) {
      throw new InvalidPurchaseException(
        'callTicketPaymentService',
        `Ticket payment service error: ${error}`
      );
    }

    logger.log('info', `Order total: £${totalOrderPrice}`);
  }

  callSeatReservationService(accountId, totalSeatsToAllocate) {
    try {
      let seatReservationService = new SeatReservationService();
      seatReservationService.reserveSeat(accountId, totalSeatsToAllocate);
    } catch (error) {
      throw new InvalidPurchaseException(
        'callSeatReservationService',
        `Seat reservation service error: ${error}`
      );
    }

    logger.log('info', `total number of seats booked ${totalSeatsToAllocate}`);
  }
}
