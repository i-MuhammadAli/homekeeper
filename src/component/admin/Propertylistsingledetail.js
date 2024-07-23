import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

function Propertylistsingledetail() {
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
        // setError([]);
        // let formdata = new FormData();
        // formdata.append('email', state.email);
        // // formdata.append('password', state.password);
        // axios.post("https://admin.myhomekeeper.co/api/homekeeperforgotpassword", formdata)
        //     .then(function (response) {
        //         console.log('response', response.data);
        //         if (response.data.status == 'success') {
        //             const message1 = response.data.message;
        //             setmessage(message1);
        //             // console.log("thisresponse",response.data.message);

        //         } else {
        //             setError(response.data.errors);
        //             console.log('under error', error);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log('error', error);
        //     });
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
        <Header />
        <section className="dashboard">
            <div className="container-fluid">
               <Sidebar />

                <div className="inspection_reques">
                    <h2>Amy Jakson & Ben Jackson</h2>

                    <div className="property_list">
                        <h4><b>Property : </b>3452 George SL, Mclean, VA 22101</h4>
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>Owner Information</h5>
                                        <p>Rajpal Yadav</p>
                                        <p>05 Sept 1971</p>
                                        <p><i className="fa-regular fa-envelope"></i> rajpalyadav@gmail.com</p>
                                        <p><i className="fa-solid fa-phone-volume"></i> +19584123340</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <h5>Owner Information</h5>
                                        <p>Rajpal Yadav</p>
                                        <p>05 Sept 1971</p>
                                        <p><i className="fa-regular fa-envelope"></i> rajpalyadav@gmail.com</p>
                                        <p><i className="fa-solid fa-phone-volume"></i> +19584123340</p>
                                    </div>

                                    <div className="col-sm-12">
                                        <ul>
                                            <li><b>Address : </b>3452 George SL, Mcelan, VA 22101 <a href="#"><i className="fa-solid fa-pencil"></i></a></li>
                                            <li><b>Purchased : </b>12/31/2021 <a href="#"><i className="fa-solid fa-pencil"></i></a></li>
                                            <li><b>Sale Price : </b>$850,00 <a href="#"><i className="fa-solid fa-pencil"></i></a></li>
                                        </ul>
                                        <h6>Home Value</h6>
                                        <p className="stp">$850,000 08-12-19  <a href="#"><i className="fa-solid fa-pencil"></i> Edit</a></p>
                                        <p className="stp">$850,000 08-12-19  <a href="#"><i className="fa-solid fa-pencil"></i> Edit</a></p>
                                        <p className="stp">$850,000 08-12-19  <a href="#"><i className="fa-solid fa-pencil"></i> Edit</a></p>
                                        <p className="stp">$850,000 08-12-19  <a href="#"><i className="fa-solid fa-pencil"></i> Edit</a></p>
                                        <a className="add_new" href="#">Add new</a>

                                        <ul className="mt-3">
                                            <li><b>Rental Value: </b>$24,50 1205/2021 <a href="#"><i className="fa-solid fa-pencil"></i></a></li>
                                            <li><b>Airbnb Value: </b><a href="#"><i className="fa-regular fa-square-plus"></i></a></li>
                                            <li><b>loan Amount: </b>80% $680,000 At 2.9% APR PMI $345 <a href="#"><i className="fa-solid fa-pencil"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="property_list">
                        <h4><b>Alerts Settings</b></h4>
                        <table className="table mt-4">
                            <thead>
                                <tr>
                                    <th>Mail</th>
                                    <th>Test</th>
                                  
                                    <th style={{ color:'#3d9ddd'}}>All alert Settings lorem ipsum</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>

                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>

                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>

                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" name=""/></td>
                                    <td><input type="checkbox" name=""/></td>
                                    <td>Apply all for text / email</td>
                                </tr>

                            </tbody>

                        </table>
                    </div>



                    <div className="property_list request_history">
                        <h4><b>Request and History</b></h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="request_history_set">
                                    <h5>Request & History</h5>
                                    <h6>Clients requseted your action!</h6>
                                    <ul>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                        <li>Mark requsted CMS for 123 Maple <span>Now 1, 2021</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="request_history_set">
                                    <h5>See what your clients and doing</h5>
                                    <h6>See what you clints are doing</h6>
                                    <ul>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                        <li>Mark requsted  lender for quote <span>Now 1, 2021</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12 text-center mt-3">
                                <a className="seeall" href="#">See All</a>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        </section>
    </>)
}
export default Propertylistsingledetail;


