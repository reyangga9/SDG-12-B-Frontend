import { Link } from 'react-router-dom';
import logo from '../../assets/FoodGuardian-logo.png';
import { navLinks } from './constants';
import { LuSearch } from 'react-icons/lu';


const Navbar = () => {
    return (
        <div className="navbar px-10 bg-white text-black">
            <div className="navbar-start">
                <div id="logo" className="w-40">
                    <img src={logo} alt="" />
                </div>
                <ul className="menu menu-horizontal px-1 font-semibold ml-5">
                    {navLinks.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <button id='search' className="btn btn-ghost btn-circle">
                    <LuSearch size={20} />
                </button>
                <ul id='' className='menu menu-horizontal px-1 font-semibold'>
                    <li>
                        <Link to='/login'>
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
    );
};

export default Navbar;
