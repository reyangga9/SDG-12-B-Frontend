import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "~/assets/FoodGuardian-logo.png";
import { mobileNavLinks, navLinks } from "./constants";
import { LuSearch, LuMenu } from "react-icons/lu";
import { useState } from "react";
import { LogOut } from "lucide-react";
import LogoutSection from "./LogoutSection";
import CartSection from "./CartSection";
import useAuthHook from "~/hook/useAuthHook";

const Header = () => {
  const location = useLocation();
  const [isOpenModal, setOpenModal] = useState(false);
  const { isAuthenticated, user, handleLogout } = useAuthHook();

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();

  // Determine if the current route is CheckoutPage
  const isCheckoutPage = location.pathname === "/checkout"; // Change "/checkout" to the ac

  return (
    <div className="relative mt-14">
      <div className="bg-white w-full border-b-2 fixed top-0 left-0 z-50">
        <div className="navbar p-1 container mx-auto px-10">
          <div className="flex-1">
            <div className="md:hidden">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost btn-circle drawer-button text-2xl mt-1"
                >
                  <LuMenu />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-semibold">
                  {/* Sidebar content here */}
                  {mobileNavLinks.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.url}
                        className={
                          location.pathname === item.url ? "text-primary" : ""
                        }
                      >
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
                <li key={index} className={index === 4 ? "md:hidden" : ""}>
                  <Link
                    to={item.url}
                    className={
                      location.pathname === item.url ? "text-primary" : ""
                    }
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-none">
            <button
              id="search"
              className="btn btn-ghost btn-circle"
              onClick={() => navigate("/search")}
            >
              <LuSearch size={20} />
            </button>
            <div>
              {isAuthenticated ? (
                // If user is authenticated, render Logout button
                <div className="dropdown dropdown-end px-[14.5px] font-medium">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar normal-case"
                  >
                    <div className="w-10 rounded-full bg-primary !inline-flex items-center justify-center ">
                      {isAuthenticated && user && (
                        <span className="text-white text-lg font-bold text-center">
                          {user.username[0]}
                        </span>
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-xl w-32"
                  >
                    <li onClick={openModal}>
                      <a>
                        <LogOut size={20} />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                // If user is not authenticated, render Login button
                <ul className="menu menu-horizontal px-1 font-semibold max-md:hidden">
                  <li>
                    <Link
                      to="/login"
                      className={
                        location.pathname === "/login" ? "text-primary" : ""
                      }
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <LogoutSection
              isOpenModal={isOpenModal}
              handleLogout={handleLogout}
              closeModal={closeModal}
            />
            {!isCheckoutPage && <CartSection />}{" "}
            {/* Render CartSection only on CheckoutPage */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
