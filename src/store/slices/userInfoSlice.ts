import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserInfoState {
    owner: {
        username: string;
        email: string;
    },
    restaurants_info: {
        id: string;
        name: string;
        page_url: string;
    }[];
}

const initialState: UserInfoState = {
    owner: {
        username: "",
        email: ""
    },
    restaurants_info: [],
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            state.owner = action.payload.owner;
            state.restaurants_info = action.payload.restaurants_info;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state: { userInfo: UserInfoState }) => state.userInfo;

export default userInfoSlice.reducer;
