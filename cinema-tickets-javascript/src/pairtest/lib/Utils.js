import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService.js';
import InvalidPurchaseException from './InvalidPurchaseException.js';
import { logger } from '../../pairtest/lib/logger.js';

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
