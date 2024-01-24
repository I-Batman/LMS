import React, { useEffect, useState } from "react";
import hello from '../../assets/hello.svg'
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import './AdminFeedback.css'

const AdminFeedback = () => {


    const [manageFeedbackActive, setManageFeedbackActive] = useState(false);
    const [feedbacksSent, setFeedbacksSent] = useState([]);
  
    const [feedbackform, newFeedbackForm] = useState({
      user: {
        userid: "",
      },
      course: {
        courseid: "",
      },
      recipientUser: {
        userid: "",
      },
      feedbackText:"",
      dateSubmitted:""
    });
  
    const handleFeedbackFormChange= (event) =>{
  
      newFeedbackForm({
        ...feedbackform,
        [event.target.name]:
          event.target.name === "dateSubmitted"
            ? new Date(event.target.value).toISOString().split("T")[0]
            : event.target.name === "user"
            ? { userid: parseInt(event.target.value) }
            : event.target.name === "recipientUser"
            ? { userid: parseInt(event.target.value) }
            : event.target.name === "course"
            ? { courseid: parseInt(event.target.value) }
            : event.target.value,
      });
    }
  
    const handleFeedbackFormSubmit = async (event) => {
      event.preventDefault();
        try {
        // Adding new content to the selected course
        await axios.post("http://localhost:8000/feedback", feedbackform, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        newFeedbackForm({
          user: {
        userid: "",
      },
      course: {
        courseid: "",
      },
      recipientUser: {
        userid: "",
      },
      feedbackText:"",
      dateSubmitted:""
        });
        console.log("Feedback Sent Succesfully!")
        alert("Feedback Sent Succesfully!");
      }catch(error){
        console.alert("error submitting form",error);
      }
   
    };
  
  
  
      
  
     const toggleManageFeedback = async () => {
       setManageFeedbackActive(!manageFeedbackActive);
        const usertype = "admin";
  
       if (!manageFeedbackActive) {
         try {
           // Fetch feedbacks sent by the current user (replace 1 with the actual user ID)
           const response = await axios.get(
             `http://localhost:8000/feedback/user/usertype/${usertype}`
           );
           setFeedbacksSent(response.data);
         } catch (error) {
           console.error("Error fetching sent feedbacks:", error);
         }
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
      <div className="feedback-main">

      <div className="manage-feedback-btn">
        <button onClick={toggleManageFeedback}>View Feedbacks</button>
      </div>

      {manageFeedbackActive ? (
        <div className="manage-feedback">
          {/* Section for Sent Feedbacks */}
          <div className="sent-feedbacks">
            <h2>Sent Feedbacks</h2>
            {feedbacksSent.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                {/* Adjust property names based on your actual API response */}
                <p>Candidate ID : {feedback.recipientUser.userid}</p>
                <p>Candidate Name : {feedback.recipientUser.username}</p>
                <p>Course : {feedback.course.coursename}</p>
                <p>Date : {feedback.dateSubmitted}</p>
                <p>Feedback : {feedback.feedbackText}</p>
              </div>
            ))}
          </div>

          {/* Section for Received Feedbacks */}
          <div className="received-feedbacks">
            <h2>Received Feedbacks</h2>
            {/* Received feedbacks will be displayed here */}
          </div>
        </div>
      ) : (
        <div className="feedback-area">
          <div className="testbox">
            <form onSubmit={handleFeedbackFormSubmit}>
              <p id="h1">Feedback Form</p>
              <p id="h4">Employee ID</p>
              <input
                placeholder="Enter Your ID"
                type="text"
                className="input"
                name="user"
                value={feedbackform.user.userid}
                onChange={handleFeedbackFormChange}
              />
              <p id="h4">Recipient User ID</p>
              <input
                placeholder="Enter Recipient ID"
                type="text"
                className="input"
                name="recipientUser"
                value={feedbackform.recipientUser.userid}
                onChange={handleFeedbackFormChange}
              />
              <p id="h4">Course ID</p>
              <input
                placeholder="Enter Course ID"
                type="text"
                className="input"
                name="course"
                value={feedbackform.course.courseid}
                onChange={handleFeedbackFormChange}
              />

              {/* Date Input */}
              <p id="h4">Select a Date</p>
              <input
                id="date"
                type="date"
                className="input"
                name="dateSubmitted"
                value={feedbackform.dateSubmitted}
                onChange={handleFeedbackFormChange}
              />

              <p id="h4">Write your feedback here</p>
              <textarea
                id="textarea"
                rows="5"
                name="feedbackText"
                value={feedbackform.feedbackText}
                onChange={handleFeedbackFormChange}
              ></textarea>
              <div className="btn-block">
                <button type="submit">Send Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
      
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default AdminFeedback;
