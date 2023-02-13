import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import Wave from 'react-wavify';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../Context/UserContext';


const Register = () => {

    const [animation, setAnimation] = useState(false)
    const { signUp,  setuserProfile} = useContext(AuthContext)
    const [error, setError] = useState('')

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        // const photoURL = form.photourl.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);
        
        if (password.length < 6) {
            setError('Please should be at least 6 characters.');
            return;
        }
        
        setError('');
        signUp(email, password)
            .then(result => {
              
                
                const userInfo = {
                    displayName: name
                }

                setuserProfile(userInfo)
                    .then(() => {
                        setAnimation(true)
                        saveUser(email, name);
                    })
                    .catch(err => console.log(err));


            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })

    }



    const saveUser = (email, name) => {
        const user = {
            email,
            name,
            

        }
        fetch(`http://localhost:5000/user/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTimeout(() => {
                    navigate(from, { replace: true })

                    toast.success('User Created SuccessFully')
                }, 300);
            })


    }

    return (
        <div className='flex  h-screen items-center justify-center '>

            {
                animation ?
                    <>
                        <div className='flex justify-center items-center'>
                            <LoadingSpinner/>
                        </div>

                    </>
                    :
                    <>


                        <div className="w-full max-w-md  p-8 space-y-3 rounded-xl z-50 backdrop-blur-md bg-black/30 border border-blue-400 shadow-2xl text-gray-100">
                            <h1 className="text-2xl font-bold text-blue-600 text-center">Register</h1>
                            <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="name" className="block  font-semibold">Full Name</label>
                                    <input type="text" name="name" id="name" placeholder="Full name" className="w-full backdrop-blur-md bg-white/10 focus:outline-none px-4 py-3 rounded-md border-gray-700  text-gray-100 focus:border-violet-400" />
                                </div>

                                <div className="space-y-1 text-sm">
                                    <label htmlFor="email" className="block  font-semibold">Email</label>
                                    <input type="text" name="email" id="email" placeholder="Email" className="w-full backdrop-blur-md bg-white/10 focus:outline-none px-4 py-3 rounded-md border-gray-700  text-gray-100 focus:border-violet-400" />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="password" className="block  font-semibold">Password</label>
                                    <input type="password" name="password" id="password" placeholder="Password" className="w-full backdrop-blur-md bg-white/10 focus:outline-none px-4 py-3 rounded-md border-gray-700  text-gray-100 focus:border-violet-400" />
                                    <div className="flex justify-end text-xs text-gray-400">

                                    </div>
                                    <div>
                                        <p className="text-red-500">{error}</p>
                                    </div>
                                </div>
                                <button type='submit' className="block w-full p-3 text-center rounded-md font-semibold text-gray-50 bg-blue-600">Sign Up</button>
                            </form>

                            <p className="text-xs text-center sm:px-6 text-gray-400">Already have an account?
                                <Link rel="noopener noreferrer" to="/login" className="underline text-gray-100">Sign IN</Link>
                            </p>
                        </div>
                        <div className='w-full absolute  right-0 bottom-0 '>
                            <Wave fill='#3792CB'
                                className='absolute rounded-b-xl right-0 bottom-0'
                                paused={false}
                                options={{
                                    height: 0,
                                    amplitude: 20,
                                    speed: 0.15,
                                    points: 6
                                }}
                            />
                        </div>
                    </>
            }



        </div>
    );
};

export default Register;