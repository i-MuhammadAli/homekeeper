import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from '../../admin/Header';
import Sidebar from '../../admin/sidebar';
import DataTable from 'react-data-table-component';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

function Homemaintenance() {

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [persons, maintainencetemplateobj] = useState([]);
    const [successforadd, setsuccessforadd] = useState('');
    const [successforupdate, setsuccessforupdate] = useState('');
    const [maintainfordelete, setmaintainfordelete] = useState('');
    const [page, setPage] = useState(1)
    const [templatecount, settemplatecount] = useState('');
    const columns = [

        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
            width:"90px"
        },
        {
            name: 'Templates Name',
            selector: row => row.templatename,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
        },

    ];

    const [statemaintain, setmaintainState] = useState({
        maintainname:"",
        alertfrequency:"",
        startingdate:"",
        repeatevery:"",
        description:"",
        image:"",
        
        textmessage:"",
        emailmessage:"",
        alertmessage:"",
    })

    const submittemplate=(event)=>{
        event.preventDefault();
        updateDetailstoServer()
        
    }

    
    const submittemplatehomemaintain = (event) => {

        event.preventDefault();
        // console.log("rrrrrrrrrrrrrrrrrrrrrr",setmaintainState);

        addDetailstoServer()

    }

    

    const [stateforid, setState] = useState('');
    const [stateforname, setState0] = useState('');
    const [objectforedit, Setstateforedit] = useState('');
    // const [statefordescription, setState1] = useState('');



    const inputsHandleradd=(e)=>{
        const { name, value } = e.target
       
        // setInputField({ [e.target.name]: e.target.value })

        setmaintainState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const inputsHandler=(e)=>{
        const { name, value } = e.target
        if(e.target.name == 'id') 
        {
            setState(e.target.value);
        }
       
         setInputField({ [e.target.name]: e.target.value })

        Setstateforedit(prevState => ({
            ...prevState,
            [name]: value
        }))


    }

    const [inputField, setInputField] = useState({
        id: "",
        maintenancename: "",
        // templatename: "",
        // users: "",
    })


    const handleSubmitClick = (id, templatename, templatedescription, alert_frequency, starting_date, repeat_every, alert_message, text_message_alert, email_message_alert)=>{
        var id=id;
        var maintenancename = templatename;
        Setstateforedit({
            maintainname: templatename,
            maintaindescription: templatedescription,
            maintainfrequency: alert_frequency,
            maintainstarting_date: starting_date,
            maintainrepeat_every: repeat_every,
            maintainalert_message: alert_message,
            maintaintext_message_alert: text_message_alert,
            maintainemail_message_alert: email_message_alert,
        })
        setState(id);
        setState0(maintenancename);

    };
    const handledeleteClick = (id, templatename)=>{
        var id=id;
    //    alert(id);
        let formdata = new FormData();
        formdata.append('id', id);
        axios.post("https://admin.myhomekeeper.co/api/homekeepertemplatedelete", formdata)
        setmaintainfordelete("Maintenance Item Deleted Successfully")
    };

    const sendDetailsToServer = async () => {
        let formdata = new FormData();
        const userid = localStorage.getItem('token-info')
        formdata.append('userid', userid);
        axios.post("https://admin.myhomekeeper.co/api/homekeepermaintainencetemplate",formdata)
        // axios.post("https://digittrix-staging.com/staging/crmapply/applyboard/api/homekeepermylenders",formdata)
            .then(function (response) {
                console.log('responselenders', response.data.maintainencetemplate);
                // Setdata(response.data.getplans);
                // this.setState({data: data.conversations});
                if (response.data.status == 'success') {
                    const maintainencetemplate = response.data.maintainencetemplate;
                    let data = [];

                    for (let index = 0; index < maintainencetemplate.length; index++) {
                        data.push({
                            id: index + 1,
                            templatename: maintainencetemplate[index].templatename,
                            action: <><i className="edt" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleSubmitClick(maintainencetemplate[index].id, maintainencetemplate[index].templatename, maintainencetemplate[index].templatedescription, maintainencetemplate[index].alert_frequency, maintainencetemplate[index].starting_date, maintainencetemplate[index].repeat_every, maintainencetemplate[index].alert_message, maintainencetemplate[index].text_message_alert, maintainencetemplate[index].email_message_alert) }}><img src="/../adminasset/images/penedit.png" /></i><i className="dlt" onClick={() => { handledeleteClick(maintainencetemplate[index].id, maintainencetemplate[index].templatename) }}><img src="/../adminasset/images/delete_gray.png" /></i></>
                            
                        })
                    }
                    maintainencetemplateobj(data);
                    settemplatecount(response.data.getallmaintainencetemplate)
                } else {
                    console.log('under error');
                }
            })
    }


 

    const addDetailstoServer=() =>{

        const userid = localStorage.getItem('token-info');
        let formdata = new FormData();
        formdata.append('userid', userid);
        formdata.append('maintenancename', statemaintain.maintainname);
        formdata.append('alertfrequency', statemaintain.alertfrequency);
        formdata.append('templatedescription', statemaintain.description);
        formdata.append('startingdate', statemaintain.startingdate);
        formdata.append('repeatevery', statemaintain.repeatevery);
        formdata.append('textmessage', statemaintain.textmessage);
        formdata.append('emailmessage', statemaintain.emailmessage);
        formdata.append('alertmessage', statemaintain.alertmessage);

        axios.post("https://admin.myhomekeeper.co/api/homekeeperaddmaintainencetemplate", formdata)
        .then(function(response){

            console.log('response', response.data);
            if (response.data.status == 'success') {
                setsuccessforadd('Home Maintenance Added Successfully')
                sendDetailsToServer();
            } else {
                console.log('under error');
            }

        })
        // formdata.append('startingdate', statemaintain.startingdate);
        // formdata.append('repeatevery', statemaintain.repeatevery);
        // formdata.append('description', statemaintain.description);
        console.log("formdata", statemaintain.maintenancename)
    }


    const updateDetailstoServer = () => {

        // event.preventDefault();
        let formdata = new FormData();
        console.log(formdata)
        formdata.append('id', stateforid);
        formdata.append('templatename', stateforname);
        // formdata.append('templatedescription', dtsa1);
        console.log("thisformdata", formdata);
        axios.post("https://admin.myhomekeeper.co/api/homekeepermaintainencetemplateupdate", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    setsuccessforupdate('Home Maintenance Updated Successfully')
                    sendDetailsToServer();
                } else {
                    console.log('under error');
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
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
                    {successforadd ? <h3 className='sucesspricing'>{successforadd}</h3> : ""}
                    {successforupdate ? <h3 className='sucesspricing'>{successforupdate}</h3> : ""}
                    {maintainfordelete ? <h3 className='errormessage'>{maintainfordelete}</h3> : ""}
                    
                    <h2><a className="filter" href="#"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a> Home Maintenance Preset Templates 
                        
                        <span className="main_spn hh"><a data-bs-toggle="modal" data-bs-target="#exampleModal1" className="add_new" href="#"><i className="fa-light fa-plus"></i> Add New</a><span className="show">Show: <select><option>10 entries</option><option>20 entries</option><option>30 entries</option><option>40 entries</option></select></span></span>
                        
                    </h2>
                    <div className="table-responsive">
                        <table className="table homemaintenan_ce">
                            <DataTable
                                columns={columns}
                                data={persons}
                            />

                            

                            
                            
                        </table>
                        <div className="row">
                        <div className="col-sm-5">
                            <p>{page ? page : 1} of {templatecount}</p>
                        </div>
                            <div className="col-sm-7">
                        <PaginationControl
                            page={page}
                            between={4}
                            total={1}
                            limit={10}

                            changePage={(page) => {
                                setPage(page);
                                console.log(page)

                            }}
                            ellipsis={1}
                        />
                        </div>
                        </div>
                    </div>
                </div>
            </div> 
        </section> 



        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal" >
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add/Edit Maintenance Item</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <h4>Name of Maintenance</h4> */}

                        <form onSubmit={submittemplate}>
                            <input type="hidden" name='id' value={stateforid} onChange={inputsHandler}></input>
                            <div className="row">
                                <div className="col-4">
                                    <label>Name of Maintenance*</label>
                                    <input className="form-control" type="text" value={objectforedit.maintainname} name="maintainname" onChange={inputsHandler} placeholder='Name of Maintenance'/>
                                </div>
                                <div className="col-4">
                                    <label>Alert Frequency*</label>
                                    <input className="form-control" type="text" name="alertfrequency" value={objectforedit.maintainfrequency} onChange={inputsHandler} placeholder='Alert Frequency'/>
                                </div>
                                
                                <div className="col-4">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label>Starting Date*</label>
                                            <input className="form-control" type="date" name="startingdate" value={objectforedit.maintainstarting_date} onChange={inputsHandler} />
                                        </div>
                                        <div className='col-sm-6'>
                                            <label>Repeat Every*</label>
                                            <select name="repeat_every" value={objectforedit.maintainrepeat_every} onChange={inputsHandler} className="form-control" >
                                                <option value="">Select Option Below</option>
                                                <option value="1 Month">1 Month</option>
                                                <option value="2 Month">2 Month</option>
                                                <option value="3 Month">3 Month</option>
                                            </select>
                                     
                                        </div>

                                    </div>
                                    
                                </div>

                                <div className="col-8">
                                    <label>Description*</label>
                                    <textarea value={objectforedit.maintaindescription} className="form-control">
                                        
                                    </textarea>
                                </div>

                                <div className="col-4">
                                    <label>Image*</label>

                                    <div className="imageup">
                                    <h6>Drag & Drop or <span> Upload</span> image</h6>
                                    <input className="form-control" type="file" />
                                    </div>
                                </div>

                                <div className="col-12 mt-3 alt_Message">
                                <h4 className="mb-2">Alert Message</h4>
                                    <p className="w-100 mb-3">
                                        <span className="me-3"><input type="radio" name="vehicle1" checked={objectforedit.maintainalert_message == 'Text' ? true : ""} /> Text</span>
                                        <span><input type="radio" name="vehicle1" checked={objectforedit.maintainalert_message == 'Email' ? true : ""} /> Email</span>
                                </p>
                                </div>
                                <div className="col-6">
                                    <label>Text Message Alert*</label>
                                    <textarea value={objectforedit.maintaintext_message_alert} className="form-control">

                                    </textarea>
                                </div>

                                <div className="col-6">
                                    <label>Email Message Alert*</label>
                                    <textarea value={objectforedit.maintainemail_message_alert} className="form-control">

                                    </textarea>
                                </div>
                                </div>


                            <div className="modal-footer mt-3 p-0">

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                                
                            </div>

                        </form>
                        
                    </div>
                    
                </div>
            </div>
        </div>


        {/* modal for add maintainenance */}


        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal" >
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Maintenance Item</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <h4>Name of Maintenance</h4> */}

                        <form onSubmit={submittemplatehomemaintain}>
                            <input type="hidden" name='id' onChange={inputsHandleradd}></input>
                            <div className="row">
                                <div className="col-4">
                                    <label>Name of Maintenance*</label>
                                    <input className="form-control" type="text" value={statemaintain.maintainname} name="maintainname" onChange={inputsHandleradd} placeholder='Name of Maintenance' />
                                </div>
                                <div className="col-4">
                                    <label>Alert Frequency*</label>
                                    <input className="form-control" type="text" value={statemaintain.alertfrequency} name="alertfrequency" onChange={inputsHandleradd} placeholder='Alert Frequency' />
                                </div>
                                <div className="col-4">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label>Starting Date*</label>
                                            <input className="form-control" type="date" name="startingdate" value={statemaintain.startingdate} onChange={inputsHandleradd}  />
                                        </div>
                                        <div className='col-sm-6'>
                                            <label>Repeat Every*</label>
                                            <select className="form-control" name='repeatevery' value={statemaintain.repeatevery} onChange={inputsHandleradd}>

                                                <option>1 Month</option>
                                                <option>2 Month</option>
                                                <option>3 Month</option>
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-8">
                                    <label>Description*</label>
                                    <textarea name="description" className="form-control" value={statemaintain.description} onChange={inputsHandleradd}>

                                    </textarea>
                                </div>

                                 <div className="col-4">
                                    <label>Image*</label>

                                    <div className="imageup">
                                    <h6>Drag & Drop or <span> Upload</span> image</h6>
                                        <input className="form-control" type="file" name="image"/>
                                    </div>
                                </div>


                                <div className="col-12 mt-3 alt_Message">
                                    <h4>Alert Message</h4>
                                    
                                    <p className="w-100 mb-3">
                                        <span><input type="radio" name="alertmessage" value="Text" onChange={inputsHandleradd} /> Text</span>
                                        <span><input type="radio" name="alertmessage" value="Email" onChange={inputsHandleradd} /> Email</span>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <label>Text Message Alert*</label>
                                    <textarea name="textmessage" className="form-control" value={statemaintain.textmessage} onChange={inputsHandleradd}>

                                    </textarea>
                                </div>

                                <div className="col-6">
                                    <label>Email Message Alert*</label>
                                    <textarea name="emailmessage" className="form-control" value={statemaintain.emailmessage} onChange={inputsHandleradd}>

                                    </textarea>
                                </div>
                            </div>


                            <div className="modal-footer mt-3 p-0">

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
export default Homemaintenance;