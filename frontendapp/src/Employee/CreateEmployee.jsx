import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CreateEmployee.css";
import axios from "axios";
import { apiUrl } from "../app.config";

const CreateEmployee = () => {
    const navigate = useNavigate();

    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        mailId: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        education: '',
        experience: '',
      });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        mailId: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        education: '',
        experience: '',
    });

    useEffect(() => {
        const editId = localStorage.getItem("editId");
        if(editId !== '') {
            editfun();
        }
    }, []);

    async function editfun() {
        const token = localStorage.getItem("token");
        try {
            let response = await axios.get(
                `${apiUrl}/employee/getemployee/${localStorage.getItem('editId')}`,
                {
                    headers: {
                        Authorization: `${token}`,
                    }}
            );
            console.log("response",response.data);
            setEmployeeData(response.data);
        }catch (error) {
            navigate("/error");
        }
    }

    const handleInputChange = (e) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
      };

    const handleCreateEmployee = async (e) => {
        const validationErrors = {};

        if (!employeeData.firstName) {
            validationErrors.firstName = "First Name is required";
        }
        if (!employeeData.lastName) {
            validationErrors.lastName = "Last Name is required";
        }
        if (!employeeData.mobileNumber) {
            validationErrors.mobileNumber = "Mobile Number is required";
        }
        if (!employeeData.mailId) {
            validationErrors.mailId = "Mail Id is required";
        }
        if (!employeeData.dateOfBirth) {
            validationErrors.dateOfBirth = "Date of Birth is required";
        }
        if (!employeeData.age) {
            validationErrors.age = "Age is required";
        }
        if (!employeeData.gender) {
            validationErrors.gender = "Gender is required";
        }
        if (!employeeData.education) {
            validationErrors.education = "Education is required";
        }
        if (!employeeData.experience) {
            validationErrors.experience = "Experience is required";
        }
        console.log("validationErrors",validationErrors);

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const editId = localStorage.getItem("editId");

            if(editId === ''){
                employeeData.userId = JSON.parse(localStorage.getItem("userData")).userId;
                console.log("employeeData",employeeData);

                let createEmployeeResponse = await axios.post(
                    apiUrl+"/employee/registeremployee",
                    employeeData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${token}`
                        },
                    }
                );
                console.log("createEmployeeResponse",createEmployeeResponse.data)
                if(createEmployeeResponse.status == 200){
                    navigate("/useremployee");
                }
            } else{
                let updateEmployeeResponse = await axios.put(
                    `${apiUrl}/employee/editemployee/${localStorage.getItem('editId')}`,
                    employeeData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${token}`
                        },
                    }
                );
                if(updateEmployeeResponse.status == 200){
                    navigate("/useremployee");
                }
            }
        } catch (error) {
            console.log(error);
            // navigate("/error");
        }
    };

 return (
    <div>
{/* margin: "10px",margin-left: "52%", padding: "17px" */}
        <button style={{ margin:"10px", marginLeft:"52%",padding:"17px", backgroundColor:"rgb(89, 111, 134)"}} onClick={() => navigate(-1)}>Back</button>
    <div className="create-employee-container">

    <h2>Create New Employee</h2>

    <div className="form-group">
      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        value={employeeData.firstName}
        onChange={handleInputChange}
      />
      <span className="error-message">{errors.firstName}</span>
    </div>

    <div className="form-group">
        <label>Last Name:</label>
        <input
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.lastName}</span>
    </div>

    <div className="form-group">
        <label>Mobile Number:</label>
        <input
            type="text"
            name="mobileNumber"
            value={employeeData.mobileNumber}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.mobileNumber}</span>
    </div>

    <div className="form-group">
        <label>Mail Id:</label>
        <input
            type="text"
            name="mailId"
            value={employeeData.mailId}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.mailId}</span>
    </div>

    <div className="form-group">
        <label>Date of Birth:</label>
        <input
            type="date"
            name="dateOfBirth"
            value={employeeData.dateOfBirth}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.dateOfBirth}</span>
    </div>

    <div className="form-group">
        <label>Age:</label>
        <input
            type="number"
            name="age"
            value={employeeData.age}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.age}</span>
    </div>

    <div className="form-group">
        <label>Gender:</label>
        <select 
        name="gender"
        value={employeeData.gender}
        onChange={handleInputChange}
    >
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
    </select>
        <span className="error-message">{errors.gender}</span>

    </div>

    <div className="form-group">
        <label>Education:</label>
        <input
            type="text"
            name="education"
            value={employeeData.education}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.education}</span>
    </div>

    <div className="form-group">
        <label>Experience:</label>
        <input
            type="number"
            name="experience"
            value={employeeData.experience}
            onChange={handleInputChange}
        />
        <span className="error-message">{errors.experience}</span>
    </div>
    <button className="submit-button" type="button" style={{margin:"auto"}} onClick={handleCreateEmployee}>
        {localStorage.getItem("editId") === '' ? "Create Employee" : "Update Employee"}
    </button>

    </div>
    </div>


 );


};

export default CreateEmployee;