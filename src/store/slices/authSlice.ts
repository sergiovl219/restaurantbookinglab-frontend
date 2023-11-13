import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    token: "",
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { setToken, setIsLoggedIn } = authSlice.actions;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;

export default authSlice.reducer;
