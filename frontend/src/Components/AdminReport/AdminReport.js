import React, { useEffect, useState } from "react";
import hello from '../../assets/hello.svg'
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import './AdminReport.css'

const AdminReport = () => {

    const [performanceTrackingData, setPerformanceTrackingData] = useState([]);

    useEffect(() => {
      loadPerformanceTrackingData();
    }, []);
  
    const loadPerformanceTrackingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/performancetracking"
        );
        setPerformanceTrackingData(response.data);
      } catch (error) {
        console.error("Error loading performance tracking data:", error);
      }
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
      <div className="report-main">
        <h1 className="page-title">Progress Tracking</h1>
        <div className="report-content">
          <div className="search-bar">
            {/* Search Bar Component */}
            <input type="text" placeholder="Search..." />
            <a href="#">
              <i className="fa fa-search" aria-hidden="true"></i>
            </a>
          </div>

          <div className="report-table-container">
            <h3>Candidates Report</h3>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  {/* <th>Course Id</th> */}
                  <th>Course Name</th>
                  {/* <th>Assessment Id</th> */}
                  <th>Assessment Title</th>
                  <th>Marks Scored</th>
                  <th>Maximum Marks</th>
                  <th>Passing Marks</th>
                </tr>
              </thead>
              <tbody>
                {performanceTrackingData.map((performance, index) => (
                  <tr key={index}>
                    <td>{performance.user?.userid}</td>
                    <td>{performance.user?.username}</td>
                    {/* <td>{performance.course?.courseid}</td> */}
                    <td>{performance.course?.coursename}</td>
                    {/* <td>{performance.assessment?.assessmentid}</td> */}
                    <td>{performance.assessment?.assessmentTitle}</td>
                    <td>{performance.marks}</td>
                    <td>{performance.assessment?.maximumMarks}</td>
                    <td>{performance.assessment?.passingMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default AdminReport;
