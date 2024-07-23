import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';

function Blogs() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const sendDetailsToServer = async () => {
        // setError([]);
        let formdata = new FormData();
        formdata.append('email', state.email);
        formdata.append('password', state.password);
        axios.post("https://connectbiz.in/api/login", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    console.log("asdfsadfsdaf", response.data.data.usertype);
                    navigate('/Thankyou', { state: response.data.data.usertype })
                } 
            })
            // .catch(function (error) {
            //     console.log('error', error);
            // });
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        let errors = [];
        const isEmpty = Object.values(state).every(x => x === null || x === '');
        if (isEmpty == false) {
            sendDetailsToServer()
            // if (state.password === state.confirmPassword) {
            //     
            // } else {
            //     errors.push('password mismatch');
            // }
        }
        // setError(errors);
    }

    // const togglePassword=()=>
    // {
    //     alert("tasfa");
    //     setviewpassword(true);
    // }

    return (<>
        



        <section className="three_box">
            <div className="container">
            <div className="heading ">
            <h1>Our Blogs <a href="#">View More <i className="fa-solid fa-arrow-right"></i></a></h1>
            </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="set">
                            <img className="w-100" src="asset/images/video_banner.jpg" alt="banner" />
                            <div className="inset">
                                <h4>Gary Ashton and <br/>Scott hull</h4>
                                <h6>#1 Remax team in the USA/World</h6>
                                <p>“In the past, i would say to new agents that you should be able to get a deal within 6 months. Now with Follow Up Boss, most are getting somthing under contract within 6 weeks!”</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="set">
                            <img className="w-100" src="asset/images/video_banner.jpg" alt="banner" />
                            <div className="inset">
                                <h4>Gary Ashton and <br/>Scott hull</h4>
                                <h6>#1 Remax team in the USA/World</h6>
                                <p>“In the past, i would say to new agents that you should be able to get a deal within 6 months. Now with Follow Up Boss, most are getting somthing under contract within 6 weeks!”</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="set">
                            <img className="w-100" src="asset/images/video_banner.jpg" alt="banner" />
                            <div className="inset">
                                <h4>Gary Ashton and <br/>Scott hull</h4>
                                <h6>#1 Remax team in the USA/World</h6>
                                <p>“In the past, i would say to new agents that you should be able to get a deal within 6 months. Now with Follow Up Boss, most are getting somthing under contract within 6 weeks!”</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <Forgotpassword /> */}
    </>)



}


export default Blogs;


