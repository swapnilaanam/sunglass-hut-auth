import React, { createContext, useState } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

export const UserContext = createContext('User One');

const Main = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            <UserContext.Provider value={[user, setUser]}>
                <Header></Header>
                <Outlet></Outlet>
            </UserContext.Provider>
        </div>
    );
};

export default Main;