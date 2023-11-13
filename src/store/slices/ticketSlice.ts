import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TicketState {
    id: string;
    name: string;
    count: number;
    max_purchase: number;
}

const initialState: TicketState = {
    id: "",
    name: "",
    count: 0,
    max_purchase: 0,
};

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicket: (state, action: PayloadAction<TicketState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.count = action.payload.count;
            state.max_purchase = action.payload.max_purchase;
        },
    },
});

export const { setTicket } = ticketSlice.actions;

export const selectTicket = (state: { ticket: TicketState }) => state.ticket;

export default ticketSlice.reducer;
