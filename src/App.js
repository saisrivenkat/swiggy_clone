import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import RestuarentData from "./components/RestuarentData";
import Location from "./components/Location";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestuarentData />,
      },
    ],
  },
  {
    path: "/location",
    element: <Location />,
  }
]);
const App=()=> {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
