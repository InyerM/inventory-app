import React from "react";
import { Link } from 'react-router-dom';

const NavLink = ({icon, text, route}) => {
  return (
    <li>
      <Link to={route}>
        <i className={icon}></i>
        <span className="link_name">{text}</span>
      </Link>
      <ul className="sub-menu blank">
        <li><Link className="link_name" to={route}>{text}</Link></li>
      </ul>
    </li>
  );
};

export default NavLink;
