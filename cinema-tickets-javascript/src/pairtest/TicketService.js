import SeatCalculator from '../services/seatcalculator/SeatCalculator.js';
import TicketPriceCalculator from '../services/ticketcalculator/TicketPriceCalculatorService.js';
import AccountValidationService from '../services/validation/AccountValidationService.js';
import TicketValidationService from '../services/validation/TicketValidationService.js';
import Utils from './lib/Utils.js';
import { logger } from './lib/logger.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #TICKET_PRICES = { ADULT: 25, CHILD: 15, INFANT: 0 };
  #MAX_SEAT_TOTAL = 25;

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const accountValidationService = new AccountValidationService();
    const ticketValidationService = new TicketValidationService(this.#MAX_SEAT_TOTAL);
    const ticketPriceCalculator = new TicketPriceCalculator(this.#TICKET_PRICES);
    let totalAmountToPay;
    let totalSeatNo;
    const utils = new Utils();
    const seatCalculator = new SeatCalculator();
    let ticketRequest;

    try {
      accountValidationService.validateAccountId(accountId);
      ticketRequest = ticketValidationService.validateTickets(ticketTypeRequests);

      totalAmountToPay = ticketPriceCalculator.calculate(ticketRequest);
      utils.callTicketPaymentService(accountId, totalAmountToPay);

      totalSeatNo = seatCalculator.calculate(ticketRequest);
      utils.callSeatReservationService(accountId, totalSeatNo);
    } catch (err) {
      return err.globalExceptionHandler();
    }

    let successObj = {
      statusCode: 200,
      type: 'purchaseTickets',
      title: 'Success',
      detail: 'ticket purchase successful',
    };

    logger.log('info', {
      ...successObj,
    });

    return successObj;
  }
}
