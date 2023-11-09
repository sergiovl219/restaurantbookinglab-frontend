import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../store/slices/userInfoSlice';
import {selectRestaurantID, setRestaurantID, setRestaurantURL} from '../store/slices/restaurantSlice';

const HomePage: React.FC = () => {
    const userInfo = useSelector(selectUserInfo);
    const restaurantId = useSelector(selectRestaurantID);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo && userInfo.restaurants_info.length > 0) {
            dispatch(setRestaurantID(userInfo.restaurants_info[0].id));
            dispatch(setRestaurantURL(userInfo.restaurants_info[0].page_url));
        }
    }, [userInfo, dispatch]);

    const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRestaurantId = event.target.value;
        const selectedRestaurant = userInfo.restaurants_info.find(
            restaurant => restaurant.id === selectedRestaurantId
        );

        if (selectedRestaurant) {
            dispatch(setRestaurantID(selectedRestaurantId));
            dispatch(setRestaurantURL(selectedRestaurant.page_url));
        }
    };

    return (
        <div>
            <header>
                {userInfo && userInfo.restaurants_info.length > 0 && (
                    <div>
                        <h1>Welcome to {userInfo.restaurants_info[0].name} Restaurant</h1>
                        <label>Select a Restaurant:</label>
                        <select value={restaurantId} onChange={handleRestaurantChange}>
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
