import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="flex-1">
        <a href="./" className="btn btn-ghost normal-case text-xl">
          User Management System
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/addUser">Add User</NavLink>
          </li>
          <li>
            <NavLink to="/allUsers">All Users</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
