import TicketService from '../../../src/pairtest/TicketService';

describe('TicketService', () => {
    it('will return success object on successful ticket purchase', () => {
        expect(ticketService.purchaseTickets(1234, [{ADULT: 1}])).toEqual({status: 201, message: 'Thank you for your order.'});
    });
});