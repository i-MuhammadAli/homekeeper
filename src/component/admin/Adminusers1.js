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
import ReactPaginate from 'react-paginate';

function Adminusers() {
    const [persons, setpersons] = useState([]);

    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);

    const [page, setPage] = useState(1)
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

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
        // fetchData();
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
                console.log("thisdataforadminlist", data);
            })
    }

    // function fetchData() {
    //     fetch("https://dummyjson.com/products")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const {
    //                 course: { uploads }
    //             } = data;
    //             setData(uploads);
    //         });
    // }
    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    // const thisdata=data;
    // console.log("thisdata",persons)

    // {
    //     persons.map((items, i) => {
    //         return (
    //             <tr key={items}>
    //                 <td>{i + 1}</td>
    //                 <td><a href="#">{items.name}</a></td>
    //                 <td>{items.usertype}</td>
    //                 <td>$29</td>
    //                 <td><a className="rep_btn regst" href="#">Registered</a></td>
    //                 <td>{items.cellnumber}</td>
    //                 <td>{items.email}</td>
    //             </tr>
    //         )
    //     })

    // }


    
    // const currentPageData = persons
    //     .slice(offset, offset + PER_PAGE)
    //     .map(({ items,i }) => <h3>{}</h3>);

    //     console.log("agiandata", currentPageData)
    // const pageCount = Math.ceil(persons.length / PER_PAGE);
    // console.log("pageCount", pageCount)

    return (<>


        {/* <div className="App">
            <h1>React Paginate Example</h1>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
            {currentPageData}
        </div> */}

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
                    <h2><a className="filter"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a> Users <span className="main_spn hh"><span className="show">Show : <label>entries</label></span></span></h2>
                    <div className="table-responsive">
                        <table className="table usts">
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
                            {/* <DataTable
                                pagination
                                columns={columns}
                                data={persons}

                            /> */}


                            <PaginationControl
                                page={page}
                                between={4}
                                total={250}
                                limit={10}
                                changePage={(page) => {
                                    setPage(page);
                                    console.log(page)
                                }}
                                ellipsis={1}
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

                    {/* <div className="table_footer">
                        <div className="row"  >
                            <div className="col-sm-5">
                                <p>2 of 2,982</p>
                            </div>
                            <div className="col-sm-7">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination mb-0 float-end">
                                        <li className="page-item"><a className="page-link" href="#"><i className="fa-solid fa-arrow-left"></i></a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#"><i className="fa-solid fa-arrow-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div> */}
                </div>



            </div>
        </section>

    </>)
}
export default Adminusers;


