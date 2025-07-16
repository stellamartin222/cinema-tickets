import TicketService from './src/pairtest/TicketService.js';
import TicketTypeRequest from './src/pairtest/lib/TicketTypeRequest.js';

/**
 * Cinema Tickets Demo Runner
 *
 * This file demonstrates the usage of the TicketService.
 * Change lines 16 to 20 to run a custom journey.
 */

const ticketService = new TicketService();

function runDemo() {
  const accountId = 1234;
  const adultTicket = 2;
  const childTicket = 2;
  const infantTicket = 1;

  const totalPrice = adultTicket * 25 + childTicket * 15;
  const totalSeats = adultTicket + childTicket;

  try {
    const ticketBooking = ticketService.purchaseTickets(
      accountId,
      new TicketTypeRequest('ADULT', adultTicket),
      new TicketTypeRequest('CHILD', childTicket),
      new TicketTypeRequest('INFANT', infantTicket)
    );

    console.log(`Ticket booking successful for account ID ${accountId}!`);
    console.log(`Expected cost: £${totalPrice} (${adultTicket}×£25 + ${childTicket}×£15 + ${infantTicket}×£0)`);
    console.log(`Expected seats: ${totalSeats} (${adultTicket} Adults + ${childTicket} Children, Infant sits on lap)`);
    console.log('Ticket booking details:', JSON.stringify(ticketBooking, null, 2));
  } catch (error) {
    console.log('Ticket booking failed:', error.message);
  }
}

runDemo();
