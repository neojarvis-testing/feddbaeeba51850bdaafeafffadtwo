import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEmployee.css";
import axios from "axios";
import { apiUrl } from "../app.config";

const UserEmployee = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [employeeToBeDelete, setEmployeeToBeDelete] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("editId", "");
    console.log("came in grid");

    console.log(localStorage.getItem("userId"));
    fetchEmployees();
  }, [searchTerm, sortValue]);

  async function fetchEmployees() {
    try {
      const token = localStorage.getItem("token");


    
      const employeeResponse = await axios.post(
        apiUrl+"/employee/getEmployeeByUserId",
        {
          searchValue: searchTerm,
          sortValue: sortValue,
          userId: JSON.parse(localStorage.getItem("userData")).userId,
        },
        { headers: { Authorization: `${token}` } }
      );
      console.log("employeeResponse", employeeResponse);

      if (employeeResponse.status == 200) {
        setEmployees(employeeResponse.data);
      }
    } catch (error) {
        console.log(error);
      navigate("/error");
    }
  }

  const handleDeleteClick = (id) => {
    setEmployeeToBeDelete(id);
    setShowDeletePopup(true);
  };

  async function deleteEmployee() {
    const employeeId = employeeToBeDelete;
    try {
      const token = localStorage.getItem("token");
      let deleteResponse = await axios.delete(
        apiUrl+`/employee/deleteEmployee/${employeeId}`,
        { headers: { Authorization: `${token}` } }
      );
      if (deleteResponse.status === 200) {
        fetchEmployees();
      }
      setShowDeletePopup(false);
    } catch(error) {
      navigate("/error");
    }
  }

return (
    <div>
        <div className="button-container">
        <button
                className="styledbutton"
                onClick={() => {
                    navigate("/login");
                }}
            >
                Logout
            </button>
            <button
                className="styledbutton"
                onClick={() => navigate("/createemployee")}
            >
                Add new Employee
            </button>
        </div>
        <div className={`EmployeesList ${showDeletePopup ? "popup-open" : ""}`}>
            
            <h1>Our Employees</h1>
            <input
                className="searchBar"
                type="text"
                placeholder="Search by employee name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Email ID</th>
                        <th>Date of Birth</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Education</th>
                        <th>Experience
                            <div>
                                <button
                                    className="sortButtons"
                                    onClick={() => setSortValue(1)}
                                >
                                    ⬆️
                                </button>
                                <button
                                    className="sortButtons"
                                    onClick={() => setSortValue(-1)}
                                >
                                    ⬇️
                                </button>
                            </div>
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.mobileNumber}</td>
                                <td>{employee.mailId}</td>
                                <td>{employee.dateOfBirth}</td>
                                <td>{employee.age}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.education}</td>
                                <td>{employee.experience}</td>
                                <td>
                                    <button
                                        style={{ backgroundColor: "red", marginRight: "10px"}}
                                        onClick={() => {
                                            handleDeleteClick(employee._id);
                                        }}
                                    >
                                        Delete
                                    </button>

                                    <button style={{ marginLeft:"10px"} }
                                        onClick={() => {
                                            localStorage.setItem("editId", employee._id);
                                            navigate("/createemployee");
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="norecord"
                                colSpan={10}
                                style={{ textAlign: "center", verticalAlign: "middle" }}
                            >
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {showDeletePopup && (
            <div className="delete-popup">
                <p>Are you sure you want to delete?</p>
                <button onClick={deleteEmployee}>Yes, Delete</button>
                <button
                    onClick={() => {
                        setShowDeletePopup(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        )}
    </div>
);

};

export default UserEmployee;