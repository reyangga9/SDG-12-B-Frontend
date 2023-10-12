import { Link, useLocation } from 'react-router-dom';
import logo from '~/assets/FoodGuardian-logo.png';
import { navLinks } from './constants';
import { LuSearch } from 'react-icons/lu';

const Header = () => {
    const location = useLocation();
    return (
        <header className='bg-white w-full border-b-2 fixed top-0 left-0 z-50 '>
            <div className="navbar p-1 container mx-auto">
                <div className="flex-1">
                    <div className='md:hidden'>
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button text-2xl">
                                ☰
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                {navLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.url} className={location.pathname === item.url ? 'text-primary' : ''}>
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                        <div id="logo" className="w-40">
                            <img src={logo} alt="" />
                        </div>
                    </Link>
                    <ul className="menu menu-horizontal px-1 font-semibold ml-5 max-md:hidden">
                        {navLinks.map((item, index) => (
                            <li key={index} className={index === 4 ? 'md:hidden' : ''}>
                                <Link to={item.url} className={location.pathname === item.url ? 'text-primary' : ''}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-none">
                    <button id='search' className="btn btn-ghost btn-circle">
                        <LuSearch size={20} />
                    </button>
                    <ul className='menu menu-horizontal px-1 font-semibold max-md:hidden'>
                        <li>
                            <Link to='/login' className={location.pathname === '/login' ? 'text-primary' : ''}>
                                Login
                            </Link>
                        </li>
                    </ul>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-primary badge-sm indicator-item">8</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
