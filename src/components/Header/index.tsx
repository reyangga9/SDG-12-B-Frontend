import { Link, useLocation } from "react-router-dom";
import logo from "~/assets/FoodGuardian-logo.png";
import Cookies from "js-cookie";
import { navLinks } from "./constants";
import { LuSearch, LuMenu } from "react-icons/lu";
import useAuthStore from "~/store/authStore"; // Adjust the import path accordingly
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, user, login, logout } = useAuthStore(); // Access isAuthenticated, user, and logout from the auth store
  console.log("IsAuthenticated:", isAuthenticated);
  const [isOpenModal, setOpenModal] = useState(false);

  const fetchUserDataFromServer = async () => {
    try {
      const response = await axios.get(
        "https://sdg-12-b-backend-production.up.railway.app/api/users/refreshToken",
        {
          headers: {
            authorization: Cookies.get("auth_token"),
          },
        }
      );

      const userData = response.data.data; // Adjust this based on the actual response structure
      console.log("tes", userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle errors here, if necessary
    }
  };

  useEffect(() => {
    const auth_token = Cookies.get("auth_token");
    const userDataFromLocalStorage = localStorage.getItem("currentUser");

    const fetchData = async () => {
      if (auth_token && typeof auth_token === "string") {
        if (!userDataFromLocalStorage) {
          try {
            const userData = await fetchUserDataFromServer();
            if (userData) {
              login(userData, auth_token);
            } else {
              // Tangani jika data pengguna tidak dapat diambil dari server
            }
          } catch (error) {
            // Tangani kesalahan pengambilan data pengguna dari server
            console.error("Error fetching user data from server:", error);
          }
        } else {
          // Gunakan data pengguna dari localStorage jika ada
          const parsedUserData = JSON.parse(userDataFromLocalStorage);
          login(parsedUserData, auth_token);
        }
      } else {
        // Tangani kasus ketika auth_token tidak tersedia atau bukan string
        console.error("Invalid or missing auth_token.");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Call the logout action from the auth store
    logout();

    // Clear the token from cookies
    Cookies.remove("auth_token");

    localStorage.removeItem("currentUser");

    // Refresh the page to apply changes
    window.location.reload();

    // Handle any other logout logic, such as redirecting the user
  };

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

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
                  {navLinks.map((item, index) => (
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
            <button id="search" className="btn btn-ghost btn-circle">
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
            {isOpenModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50" />
                <dialog
                  className="modal modal-bottom sm:modal-middle"
                  open={isOpenModal}
                  onClose={closeModal}
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-2xl">
                      Sure you wanna log out?
                    </h3>
                    <p className="py-4">
                      Just a heads-up: if you do, you’ll have to repeat the
                      login process from the start.
                    </p>
                    <div className="modal-action">
                      <div>
                        <button
                          className="btn btn-primary btn-block"
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                      </div>
                      {/* No, Stay button will close the modal */}
                      <button className="btn" onClick={closeModal}>
                        No
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>
            )}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-primary badge-sm indicator-item">
                    8
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
