import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthLayout = () => {
    const location = useLocation();

    // Tentukan apakah footer harus ditampilkan berdasarkan path saat ini
    const shouldShowFooter = location.pathname !== "/login";

    useEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo(0, 0);
    }, [location.pathname]); // Trigger the effect when location.pathname changes

    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>{shouldShowFooter && <Footer />}</footer>
        </>
    );
};

export default AuthLayout;
