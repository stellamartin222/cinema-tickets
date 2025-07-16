import InvalidPurchaseException from '../../pairtest/lib/InvalidPurchaseException.js';
import TicketRequest from '../../pairtest/lib/TicketRequest.js';
import { logger } from '../../pairtest/lib/logger.js';

export default class TicketValidationService {
  #maxSeatTotal;
  #ticketRequest;

  constructor(maxSeatTotal) {
    this.#maxSeatTotal = maxSeatTotal;
    this.#ticketRequest = new TicketRequest();
  }

  validateTickets(ticketRequests) {
    const serviceName = 'validateTicketTypeRequest';

    if (this.#isTicketRequestsUndefined(ticketRequests)) {
      throw new InvalidPurchaseException(serviceName, 'No tickets requested.');
    }

    ticketRequests.forEach((ticket) => {
      let type = ticket.getTicketType();
      let noOfTickets = ticket.getNoOfTickets();

      switch (type) {
        case 'ADULT':
          this.#ticketRequest.addNoOfAdultTickets(noOfTickets);
          break;
        case 'CHILD':
          this.#ticketRequest.addNoOfChildTickets(noOfTickets);
          break;
        case 'INFANT':
          this.#ticketRequest.addNoOfInfantTickets(noOfTickets);
          break;
      }
    });

    if (this.#isTotalOrderLessThanOne()) {
      throw new InvalidPurchaseException(serviceName, 'Cannot request zero tickets.');
    } else if (this.#isTotalOrderMoreThanMax()) {
      throw new InvalidPurchaseException(serviceName, 'Total ticket number cannot exceed 25.');
    }

    if (this.#ticketRequest.getNoOfAdultTickets() < this.#ticketRequest.getNoOfInfantTickets()) {
      throw new InvalidPurchaseException(
        serviceName,
        'Must be one adult per infant ticket purchased.'
      );
    } else if (
      this.#ticketRequest.getNoOfChildTickets() > 0 &&
      this.#ticketRequest.getNoOfAdultTickets() === 0
    ) {
      throw new InvalidPurchaseException(
        serviceName,
        'Children must be accompanied by at least one adult.'
      );
    }

    logger.log('info', {
      type: serviceName,
      title: 'Success',
      detail: `${this.#ticketRequest.getNoOfAdultTickets()} Adult, ${this.#ticketRequest.getNoOfChildTickets()} Child and ${this.#ticketRequest.getNoOfInfantTickets()} Infant tickets validated`,
    });

    return this.#ticketRequest;
  }

  #isTicketRequestsUndefined(ticketRequests) {
    return ticketRequests === undefined ? true : false;
  }

  #isTotalOrderLessThanOne() {
    return this.#ticketRequest.getTotalNoOfTickets() <= 0 ? true : false;
  }

  #isTotalOrderMoreThanMax() {
    return this.#ticketRequest.getTotalNoOfTickets() > this.#maxSeatTotal ? true : false;
  }
}
