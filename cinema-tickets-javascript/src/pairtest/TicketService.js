import TicketPriceCalculator from '../services/ticketcalculator/TicketPriceCalculatorService.js';
import AccountValidationService from '../services/validation/AccountValidationService.js';
import TicketValidationService from '../services/validation/TicketValidationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    let accountValidationService = new AccountValidationService();
    let ticketValidationService = new TicketValidationService();
    let ticketRequest;

    try{
      accountValidationService.validateAccountId(accountId);
      ticketRequest = ticketValidationService.validateTickets(ticketTypeRequests);
    } catch(err){
      return err.globalExceptionHandler()
    }
    console.log(ticketRequest)
    // TicketPriceCalculator(ticketRequest);
    return {status: 201, message: 'Thank you for your order.'}
  }
}
