import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';

function Sound() {
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
      
        <section className="sounds">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <h3>If any of this sounds<br/>Familiar, you need<br/>Follow UP Boss</h3>
                        </div>

                            <div className="col-sm-6">
                                <ul>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                    <li>My agent dont know how many leads came in this monts</li>
                                </ul>
                            </div>

                            <div className="col-sm-3">
                                <h5>And my agents have to<br/>sign in to them all</h5>
                            </div>
                    </div>
                </div>
        </section>

        {/* <Forgotpassword /> */}
    </>)



}


export default Sound;


