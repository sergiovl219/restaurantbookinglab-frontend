import api from './api';

export function listTickets(restaurantID: string) {
    return api.get(`tickets/restaurant/${restaurantID}`);
}
