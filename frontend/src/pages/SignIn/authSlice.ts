import { createSlice } from "@reduxjs/toolkit";

interface authInterface {
    isLoggedIn: boolean;
    jwt: string;
    role: string;
}

const initialState: authInterface = {
    isLoggedIn: false,
    jwt: "",
    role: ""
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state, data) => {
            state.isLoggedIn = true;
            state.jwt = data.payload.jwt;
            state.role = data.payload.role;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.jwt = "";
            state.role = "";
        }
    }
})

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;