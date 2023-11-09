import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';
import { listTickets } from "../services/ticketsService";

interface Ticket {
    id: string;
    name: string;
    count: number;
    max_purchase: number;
}

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const token = useSelector(selectToken);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await listTickets('8430f8e0-7a5a-4657-9be1-f74e6997b4d5'); // TODO: Dynamic ticket ID
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, [token]);

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
