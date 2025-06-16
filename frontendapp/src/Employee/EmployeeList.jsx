// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiUrl } from '../app.config';
// import axios from 'axios';

// const EmployeeList = () => {

//     const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortValue, setSortValue] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEmployees();
//   }, [searchTerm, sortValue]);

//     async function fetchEmployees() {
//         try {
//             let userResponse = await axios.get(apiUrl+'/user/getAllUsers',
//                 { headers: { Authorization: `${localStorage.getItem("token")}` } }
//             )
//             userResponse = await userResponse.data.users
//             console.log("userResponse",userResponse);

//             let employeeResponse = await axios.post(
//                 apiUrl+'/employee/getallemployee',
//             {
//                 searchValue: searchTerm,
//                 sortValue: sortValue,
//             },
//             {
//                 headers: { Authorization: `${localStorage.getItem("token")}` } }
//             );
//             employeeResponse = employeeResponse.data.employees
//             // console.log("employeeResponse",employeeResponse.data.employees);
        
//             employeeResponse.map((employee) => {
//                 userResponse.map((user) => {
//                     if (employee.userId == user._id) {
//                         employee.firstName = user.firstName;
//                         employee.lastName = user.lastName;
//                         employee.email = user.email;
//                     }
//                 })
//             })
//             console.log(employeeResponse);
//             setEmployees(employeeResponse);

//         } catch (error) {
//             console.log(error);
//         // navigate('/error');
//         }
//     }

//     const openPopup = (employee) => {
//         setSelectedEmployee(employee);
//         setShowPopup(true);
//       };
    
//       const closePopup = () => {
//         setSelectedEmployee(null);
//         setShowPopup(false);
//       };

//       return (
//         <div className={`EmployeeLists
//         }`}>
//           <button
//             className="styledbutton"
//             onClick={() => {
//               navigate("/login");
//             }}
//           >
//             Logout
//           </button>
//           <h1>Employee List</h1>
//            {/* Search functionality */}
//            <input
//                 className='searchBar'
//                 type="text"
//                 placeholder="Search by doctor name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
      
//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Role</th>
//                 <th>Experience<div>
                       
//                 <button
//                     className="sortButtons"
//                     onClick={() => setSortValue(1)}
//                 >
//                 ⬆️
//                 </button>
//                 <button
//                     className="sortButtons"
//                     onClick={() => setSortValue(-1)}
//                 >
//                 ⬇️
//                 </button>
//                 </div></th>
                
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.length
//                 ? employees.map((employee) => (
//                     <tr key={employee._id}>
//                       <td>{employee.firstName}</td>
//                       <td>{employee.lastName}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.phone}</td>
//                       <td>{employee.role}</td>
//                       <td>{employee.experience}</td>
//                       <td>
//                         <button onClick={() => openPopup(employee)}>View Info</button>
//                       </td>
//                     </tr>
//                   ))
//                 : (
//                     <tr>
//                       <td
//                         className="norecord"
//                         colSpan={7}
//                         style={{ textAlign: "center", verticalAlign: "middle" }}
//                       >
//                         No records found
//                       </td>
//                     </tr>
//                   )}
//             </tbody>
//           </table>
      
//           {showPopup && selectedEmployee && (
//             <div className="popup">
//               <div className="popup-content">
//                 <span className="close" onClick={closePopup}>&times;</span>
//                 <h2>{selectedEmployee.firstName} {selectedEmployee.lastName} Details</h2>
//                 <p>Email: {selectedEmployee.email}</p>
//                 <p>Phone: {selectedEmployee.phone}</p>
//                 <p>Role: {selectedEmployee.role}</p>
//                 <p>Experience: {selectedEmployee.experience} years</p>
//               </div>
//             </div>
//           )}
//         </div>
//       );
// }


// export default EmployeeList;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { apiUrl } from '../app.config';

const EmployeeList= () => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortValue, setSortValue] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(localStorage.getItem('token'));
       fun()
    }, [searchTerm, sortValue]);


async function fun() {
 try{
    let userResponse = await axios.get(apiUrl+'/user/getallusers', {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      

    // console.log(userResponse);
    userResponse = await userResponse.data.users

    console.log("userResponse",userResponse);

    let employeeResponse = await axios.post(
       apiUrl+"/employee/getallemployee",
        {
            searchValue: searchTerm,
            sortValue: sortValue,
        }
        ,
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );
    //   console.log("employeeResponse", employeeResponse);
      employeeResponse=employeeResponse.data.data
    //   console.log("employeeResponseone", employeeResponse);  

      employeeResponse.map((employee) => {
        userResponse.map((user) => {
            if (employee.userId === user._id) {
                employee.userName = user.firstName + " " + user.lastName
                employee.userEmail = user.email
                employee.userPhone = user.mobileNumber
            }
        })
    })
    console.log("employeeResponse", employeeResponse);
    setEmployees(employeeResponse)
 }catch(error){
    console.log("error os ",error.message);
// navigate("/error")

}
    }

    const openPopup = (employee) => {
        setSelectedEmployee(employee);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedEmployee(null);
        setShowPopup(false);
    };


    return (
        <div className={`EmployeeLists
         }`}>
            <button className='styledbutton' onClick={()=>{
                navigate("/login")
            }}>Logout</button>
            <h1>Available Employees</h1>
            {/* Search functionality */}
            <input
                className='searchBar'
                type="text"
                placeholder="Search by employee name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table layout */}
            <table>
                <thead>
                    <tr>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>mobileNumber</th>
                    <th>mailID</th>
                    <th>dateOfBirth</th>
                    <th>age</th>
                    <th>education</th>
                    <th>gender</th>
                    <th>
                    experience
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
                    {employees.length?employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.mobileNumber}</td>
                            <td>{employee.mailId}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.age}</td>
                            <td>{employee.education}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.experience}</td>
                            <td>
                                <button onClick={() => openPopup(employee)}>View Info</button>
                            </td>
                        </tr>
                    )): (
                        <tr>
                          <td
                            className="norecord"
                            colSpan={4}
                            style={{ textAlign: "center", verticalAlign: "middle" }}
                          >
                            No records found
                          </td>
                        </tr>
                      )}
                </tbody>
            </table>

            {/* Popup to display additional information */}
            {showPopup && selectedEmployee && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        {/* <img src={doctorImage} alt="Doctor" style={{width: '100px', height: '100px'}} /> */}
                        <h2>{selectedEmployee.employee} Details</h2>
                        <p>Employee Name: {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
                        <p>Experience: {selectedEmployee.experience} years</p>
                        <p>MobileNumber: {selectedEmployee.mobileNumber} </p>
                        <p>Education: {selectedEmployee.education} </p>
                        <p>Gender: {selectedEmployee.gender} </p>
                        <p>Posted By: {selectedEmployee.userName}</p>
                        <p>Contact Email: {selectedEmployee.userEmail}</p>
                        <p>Contact Phone: {selectedEmployee.userPhone}</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;

