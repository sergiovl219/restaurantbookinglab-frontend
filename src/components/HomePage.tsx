import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../store/slices/userInfoSlice';

const HomePage: React.FC = () => {
    const userInfo = useSelector(selectUserInfo);

    return (
        <div>
            <header>
                {userInfo && userInfo.restaurants_info.length > 0 && (
                    <h1>Welcome to {userInfo.restaurants_info[0].name}</h1>
                )}
            </header>
        </div>
    );
};

export default HomePage;
