import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import Editpricingmodal from '../admin/Editpricingmodal';
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

function Pricing() {
    const navigate = useNavigate();

const [persons, setpersons] = useState([]);
const [persons1, setpersons1] = useState([]);

    const [message, setmessage] = useState('')

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

    const caseInsensitiveSort = (rowA, rowB) => {
         const a = rowA.pricing.replace("$","").toLowerCase();
         const b = rowB.pricing.replace("$",'').toLowerCase();
         console.log("aaa1", Number(a))
        if (Number(a) > Number(b)) {
            return 1;
        }

        if (Number(b) > Number(a)) {
            return -1;
        }
        return 0;
    };


    const columns = [

        {
            name: 'No',
            selector: row => row.id,
            // sortFunction: caseInsensitiveSort,
            sortable: true,
            // sortFunction: caseInsensitiveSort,
            
             width: "80px"
        },
        {
            name: 'Pricing Name',
            selector: row => row.pricingname,
            sortable: true,
            
            width: "300px"
        },
        {
            name: 'Pricing',
            selector: row => row.pricing,
             
            sortable: true,
            sortFunction: caseInsensitiveSort,
            
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
            flaot: "right"
        },
    ];

    const columns1 = [

        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: 'Pricing Name',
            selector: row => row.pricingname,
            sortable: true,
            width: "300px"
        },
        {
            name: 'Pricing',
            selector: row => row.pricing,
            sortable: true,
            sortFunction: caseInsensitiveSort,
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
            flaot: "right"
        },
    ];

    useEffect(() => {
        myFunction();
        myFunction11();
    }, []);
    const [dtsa0, setState0] = useState('');
    const [dtsa, setState] = useState('');
    const [dtsa1, setState1] = useState('');
    const [dtsa2, setState2] = useState('');




    const inputsHandler = (e) => {
        if (e.target.name == 'userid') {
            setState0(e.target.value);
        }
        if (e.target.name=='planname'){
            setState(e.target.value);
        }
        if (e.target.name == 'planvalue'){
            setState1(e.target.value);
        }
        if (e.target.name == 'users'){
            setState2(e.target.value);
        }
        setInputField({ [e.target.name]: e.target.value })
    }


    const [inputField, setInputField] = useState({
        userid:"",
        planname: "",
        planvalue: "",
        users: "",
    })

    




    const handleSubmitClick = (userid,planname,planvalue,users) => {

       var userid=userid;
       var planname=planname;
       var planvalue=planvalue;
       var users=users;
        setState0(userid);
        setState(planname);
        setState1(planvalue);
        setState2(users);
        //setInputField({ planname: planname, planvalue: planvalue, users: users })
    }


    const submitpricing = (e) => {
        e.preventDefault();

        sendDetailsToServer();
    }
    const submitpricing1 = (e) => {
        e.preventDefault();

        sendDetailsToServer1();
    }

    useEffect(() => {
        myFunction1();
    });

    const myFunction1 = () => {
        setTimeout(alertFunc, 5000);
    }

    const alertFunc = () => {
        setmessage('');
    }

    const sendDetailsToServer = async () => {
        // setError([]);
        let formdata = new FormData();
        formdata.append('userid', dtsa0);
        formdata.append('planname', dtsa);
        formdata.append('planvalue', dtsa1);
        formdata.append('users', dtsa2);
        console.log("thisformdata", formdata);
        axios.post("https://admin.myhomekeeper.co/api/homekeeperupdateplan", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    const message1 = response.data.message;
                    
                    setmessage(message1);
                    myFunction();
                    navigate('/admin/accounting/pricing');
                    // console.log("asdfsadfsdaf", response.data.data.usertype);
                    // navigate('/Thankyou', { state: response.data.data.usertype })
                } else {
                    // alert("error");
                    // setError(response.data.errors);
                     console.log('under error');
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
        
    }

    const sendDetailsToServer1 = async () => {
        // setError([]);
        let formdata = new FormData();
        formdata.append('userid', dtsa0);
        formdata.append('planname', dtsa);
        formdata.append('planvalue', dtsa1);
        console.log("thisformdata", formdata);
        axios.post("https://admin.myhomekeeper.co/api/homekeeperupdateplanforinspectionreport", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    const message1 = response.data.message;

                    setmessage(message1);
                    myFunction11();
                    navigate('/admin/accounting/pricing');
                    // console.log("asdfsadfsdaf", response.data.data.usertype);
                    // navigate('/Thankyou', { state: response.data.data.usertype })
                } else {
                    // alert("error");
                    // setError(response.data.errors);
                    console.log('under error');
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });

    }

    // let additionaldata = {
    //     token: token,
    //     userid: userid,
    // }

