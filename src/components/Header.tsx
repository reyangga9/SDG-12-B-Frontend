import React from 'react';
import logo from '../assets/FoodGuadianLogo.png'

interface NavbarProps {
    items: string[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    return (
        <div className="navbar bg-white text-black">
            <div className="flex-1">
                <div id="logo" className="w-40 ml-5">
                    <img src={logo} alt=""
                    />
                </div>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal  px-1">
                    {items.map((item, index) => (
                        <li key={index}>
                            <a> {item}</a>
                        </li>
                    ))}
                    <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
