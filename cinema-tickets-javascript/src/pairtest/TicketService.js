import SeatCalculator from '../services/seatcalculator/SeatCalculator.js';
import TicketPriceCalculator from '../services/ticketcalculator/TicketPriceCalculatorService.js';
import AccountValidationService from '../services/validation/AccountValidationService.js';
import TicketValidationService from '../services/validation/TicketValidationService.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #TICKET_PRICES = {ADULT: 25, CHILD: 15, INFANT: 0}

  purchaseTickets(accountId, ...ticketTypeRequests) {
    let accountValidationService = new AccountValidationService();
    let ticketValidationService = new TicketValidationService();
    let ticketPriceCalculator = new TicketPriceCalculator(this.#TICKET_PRICES);
    let seatCalculator = new SeatCalculator();
    let ticketRequest;

    try{
      accountValidationService.validateAccountId(accountId);
      ticketRequest = ticketValidationService.validateTickets(ticketTypeRequests);
    } catch(err){
      return err.globalExceptionHandler()
    }
     
    let totalOrderCost = ticketPriceCalculator.calculate(ticketRequest);
    new TicketPaymentService(accountId, totalOrderCost);
    let totalSeatNo = seatCalculator.calculate(ticketRequest);

    return {status: 201, message: 'Thank you for your order.'}
  }
}
