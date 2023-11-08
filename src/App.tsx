import React from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "./store/slices/authSlice";
// import OwnerHome from "./components/OwnerHome";

function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className="App">
            {isLoggedIn ? (
                <HomePage />
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
