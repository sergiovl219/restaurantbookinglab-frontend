import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';
import { deleteTicket, listTickets } from '../services/ticketsService';
import { selectRestaurantID } from '../store/slices/restaurantSlice';
import TicketForm, { TicketFormMode } from './TicketForm';
import { setTicket } from '../store/slices/ticketSlice';
import { setTicketsList, selectTicketsList } from '../store/slices/ticketsListSlice';

interface Ticket {
    id: string;
    name: string;
    count: number;
    max_purchase: number;
}

const AdminTickets: React.FC = () => {
    const tickets = useSelector(selectTicketsList);
    const [formMode, setFormMode] = useState<TicketFormMode>('create');
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const token = useSelector(selectToken);
    const restaurantId = useSelector(selectRestaurantID);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                if (restaurantId !== 'None Selected') {
                    const response = await listTickets(restaurantId);
                    dispatch(setTicketsList(response.data));
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, [token, restaurantId, dispatch]);

    const handleCreateTicket = () => {
        setFormMode('create');
        setSelectedTicketId(null);
    };

    const handleUpdateTicket = (ticket: Ticket) => {
        setFormMode('update');
        setSelectedTicketId(ticket.id);
        dispatch(setTicket(ticket))
    };
    const handleDeleteTicket = async (ticketId: string) => {
        try {
            await deleteTicket(restaurantId, ticketId, token);
            const response = await listTickets(restaurantId);
            dispatch(setTicketsList(response.data));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <div>
            <h1>Ticket List</h1>
            <button onClick={handleCreateTicket}>Create Ticket</button>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        <p>ID: {ticket.id}</p>
                        <p>Name: {ticket.name}</p>
                        <p>Count: {ticket.count}</p>
                        <p>Max Purchase: {ticket.max_purchase}</p>
                        <button onClick={() => handleUpdateTicket(ticket)}>Update Ticket</button>
                        <button onClick={() => handleDeleteTicket(ticket.id)}>Delete Ticket</button>
                    </li>
                ))}
            </ul>

            <TicketForm
                mode={formMode}
                restaurantID={restaurantId}
                token={token}
                ticketId={selectedTicketId}
            />
        </div>
    );
}

export default AdminTickets;
