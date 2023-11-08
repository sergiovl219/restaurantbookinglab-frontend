import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userinfo } from '../services/authService';
import { selectToken } from '../store/slices/authSlice';
import { setUserInfo, selectUserInfo } from '../store/slices/userInfoSlice';

function HomePage() {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    console.log(userInfo);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await userinfo(token);
                    dispatch(setUserInfo(response.data));
                } catch (error) {
                    console.error('Error getting user info:', error);
                }
            }
        };
        fetchData();
    }, [token, dispatch]);

    return (
        <div>
            <h1>HomePage</h1>
            {userInfo && userInfo.owner && userInfo.restaurants_info && (
                <div>
                    <h2>Userinfo:</h2>
                    <div>
                        <p>Username: {userInfo.owner.username}</p>
                        <p>Email: {userInfo.owner.email}</p>
                    </div>
                    {userInfo.restaurants_info.length > 0 && (
                        <div>
                            <h2>Restaurants:</h2>
                            <ul>
                                {userInfo.restaurants_info.map((restaurant, index) => (
                                    <li key={index}>{restaurant.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;
