import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Header from '../admin/Header';
import { useNavigate } from "react-router-dom";
import Sidebar from '../admin/sidebar';

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        myFunction();
    }, []);


    const logout = () => {
        localStorage.removeItem('token-info');
        navigate('/adminlogin')
    };

    const myFunction = () => {
        if (localStorage.getItem('token-info'))
        {
            console.log("session set");
        }
        else{
            navigate('/adminlogin')
        }
    }
return (<>

    <Header />
    


    <section className="dashboard">
        <div className="container-fluid">
            <Sidebar />
            <div className="inspection_reques">
                <h2><a className="filter"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a></h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            {/* <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">User Type</th>
                                    <th scope="col">Pays</th>
                                    <th scope="col">Account Status</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email Address</th>
                                </tr> */}
                        </thead>
                        
                        <tbody>

                     




                        </tbody>
                    </table>
                </div>

              
            </div>



        </div>
    </section>

</>)
}
export default Dashboard;