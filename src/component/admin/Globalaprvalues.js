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

function Globalaprvalues() {

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [persons, globalpropertylistobj] = useState([
    ]);
    const [persons1, setpersons] = useState([
    ]);

    const [personscount, setpersonscount] = useState('');

    const [page, setPage] = useState(1)


    const [insertmessage, setmessage] = useState([]);

    const columns = [

        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Annual Percent',
            selector: row => row.annualpercent,
            sortable: true,
        },
        {
            name: 'Date To',
            selector: row => row.date_to,
            sortable: true,
        },
        {
            name: 'Date From',
            selector: row => row.date_from,
            sortable: true,
        },

        {
            name: 'Updated At',
            selector: row => row.updated_at,
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
        addDetailstoServer()

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

    const handleSubmitClick = (id, annualpercentage, dateto, datefrom, updated_at) => {
        var id = id;
        var annualpercentage = annualpercentage;
        var dateto = dateto;
        var datefrom = datefrom;
        var updated_at = updated_at;
        var globaldata = { "id": id, "annualpercentage": annualpercentage, "dateto": dateto, "datefrom": datefrom, "updated_at": updated_at };
        // setState(id);
        setState(globaldata);

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
        //  alert(page) not working
        let formdata = new FormData();
        formdata.append('pagenumber', page);
        // formdata.append('count_per_page', optionvalue);

        axios.post('https://admin.myhomekeeper.co/api/homekeepergetalluserslistpaginate', formdata)
            .then(response => {
                const personss = response.data.getuserlists;
                console.log("persondata", personss)
                let data = [];
                for (let index = 0; index < personss.length; index++) {
                    data.push({
                        id: index + 1,
                        username: <Link to={"/admin/usersingle/" + personss[index].id}>{personss[index].name}</Link>,
                        usertype: personss[index].usertype,
                        pays: '08-07-2022',
                        accountstatus: <Link to={"/admin/usersingle/" + personss[index].id} className="regi">Registered</Link>,
                        phone: personss[index].cellnumber,
                        emailaddress: personss[index].email,

                    })

                }

                setpersons(data);
                // setpersonscount(data.length)
                console.log("thisdataforadminlist", data);
            })
    }

    const sendDetailsToServer = async () => {

        axios.post("https://admin.myhomekeeper.co/api/homekeeperglobalaprlist")
            .then(function (response) {
                // console.log('response', response.data.globalpropertylist);
                // Setdata(response.data.getplans);
                // this.setState({data: data.conversations});
                if (response.data.status == 'success') {
                    const globalpropertylist = response.data.globalpropertylist;
                    console.log("thisglobalpropertylist", globalpropertylist)
                    let data = [];
                    for (let index = 0; index < globalpropertylist.length; index++) {
                        data.push({
                            id: index + 1,
                            annualpercent: globalpropertylist[index].annual_percentage,
                            date_to: globalpropertylist[index].date_to,
                            date_from: globalpropertylist[index].date_from,
                            updated_at: globalpropertylist[index].updated_at,
                            action: <a className="pen"><i data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => { handleSubmitClick(globalpropertylist[index].id, globalpropertylist[index].annual_percentage, globalpropertylist[index].date_to, globalpropertylist[index].date_from, globalpropertylist[index].updated_at) }}><img src="/../adminasset/images/penedit.png" /></i> <i data-bs-toggle="modal" data-bs-target="#exampleModaldelete" onClick={() => { handledeleteclick(globalpropertylist[index].id) }} ><img src="/../adminasset/images/delete.png" /></i></a>,
                        })
                        console.log("mydynamicdata", data)
                    }
                    globalpropertylistobj(data);
                } else {
                    console.log('under error');
                }
            })
    }




    const addDetailstoServer = () => {
        const userid = localStorage.getItem('token-info');

        let formdata = new FormData();
        formdata.append('annualpercentage', state.annualpercentage);
        formdata.append('datefrom', state.datefrom);
        formdata.append('dateto', state.dateto);

        axios.post("https://admin.myhomekeeper.co/api/homekeeperaddglobalaprdata", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    const message1 = response.data.message;

                    setmessage(message1);
                    // alert("test success")
                    sendDetailsToServer();
                    // navigate('homemaintenance');
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


    const updatetemplate = (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('annualpercentage', state.annualpercentage);
        formdata.append('datefrom', state.datefrom);
        formdata.append('dateto', state.dateto);
        formdata.append('globalid', state.id);

        axios.post("https://admin.myhomekeeper.co/api/homekeeperupdateglobalaprdata", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    const message1 = response.data.message;
                    setmessage(message1);
                    sendDetailsToServer();
                } else {
                    console.log('under error');
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });

    }

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
                    <h2><a className="filter" href="#"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a>Global APR Values
                        <span className="main_spn hh"><a className="add_new" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-light fa-plus"></i> Add New</a> <span className="show">Show : <select><option>10 Entries</option><option>20 Entries</option><option>15 Entries</option><option>30 Entries</option></select></span>
                        </span>
                    </h2>

                    {deletepropertymessage ? <h3 className='errormessagewithbackground'>{deletepropertymessage}</h3> : ""}
                    <div className="table-responsive">
                        <table className="table">
                            <DataTable
                                // pagination
                                columns={columns}
                                data={persons}
                            />

                            <PaginationControl
                                page={page}
                                between={4}
                                total={1}
                                limit={10}

                                changePage={(page) => {
                                    setPage(page);
                                    paginationfunction(page)
                                    console.log(page)

                                }}
                                ellipsis={1}
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
                        <h5 className="modal-title" id="exampleModalLabel">Add Property</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4>Add Global Property Value</h4>

                        <form onSubmit={submittemplate}>
                            {/* <input type="hidden" name="globalid" value={state.id} /> */}
                            <div className="row">
                                <div className="col-12">
                                    <label>Annual Percentage Change</label>
                                    <span>
                                        <input className="form-control" type="text" name="annualpercentage" value={state.annualpercentage} onChange={inputsHandler} />
                                        <img src="/../adminasset/images/persent.png" />
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Date From</label>
                                    <input className="form-control" type="date" name="datefrom" onChange={inputsHandler} value={state.datefrom} />
                                </div>

                                <div className="col-6">
                                    <label>Date To</label>
                                    <input className="form-control" type="date" name="dateto" onChange={inputsHandler} value={state.dateto} />
                                </div>
                            </div>
                            <br />

                            <div className="modal-footer p-0">
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



        {/* modal start */}

        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Property</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4>Edit Global Property Value</h4>

                        <form onSubmit={updatetemplate}>
                            <input type="hidden" name="globalid" value={state.id} />
                            <div className="row">
                                <div className="col-12">
                                    <label>Annual Percentage Change</label>
                                    <span>
                                        <input className="form-control" type="text" name="annualpercentage" value={state.annualpercentage} onChange={inputsHandler} />
                                        <img src="/../adminasset/images/persent.png" />
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Date From</label>
                                    <input className="form-control" type="date" name="datefrom" onChange={inputsHandler} value={state.datefrom} />
                                </div>

                                <div className="col-6">
                                    <label>Date To</label>
                                    <input className="form-control" type="date" name="dateto" onChange={inputsHandler} value={state.dateto} />
                                </div>
                            </div>
                            <br />

                            <div className="modal-footer p-0">
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
export default Globalaprvalues;