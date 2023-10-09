import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomeLayout from './layouts/HomeLayout'
import HomePage from './pages/guest/Home'


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
