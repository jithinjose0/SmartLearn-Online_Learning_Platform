
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';


const StudentEnrolledList = () => {
    const { admin } = useAuth();
    const [Enrolls, setEnrolls] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch('http://localhost:8080/instructors/enrolled/by_admin_id');
                if (response.ok) {
                    const data = await response.json();
                    // setCourses(data);
                    // Filter courses where the admin's ID matches the course's admin ID
                    const filteredEnrolls = data.filter((enroll: any) => enroll.courseId.Admin_id === admin?.userData?._id);
                    console.log("Entrolled students list:", filteredEnrolls);
                    setEnrolls(filteredEnrolls);
                } else {
                    console.error('Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        }

        fetchCourses();
    }, [admin?.userData?._id]);




    return (

        <>
            <div className="container">
                {/* <h4>Enrolled list students</h4> */}
                {/* {Enrolls.map((enrolls: any) => (
                        <p>Course Title: {enrolls.courseId.title} User : {enrolls.userId.username}</p>
                    
                        ))} */}
                <br />
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Students Enrolled list</h6>
                    <br />
                </div>

                <table className="table">
                    <thead className='table-secondary'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Student Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Enrolls.map((enrolls: any, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{enrolls.courseId.title}</td>
                                <td>{enrolls.userId.username}</td>
                                {/* <td>@mdo</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </>

    );
}

export default StudentEnrolledList;