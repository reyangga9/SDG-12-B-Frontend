import { Link } from "react-router-dom";
import { navLinks } from "./constants";
import logo from "~/assets/FoodGuardian-logo-white.png";


const Footer = () => {
    return (
        <footer className="w-full bg-primary text-white pt-20 pb-5">
            <div className="w-full container mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center mb-4 sm:mb-0">
                        <img src={logo} className="h-8 mr-3" alt="Logo" />
                    </Link>
                    <nav className="flex flex-wrap items-center justify-center text-md font-medium">
                        {navLinks.map((item, index) => (
                            <Link key={index} to={item.url} className="mr-4 hover:underline md:mr-6">
                                {item.text}
                            </Link>
                        ))}
                    </nav>
                </div>
                <hr className="my-6 border-white border lg:my-8" />
                <span className="block font-medium text-sm  sm:text-center">© 2023 SGD-12-B Generasi Gigih 3.0. All rights reserved.</span>
            </div>
        </footer>

    );
};

export default Footer;
