import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import DataTable from 'react-data-table-component';

function HelpnSupport() {

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [persons, gethelpnsupportobj] = useState([


        // agentname:"",
        //         lender: "",
        //         ownername: "",
        //         partnername: "",
        //         homeinspector: "",
        //         home_var: "",


    ]);



    const [state, setState] = useState({
        agentname: "",
        lendername: "",
        ownername: "",
        partnername: "",
        homeinspector: "",
        homevalue: "",

    })



    const [insertmessage, setmessage] = useState([]);

    const columns = [

        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: 'User Name',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'reason',
            selector: row => row.reason,
            sortable: true,
        },
        {
            name: 'message',
            selector: row => row.message,
            sortable: true,
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'phonenumber',
            selector: row => row.phonenumber,
            sortable: true,
        },
        
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
        },

    ];

    const submittemplate = (event) => {
        event.preventDefault();

    }

    const submittemplatehomemaintain = (event) => {
        event.preventDefault();
        addDetailstoServer()

    }






    // const [stateforid, setState] = useState('');
    // const [stateforname, setState0] = useState('');
    // const [statefordescription, setState1] = useState('');

    const inputsHandler = (e) => {

        // if (e.target.name == 'id') {
        //     setState(e.target.value);
        // }
        // if (e.target.name == 'maintenancename') {
        //     setState0(e.target.value);
        // }
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleSubmitClick = (id, username, reason, message, email, phonenumber) => {
    alert("modal call");
    };

    const sendDetailsToServer = async () => {

        axios.post("https://admin.myhomekeeper.co/api/homekeepergethelpnsupport")
            .then(function (response) {
                console.log('response', response.data.gethelpnsupport);
                if (response.data.status == 'success') {
                    const gethelpnsupport = response.data.gethelpnsupport;
                    console.log("thismaintaintemplate", gethelpnsupport)
                    let data = [];

                    for (let index = 0; index < gethelpnsupport.length; index++) {
                        data.push({
                            id: index + 1,
                            username: gethelpnsupport[index].username,
                            reason: gethelpnsupport[index].reason,
                            message: gethelpnsupport[index].message,
                            email: gethelpnsupport[index].email,
                            phonenumber: gethelpnsupport[index].phonenumber,
                            action: <a data-bs-toggle="modal" data-bs-target="#exampleModaltest" onClick={() => { handleSubmitClick(gethelpnsupport[index].id, gethelpnsupport[index].username, gethelpnsupport[index].reason, gethelpnsupport[index].message, gethelpnsupport[index].email, gethelpnsupport[index].phonenumber) }} className="pen"><i className="fa-regular fa-eye"></i></a>,
                        })
                    }
                    gethelpnsupportobj(data);
                } else {
                    console.log('under error');
                }
            })
    }

    const addDetailstoServer = () => {

        console.log("insert iniated");
    }




    const submitproperty = (e) => {
        e.preventDefault();

        // alert("hi");
    }



    useEffect(() => {

        sendDetailsToServer()



    }, [])

    return (<>
        <Header />
        <section className="dashboard">
            <div className="container-fluid">
                <Sidebar />

                <div className="inspection_reques maintenance">
                    {insertmessage}
                    <h2><a className="filter" href="#"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a> Property List

                        <span className="main_spn hh"><span className="show">Show : <label>entries</label></span></span>


                    </h2>
                    <div className="table-responsive">
                        <table className="table pry_list">
                            <DataTable
                                pagination
                                columns={columns}
                                data={persons}
                            />
                        </table>
                    </div>
                </div>
            </div>
        </section>


        {/* modal start */}

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Property</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4>Property/Client</h4>

                        <form onSubmit={submitproperty}>
                            <input type="hidden" name="userid" onChange={inputsHandler} value={state.id} />
                            <div className="row">
                                <div className="col-6">
                                    <label>Agent Name</label>
                                    <input className="form-control" type="text" name="agentname" value={state.agentname} onChange={inputsHandler} />
                                </div>
                                <div className="col-6">
                                    <label>Lender Name</label>
                                    <input className="form-control" type="text" name="lendername" value={state.lendername} onChange={inputsHandler} />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Owner Name</label>
                                    <input className="form-control" type="text" name="ownername" value={state.ownername} onChange={inputsHandler} />
                                </div>
                                <div className="col-6">
                                    <label>Partner Name</label>
                                    <input className="form-control" type="text" name="partnername" value={state.partnername} onChange={inputsHandler} />
                                </div>
                                <div className='row'>
                                    <div className="col-6">
                                        <label>homeinspector</label>
                                        <input className="form-control" type="text" name="homeinspector" value={state.homeinspector} onChange={inputsHandler} />
                                    </div>

                                    <div className="col-6">
                                        <label>Homevalue</label>
                                        <input className="form-control" type="text" name="homevalue" value={state.homevalue} onChange={inputsHandler} />
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                            </div>
                        </form>

                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save Changes</button>
                    </div> */}
                </div>
            </div>
        </div>


        {/* modal end */}


    </>)
}
export default HelpnSupport;