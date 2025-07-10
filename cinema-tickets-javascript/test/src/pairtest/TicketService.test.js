import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
    it('will return success object on successful ticket purchase', () => {
        let ticketService = new TicketService;
        expect(ticketService.purchaseTickets()).toEqual({status: 201, message: 'Thank you for your order.'});
    });
});