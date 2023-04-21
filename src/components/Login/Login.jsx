import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { UserContext } from '../Layout/Main';


const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const [user, setUser] = useContext(UserContext);
    
    const navigate = useNavigate();


    useEffect(() => {
        if(user) {
            navigate('/');
        }
    }, [user])

    const handleEmailPasswordLogin = (event) => {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser);
                setSuccess('User Logged In Successfully...');
                form.reset();
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

    const handleLogin = (provider) => {
        setError('');
        setSuccess('');

        signInWithPopup(auth, provider)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser);
                setSuccess('User Login Successful...');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

    const handlePasswordReset = () => {
        setError('');

        const email = emailRef.current.value;
        
        if(!email) {
            alert('Please Provide Email Address To Reset The Password...');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password Reset Email Sent!')
            })
            .catch(error => {
                setError(error.message);
            });
    }

    return (
        <div className="bg-gradient-to-b from-blue-500 to-blue-900 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
                <h1 className="text-gray-800 text-3xl font-semibold mb-8 text-center">Please Login</h1>
                <form className="space-y-6" onSubmit={handleEmailPasswordLogin}>
                    <div>
                        <label htmlFor="email" className="text-gray-800 block mb-2">Email</label>
                        <input type="email" id="email" name="email" className="border border-gray-300 p-2 w-full" ref={emailRef} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-gray-800 block mb-2">Password</label>
                        <input type="password" id="password" name="password" className="border border-gray-300 p-2 w-full" required />
                    </div>
                    <p className='text-red-600'>{error}</p>
                    <p className='text-green-600'>{success}</p>
                    <div>
                        <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
                            Login
                        </button>
                    </div>
                    <h4 className='py-2'>
                        <small className='text-lg text-slate-500'>Forgot Password ?</small> 
                        <button onClick={handlePasswordReset} className='bg-orange-500 px-3 py-2 ms-4 rounded text-white font-medium'>
                            Reset Password
                        </button>
                    </h4>
                </form>
                <h4 className='text-center mt-2'>-------------------Or Login With-------------------</h4>
                <div className='my-6 flex justify-center items-center gap-5'>
                    <FontAwesomeIcon
                        onClick={() => handleLogin(googleProvider)}
                        icon={faGoogle} size='xl'
                        className='text-red-500 hover:text-red-600 cursor-pointer'
                    />
                    <FontAwesomeIcon
                        onClick={() => handleLogin(facebookProvider)}
                        icon={faFacebook} 
                        size='xl' 
                        className='text-blue-500 hover:text-blue-600 cursor-pointer' 
                    />
                    <FontAwesomeIcon 
                        onClick={() => handleLogin(gitHubProvider)}
                        icon={faGithub} 
                        size='xl' 
                        className='text-black hover:text-slate-900 cursor-pointer' 
                    />
                    <FontAwesomeIcon
                        onClick={() => handleLogin(microsoftProvider)} 
                        icon={faMicrosoft} 
                        size='xl' 
                        className='text-blue-400 hover:text-blue-500 cursor-pointer' 
                    />
                </div>
                <span className='block mt-4 text-lg text-gray-600'>
                    New to the website? Please <Link to="/register" className="text-green-600 font-medium">Register.</Link>
                </span>
            </div>
        </div>
    );
};

export default Login; <h2>Login</h2>