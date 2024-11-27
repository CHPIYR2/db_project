import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Headers from './components/Header.tsx'
import Home from './pages/Home.tsx';
import Signup from './pages/auth/signup/Page.tsx';
import Signin from './pages/auth/signin/Page.tsx';
import SeatSelection from './pages/ticket/SeatSelection.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/SeatSelection",
    element: <SeatSelection />,
  }
]);

function App() {
  return (
    <div className="w-screen h-screen">
      <Headers></Headers>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;