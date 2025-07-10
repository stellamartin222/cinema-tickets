import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
    let ticketService;

    beforeEach(async () => {
        ticketService = new TicketService;
    });

    it('will return success object on successful ticket purchase', () => {
        expect(ticketService.purchaseTickets(1234, [{ADULT: 1}])).toEqual({status: 201, message: 'Thank you for your order.'});
    });
});