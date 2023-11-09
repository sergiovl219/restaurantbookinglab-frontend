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

export function createTicket(restaurantID: string, ticketData: object, token: string) {
    const headers = {
        Authorization: `Token ${token}`,
    };
    return api.post(`tickets/restaurant/${restaurantID}/create`, ticketData, { headers});
}