import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService';
import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService';
import InvalidPurchaseException from './InvalidPurchaseException';

export default class Utils{

  callTicketPaymentService(accountId, totalOrderPrice){
    try {
      let ticketPaymentService = new TicketPaymentService();
      ticketPaymentService.makePayment(accountId, totalOrderPrice);
    } catch (error) {
      throw new InvalidPurchaseException(
        'callTicketPaymentService',
        `Ticket payment service error: ${error}`
      );
    }
  };

  callSeatReservationService(accountId, totalSeatsToAllocate){
    try {
      let seatReservationService = new SeatReservationService();
      seatReservationService.reserveSeat(accountId, totalSeatsToAllocate)
    } catch (error) {
      throw new InvalidPurchaseException(
        'callSeatReservationService',
        `Seat reservation service error: ${error}`
      );
    }
  };
};
