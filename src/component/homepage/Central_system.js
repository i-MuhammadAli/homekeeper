import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';

function Central_system() {
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
  



        <section className="central_system">
            <div className="container">
                <div className="heading text-center">
                    <h6>One Central System</h6>
                    <h1>Follow Up Boss is simple and complete, with<br/>everything in one place</h1>
                    <p>Your agents feel comfortable and confident and see their performance improve<br/>You get control, better performance , and more sales</p>
                </div>
                <ul>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>
                    <li>Automatically pull in your leads from 200+ sources</li>

                </ul>

                <div className="footerbtn text-center">
               
                    <Link to="/tryforme" className="freebt">Start My Free Trial</Link>
                <a href="#">See How It Work <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                </div>
        </section>
        {/* <Forgotpassword /> */}
    </>)



}


export default Central_system;


