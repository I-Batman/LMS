import React, { useEffect, useState } from "react";
import hello from "../../assets/hello.svg";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./AdminDashboard.css";

const Dashboard = () => {
  const [users, SetUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const filteredCandidates = filteredUsers.filter(
    (user) => user.usertype === "candidate"
  );
  const filteredAdmins = filteredUsers.filter(
    (user) => user.usertype === "admin"
  );
  const [deleteuser, DeleteUser] = useState({ userid: "" });
  const { deleteuserid } = deleteuser;
  const onDeleteInputChange = (e) => {
    DeleteUser({ ...deleteuser, [e.target.name]: e.target.value });
  };

  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const [errorDeleteMessage, setErrorDeleteMessage] = useState("");

  const onSubmitDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/delete-user",
        deleteuser
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        setSuccessDeleteMessage(response.data);
        setErrorDeleteMessage(""); // Clear any previous error message
        loadUsers();
      } else if (response.status === 404) {
        setErrorDeleteMessage(response.data);
        setSuccessDeleteMessage(""); // Clear any previous success message
      } else {
        setErrorDeleteMessage(
          response.data ||
            "An unexpected error occurred. Please try again later."
        );
        setSuccessDeleteMessage(""); // Clear any previous success message
      }
    } catch (axiosError) {
      console.error("Error from axios:", axiosError);

      if (axiosError.response && axiosError.response.status === 400) {
        setErrorDeleteMessage(axiosError.response.data);
      } else if (axiosError.response && axiosError.response.status === 404) {
        setErrorDeleteMessage(axiosError.response.data);
      } else {
        setErrorDeleteMessage(
          "An error occurred while adding the user. Please check your internet connection and try again."
        );
      }
      setSuccessDeleteMessage(""); // Clear any previous success message
    }
  };

  //delete-user form backend functions
  const [edituser, EditUser] = useState({
    userid: "",
    emailid: "",
    password: "",
    username: "",
    usertype: "",
  });

  const { edituserid, editemailid, editpassword, editusername, editusertype } =
    edituser;

  const onEditInputChange = (e) => {
    EditUser({ ...edituser, [e.target.name]: e.target.value });
  };

  const [successEditMessage, setSuccessEditMessage] = useState("");
  const [errorEditMessage, setErrorEditMessage] = useState("");

  const onSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/edit-user",
        edituser
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        setSuccessEditMessage(response.data);
        setErrorEditMessage(""); // Clear any previous error message
        loadUsers();
      } else if (response.status === 404) {
        setErrorEditMessage(response.data);
        setSuccessEditMessage(""); // Clear any previous success message
      } else {
        setErrorEditMessage(
          response.data ||
            "An unexpected error occurred. Please try again later."
        );
        setSuccessEditMessage(""); // Clear any previous success message
      }
    } catch (axiosError) {
      console.error("Error from axios:", axiosError);

      if (axiosError.response && axiosError.response.status === 400) {
        setErrorEditMessage(axiosError.response.data);
      } else if (axiosError.response && axiosError.response.status === 404) {
        setErrorEditMessage(axiosError.response.data);
      } else {
        setErrorEditMessage(
          "An error occurred while adding the user. Please check your internet connection and try again."
        );
      }
      setSuccessEditMessage(""); // Clear any previous success message
    }
  };
  //add-user form backend functions

  const [adduser, AddUser] = useState({
    userid: "",
    emailid: "",
    password: "",
    username: "",
    usertype: "",
  });

  const { userid, emailid, password, username, usertype } = adduser;

  const onInputChange = (e) => {
    AddUser({ ...adduser, [e.target.name]: e.target.value });
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/add-user",
        adduser
      );

      if (response.status === 200) {
        setSuccessMessage(response.data);
        setErrorMessage(""); // Clear any previous error message
        loadUsers();
      } else {
        setErrorMessage(
          response.data ||
            "An unexpected error occurred. Please try again later."
        );
        setSuccessMessage(""); // Clear any previous success message
      }
    } catch (axiosError) {
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage(axiosError.response.data);
      } else {
        console.error(axiosError); // Log the error for debugging
        setErrorMessage(
          "An error occurred while adding the user. Please check your internet connection and try again."
        );
      }
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8000/admin/dashboard");
    SetUsers(result.data);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <div className="dashboard-main">
        <div className="main__container">
          {/* <!-- MAIN TITLE STARTS HERE --> */}

          <div className="main__title">
            <img src={hello} alt="hello" />
            <div className="main__greeting">
              <h1>Hello Admin</h1>
              <p>Welcome to your admin dashboard</p>
            </div>
          </div>

          {/* <!-- MAIN TITLE ENDS HERE --> */}

          {/* <!-- MAIN CARDS STARTS HERE --> */}
          <div className="main__cards">
            <div className="card">
              <i
                className="fa fa-users fa-2x text-lightblue"
                aria-hidden="true"
              ></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Users</p>
                <span className="font-bold text-title">
                  {filteredUsers.length}
                </span>
              </div>
            </div>
            <div className="card">
              <i
                className="fa fa-graduation-cap fa-2x text-lightblue"
                aria-hidden="true"
              ></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Candidates</p>
                <span className="font-bold text-title">
                  {filteredCandidates.length}
                </span>
              </div>
            </div>
            <div className="card">
              <i
                className="fa fa-user-secret fa-2x text-lightblue"
                aria-hidden="true"
              ></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Admin</p>
                <span className="font-bold text-title">
                  {filteredAdmins.length}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="form-container">
              {/* Form 1 */}

              <div className="admin-form add-user-form">
                <h3>Add User</h3>
                <form onSubmit={(e) => onSubmit(e)} id="addUserForm">
                  <label htmlFor="addUserId">User ID:</label>
                  <input
                    type="text"
                    id="addUserId"
                    name="userid"
                    value={userid}
                    onChange={(e) => onInputChange(e)}
                  />

                  <label htmlFor="addEmail">Email:</label>
                  <input
                    type="email"
                    id="addEmail"
                    name="emailid"
                    value={emailid}
                    onChange={(e) => onInputChange(e)}
                  />

                  <label htmlFor="addPassword">Password:</label>
                  <input
                    type="password"
                    id="addPassword"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                  />

                  <label htmlFor="addUsername">Username:</label>
                  <input
                    type="text"
                    id="addUsername"
                    name="username"
                    value={username}
                    onChange={(e) => onInputChange(e)}
                  />

                  <label htmlFor="addUserType">User Type:</label>
                  <select
                    id="addUserType"
                    name="usertype"
                    value={usertype}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="admin">Admin</option>
                    <option value="candidate">Candidate</option>
                  </select>

                  {/* Submit button */}
                  <button id="adduser-button" type="submit">
                    Add User
                  </button>
                  {/* Only render success message if it's present */}
                  {successMessage && (
                    <p id="success-added-message" style={{ color: "green" }}>
                      {successMessage}
                    </p>
                  )}

                  {/* Only render error message if it's present */}
                  {errorMessage && (
                    <p id="error-added-message" style={{ color: "red" }}>
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* Form 2 */}
              <div className="admin-form edit-user-form">
                <h3>Edit User</h3>
                <form onSubmit={(e) => onSubmitEdit(e)} id="editUserForm">
                  <label htmlFor="editUserId">User ID:</label>
                  <input
                    type="text"
                    id="editUserid"
                    name="userid"
                    value={edituserid}
                    onChange={(e) => onEditInputChange(e)}
                  />

                  <label htmlFor="editEmail">Email:</label>
                  <input
                    type="email"
                    id="editEmail"
                    name="emailid"
                    value={editemailid}
                    onChange={(e) => onEditInputChange(e)}
                  />

                  <label htmlFor="editPassword">Password:</label>
                  <input
                    type="password"
                    id="editPassword"
                    name="password"
                    value={editpassword}
                    onChange={(e) => onEditInputChange(e)}
                  />

                  <label htmlFor="editUsername">Username:</label>
                  <input
                    type="text"
                    id="editUsername"
                    name="username"
                    value={editusername}
                    onChange={(e) => onEditInputChange(e)}
                  />

                  <label htmlFor="editUserType">User Type:</label>
                  <select
                    id="editUserType"
                    name="usertype"
                    value={editusertype}
                    onChange={(e) => onEditInputChange(e)}
                  >
                    <option value="admin">Admin</option>
                    <option value="candidate">Candidate</option>
                  </select>

                  {/* Submit button */}
                  <button id="edituser-button" type="submit">
                    Edit User
                  </button>
                  {successEditMessage && (
                    <p id="success-edited-message" style={{ color: "green" }}>
                      {successEditMessage}
                    </p>
                  )}

                  {/* Only render error message if it's present */}
                  {errorEditMessage && (
                    <p id="error-edited-message" style={{ color: "red" }}>
                      {errorEditMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* Form 3 */}
              <div className="admin-form delete-user-form">
                <h3>Delete User</h3>
                <form
                  onSubmit={(e) => onSubmitDelete(e)}
                  className="delete-user"
                >
                  <label htmlFor="deleteUserId">User ID:</label>
                  <input
                    type="text"
                    id="deleteUserId"
                    name="userid"
                    value={deleteuserid}
                    onChange={(e) => onDeleteInputChange(e)}
                  />

                  {/* Submit button */}
                  <button id="deleteuser-button" type="submit">
                    Delete User
                  </button>

                  {successDeleteMessage && (
                    <p id="success-deleted-message" style={{ color: "green" }}>
                      {successDeleteMessage}
                    </p>
                  )}

                  {/* Only render error message if it's present */}
                  {errorDeleteMessage && (
                    <p id="error-deleted-message" style={{ color: "red" }}>
                      {errorDeleteMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="search-bar">
              {/* Search Bar Component */}
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <a href="#">
                <i className="fa fa-search" aria-hidden="true"></i>
              </a>
            </div>

            <div className=" admin-table-container">
              <h3>User Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Email ID</th>
                    <th>Password</th>
                    <th>Username</th>
                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.userid}</td>
                      <td>{user.emailid}</td>
                      <td>{user.password}</td>
                      <td>{user.username}</td>
                      <td>{user.usertype}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Dashboard;