// {/* <div onClick={() => this.myHandler(someParameter)}></div> */}

    const myFunction = () => {
        axios.post('https://admin.myhomekeeper.co/api/homekeepergetmembershiplan')
            .then(response => {
                const pricing = response.data.getplans;
                console.log("pricingdata", pricing)
                let data = [];
                for (let index = 0; index < pricing.length; index++) {
                data.push({
                id: index + 1,
                pricingname: pricing[index].plan_name,
                    pricing: "$" +pricing[index].plan_value,
                    action: <a data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleSubmitClick(pricing[index].id,pricing[index].plan_name, pricing[index].plan_value,pricing[index].users) }}  className="pen"><img src="/../adminasset/images/penedit.png" /></a>,
                    })
                }

                setpersons(data);
                console.log("thisdataforadminlist", data);
            })
    }

    const myFunction11 = () => {
        axios.post('https://admin.myhomekeeper.co/api/homekeepergetinspectionplan')
            .then(response => {
                const pricing = response.data.getinspectionplan;
                console.log("pricingdata", pricing)
                let data = [];
                for (let index = 0; index < pricing.length; index++) {
                    data.push({
                        id: index + 1,
                        pricingname: pricing[index].plan_name,
                        pricing: "$ "+pricing[index].plan_value,
                        action: <a data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => { handleSubmitClick(pricing[index].id, pricing[index].plan_name, pricing[index].plan_value, pricing[index].users) }} className="pen"><img src="/../adminasset/images/penedit.png" /></a>,
                    })
                }

                setpersons1(data);
                console.log("thisdataforadminlist", data);
            })
    }

    return (<>
    <Header/>

        <section className="dashboard">
            <div className="container-fluid">
                <Sidebar/>
                <div className="inspection_reques">
                    <h2>Pricing</h2>
                    

                    {message && message !== '' ? <h3 className="sucesspricing">{message}</h3> : ""} 
                    <div className="pricetext">
                    <h5>Subscription plan</h5>
                    <div className="table-responsive">
                        <table className="table pricing">
                            
                            <DataTable
                            columns={columns}
                            data={persons}
                            />
                            
                        </table>
                    </div>
                    </div>



                    <div className="pricetext">
                    <h5>Home Inspection plan</h5>
                    <div className="table-responsive">
                        <table className="table pricing">
                           
                            <DataTable
                            columns={columns1}
                            data={persons1}
                            />
                            
                        </table>
                    </div>
                    </div>

                    
                </div>
            </div>
        </section>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Pricing</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4>Pricing Information</h4>
                        <form onSubmit={submitpricing}>
                            <input type="hidden" name="userid" value={dtsa0} onChange={inputsHandler}/>
                            <div className="row">
                                <div className="col-12">
                                    <label>Plan Name</label>
                                    <input className="form-control" type="text" name="planname" value={dtsa} onChange={inputsHandler} />
                                </div>
                                <div className="col-6">
                                    
                                    <label>Pricing Amount</label>
                                    <input className="form-control" type="text" name="planvalue" value={dtsa1} onChange={inputsHandler} />
                                </div>
                                <div
                                    className="col-6">
                                    <label>Property Count</label>
                                    <input className="form-control" type="text" name="users" value={dtsa2} onChange={inputsHandler} />
                                </div>
                            </div>
                            <div className="modal-footer p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>


        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Pricing</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4>Home Inspection Plan Information</h4>

                        <form onSubmit={submitpricing1}>
                            <input type="hidden" name="userid" value={dtsa0} onChange={inputsHandler} />
                            <div className="row">
                                <div className="col-12">
                                    <label>Plan Name</label>
                                    <input className="form-control" type="text" disabled name="planname" value={dtsa} onChange={inputsHandler} />
                                </div>
                                <div className="col-12">

                                    <label>Pricing Amount</label>
                                    <input className="form-control" type="text" name="planvalue" value={dtsa1} onChange={inputsHandler} />
                                </div>
                                
                            </div>
                            <div className="modal-footer p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Pricing;