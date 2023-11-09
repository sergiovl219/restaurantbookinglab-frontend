import React, { useState } from 'react';
import {createTicket, updateTicket} from '../services/ticketsService';
import {selectTicket, setTicket} from "../store/slices/ticketSlice";
import {useDispatch, useSelector} from "react-redux";

export type TicketFormMode = 'create' | 'update';

interface TicketFormProps {
    mode: TicketFormMode;
    restaurantID: string;
    token: string;
    ticketId: string | null;
}

const TicketForm: React.FC<TicketFormProps> = ({ mode, ticketId, restaurantID, token }) => {
    const selectedTicketData = useSelector(selectTicket)
    const [ticketData, setTicketData] = useState({
        name: '',
        count: 0,
        max_purchase: 0,
    });
    const dispatch = useDispatch();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === 'create') {
                const createResponse = await createTicket(restaurantID, ticketData, token);
                dispatch(setTicket(createResponse.data));
            } else if (mode === 'update' && ticketId) {
                const updateResponse = await updateTicket(restaurantID, ticketId, ticketData, token);
                dispatch(setTicket(updateResponse.data));
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={selectedTicketData.name}
                    onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                />
            </label>
            <label>
                Count:
                <input
                    type="number"
                    value={selectedTicketData.count}
                    onChange={(e) => setTicketData({ ...ticketData, count: parseInt(e.target.value) })}
                />
            </label>
            <label>
                Max Purchase:
                <input
                    type="number"
                    value={selectedTicketData.max_purchase}
                    onChange={(e) => setTicketData({ ...ticketData, max_purchase: parseInt(e.target.value) })}
                />
            </label>
            <button type="submit">{mode === 'create' ? 'Create' : 'Update'}</button>
        </form>
    );
};

export default TicketForm;
