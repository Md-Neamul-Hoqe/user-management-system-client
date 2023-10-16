import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainRoot from "./MainRoot.jsx";
import AllUsers from "./AllUsers.jsx";
import AddUser from "./AddUser.jsx";
import UpdateUser from "./UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/allUsers",
        element: <AllUsers />,
        loader: () => fetch("http://localhost:5000/users"),
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/updateUser/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
