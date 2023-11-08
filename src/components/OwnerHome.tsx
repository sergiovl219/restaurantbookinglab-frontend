import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../store/slices/userInfoSlice';

const OwnerHome: React.FC = () => {
    const userInfo = useSelector(selectUserInfo);

    return (
        <div>
            <h1>Welcome, {userInfo.owner.username}!</h1>
            <p>Email: {userInfo.owner.email}</p>
            <h2>Your Restaurants:</h2>
            <ul>
                {userInfo.restaurants_info.map((restaurant, index) => (
                    <li key={index}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default OwnerHome;
