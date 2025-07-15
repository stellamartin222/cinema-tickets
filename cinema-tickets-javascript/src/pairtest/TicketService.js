import SeatCalculator from '../services/seatcalculator/SeatCalculator.js';
import TicketPriceCalculator from '../services/ticketcalculator/TicketPriceCalculatorService.js';
import AccountValidationService from '../services/validation/AccountValidationService.js';
import TicketValidationService from '../services/validation/TicketValidationService.js';
import Utils from './lib/Utils.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #TICKET_PRICES = {ADULT: 25, CHILD: 15, INFANT: 0}
  #MAX_SEAT_TOTAL = 25;

  purchaseTickets(accountId, ...ticketTypeRequests) {
    let accountValidationService = new AccountValidationService();
    let ticketValidationService = new TicketValidationService(this.#MAX_SEAT_TOTAL);
    let ticketPriceCalculator = new TicketPriceCalculator(this.#TICKET_PRICES);
    let utils = new Utils();
    let seatCalculator = new SeatCalculator();
    let ticketRequest;

    try{
      accountValidationService.validateAccountId(accountId);
      ticketRequest = ticketValidationService.validateTickets(ticketTypeRequests);

      let totalOrderPrice = ticketPriceCalculator.calculate(ticketRequest);
      utils.callTicketPaymentService(accountId, totalOrderPrice);

      let totalSeatNo = seatCalculator.calculate(ticketRequest);
      utils.callSeatReservationService(accountId, totalSeatNo);
    } catch(err){
      return err.globalExceptionHandler();
    }

    return {status: 201, message: 'Thank you for your order.'};
  }
}
