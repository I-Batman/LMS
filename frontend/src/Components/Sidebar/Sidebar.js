import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Torry Harris</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
          <div className="sidebar__link active_menu_link">
            <i className="fa fa-home"></i>
            <a href="#">Dashboard</a>
          </div>
        </Link>

      
        <Link to="/admin-course" style={{ textDecoration: "none" }}>
          <div className="sidebar__link">
            <i className="fa fa-list" aria-hidden="true"></i>
            <a href="#">Course Management</a>
          </div>
        </Link>

        <Link to="/admin-assessment" style={{ textDecoration: "none" }}>
          <div className="sidebar__link">
            <i className="fa fa-list" aria-hidden="true"></i>
            <a href="#">Assessment Management</a>
          </div>
        </Link>

        <Link to="/admin-report" style={{ textDecoration: "none" }}>
          <div className="sidebar__link">
            <i className="fa fa-tasks" aria-hidden="true"></i>
            <a href="#">Progress Tracking</a>
          </div>
        </Link>

        <Link to="/admin-feedback" style={{ textDecoration: "none" }}>
          <div className="sidebar__link">
            <i className="fa fa-comments" aria-hidden="true"></i>
            <a href="#">Feedback Management</a>
          </div>
        </Link>

        <Link to="/reset-password" style={{ textDecoration: "none" }}>
          <div className="sidebar__link">
            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
            <a href="#">Change Password</a>
          </div>
        </Link>

        {/* <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div> */}

        <Link to="/admin-login">
          <div className="sidebar__link">
            {/* <button>Logout</button> */}
            <button class="Btn">
              <div class="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>

              <div class="text">Logout</div>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
