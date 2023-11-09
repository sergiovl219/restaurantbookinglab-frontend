import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';
import { listTickets, purchaseTicket, statusTicketPurchased } from "../services/ticketsService";
import { selectRestaurantID } from '../store/slices/restaurantSlice';

interface Ticket {
    id: string;
    name: string;
    count: number;
    max_purchase: number;
}

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedAmount, setSelectedAmount] = useState<number>(1);
    const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);

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

    const handleBuyTicket = async (ticketId: string) => {
        let task_id: string;

        try {
            const responsePurchase = await purchaseTicket(restaurantId, ticketId, selectedAmount);
            task_id = String(responsePurchase.data.task_id);

            await new Promise(resolve => setTimeout(resolve, 5000));

            const responseStatusPurchase = await statusTicketPurchased(task_id);
            const status = responseStatusPurchase.data.status;

            setPurchaseStatus(status);
        } catch (error) {
            console.error('Error purchasing ticket:', error);
        }
    };

    return (
        <div>
            <h1>Ticket List</h1>
            {purchaseStatus && (
                <div style={{ color: purchaseStatus === 'completed' ? 'green' : 'red' }}>
                    {purchaseStatus === 'completed'
                        ? 'Purchase completed successfully!'
                        : 'Purchase failed. Please try again refreshing.'}
                </div>
            )}
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        <p>ID: {ticket.id}</p>
                        <p>Name: {ticket.name}</p>
                        <p>Count: {ticket.count}</p>
                        <p>Max Purchase: {ticket.max_purchase}</p>
                        <label>
                            Select amount:
                            <select
                                value={selectedAmount}
                                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                            >
                                {Array.from({ length: ticket.count }, (_, index) => index + 1).map((amount) => (
                                    <option key={amount} value={amount}>{amount}</option>
                                ))}
                            </select>
                        </label>
                        <button onClick={() => handleBuyTicket(ticket.id)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TicketList;
