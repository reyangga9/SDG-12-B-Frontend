import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import GuestLayout from "./layouts/GuestLayout";
import HomePage from "./pages/guest/HomePage";
import RecommendationsPage from "./pages/guest/RecommendationsPage";
import AboutUsPage from "./pages/guest/AboutUsPage";
import LoginPage from "./pages/guest/LoginPage";
import { BestSellerPage } from "./pages/guest/RestaurantPage/BestSellerPage";
import { DetailPage } from "./pages/guest/RestaurantPage/DetailPage";
import { MostLovedPage } from "./pages/guest/RestaurantPage/MostLovedPage";
import OurShopPage from "./pages/guest/RestaurantPage/OurShopPage";
import CheckoutPage from "./pages/auth/CheckoutPage";
import AuthLayout from "./layouts/AuthLayout";
import TransactionPage from "./pages/auth/TransactionPage";

const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recommendations",
        element: <RecommendationsPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/restaurants/our_shop/search",
        element: <OurShopPage />,
      },
      {
        path: "/restaurants/best_seller",
        element: <BestSellerPage />,
      },
      {
        path: "/restaurants/most_loved",
        element: <MostLovedPage />,
      },
      {
        path: "/restaurant/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
