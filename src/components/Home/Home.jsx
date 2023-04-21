import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Layout/Main';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Home = () => {
    const [user, setUser] = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Sing Out Successful...');
                setUser(null);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className='flex justify-center items-center'>
            {
                user && <div className='bg-green-600 px-28 py-14 rounded text-white text-xl my-60'>
                    <h2><strong className='mr-4'>User Name:</strong> {user.displayName}</h2>
                    <h4 className='mt-5'><strong className='mr-4'>User Email:</strong> {user.email}</h4>
                    <div className='text-center mt-5'>
                        <button onClick={handleSignOut} className='px-4 py-2 bg-red-600 rounded-lg'>Sign Out</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;