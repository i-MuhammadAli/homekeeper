import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import Editpricingmodal from '../admin/Editpricingmodal';
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "../admin/Pagination.js";

function Adminusers() {
    const [persons, setpersons] = useState([]);
    const [personscount, setpersonscount] = useState('');

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

    const [page, setPage] = useState(1)
    const [optionvalue, setoptionvalue] = useState('')
    const [forrowpaginate, setstateforrowpaginate] = useState('')
    const [selectedClient, setSelectedClient] = useState([]);



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
            name: 'User Type',
            selector: row => row.usertype,
            sortable: true,
        },
        {
            name: 'Expiry Date',
            selector: row => row.pays,
            sortable: true,
        },
        {
            name: 'Account Status',
            selector: row => row.accountstatus,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Email Address',
            selector: row => row.emailaddress,
            sortable: true,
        },

    ];
    useEffect(() => {
        myFunction();

    }, []);
    const myFunction = () => {
        axios.post('https://admin.myhomekeeper.co/api/homekeepergetalluserslist')
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
                setpersonscount(response.data.getallcounts)
                console.log("thisdataforadminlist", data);
            })
    }

    const paginationfunction = (page) => {
        // alert(page)
        //main pagination
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

    const paginationfunctionforentry = (event) => {
        //above
        let count_per_page = event.target.value;
        let formdata = new FormData();
        formdata.append('count_per_page', count_per_page);
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
                setpersonscount(response.data.getallcounts)
                setoptionvalue(count_per_page)
                // alert(count_per_page)
                const value = response.data.getallcounts / count_per_page;
                setstateforrowpaginate(value)
                console.log("thisdataforadminlist", data);
            })
    }

    return (<>

        <Header />

        {/* <DataTable
            pagination
            columns={columns}
            data={persons}
        /> */}



        <section className="dashboard">
            <div className="container-fluid">
                <Sidebar />
                <div className="inspection_reques userdiv">
                    <h2><a className="filter"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a> Users <span className="main_spn hh"><span className="show">Show : <select value={optionvalue} onChange={paginationfunctionforentry} ><option selected>10 entries</option><option>20 entries</option><option>30 entries</option><option>40 entries</option></select></span></span></h2>
                    {/* <Pagination /> */}
                    <div className="table-responsive">
                        <table className="table supradmin">
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
                            <DataTable
                                // pagination
                                columns={columns}
                                data={persons}

                            />

                            <tbody>

                                {/* {
                                    persons.map((items, i) => {
                                        return(
                                            <tr key={items}>
                                    <td>{i+1}</td>
                                    <td><a href="#">{items.name}</a></td>
                                    <td>{items.usertype}</td>
                                    <td>$29</td>
                                    <td><a className="rep_btn regst" href="#">Registered</a></td>
                                    <td>{items.cellnumber}</td>
                                    <td>{items.email}</td>
                                    </tr>
                                        )
                                    })

                                } */}




                            </tbody>
                        </table>
                    </div>
                    <div className="tablefooter">
                        <div className="row">
                            <div className="col-sm-5">
                                <p className="pb-0 pt-2">{page ? page : 1} of {personscount}</p>
                            </div>
                            <div className="col-sm-7">

                                {/* <Pagination
                                    count={personscount}
                                /> */}
                                <PaginationControl
                                    page={forrowpaginate ? forrowpaginate : page}
                                    between={0}
                                    total={personscount}
                                    limit={optionvalue ? optionvalue : 10}
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


                </div>



            </div>
        </section>

    </>)
}
export default Adminusers;