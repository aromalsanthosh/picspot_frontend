import React from 'react'
import { useState, useRef, useEffect } from 'react'
import {HiMenu} from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom'

import { userQuery } from '../utils/data'
import { SideBar, UserProfile } from '../components'
import Pins from '../container/Pins'
import { client } from '../client'
import logo from '../assets/logo-color.png'

const Home = () => {
    const [ToggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)

    const userInfo = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    
    useEffect(() => {   
        const query = userQuery(userInfo?.googleId)

        client.fetch(query).then((data) => {
            setUser(data[0]);
            console.log(user.image)
        })

    }, [])
    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <SideBar user={user && user} />
            </div>
            <div className="flex md:hidden flex-row">
                <HiMenu  fontSize={40} className='cursor-pointer' onClick={() => {setToggleSidebar(true)} } />
                <Link to='/' >
                    <img src={logo} className="w-28 mx-auto" alt="logo" />
                </Link>
                <Link to={`user-profile/${user?._id}`}>
                    <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
                </Link>
                {ToggleSidebar && (
                    <div className="fixed w-3/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                    </div>
                    <SideBar closeToggle={setToggleSidebar} user={user && user} />
                    </div>
                )}
                

            </div>
        </div>
    )
}

export default Home


