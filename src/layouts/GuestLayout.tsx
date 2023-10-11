import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GuestLayout = () => {
    const location = useLocation();

    // Tentukan apakah footer harus ditampilkan berdasarkan path saat ini
    const shouldShowFooter = location.pathname !== '/login';

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            {shouldShowFooter && <Footer />}
        </>
    );
};

export default GuestLayout;
