import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Headers from './components/Header.tsx';
import Home from './pages/Home.tsx';
import Signup from './pages/auth/signup/Page.tsx';
import Signin from './pages/auth/signin/Page.tsx';
import SeatSelection from './pages/ticket/[activity_id]/SeatSelection.tsx';
import Order from './pages/order/Order.tsx';
import SearchResults from './pages/search/SearchResults.tsx'

// 定義 RootLayout，包含 Header
const RootLayout = () => {
  return (
    <div>
      <Headers />
      <Outlet /> {/* 用於渲染子路由 */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 根布局
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      { path: "/SeatSelection/:activity_id", element: <SeatSelection /> },
      { path: "/Order", element: <Order /> },,
      { path: "/:query", element: <SearchResults /> },
    ],
  },
]);

function App() {
  return (
    <div className="w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
