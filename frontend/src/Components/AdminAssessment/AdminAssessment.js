import React, { useEffect, useState } from "react";
import hello from '../../assets/hello.svg'
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import './AdminAssessment.css'

const AdminAssessment = () => {

    useEffect(() => {
        loadAssessments();
        loadTags();
      }, []);
    
      const loadTags = async () => {
        try {
          const response = await axios.get("http://localhost:8000/tag");
          setTags(response.data);
        } catch (error) {
          console.error("Error loading tags:", error);
        }
      };
    
      const [assessments, setAssessments] = useState([]);
      const [selectedAssessment, setSelectedAssessment] = useState(null);
      const [newAssessment, setNewAssessment] = useState({
        course: {
          courseid: "",
        },
        assessmentTitle: "",
        maximumMarks: "",
        passingMarks: "",
        maxAttempts: "",
      });
    
      const handleDeleteAssessmentClick = async (assessment) => {
        try {
          await axios.delete(
            `http://localhost:8000/assessment/${assessment.assessmentid}`
          );
          loadAssessments();
          setSelectedAssessment(null);
          setShowQuestionsForm(false);
          setShowQuestionsView(false);
        } catch (error) {
          console.error("Error deleting assessment:", error);
        }
      };
    
      const [showQuestionsForm, setShowQuestionsForm] = useState(false);
      const [showQuestionsView, setShowQuestionsView] = useState(false);
    
      const loadAssessments = async () => {
        try {
          const response = await axios.get("http://localhost:8000/assessment");
          setAssessments(response.data);
        } catch (error) {
          console.error("Error loading assessments:", error);
        }
      };
    
      const handleAssessmentChange = (event) => {
        setNewAssessment({
          ...newAssessment,
          [event.target.name]:
            event.target.name === "course"
              ? { ...newAssessment.course, courseid: parseInt(event.target.value) }
              : event.target.value,
        });
      };
    
      const handleNewAssessmentSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(
            "http://localhost:8000/assessment",
            newAssessment
          );
          setAssessments([...assessments, response.data]);
          loadAssessments(); // Load assessments after adding the new one
          setNewAssessment({
            course: {
              courseid: "",
            },
            assessmentTitle: "",
            maximumMarks: "",
            passingMarks: "",
            maxAttempts: "",
          });
          setSelectedAssessment(null);
          setShowQuestionsForm(false);
          setShowQuestionsView(false);
        } catch (error) {
          console.error("Error submitting new assessment:", error);
        }
      };
    
      const handleNewAssessmentClick = () => {
        setSelectedAssessment(null);
        setShowQuestionsForm(!showQuestionsForm);
        setShowQuestionsView(false);
      };
    
      const handleAddQuestionsClick = (assessment) => {
        setSelectedAssessment(assessment);
        setShowQuestionsForm(true);
        setShowQuestionsView(false);
      };
    
      // Tags
    
      const [tags, setTags] = useState([]);
      const [tagId, setTagId] = useState("");
      const [tagName, setTagName] = useState("");
      const [showTags, setShowTags] = useState(false);
      const [existingTags, setExistingTags] = useState([]);
    
      const handleManageTagsClick = async () => {
        try {
          const response = await axios.get("http://localhost:8000/tag");
          setExistingTags(response.data);
          setShowTags(!showTags); // Toggle the showTags state
        } catch (error) {
          console.error("Error loading tags:", error);
        }
      };
    
      const handleAddTag = async () => {
        if (tagId && tagName) {
          try {
            // Parse the tagId to an integer
            const parsedTagId = parseInt(tagId);
    
            const newTag = { tagid: parsedTagId, tagname: tagName }; // Update the property names to match your backend
            await axios.post("http://localhost:8000/tag", newTag);
    
            // After adding the tag, fetch the updated list of tags
            const response = await axios.get("http://localhost:8000/tag");
            setTags(response.data);
    
            setTagId("");
            setTagName("");
          } catch (error) {
            console.error("Error adding tag:", error);
          }
        }
      };
    
      const handleDeleteTag = async (tagId) => {
        try {
          await axios.delete(`http://localhost:8000/tag/${tagId}`);
          // Use .then to load tags after successful deletion
          axios.get("http://localhost:8000/tag").then((response) => {
            setTags(response.data); // Update the tags state
          });
        } catch (error) {
          console.error("Error deleting tag:", error);
        }
      };
    
      const [newQuestion, setNewQuestion] = useState({
        assessment: { assessmentid: "" },
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        tag: { tagid: "" },
      });
      const handleNewQuestionChange = (event) => {
        setNewQuestion({
          ...newQuestion,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleAddQuestionSubmit = async (event) => {
        event.preventDefault();
        console.log("Request Payload:", newQuestion);
    
        try {
          const response = await axios.post(
            `http://localhost:8000/assessment-question`,
            {
              assessment: { assessmentid: newQuestion.assessment },
              questionText: newQuestion.questionText,
              optionA: newQuestion.optionA,
              optionB: newQuestion.optionB,
              optionC: newQuestion.optionC,
              optionD: newQuestion.optionD,
              correctAnswer: newQuestion.correctAnswer,
              tag: { tagid: newQuestion.tag },
            }
          );
          console.log("Response:", response.data);
          // Assuming your server responds with the updated assessment including the new question
          setAssessments((prevAssessments) =>
            prevAssessments.map((assessment) =>
              assessment.assessmentid === selectedAssessment.assessmentid
                ? response.data
                : assessment
            )
          );
    
          setNewQuestion({
            assessment: { assessmentid: "" },
            questionText: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctAnswer: "",
            tag: { tagid: "" },
          });
    
          // Optionally, you may want to update the selectedAssessment to include the new question
          setSelectedAssessment(response.data);
    
          // Additional logic if needed
        } catch (error) {
          console.error("Error adding question:", error);
        }
      };
    
      const [questions, setQuestions] = useState([]);
    
      const handleViewQuestionsClick = async (assessment) => {
        try {
          const response = await axios.get(
            `http://localhost:8000/assessment-question/byAssessment/${assessment.assessmentid}`
          );
          console.log("Response Data:", response.data); // Log the response data
          setQuestions(response.data);
          setSelectedAssessment(assessment);
          setShowQuestionsForm(false);
          setShowQuestionsView(true);
        } catch (error) {
          console.error("Error loading questions:", error);
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
      <div className="assessment-main">

      <div className="assessment-management-container">
        <h1 className="page-title">Assessment Management</h1>
        {/* Assessments Table */}
        <table className="assessments-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Assessment Title</th>
              <th>Max Marks</th>
              <th>Pass Mark</th>
              <th>Max Attempts</th>
              <th>Add Questions</th>
              <th>View Questions</th>
              <th>Delete Assessment</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment, index) => (
              <tr key={index} className="assessment-row">
                <td>{assessment?.course?.coursename}</td>
                <td>{assessment.assessmentTitle}</td>
                <td>{assessment.maximumMarks}</td>
                <td>{assessment.passingMarks}</td>
                <td>{assessment.maxAttempts}</td>
                <td>
                  <button
                    className="add-questions-table-button"
                    onClick={() => handleAddQuestionsClick(assessment)}
                  >
                    Add Questions
                  </button>
                </td>
                <td>
                  <button
                    className="view-questions-table-button"
                    onClick={() => handleViewQuestionsClick(assessment)}
                  >
                    View Questions
                  </button>
                </td>
                <td>
                  <button
                    className="delete-assessment-table-button"
                    onClick={() => handleDeleteAssessmentClick(assessment)}
                  >
                    Delete Assessment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Buttons for New Assessment and Manage Tags */}
        <div className="action-buttons">
          <button
            onClick={handleNewAssessmentClick}
            className="new-assessment-button"
          >
            New Assessment
          </button>
          <button
            onClick={() => {
              handleManageTagsClick();
              setShowTags(!showTags);
            }}
            className="manage-tags-button"
          >
            Manage Tags
          </button>
        </div>
        {/* New Assessment Form */}
        {!selectedAssessment && showQuestionsForm && (
          <div
            className={`new-assessment-form ${
              showQuestionsForm ? "show" : "hide"
            }`}
          >
            <h2>{selectedAssessment ? "Edit Assessment" : "New Assessment"}</h2>
            <form onSubmit={handleNewAssessmentSubmit}>
              <label htmlFor="courseName">Course ID:</label>
              <input
                type="text"
                id="courseid"
                name="course"
                value={newAssessment.course.courseid}
                onChange={handleAssessmentChange}
              />

              <label htmlFor="assessmentTitle">Assessment Title:</label>
              <input
                type="text"
                id="assessmentTitle"
                name="assessmentTitle"
                value={newAssessment.assessmentTitle}
                onChange={handleAssessmentChange}
              />

              <label htmlFor="maxMarks">Max Marks:</label>
              <input
                type="text"
                id="maxMarks"
                name="maximumMarks"
                value={newAssessment.maximumMarks}
                onChange={handleAssessmentChange}
              />

              <label htmlFor="passMark">Pass Mark:</label>
              <input
                type="text"
                id="passMark"
                name="passingMarks"
                value={newAssessment.passingMarks}
                onChange={handleAssessmentChange}
              />

              <label htmlFor="maxAttempts">Max Attempts:</label>
              <input
                type="text"
                id="maxAttempts"
                name="maxAttempts"
                value={newAssessment.maxAttempts}
                onChange={handleAssessmentChange}
              />

              <button className="add-new-course-button" type="submit">
                Save Assessment
              </button>
            </form>
          </div>
        )}
        {/* Manage Tags Section */}
        {showTags && (
          <div className="manage-tags-section">
            <div className="tag-form">
              <label htmlFor="tagId">Tag ID:</label>
              <input
                type="text"
                id="tagId"
                name="tagid"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
              />
              <label htmlFor="tagName">Tag Name:</label>
              <input
                type="text"
                id="tagName"
                name="tagname"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
              <button
                type="button"
                className="add-new-tag-button"
                onClick={handleAddTag}
              >
                Add Tag
              </button>
            </div>
            <div className="tag-list">
              <h3>Tag List:</h3>
              <table className="tag-table">
                <thead>
                  <tr>
                    <th>Tag ID</th>
                    <th>Tag Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag) => (
                    <tr key={tag.tagid} className="tag-item">
                      <td>{tag.tagid}</td>
                      <td>{tag.tagname}</td>
                      <td>
                        <button
                          className="delete-assessment-table-button"
                          onClick={() => handleDeleteTag(tag.tagid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Questions Form */}
        {selectedAssessment && showQuestionsForm && (
          <div
            className={`assessment-questions-form ${
              showQuestionsForm ? "show" : "hide"
            }`}
          >
            <h2>{selectedAssessment ? "Edit Questions" : "Add Questions"}</h2>
            <form onSubmit={handleAddQuestionSubmit}>
              {/* Question Text */}
              <label htmlFor="assessmentId">Assessment ID</label>
              <input
                id="AssessmentID"
                name="assessment"
                value={newQuestion.assessment.assessmentid}
                onChange={handleNewQuestionChange}
              ></input>
              <label htmlFor="questionText">Question Text:</label>
              <input
                id="questionText"
                name="questionText"
                value={newQuestion.questionText}
                onChange={handleNewQuestionChange}
              ></input>

              <label htmlFor="optionA">Option A:</label>
              <input
                type="text"
                id="optionA"
                name="optionA"
                value={newQuestion.optionA}
                onChange={handleNewQuestionChange}
              />
              <label htmlFor="optionB">Option B:</label>
              <input
                type="text"
                id="optionB"
                name="optionB"
                value={newQuestion.optionB}
                onChange={handleNewQuestionChange}
              />

              <label htmlFor="optionC">Option C:</label>
              <input
                type="text"
                id="optionC"
                name="optionC"
                value={newQuestion.optionC}
                onChange={handleNewQuestionChange}
              />
              <label htmlFor="optionD">Option D:</label>
              <input
                type="text"
                id="optionD"
                name="optionD"
                value={newQuestion.optionD}
                onChange={handleNewQuestionChange}
              />

              {/* Correct Answer */}
              <label htmlFor="correctAnswer">Correct Answer:</label>
              <input
                type="text"
                id="correctAnswer"
                name="correctAnswer"
                value={newQuestion.correctAnswer}
                onChange={handleNewQuestionChange}
              />

              {/* Question Tag */}
              <label htmlFor="questionTag">Question Tag:</label>
              <input
                type="text"
                id="questionTag"
                name="tag"
                value={newQuestion.tag.tagid}
                onChange={handleNewQuestionChange}
              />

              {/* Add Question Button */}
              <button className="add-new-course-button" type="submit">
                Add Question
              </button>
            </form>
          </div>
        )}
        {/* Questions View */}

        {selectedAssessment && showQuestionsView && (
          <div
            className={`questions-view ${showQuestionsView ? "show" : "hide"}`}
          >
            <h2>View Questions</h2>
            <div className="questions-list">
              <h3>Assessment Name: {selectedAssessment.assessmentTitle}</h3>
              {questions.map((question, index) => (
                <div key={index} className="question-view">
                  <h3>Question {index + 1}</h3>
                  <p>{question.questionText}</p>
                  <p>Options:</p>
                  <p>A: {question.optionA}</p>
                  <p>B: {question.optionB}</p>
                  <p>C: {question.optionC}</p>
                  <p>D: {question.optionD}</p>
                  <p>Correct Answer: {question.correctAnswer}</p>
                  <p>Tag Name: {question.tag.tagname}</p>
                  {/* Add more fields as needed */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      
        
     
        </div>
      
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default AdminAssessment;
