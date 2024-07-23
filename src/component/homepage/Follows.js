import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';

function Follows() {
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
     
        <section className="follows">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>" Follow Up Boss is a big reason why we <br/>have been able to souble our sales every <br/>year year since 2015 ”</h3>
                        <div className="usr">
                                <span><img src="asset/images/user.jpg" alt="user" /></span>
                                <h5>Preston Guyton</h5>
                                <p>Founder, <a href="#">EZHomesearch.com</a></p>
                            </div>
                        </div>

                    <div className="col-sm-6">
                        <div className="usimg">
                                    <img src="asset/images/follow_user.jpg" alt="img" />
                                </div>
                            </div>
                    </div>
                </div>
        </section>


        {/* <Forgotpassword /> */}
    </>)



}


export default Follows;


