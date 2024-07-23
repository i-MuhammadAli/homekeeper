import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useParams } from 'react-router-dom';

function Mailsent() {

    const queryString = window.location.href;
    const myarray = queryString.split("=");
    const dynemail=myarray[1];
    // const [state, setState] = useState({
    //     email: "",
    // })


    // const [message, setmessage] = useState('')

    // const [error, setError] = useState([]);
    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setState(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    // }
    // useEffect(() => {
    //     myFunction();
    // });

    // const myFunction = () => {
    //     setTimeout(alertFunc, 2000);
    // }

    // const alertFunc = () => {
    //     setmessage('');
    // }

    // const sendDetailsToServer = async () => {
    //     setError([]);
    //     let formdata = new FormData();
    //     formdata.append('email', state.email);
    //     formdata.append("type", "notadmin")
    //     // formdata.append('password', state.password);
    //     axios.post("https://admin.myhomekeeper.co/api/homekeeperforgotpassword", formdata)
    //         .then(function (response) {
    //             console.log('response', response.data);
    //             if (response.data.status == 'success') {
    //                 const message1 = response.data.message;
    //                 setmessage(message1);
    //                 // navigate()
    //                 // console.log("thisresponse",response.data.message);

    //             } else {
    //                 setError(response.data.errors);
    //                 console.log('under error', error);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log('error', error);
    //         });
    // }


    // const handleSubmitClick = (e) => {
    //     e.preventDefault();
    //     let errors = [];
    //     const isEmpty = Object.values(state).every(x => x === null || x === '');
    //     if (isEmpty == false) {
    //         sendDetailsToServer()

    //     }
    //     setError(errors);
    // }



    return (<>
        <Header />
        <section className="verify text-center">
            <div className="container">
                <form>
                    <img src="asset/images/mail.png" alt="img" />
                    <h1>Mail Sent</h1>
                    <p>Change password link has been sent to <br />{dynemail}</p>
                    <a className="btn" target="_blank" href="https://mail.google.com">Go to mail</a>
                </form>
            </div>
    </section >
        <Footer />
    </>)



}


export default Mailsent;


