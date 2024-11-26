import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Headers from './components/Header.tsx'
import Home from './pages/Home.tsx';
import Signup from './pages/auth/signup/Page.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);

function App() {
  return (
    <div className="w-screen h-screen bg-yellow-800/5 text-yellow-900">
      <Headers></Headers>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;