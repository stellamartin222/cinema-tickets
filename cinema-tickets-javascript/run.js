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
  try {
    const ticketBooking = ticketService.purchaseTickets(
      123456,
      new TicketTypeRequest('ADULT', 2),
      new TicketTypeRequest('CHILD', 2),
      new TicketTypeRequest('INFANT', 1)
    );

    console.log('Ticket booking successful!');
    console.log('Expected cost: £80 (2×£25 + 2×£15 + 1×£0)');
    console.log('Expected seats: 4 (2 Adults + 2 Children, Infant sits on lap)');
    console.log('Ticket booking details:', JSON.stringify(ticketBooking, null, 2));
  } catch (error) {
    console.log('Ticket booking failed:', error.message);
  }
}

runDemo();
