import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurantId: string;
    restaurantURL: string | null;
}

const initialState: RestaurantState = {
    restaurantId: "None Selected",
    restaurantURL: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurantID: (state, action: PayloadAction<string>) => {
            state.restaurantId = action.payload;
        },
        setRestaurantURL: (state, action: PayloadAction<string | null>) => {
            state.restaurantURL = action.payload;
        },
    },
});

export const { setRestaurantID, setRestaurantURL } = restaurantSlice.actions;
export const selectRestaurantID = (state: { restaurant: RestaurantState }) => state.restaurant.restaurantId;
export const selectRestaurantURL = (state: { restaurant: RestaurantState }) => state.restaurant.restaurantURL;

export default restaurantSlice.reducer;
