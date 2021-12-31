import React from 'react'
import GoogleLogin from 'react-google-login';
import {useNavigate}  from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo-white.png'

import {client} from '../client'

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
      localStorage.setItem('user', JSON.stringify(response.profileObj));
      const { name, googleId, imageUrl } = response.profileObj;
      const doc = {
        _id: googleId,
        _type: 'user',
        username: name,
        image: imageUrl,
      };
      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    };
    return (
        <div className='flex justify-start item-center flex-col h-screen'>
            <div className="relative w-full h-full">
                <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
                    <source src={shareVideo} type="video/mp4" />
                </video>
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} alt="logo" className="w-130 ml-8" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={renderProps => (
                                <button type="button" className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none" 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}>
                                    
                                    <FcGoogle className="mr-4 " /> Sign in with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
