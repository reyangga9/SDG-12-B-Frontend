import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { NavLink, SocialLink } from './types';

export const navLinks: NavLink[] = [
    { text: 'About', url: '/about' },
    { text: 'Blog', url: '/blog' },
    { text: 'Team', url: '/team' },
    { text: 'Contact', url: '/contact' },
    { text: 'Terms', url: '/terms' }
];

export const socialLinks: SocialLink[] = [
    { text: 'Instagram', icon: <FaInstagram size={24} />, url: '#' },
    { text: 'Twitter', icon: <FaTwitter size={24} />, url: '#' },
    { text: 'GitHub', icon: <FaGithub size={24} />, url: '#' },
];