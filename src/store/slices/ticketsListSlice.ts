import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TicketsListState {
    tickets: TicketInfo[];
}

interface TicketInfo {
    id: string;
    name: string;
    count: number;
    max_purchase: number;
}

const initialState: TicketsListState = {
    tickets: [],
};

const ticketsListSlice = createSlice({
    name: 'ticketsList',
    initialState,
    reducers: {
        setTicketsList: (state, action: PayloadAction<TicketInfo[]>) => {
            state.tickets = action.payload;
        },
    },
});

export const { setTicketsList } = ticketsListSlice.actions;

export const selectTicketsList = (state: { ticketsList: TicketsListState }) => state.ticketsList.tickets;

export default ticketsListSlice.reducer;
