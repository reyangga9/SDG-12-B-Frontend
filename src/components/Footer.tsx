import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

interface NavLink {
    text: string;
    url: string;
}

const socialLinks: { text: string, icon: JSX.Element, url: string }[] = [
    { text: 'Instagram', icon: <FaInstagram size={24} />, url: '#' },
    { text: 'Twitter', icon: <FaTwitter size={24} />, url: '#' },
    { text: 'GitHub', icon: <FaGithub size={24} />, url: '#' },
];

const navLinks: NavLink[] = [
    { text: 'About', url: '#' },
    { text: 'Blog', url: '#' },
    { text: 'Team', url: '#' },
    { text: 'Pricing', url: '#' },
    { text: 'Contact', url: '#' },
    { text: 'Terms', url: '#' }
];

const Footer: React.FC = () => {
    return (
        <section className="bg-white">
            <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    {navLinks.map((link, index) => (
                        <div key={index} className="px-5 py-2">
                            <a href={link.url} className="text-base leading-6 text-gray-500 hover:text-gray-900">
                                {link.text}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="flex justify-center mt-8 space-x-6">
                    {socialLinks.map((socialLink, index) => (
                        <a key={index} href={socialLink.url} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{socialLink.text}</span>
                            {socialLink.icon}
                        </a>
                    ))}
                </div>
                <p className="mt-8 text-base leading-6 text-center text-gray-400">
                    © 2023 FoodGuardian, Inc. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default Footer;
