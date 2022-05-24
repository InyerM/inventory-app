import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Clients from "../pages/Clients";
import Credits from "../pages/Credits";
import Products from "../pages/Products";
import Purchases from "../pages/Purchases";
import Users from "../pages/Users";
import Home from "../pages/Home";
import Register from "../pages/Register";
import NavBar from "./SideBar";
import ProtectedRoute from "./ProtectedRoute";
import Logs from "../pages/Logs";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/credits"
          element={
            <ProtectedRoute>
              <Credits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <Purchases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <div className="content">
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
