import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeLayout: React.FC = () => {
    const navbarItems: string[] = ['Home', 'Recomendations'];

    return (
        <>
            <Header items={navbarItems} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default HomeLayout;
