import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurantId: string;
}

const initialState: RestaurantState = {
    restaurantId: "None Selected",
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurantID: (state, action: PayloadAction<string>) => {
            state.restaurantId = action.payload;
        },
    },
});

export const { setRestaurantID } = restaurantSlice.actions;
export const selectRestaurantID = (state: { restaurant: RestaurantState }) => state.restaurant.restaurantId;

export default restaurantSlice.reducer;
