import api from './api';

export function listTickets(restaurantID: string) {
    return api.get(`tickets/restaurant/${restaurantID}`);
}

export function purchaseTicket(restaurantID: string, ticketID: string, quantity: number) {
    return api.post(`tickets/restaurant/${restaurantID}/purchase/ticket/${ticketID}`, { quantity: quantity });
}

export function statusTicketPurchased(taskID: string) {
    return api.get(`tickets/purchase/status/${taskID}`);
}
