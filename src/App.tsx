import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import GuestLayout from './layouts/GuestLayout'
import HomePage from './pages/guest/Home'
import LoginPage from './pages/guest/Login'


const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
