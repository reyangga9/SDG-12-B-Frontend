import React from 'react';

interface NavbarProps {
    items: string[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    return (
        <nav className="bg-white p-4 border-b-2">
            <div className="container mx-auto flex gap-3 items-center">
                <div className="text-primary font-bold text-xl">Logo</div>
                <ul className="flex space-x-4">
                    {items.map((item, index) => (
                        <li key={index} className="text-primary font-medium hover:text-gray-300">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
