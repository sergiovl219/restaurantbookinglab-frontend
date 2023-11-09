import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTicket } from '../services/ticketsService';
import { selectRestaurantID } from '../store/slices/restaurantSlice';
import {selectToken} from "../store/slices/authSlice";

interface TicketFormProps {
    // TODO: Used to close the form, to be used in future
    onClose?: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onClose }) => {
    const [ticketData, setTicketData] = useState({
        name: '',
        count: 1,
        max_purchase: 1
    });

    const restaurantId = useSelector(selectRestaurantID);
    const token = useSelector(selectToken);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTicketData((prevData) => ({
            ...prevData,
            [name]: name === 'count' || name === 'max_purchase' ? parseInt(value, 10) : value
        }));
    };

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createTicket(restaurantId, ticketData, token);
            console.log(response);
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <div>
            <h2>Create Ticket</h2>
            <form onSubmit={handleCreateTicket}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={ticketData.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Count:</label>
                    <input
                        type="number"
                        name="count"
                        value={ticketData.count}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label>Max Purchase:</label>
                    <input
                        type="number"
                        name="max_purchase"
                        value={ticketData.max_purchase}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Create Ticket</button>
            </form>
        </div>
    );
};

export default TicketForm;
