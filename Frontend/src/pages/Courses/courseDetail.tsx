

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/detailpage.css';
const baseImageUrl = 'http://localhost:8080/instructors/api/getImage/';
const CourseDetail: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    // Get the course ID from the URL params
    const { courseId } = useParams<{ courseId: string }>();

    // State to store the course details
    const [courseDetails, setCourseDetails] = useState<any>({});
    const [loading, setLoading] = useState(true);
    // const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        // Fetch course details using the courseId
        async function fetchCourseDetails() {
            try {
                const response = await fetch(`http://localhost:8080/instructors/courses/${courseId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourseDetails(data);
                } else {
                    console.error('Failed to fetch course details from the API');
                }
            } catch (error) {
                console.error('Error while fetching course details:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourseDetails();
    }, [courseId]);
    // Function to check if courseId exists in the API
    const isCourseEnrolled = async () => {
        try {
            const userId = user.userData._id;
            const response = await fetch(`http://localhost:8080/instructors/enrollments/${userId}/${courseId}`);
            const responseData = await response.json();
            if (responseData.enrolled === true) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error while checking user enrollment:', error);
            return false;
        }
    };
    const handleEnroll = async () => {
        try {
            const courseIdExists = await isCourseEnrolled();
            console.log(courseIdExists);
            if (courseIdExists == true) {
                alert('Course already enrolled');
                // Handle accordingly, maybe show a message to the user
            } else {

                // Replace 'userId' with the actual user ID you want to use for enrollment.
                const userId = user.userData._id; // Replace with the actual user ID.

                const response = await fetch('http://localhost:8080/instructors/enrollments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, courseId }),
                });

                if (response.ok) {
                    console.log("sunccusfully enrolled");
                    navigate('/enrolled_list')
                    // setEnrolled(true);
                } else {
                    // setEnrolled(false);
                    console.error('Failed to enroll in the course');
                }
            }
        } catch (error) {
            console.error('Error while enrolling in the course:', error);
        }

    };
    return (
        // <div>
        //     <h1>Course Detail</h1>
        //     {loading ? (
        //         <p>Loading course details...</p>
        //     ) : (
        //         <div>
        //             <p>Course ID: {courseId}</p>
        //             <p>Course Title: {courseDetails.title}</p>
        //             <p>Course Price: ₹{courseDetails.price}.00</p>
        //             <button type='submit' onClick={handleEnroll}>Enroll Now</button>
        //         </div>
        //     )}
        // </div>
        <div className="container">
            {loading ? (
                <p>Loading course details...</p>
            ) : (
                <div className="product-content product-wrap clearfix product-deatil">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <div className="product-image">
                                <div id="myCarousel-2" className="carousel slide">
                                    <div className="item active">
                                        <img src={baseImageUrl + courseDetails.image} className="img-responsive" alt="" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                            <h2 className="name">
                                {courseDetails.title}
                                <h5>by <u>{courseDetails.Admin_id.username}</u></h5>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-primary"></i>
                                <i className="fa fa-star fa-2x text-muted"></i>
                                {/* <span className="fa fa-2x"><h5>(109) Votes</h5></span> */}
                                {/* <a href="javascript:void(0);">109 customer reviews</a> */}
                            </h2>
                            <div className="certified">
                                {courseDetails.description}
                            </div>
                            <hr />
                            <h3 className="price-container">
                                ₹{courseDetails.price}.00
                                {/* <small>*includes tax</small> */}
                            </h3>
                            

                            <hr />
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <button type='submit' onClick={handleEnroll} className="btn btn-success btn-lg">Entroll Now</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;

