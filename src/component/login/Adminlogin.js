import { Link } from 'react-router-dom';
// import Forgotpasswordlogin from '../forgotpassword/Forgotpasswordlogin';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
    })

    var md5 = require('md5');

    

   

    const [viewpassword, setviewpassword] = useState(false);

    const [error, setError] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))

        

        
    }

    const sendDetailsToServer = async () => {
        setError([]);
        const hashedPassword = md5(state.password)
        let formdata = new FormData();
        formdata.append('email', state.email);
        formdata.append('password', hashedPassword);
        // formdata.append('hashpassword')
        
        axios.post("https://admin.myhomekeeper.co/api/homekeeperadminlogin", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    localStorage.setItem('token-info',response.data.data.id);
                    localStorage.setItem('token-type', response.data.data.usertype);
                    console.log("getbysession",localStorage.getItem('token-info'));
                    navigate('/admin/homeinspection/homeinspection')

                } else {
                    setError(response.data.errors);
                    console.log('under error', error);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
    }

    const logout = () => {
        localStorage.removeItem('token-info');
        navigate('/adminlogin')
    };

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
        setError(errors);
    }

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setviewpassword(!viewpassword);
    };

    return (<>
        <link rel="stylesheet" href="/../adminasset/css/style.css" />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" relation="stylesheet" type="text/css" />
        
        


        
        <section className="login adminlogin text-center" onSubmit={handleSubmitClick} style={{ backgroundImage: 'url(./adminasset/images/loginbg.png)'}}>
            <div className="container">
                <div className="in_login">
                    <img src="adminasset/images/logo.png" alt="logo" />
                    <form className="form-signin text-start mt-4">
                        {error.length > 0 ? <div className='mt-3'>
                            
                                {error.map((user, i) => (
                                    <span className="errormessageforlogin">{user}</span>
                                ))}
                            
                        </div> : ""}
                        <h1>Log In</h1>
                        <h6>Enter login credentials to acces admin dashboard.</h6>
                        <div className="form-group">
                            <label>Email Address</label>
                            <span className="password d-block">
                                <i className="fa-regular fa-envelope"></i>
                                <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Enter Email id" value={state.email} onChange={handleChange} />
                            </span>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <span className="password d-block">
                                <input type={viewpassword ? "text" : "password"} id="inputPassword" name="password" className="form-control" placeholder="Enter Password" value={state.password} onChange={handleChange} />
                                <i className={viewpassword ? "far fa-eye" : "fa fa-eye-slash ic"} aria-hidden="true" onClick={togglePassword}></i>
                            </span>
                        </div>
                        <p>
                            <Link className="forg" to="/adminforgotpassword">Forgot Password ?</Link>
                            {/* <a className="forg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Forgot Password ?</a> */}
                        </p>
                        <button className="btn" type="submit">Submit <i className="fa-solid fa-arrow-right"></i></button>
                    </form>
                </div>
            </div>
        </section>
        {/* <Forgotpasswordlogin /> */}
    </>)



}


export default AdminLogin;


