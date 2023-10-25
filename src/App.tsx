import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import GuestLayout from './layouts/GuestLayout'
import HomePage from './pages/guest/HomePage'
import RecommendationPage from './pages/guest/RecommendationPage'
import AboutUsPage from './pages/guest/AboutUsPage'
import LoginPage from './pages/guest/LoginPage'
import { BestSellerPage } from './pages/guest/HomePage/BestSellerPage'

const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/restaurants/best_seller",
        element: <BestSellerPage />,
      },
      {
        path: "/recommendation",
        element: <RecommendationPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },



])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
