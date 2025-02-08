import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*Left section*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>We are responsible of security between users but not of the connections. The chats are private</p>
            </div>

            {/*Center section*/}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
            </div>

            {/*Right section*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+54 11 3132-8899</li>
                    <li>gadstam71@gmail.com</li>
                </ul>
            </div>
        </div>
        {/*Bottom section*/}
        <div className='py-5 text-sm text-center'>
            <hr />
            <p>Copyright 2025@ Prescript - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer