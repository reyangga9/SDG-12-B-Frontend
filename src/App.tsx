import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import GuestLayout from './layouts/GuestLayout'
import HomePage from './pages/guest/HomePage'
import RecommendationPage from './pages/guest/RecommendationPage'
import MitraPage from './pages/guest/MitraPage'
import AboutUsPage from './pages/guest/AboutUsPage'
import LoginPage from './pages/guest/LoginPage'

const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recommendation",
        element: <RecommendationPage />,
      },
      {
        path: "/mitra",
        element: <MitraPage />,
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
