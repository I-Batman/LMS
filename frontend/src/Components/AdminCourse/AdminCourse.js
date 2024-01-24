import React, { useEffect, useState } from "react";
import hello from "../../assets/hello.svg";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./AdminCourse.css";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    coursename: "",
    coursedescription: "",
    uploadedByUser: {
      userid: "",
    },
    uploadedDate: "",
  });
  const [courseContent, setCourseContent] = useState({
    course: {
      courseid: "",
    },
    contenttype: "",
    contentdescription: "",
    contenturl: "",
    uploadedByUser: {
      userid: "",
    },
    uploadedDate: "",
  });
  const [showContentForm, setShowContentForm] = useState(false);
  const [showContentView, setShowContentView] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/course");
      setCourses(response.data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleAddContentClick = (course) => {
    setSelectedCourse(course);
    setShowContentForm(true);
    setShowContentView(false);
  };

  const handleViewContentClick = async (course) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/coursecontent/byCourse/${course.courseid}`
      );
      setCourseContent(response.data);
      setSelectedCourse(course);
      setShowContentForm(false);
      setShowContentView(true);
    } catch (error) {
      console.error("Error loading course content:", error);
    }
  };

  const handleDeleteCourseClick = async (course) => {
    try {
      await axios.delete(`http://localhost:8000/course/${course.courseid}`);
      loadCourses();
      setSelectedCourse(null);
      setShowContentForm(false);
      setShowContentView(false);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCourseChange = (event) => {
    setCourseContent({
      ...courseContent,
      [event.target.name]:
        event.target.name === "course"
          ? { courseid: parseInt(event.target.value) }
          : event.target.name === "uploadedByUser"
          ? { userid: parseInt(event.target.value) }
          : event.target.value,
    });
  };

  const handleNewCourseChange = (event) => {
    setNewCourse({
      ...newCourse,
      [event.target.name]:
        event.target.name === "uploadedDate"
          ? new Date(event.target.value).toISOString().split("T")[0]
          : event.target.name === "uploadedByUser"
          ? { userid: parseInt(event.target.value) } // Ensure it's a number
          : event.target.value,
    });
  };

  const handleCourseSubmit = async (event) => {
    event.preventDefault();

    try {
      // Adding new content to the selected course
      await axios.post("http://localhost:8000/coursecontent", courseContent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCourseContent({
        course: {
          courseid: "",
        },
        contenttype: "",
        contentdescription: "",
        contenturl: "",
        uploadedByUser: {
          userid: "",
        },
        uploadedDate: "",
      });

      setSelectedCourse(null);
      setShowContentForm(false);
      setShowContentView(false);
      loadCourses();
    } catch (error) {
      console.error("Error submitting course content:", error);
    }
  };

  const handleNewCourseSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedCourse) {
        // Editing existing course
        await axios.put(
          `http://localhost:8000/course/${selectedCourse.courseid}`,
          // Send the updated course without modifying content
          selectedCourse
        );
      } else {
        // Adding a new course
        await axios.post("http://localhost:8000/course", newCourse, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setNewCourse({
        coursename: "",
        coursedescription: "",
        uploadedByUser: {
          userid: "",
        },
        uploadedDate: "",
      });

      setSelectedCourse(null);
      setShowContentForm(false);
      setShowContentView(false);
      loadCourses();
    } catch (error) {
      console.error("Error submitting new course:", error);
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowContentForm(false);
    setShowContentView(false);
  };

  const handleNewCourseClick = () => {
    setSelectedCourse(null);
    setShowContentForm(false);
    setShowContentView(false);
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
      <div className="course-main">
        <div className="course-management-container">
          <h1 className="page-title">Course Management</h1>

          {/* Courses Table */}
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>Uploaded By</th>
                <th>Upload Date</th>
                <th>Add Content</th>
                <th>View Content</th>
                <th>Delete Course</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="course-row">
                  <td>{course.courseid}</td>
                  <td onClick={() => handleCourseClick(course)}>
                    {course.coursename}
                  </td>
                  <td>{course.coursedescription}</td>
                  <td>{course.uploadedByUser?.userid}</td>
                  <td>{course.uploadedDate}</td>
                  <td>
                    <button
                      className="add-content-table-button"
                      onClick={() => handleAddContentClick(course)}
                    >
                      Add Content
                    </button>
                  </td>
                  <td>
                    <button
                      className="view-content-table-button"
                      onClick={() => handleViewContentClick(course)}
                    >
                      View Content
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-course-table-button"
                      onClick={() => handleDeleteCourseClick(course)}
                    >
                      Delete Course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Selected Course Details */}
          {selectedCourse && (
            <div className="selected-course-details">
              <h2 className="selected-course-title">
                {selectedCourse.coursename}
              </h2>

              {/* Display Course Contents */}
              {showContentView && (
                <div className="course-contents">
                  {courseContent && courseContent.length > 0 ? (
                    courseContent.map((content, index) => (
                      <div key={index} className="content-item">
                        <h3>Content {index + 1}</h3>
                        <p>Type: {content.contenttype}</p>
                        <p>Description: {content.contentdescription}</p>
                        <p>URL: {content.contenturl}</p>
                        <p>Uploaded By: {content.uploadedByUser.userid}</p>
                        <p>Upload Date: {content.uploadedDate}</p>
                      </div>
                    ))
                  ) : (
                    <p>No content available for this course.</p>
                  )}
                </div>
              )}

              {/* Content Form */}
              {showContentForm && (
                <form
                  onSubmit={handleCourseSubmit}
                  className="course-content-form"
                >
                  <label htmlFor="courseId">Course ID:</label>
                  <input
                    type="text"
                    id="courseId"
                    name="course"
                    value={courseContent.course.courseid}
                    onChange={handleCourseChange}
                  />

                  <label htmlFor="contentType">Content Type:</label>
                  <input
                    type="text"
                    id="contentType"
                    name="contenttype"
                    value={courseContent.contenttype}
                    onChange={handleCourseChange}
                  />

                  <label htmlFor="contentDescription">
                    Content Description:
                  </label>
                  <input
                    type="text"
                    id="contentDescription"
                    name="contentdescription"
                    value={courseContent.contentdescription}
                    onChange={handleCourseChange}
                  />

                  <label htmlFor="contentUrl">Content URL:</label>
                  <input
                    type="text"
                    id="contentUrl"
                    name="contenturl"
                    value={courseContent.contenturl}
                    onChange={handleCourseChange}
                  />

                  <label htmlFor="uploadedBy">Uploaded By:</label>
                  <input
                    type="text"
                    id="uploadedBy"
                    name="uploadedByUser"
                    value={courseContent.uploadedByUser.userid}
                    onChange={handleCourseChange}
                  />

                  <label htmlFor="uploadDate">Upload Date:</label>
                  <input
                    type="date"
                    id="uploadDate"
                    name="uploadedDate"
                    value={courseContent.uploadedDate}
                    onChange={handleCourseChange}
                  />

                  <button type="submit" className="add-content-button">
                    Add Content
                  </button>
                </form>
              )}

              {/* ... (unchanged) */}
            </div>
          )}

          {/* New Course Button */}
          <button onClick={handleNewCourseClick} className="new-course-button">
            New Course
          </button>

          {/* New Course Form */}
          {!selectedCourse && (
            <div className="new-course-form">
              <h2>{selectedCourse ? "Edit Course" : "New Course"}</h2>
              <form onSubmit={handleNewCourseSubmit}>
                <label htmlFor="courseName">Course Name:</label>
                <input
                  type="text"
                  id="courseName"
                  name="coursename"
                  value={newCourse.coursename}
                  onChange={handleNewCourseChange}
                />

                <label htmlFor="courseDescription">Course Description:</label>
                <input
                  type="text"
                  id="courseDescription"
                  name="coursedescription"
                  value={newCourse.coursedescription}
                  onChange={handleNewCourseChange}
                />

                <label htmlFor="uploadedBy">Uploaded By:</label>
                <input
                  type="text"
                  id="uploadedBy"
                  name="uploadedByUser"
                  value={newCourse.uploadedByUser.userid}
                  onChange={handleNewCourseChange}
                />

                <label htmlFor="uploadDate">Upload Date:</label>
                <input
                  type="date"
                  id="uploadDate"
                  name="uploadedDate"
                  value={newCourse.uploadedDate}
                  onChange={handleNewCourseChange}
                />

                <button type="submit" className="add-new-course-button">
                  {selectedCourse ? "Save Changes" : "Add Course"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default AdminCourse;
