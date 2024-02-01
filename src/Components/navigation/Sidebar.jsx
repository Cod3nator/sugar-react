import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <li>
          <Link to="/lab-admin">
            <button className="nav-button">Patients</button>
          </Link>
        </li>
        <li>
          <Link to="/referred_doctor">
            <button className="nav-button">Referred Doctors</button>
          </Link>
        </li>
      </nav>
    </div>
  );
};

export default Sidebar;
