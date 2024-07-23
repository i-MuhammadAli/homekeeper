import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import DataTable from 'react-data-table-component';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

function Adminnotifications() {

    const [persons, setpersons] = useState([]);
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [optionvalue, setoptionvalue] = useState('')
    const [forrowpaginate, setstateforrowpaginate] = useState('')
    const [personsrr, globalpropertylistobj] = useState([]);

    // const [persons1, setpersons] = useState([
    // ]);

    const [personscount, setpersonscount] = useState('');
    const [prostatus, setstatus] = useState('');
    const [agentdetails, setstateforagent] = useState('');
    const [ownerdetails, setstateforhomeowner] = useState('');
    const [publicurl, stpublicurl] = useState('');

    const [page, setPage] = useState(1)


    const [insertmessage, setmessage] = useState([]);

    const columns = [

        {
            // name: '',
            selector: row => row.id,
            sortable: true,
        },
        {
            // name: 'Annual Percent',
            selector: row => row.type,
            sortable: true,
            width: "800px",
        },
        {
            // name: 'Annual Percent',
            selector: row => row.status,
            sortable: true,
            // width: "800px",
        },
        {
            // name: 'Date To',
            selector: row => row.created_at,
            sortable: true,
        },
        // {
        //     // name: 'Date From',
        //     selector: row => row.date_from,
        //     sortable: true,
        // },

        // {
        //     // name: 'Updated At',
        //     selector: row => row.updated_at,
        //     sortable: true,
        // },
        {
            // name: 'Action',
            selector: row => row.action,
            sortable: true,
        },

    ];



    const submittemplate = (event) => {
        event.preventDefault();
        // addDetailstoServer()

    }


    const [state, setState] = useState({
        annualpercentage: "",
        dateto: "",
        datefrom: "",
        fname: "",
        updated_at: ""
    })


    const [deletepropertymessage, setstatefordeleteproperty] = useState('')



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
        console.log("eeeeeeee", value)
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleSubmitClick = (id, userid, agentid, status) => {
        // alert(userid)
        if (status == 0) {
            var prostatus = "InProcess";
        }
        if (status == 1) {
            var prostatus = "Accept";
        }
        if (status == 2) {
            var prostatus = "Reject";
        }
        var id = id;
        var userid = userid;
        var agentid = agentid;
        var status = status;
        let formdata = new FormData();
        formdata.append('id', id);
        formdata.append('userid', userid);
        formdata.append('agentid', agentid);
        axios.post("https://admin.myhomekeeper.co/api/homekeeperviewagentowner", formdata)
            .then(function (response) {

                if (response.data.status == 'success') {
                    setstateforagent(response.data.agentdetails);
                    setstateforhomeowner(response.data.ownerdetails);
                    stpublicurl(response.data.publicurl)
                    // alert(status)

                    setstatus(prostatus)
                    // setstatefordeleteproperty("APR List Deleted Successfully")
                    // sendDetailsToServer();
                }
                else {
                    setstateforagent('');
                    setstateforhomeowner('');
                }

            })
        // var globaldata = { "id": id, "annualpercentage": annualpercentage, "dateto": dateto, "datefrom": datefrom, "updated_at": updated_at };
        // // setState(id);
        // setState(globaldata);

    };

    const handledeleteclick = (id) => {
        let formdata = new FormData();
        formdata.append('propertyid', id);
        axios.post("https://admin.myhomekeeper.co/api/homekeeperdeleteaprlist", formdata)
            .then(function (response) {

                if (response.data.status == 'success') {

                    console.log("delete successfully")
                    setstatefordeleteproperty("APR List Deleted Successfully")
                    sendDetailsToServer();
                }

            })
    }

    const paginationfunction = (page) => {
        //main paginate
        // alert(page)
        // alert("t")

        let formdata = new FormData();
        formdata.append('pagenumber', page);
        // formdata.append('count_per_page', optionvalue);

        axios.post('https://admin.myhomekeeper.co/api/homekeeperpaginatenotificationproperty', formdata)
            .then(response => {


                // if (response.data.status == 'success') {
                const personss = response.data.getuserlists;
                console.log("persondata", personss)
                const notificationlist = personss;
                // setstateforabovenot(notificationlist);
                // console.log("thisglobalpropertylist", globalpropertylist)
                let data = [];
                for (let index = 0; index < notificationlist.length; index++) {
                    if (notificationlist[index].status == 0) {
                        var status = "In-Process";
                        var onstyle = "yellowstyle";

                    }
                    if (notificationlist[index].status == 1) {
                        var status = "Accept";
                        var onstyle = "greenstyle";
                    }
                    if (notificationlist[index].status == 2) {
                        var status = "Reject";
                        var onstyle = "redstyle";
                    }
                    data.push({
                        // id: index + 1,
                        id: <i className="fa fa-bell belliconnot" aria-hidden="true"></i>,
                        type: <section
                            dangerouslySetInnerHTML={{ __html: "Home owner " + notificationlist[index].ownername + " requested to agent " + notificationlist[index].agentname + " to add property<br/>" + notificationlist[index].created_at }}
                            className="SearchResult-body"
                        />,


                        status: <section dangerouslySetInnerHTML={{
                            __html: "<span class=" + onstyle + ">" + status + "</span>"
                        }} />,
                        action: <i data-bs-toggle="modal" data-bs-target="#exampleModal1" className="fa fa-eye belliconnot" aria-hidden="true" onClick={() => { handleSubmitClick(notificationlist[index].id, notificationlist[index].userid, notificationlist[index].agentid, notificationlist[index].status) }}></i>,
                    })
                    console.log("mydynamicdata", data)
                }
                setpersons(data);
                // } else {
                //     console.log('under error');
                // }

            })
    }

    const sendDetailsToServer = async () => {

        axios.post("https://admin.myhomekeeper.co/api/homekeepernotificationsforproperty")
            .then(function (response) {
                if (response.data.status == 'success') {
                    const notificationlist = response.data.notificationlist;
                    // setstateforabovenot(notificationlist);
                    // console.log("thisglobalpropertylist", globalpropertylist)
                    let data = [];
                    for (let index = 0; index < notificationlist.length; index++) {
                        if (notificationlist[index].status == 0) {
                            var status = "In-Process";
                            var onstyle = "yellowstyle";

                        }
                        if (notificationlist[index].status == 1) {
                            var status = "Accept";
                            var onstyle = "greenstyle";
                        }
                        if (notificationlist[index].status == 2) {
                            var status = "Reject";
                            var onstyle = "redstyle";
                        }
                        data.push({
                            id: <i className="fa fa-bell belliconnot" aria-hidden="true"></i>,
                            type: <section
                                dangerouslySetInnerHTML={{ __html: "Home owner " + notificationlist[index].ownername + " requested to agent " + notificationlist[index].agentname + " to add property<br/>" + notificationlist[index].created_at }}
                                className="SearchResult-body"
                            />,


                            status: <section dangerouslySetInnerHTML={{
                                __html: "<span class=" + onstyle + ">" + status + "</span>"
                            }} />,
                            action: <i data-bs-toggle="modal" data-bs-target="#exampleModal1" className="fa fa-eye belliconnot" aria-hidden="true" onClick={() => { handleSubmitClick(notificationlist[index].id, notificationlist[index].userid, notificationlist[index].agentid, notificationlist[index].status) }}></i>,
                        })
                        console.log("mydynamicdata", data)
                    }
                    globalpropertylistobj(data);
                    setpersons(data);
                    setpersonscount(response.data.getallcounts)
                } else {
                    console.log('under error');
                }
            })
    }




    // const addDetailstoServer = () => {
    //     const userid = localStorage.getItem('token-info');

    //     let formdata = new FormData();
    //     formdata.append('annualpercentage', state.annualpercentage);
    //     formdata.append('datefrom', state.datefrom);
    //     formdata.append('dateto', state.dateto);

    //     axios.post("https://admin.myhomekeeper.co/api/homekeeperaddglobalaprdata", formdata)
    //         .then(function (response) {
    //             console.log('response', response.data);
    //             if (response.data.status == 'success') {
    //                 const message1 = response.data.message;

    //                 setmessage(message1);
    //                 // alert("test success")
    //                 sendDetailsToServer();
    //                 // navigate('homemaintenance');
    //                 // console.log("asdfsadfsdaf", response.data.data.usertype);
    //                 // navigate('/Thankyou', { state: response.data.data.usertype })
    //             } else {
    //                 // alert("error");
    //                 // setError(response.data.errors);
    //                 console.log('under error');
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log('error', error);
    //         });
    // }


    // const updatetemplate = (e) => {
    //     e.preventDefault();
    //     let formdata = new FormData();
    //     formdata.append('annualpercentage', state.annualpercentage);
    //     formdata.append('datefrom', state.datefrom);
    //     formdata.append('dateto', state.dateto);
    //     formdata.append('globalid', state.id);

    //     axios.post("https://admin.myhomekeeper.co/api/homekeeperupdateglobalaprdata", formdata)
    //         .then(function (response) {
    //             console.log('response', response.data);
    //             if (response.data.status == 'success') {
    //                 const message1 = response.data.message;
    //                 setmessage(message1);
    //                 sendDetailsToServer();
    //             } else {
    //                 console.log('under error');
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log('error', error);
    //         });

    // }

    // const submitglobalpercentage = (e) => {
    //     e.preventDefault();

    //     // alert("hi");
    //     addDetailstoServer()
    // }



    useEffect(() => {

        sendDetailsToServer()



    }, [])

    return (<>
        <Header />
        <section className="dashboard">
            <div className="container-fluid">
                <Sidebar />

                <div className="inspection_reques maintenance globalpropertyvalues">
                    {insertmessage}
                    <h2><a className="filter" href="#"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a>Notifications
                        {/* <span className="main_spn hh">
                            
                         <span className="show">Show : <select><option>10 Entries</option><option>20 Entries</option><option>15 Entries</option><option>30 Entries</option></select></span>
                        </span> */}
                    </h2>

                    {deletepropertymessage ? <h3 className='errormessagewithbackground'>{deletepropertymessage}</h3> : ""}
                    <div className="table-responsive">
                        <table className="table">
                            <DataTable
                                // pagination
                                columns={columns}
                                data={persons}
                            />
                            <div className="tablefooter">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <p className="pb-0 pt-2">{page ? page : 1} of {personscount}</p>
                                    </div>

                                    <div className="col-sm-7">

                                        <PaginationControl
                                            page={page}
                                            between={0}
                                            total={personscount}
                                            limit={10}
                                            //   limit={20}

                                            changePage={(page) => {
                                                setPage(page);
                                                paginationfunction(page)
                                                console.log(page)
                                            }}
                                            ellipsis={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </section>






        {/* modal start */}

        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Status -<span className='accept_grn'> {prostatus}</span> </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>




                    </div>
                    <div className="modal-body">

                        <div className='my_box_pop'>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <div className="my_box_pop_img">
                                        <h2>Home Owner</h2>
                                        <img src={ownerdetails.profileimg ? publicurl + ownerdetails.profileimg : "/../adminasset/images/usr.png"} />
                                        <h3>{ownerdetails.name}</h3>
                                        <h4>Homeowner</h4>
                                        <p>{ownerdetails.address1},{ownerdetails.state},{ownerdetails.city},{ownerdetails.suite},{ownerdetails.zip}</p>
                                        <h5>Email</h5>
                                        <h6>{ownerdetails.email}</h6>
                                        <h5>Contact Number</h5>
                                        <h6>{ownerdetails.cellnumber}</h6>
                                    </div>

                                </div>

                                <div className='col-lg-6'>
                                    <div className="my_box_pop_img">
                                        <h2>Agent</h2>
                                        <img src={agentdetails.profileimg ? publicurl + agentdetails.profileimg : "/../adminasset/images/usr.png"} />
                                        <h3>{agentdetails.name}</h3>
                                        <h4>Agent</h4>
                                        <p>{agentdetails.address1},{agentdetails.state},{agentdetails.city},{agentdetails.suite},{agentdetails.zip}</p>
                                        <h5>Email</h5>
                                        <h6>{agentdetails.email}</h6>
                                        <h5>Contact Number</h5>
                                        <h6>{agentdetails.cellnumber}</h6>
                                    </div>

                                </div>
                            </div>
                        </div>


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
export default Adminnotifications;