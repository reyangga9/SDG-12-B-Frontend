import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeLayout: React.FC = () => {
    const navbarItems: string[] = ['Home', 'Recomendations'];

    return (
        <>
            <Navbar items={navbarItems} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default HomeLayout;
