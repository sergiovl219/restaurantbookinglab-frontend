import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../store/slices/userInfoSlice';

const HomePage: React.FC = () => {
    const userInfo = useSelector(selectUserInfo);

    return (
        <div>
            <header>
                {userInfo && userInfo.restaurants_info.length > 0 && (
                    <div>
                        <h1>Welcome to {userInfo.restaurants_info[0].name} Restaurant</h1>
                        <label>Select a Restaurant:</label>
                        <select>
                            <option value="">None Selected</option>
                            {userInfo.restaurants_info.map((restaurant) => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </header>
        </div>
    );
};

export default HomePage;
