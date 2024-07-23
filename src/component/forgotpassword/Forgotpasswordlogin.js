import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

function Forgotpasswordlogin() {
    const [state, setState] = useState({
        email: "",
    })

    const [message, setmessage] = useState('')

    const [error, setError] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        myFunction();
    });

    const myFunction = () => {
        setTimeout(alertFunc, 2000);
    }

    const alertFunc = () => {
        setmessage('');
    }

    const sendDetailsToServer = async () => {
        setError([]);
        let formdata = new FormData();
        formdata.append('email', state.email);
        formdata.append("type","admin")
        // formdata.append('password', state.password);
        axios.post("https://admin.myhomekeeper.co/api/homekeeperforgotpassword", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    const message1 = response.data.message;
                    setmessage(message1);
                } else {
                    setError(response.data.errors);
                    console.log('under error', error);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
    }


    const handleSubmitClick = (e) => {
        e.preventDefault();
        let errors = [];
        const isEmpty = Object.values(state).every(x => x === null || x === '');
        if (isEmpty == false) {
            sendDetailsToServer()

        }
        setError(errors);
    }
    return (<>
        <link rel="stylesheet" href="/../adminasset/css/style.css" />
        <section className="login text-center" style={{ backgroundImage: 'url(./asset/images/loginbg.png)' }}>
            <div className="container">
                

                <div className="in_login">
                    <img src="asset/images/logo.png" alt="logo" />
                    <form className="form-signin text-start mt-4" onSubmit={handleSubmitClick}>

                     
                        
                        <Link className="go" to="/adminlogin"><i className="fa-solid fa-arrow-left"></i> Go back</Link>
                         
                        <h1>Forgot Password ?</h1>
                        <h6>Enter login credentials to acces admin dashboard.</h6>
                        <div className="form-group mb-4">
                            <label>Email Address</label>
                            <span className="password d-block">
                                <i className="fa-regular fa-envelope"></i>
                                <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Enter Email id" value={state.email} onChange={handleChange} />
                            </span>
                            
                            
                        </div>
                        
                          {error.length > 0 ? <div className='mt-3'>
                            
                                {error.map((user, i) => (
                                    <span className="errormessageforlogin"><b>{user}</b></span>
                                ))}
                            
                        </div> : ""}
                        {message? <h3 className='mb-0'>{message}</h3>: ""}
                        <button className="btn" type="submit">Submit <i className="fa-solid fa-arrow-right"></i></button>
                    </form>
                </div>
            </div>
        </section>
    </>)
}
export default Forgotpasswordlogin;


