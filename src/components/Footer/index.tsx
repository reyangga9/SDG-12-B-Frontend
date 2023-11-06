import { Link } from "react-router-dom";
import { navLinks, socialLinks } from "./constants";

const Footer = () => {
    return (
        <div className="footer footer-center p-10 bg-primary text-white font-medium">
            <nav className="grid sm:grid-flow-col gap-4">
                {navLinks.map((item, index) => (
                    <div key={index} className="px-5 py-2">
                        <Link className="text-base hover:underline" to={item.url}>
                            {item.text}
                        </Link>
                    </div>
                ))}
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    {socialLinks.map((item, index) => (
                        <a key={index} href={item.url} className=" hover:text-gray-500">
                            <span className="sr-only">{item.text}</span>
                            {item.icon}
                        </a>
                    ))}
                </div>
            </nav>
            <aside>
                <p>© 2023 SGD-12-B Generasi Gigih 3.0. All rights reserved.</p>
            </aside>
        </div>

    );
};

export default Footer;
