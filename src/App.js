import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Headers from './components/Header.tsx'
import Home from './pages/Home.tsx';
import Signup from './pages/auth/signup/Page.tsx';
import Signin from './pages/auth/signin/Page.tsx';
import SeatSelection from './pages/ticket/[activity_id]/SeatSelection.tsx';
import Order from './pages/order/Order.tsx';

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
    path: "/SeatSelection/:activity_id", // 將動態參數改為 :activity_id
    element: <SeatSelection />,
  },
  {
    path: "/Order",
    element: <Order />,
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