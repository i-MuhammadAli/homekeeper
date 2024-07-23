import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import DataTable from 'react-data-table-component';

import { Draggable } from "react-drag-reorder";

function Topnavbar() {

    const thisstate = {
        words: ["Hello", "Hi", "How are you", "Cool"],
    };

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [persons, gethelpnsupportobj] = useState([

         
       

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
            name: 'Pages Name',
            selector: row => row.pagename,
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
    const inputsHandler1 = (e,i) => {
         //alert(e)

        // alert("s");
        console.log("e",e);
        console.log("index",i);
        // if (e.target.name == 'id') {
        //     setState(e.target.value);
        // }
        // if (e.target.name == 'maintenancename') {
        //     setState0(e.target.value);
        // }
        // const { name, value } = e.target
        // setState(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }))

    }

    const handleSubmitClick = (id, username, reason, message, email, phonenumber) => {
        alert("modal call");
    };

    const sendDetailsToServer = async () => {

        axios.post("https://admin.myhomekeeper.co/api/homekeepernavbar")
            .then(function (response) {
                console.log('response', response.data.getnavbar);
                if (response.data.status == 'success') {
                    const gethelpnsupport = response.data.getnavbar;
                    console.log("thismaintaintemplate", gethelpnsupport)
                    let data = [];

                    for (let index = 0; index < gethelpnsupport.length; index++) {
                        data.push({
                            id: index + 1,
                            pagename: gethelpnsupport[index].name,
                            action: <a><i className="fa fa-pencil" aria-hidden="true"></i> <i className= "fa-solid fa-arrows-up-down" ></i></a>
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
    const getChangedPos = (currentPos, newPos) => {
        console.log(currentPos+1, newPos+1);

        let formdata = new FormData();
        formdata.append('currentid', currentPos+1);
        formdata.append('newid', newPos+1);
        axios.post("https://admin.myhomekeeper.co/api/homekeepernavbarchangesequence",formdata)
            .then(function (response) {
                
                if (response.data.status == 'success') {
                   
                    console.log("thismaintaintemplate",)
                    

                } else {
                    console.log('under error');
                }
            })


    };


    useEffect(() => {

        sendDetailsToServer()



    }, [])



    return (<>
        <Header />
        <section className="dashboard">
            <div className="container-fluid">
                <Sidebar />

                <div className="inspection_reques button_pages">
                    <h2>Top Nav Bar Button & Pages</h2>
                    <div className="table-responsive">
                        <table className="table pry_list">
                            
                            <thead>
                                <tr style={{background: "transparent"}}>
                                    <th scope="col">No</th>
                                    <th scope="col">Pages Name</th>
                                    <th scope="col" className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            {persons.length > 0 ? 
                                    <Draggable onPosChange={getChangedPos}>
                                    {
                                        persons.map((items, i) => {
                                            return (
                                                <tr key={items.id}>
                                                    <td>{i+1}</td>
                                                    <td >{items.pagename}</td>
                                                    <td><a href="#" className="pen"><i className="fa-solid fa-pen"></i></a> <i className="fa-solid fa-arrows-up-down"></i></td>
                                                </tr>

                                            )
                                        })
                                    }
                                </Draggable>
                            :""}
                            </tbody>
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
export default Topnavbar;