import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();

        setError('');
        setSuccess('');

        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Your Password Must Contain One Uppercase Letter.');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Your Password Must Contain One Special Character(!, @, #, $, &, *)');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Your Password Must Contain One Digit.');
            return;
        }
        else if (!/(?=.*[a-z])/.test(password)) {
            setError('Your Password Must Contain One Lowercase Letter.');
            return;
        }
        else if (!/.{8}/.test(password)) {
            setError('Your Password Must Contain 8 Character.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const registeredUser = result.user;
                console.log(registeredUser);
                updateUserProfile(registeredUser, name);
                verifyEmail(registeredUser);
                setSuccess('User Registered Successfully...');
                form.reset();
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });

    }


    const updateUserProfile = (user, name) => {
        updateProfile(user, {
            displayName: name,
        })
            .then(() => {
                console.log('User Profile Updated...');
            })
            .catch(error => {
                console.log(error);
            });

    }

    const verifyEmail = (user) => {
        sendEmailVerification(user)
            .then(() => {
                alert('Email Verification Is Sent To Email Address...');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 rounded">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <p className='text-red-600'>{error}</p>
                        <p className='text-green-600'>{success}</p>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <span className="mt-8 text-center text-lg text-gray-600">
                Already Have An Account ? Please
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 ps-2">
                    Login.
                </Link>
            </span>
        </div>
    );
};

export default Register;