import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import Editpricingmodal from '../admin/Editpricingmodal';
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';

function Adminusersingle() {
    const [persons, setpersons] = useState([]);
    const searchParams = useParams();
    const userid = searchParams.userid;
    console.log("userid",userid)
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [details, setType] = useState({});

    const columns = [

        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Cost',
            selector: row => row.cost,
            sortable: true,
        },
        {
            name: 'Service Type',
            selector: row => row.servicetype,
            sortable: true,
        },
        

    ];
    useEffect(() => {
         myFunction();
        sendDetailsToServer();
    }, []);


    const sendDetailsToServer = () => {

        // const user=userid;
        // setError([]);


try{
    let body = {
        userids: userid,
    };
    let formdata = new FormData();
    formdata.append('userid',userid);
  

    console.log("params", body);
    axios.post("https://admin.myhomekeeper.co/api/homekeeperDetail", formdata)
            .then(function (response) {
                console.log('response', response);

                // const type1 = response.data.message;
                if (response.data.status == 'success') {
                    console.log("responseeeee", response.data.getdetails)
                    const type1 = response.data.getdetails;
                    setType(type1);
                    //  const userdetails=response.data.getdetails;
                    // setType(type1);
                    // console.log("Responseget", response.data.data.message);
                    // navigate('/Thankyou', { state: response.data.data })

                } else if (response.data.status == 'failure') {

                    // setType(type1);
                    console.log('under error');
                }
            })

        }catch(e){
            console.log('e message',e.message);
        }


    }

    const data=[
        {
        id:1,
        date:"25 oct 2022",
        cost:100,
        servicetype:"Monthly",
        },
        {
            id: 2,
            date: "26 oct 2022",
            cost: 200,
            servicetype: "Quaterly",
        },
        {
            id: 3,
            date: "27 Oct 2022",
            cost: 300,
            servicetype: "Yearly",
        }
        
    ]

    const myFunction = () => {
        let formdata = new FormData();
        formdata.append('userid', userid);
        axios.post('https://admin.myhomekeeper.co/api/homekeeperDetail',formdata)
            .then(response => {
                const personss = response.data.getdetails;
                console.log("persondata", personss)
                let data = personss;
                setpersons(data);
                console.log("thisdataforadminlist", data);
            })
    }

    return (<>

        <Header />

        <section className="dashboard">
            <div className="container-fluid">
                <Sidebar />
                
                <div className="inspection_reques singleuser">
                    <h2>John Smith
                        <span className="main_spn">
                            <a className="givebtn" href="#">Give them another 14 days free trial</a>
                            <a className="add_new dlt" href="#">Block Account</a>
                            <a className="add_new" href="#">Activate Account</a>
                            
                        </span></h2>


                    <div className="row">
                        <div className="col-sm-6">
                            <div className="set">
                                <h3>Users</h3>
                                <p>Name : <span>{details.name}</span></p>
                                <p>User Type : <span>{details.usertype}</span></p>
                                <p>Phone Number : <span>{details.cellnumber}</span></p>
                                <p>Email Address : <span>{details.email} <img src="/adminasset/images/edit2.png"/></span></p>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="set">
                                <h3>Payee</h3>
                                <p>Name : <span>John Smith</span></p>
                                <p>Phone Number : <span>+91-9876523210</span></p>
                                <p>Email Address : <span>Samith@thehomekeeper <img src="/adminasset/images/edit2.png"/></span></p>
                                <p>Visa Ending : <span>3432 <img src="/adminasset/images/edit2.png"/></span></p>
                            </div>
                        </div>

                    </div>


                    <h4>Payment History</h4>
                    <div className="table-responsive">
                    <table className="table">
                        <DataTable
                            pagination
                            columns={columns}
                            data={data}
                        />

                        {/* <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Service Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>

                                <tr>
                                    <td>5</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>

                                <tr>
                                    <td>6</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>

                                <tr>
                                    <td>7</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>

                                <tr>
                                    <td>8</td>
                                    <td>10/02-2022</td>
                                    <td>$29</td>
                                    <td>Monthly Service</td>
                                </tr>

                            </tbody>
                        </table> */}
                        </table>
                    </div>

                </div>



            </div>
        </section>

    </>)
}
export default Adminusersingle;


