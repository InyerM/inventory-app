import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import logo from '../resources/images/logo.png'

const NavBar = () => {

  const [close, setClose] = useState('close')
  const loggeduser = window.localStorage.getItem('loggeduserinformation')
  const navigator = useNavigate()

  return (
    <>
      <div className={`sidebar ${close}`}>
        <div className="logo-details">
          <i className="uil uil-store"></i>
          <span className="logo_name">InventoryApp</span>
          <i className="uil uil-bars" onClick={() => close === '' ? setClose('close') : setClose('')}></i>
        </div>
        <ul className="nav-links">
          {
            !loggeduser ? <>
              <NavLink icon="uil uil-user" text="Login" route="/login" />
              <NavLink icon="uil uil-signout" text="Sign up" route="/register" />
            </> : <>
              <NavLink icon="uil uil-estate" text="Home" route="/home" />
              <NavLink icon="uil uil-user-nurse" text="Clients" route="/clients" />
              <NavLink icon="uil uil-credit-card" text="Credits" route="/credits" />
              <NavLink icon="uil uil-shopping-bag" text="Products" route="/products" />
              <NavLink icon="uil uil-shopping-cart" text="Purchases" route="/purchases" />
              <NavLink icon="uil uil-users-alt" text="Users" route="/users" />
              <NavLink icon="uil uil-file-info-alt" text="Logs" route="/logs" />
            </>
          }
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img
                  src={logo}
                  alt=""
                />
              </div>
              <div className="name-job">
                <div className="profile_name">InyerM</div>
                <div className="job">Web developer</div>
              </div>
              <i className="uil uil-sign-out-alt" onClick={() => {
                window.localStorage.removeItem('loggeduserinformation')
                navigator('/login')
              }}></i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
