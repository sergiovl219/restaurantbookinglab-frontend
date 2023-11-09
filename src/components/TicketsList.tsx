import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';
import { listTickets } from "../services/ticketsService";
import { selectRestaurantID } from '../store/slices/restaurantSlice';

interface Ticket {
    id: string;
    name: string;
    count: number;
    max_purchase: number;
}

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const token = useSelector(selectToken);
    const restaurantId = useSelector(selectRestaurantID);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                if (restaurantId !== 'None Selected') {
                    const response = await listTickets(restaurantId);
                    setTickets(response.data);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, [token, restaurantId]);

    return (
        <div>
            <h1>Ticket List</h1>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        <p>ID: {ticket.id}</p>
                        <p>Name: {ticket.name}</p>
                        <p>Count: {ticket.count}</p>
                        <p>Max Purchase: {ticket.max_purchase}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TicketList;
