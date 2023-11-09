import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurantId: string;
    restaurantURL: string | null;
    restaurantName: string;
}

const initialState: RestaurantState = {
    restaurantId: "None Selected",
    restaurantURL: null,
    restaurantName: "",
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
        setRestaurantName: (state, action: PayloadAction<string>) => {
            state.restaurantName = action.payload;
        },
    },
});

export const {
    setRestaurantID,
    setRestaurantURL,
    setRestaurantName
} = restaurantSlice.actions;
export const selectRestaurantID = (state: { restaurant: RestaurantState }) => state.restaurant.restaurantId;
export const selectRestaurantURL = (state: { restaurant: RestaurantState }) => state.restaurant.restaurantURL;
export const selectRestaurantName = (state: { restaurant: RestaurantState }) => state.restaurant.restaurantName;

export default restaurantSlice.reducer;
