import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className="pt-20 md:pt-24">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout; 
