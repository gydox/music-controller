import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateRoomPage from "./pages/CreateRoomPage.jsx";
import RoomJoinPage from "./pages/RoomJoinPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Room from "./pages/Room.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/create_room",
    element: <CreateRoomPage />,
  },
  {
    path: "/join_room",
    element: <RoomJoinPage />,
  },
  {
    path: "/room/:roomCode",
    element: <Room />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
