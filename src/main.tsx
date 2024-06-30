import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "@/About";
import App from "@/App.tsx";
import Sidebar from "@/components/Sidebar";
import "@/global.css";
import ProtectedRoute from "@/ProtectedRoute";
import Dashboard from "./Dashboard";
import Nav from "./components/Nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute component={Sidebar} />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN!}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
);
