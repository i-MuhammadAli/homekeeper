import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../admin/Header';
import Sidebar from '../admin/sidebar';
import Editpricingmodal from '../admin/Editpricingmodal';
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function Adminusers() {
const [persons, setpersons] = useState([]);
    const [page, setPage] = useState(1)

    const [stateadmin, setadminState] = useState({
        adminname: "",
        email:"",
        phone:"",
        lname:"",
        password:"",
        confirmpassword:"",
         //access:""
    })

const selectProps = { indeterminate: isIndeterminate => isIndeterminate };





const columns = [
    {
        name: 'No',
        selector: row => row.id,
        sortable: true,
        width: "80px"
    },
    {
        name: 'Admin Name',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Email Address',
        selector: row => row.emailaddress,
        sortable: true,
    },
    {
        name: 'Access',
        selector: row => row.access,
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
    // const submittemplate = async data => {
            console.log("sadfsdfasdf",event.target.elements.adminname.value)

           


         if (event.target.elements.lname.value !== '') {
             errorstateforlname('')
         }
         else {
             errorstateforlname("Last name Can't be empty")
         }

         if (event.target.elements.email.value !== '') {
             errorstateforemail('')
         }
         else {
             errorstateforemail("Email Can't be empty")
         }
         if (event.target.elements.phone.value !== '') {
             errorstateforphone('')
         }
         else {
             errorstateforphone("Phone Can't be empty")
         }
         if (event.target.elements.adminname.value !== '') {
             errorstateforadminname('')
         }
         else {
             errorstateforadminname("Admin Name Can't be empty")
         }
         if (event.target.elements.password.value !== '') {
             errorstateforpassword('');
         }
         else {
             errorstateforpassword("Password Can't be empty")
         }
         if (event.target.elements.confirmpassword.value !== '') {
             errorstateforconfirmpassword('');
         }
         else {
             errorstateforconfirmpassword("Confirm Password Can't be empty")
         }



         if (event.target.elements.lname.value && event.target.elements.email.value && event.target.elements.phone.value && event.target.elements.adminname.value && event.target.elements.password.value && event.target.elements.confirmpassword.value !=='')
         {
             
             if (event.target.elements.password.value == event.target.elements.confirmpassword.value)
             {
                alert("match")
                 sendDetailstoServer();
             }
             else
             {
                alert("not match");
             }
         }
         else{
            alert("empty")
         }
        //  event.target.elements.username.value
        
         
        // sendDetailstoServer()

    }

    const [errorforlname, errorstateforlname] = useState('');
    const [errorforemail, errorstateforemail] = useState('');
    const [errorforadminname, errorstateforadminname] = useState('');
    const [errorforpassword, errorstateforpassword] = useState('');
    const [errorforconfirmpassword, errorstateforconfirmpassword] = useState('');
    const [errorforphone, errorstateforphone] = useState('');
    const [passwordcheck1, setstateforpassword1] = useState('');
    const [passwordcheck2, setstateforpassword2] = useState('');
    const [userinfo, setUserInfo] = useState({
        access: [],
        
    });
    const { access } = userinfo;
 
    const inputsHandler = (e) => {
        const { name, value } = e.target

        if (e.target.checked) {
            setUserInfo({
                access: [...access, value],
            });
            console.log("userinfo1", access)
            console.log("userinfo2", userinfo)
        }
        else {
            setUserInfo({
                access: access.filter((e) => e !== value),
            });
        }

        // if (checked) {
        //     setUserInfo({
        //         languages: [...languages, value],
        //         response: [...languages, value],
        //     });
        // }

        console.log("value",value)

        
        // if (name == 'lname' && value!=='')
        // { 
        //     errorstateforlname('')
        // }
        // else{
        //     errorstateforlname("Last name Can't be empty")  
        // }
        
        // if(name=='email' && value!='')
        // {  
        //     errorstateforemail('')
        // }
        // else{
        //     errorstateforemail("Email Can't be empty")
        // }
        // if (name =='phone' && value!='')
        // {  
        //     errorstateforphone('')
        // }
        // else{
        //     errorstateforemail("Email Can't be empty")
        // }
        // if(name=='adminname' && value!='')
        // {  
        //     errorstateforadminname('')
        // }
        // else{
        //     errorstateforadminname("Admin Name Can't be empty")
        // }
         if(name=='password' && value!='')
        {  
        //     errorstateforpassword('');
            const passwordvalue=value;
            
             
             
            setstateforpassword1(passwordvalue);
         }
        // else{
        //     errorstateforpassword("Password Can't be empty")
        // }
         if(name=='confirmpassword' && value!='')
         {
             const passwordvalue1 = value;
             
             
             setstateforpassword2(passwordvalue1);
        //     errorstateforconfirmpassword('');
         }
        //  alert(passwordcheck1.length)
        //  if(passwordcheck1==passwordcheck2)
        //  {
        //     alert("password match");
        //  }
        //  else{
        //     alert("password not match")
        //  }
        // else{
        //     errorstateforconfirmpassword("Confirm Password Can't be empty")
        // }

        setadminState(prevState => ({
            ...prevState,
            [name]: value
        }))
        
    }

    const handleSubmitClick = () => {
    }

    const handledeleteClick = ()=>{
        
        alert("delete")
    }
    const changepassword =()=>{
        alert("change password")
    }
    useEffect(() => {
        myFunction();
    },[]);
    const myFunction = () => {
        axios.post('https://admin.myhomekeeper.co/api/homekeepermyadmins')
        .then(response => {
            const personss = response.data.getmyadmins;
            console.log("persondata", personss)
            let data=[];
            for (let index = 0; index < personss.length; index++) {
                data.push({
                    id: index+1,
                    username: personss[index].adminname,
                    emailaddress: personss[index].emailaddress,
                    access: personss[index].access,
                    action: <><i data-bs-toggle="modal" data-bs-target="#modalforupdate" onClick={() => { handleSubmitClick() }}><img src="/../adminasset/images/penedit.png" /></i> <i onClick={() => {
                        const confirmBox = window.confirm(
                            "Do you really want to delete this Row?"
                        )
                        if (confirmBox === true) {
                            handledeleteClick()
                        }
                    }}><img src="/../adminasset/images/delete.png" /></i> <i data-bs-toggle="modal" data-bs-target="#modalforupdatepassword"  onClick={() => { changepassword() }}><img src="/../adminasset/images/lockpass.png" /></i></>
                })

            }

            setpersons(data);
            console.log("thisdataforadminlist", data);
            })
        }

        const sendDetailstoServer = () => {
            // alert(stateadmin.adminname)
            // alert(stateadmin.lname)
            // alert(stateadmin.email)
            // alert(stateadmin.phone)
            // alert(stateadmin.password)
            alert(userinfo);
            console.log("userinfo", userinfo);
        // let formdata = new FormData();
        // formdata.append('adminname', stateadmin.adminname);
        // formdata.append('lname', stateadmin.lname);
        // formdata.append('email', stateadmin.email);
        // formdata.append('phone', stateadmin.phone);
        // formdata.append('password', stateadmin.password);
        // axios.post('https://admin.myhomekeeper.co/api/homekeeperaddmyadmins',formdata)
        //     .then(response => {
        //         const personss = response.data.getmyadmins;
        //         console.log("persondata", personss)
        //         // setpersons(data);
        //     })
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
                    
                    <h2><a className="filter"><i className="fa-solid fa-filter"></i><i className="fa-solid fa-xmark"></i></a> Admin Users <span className="main_spn hh"><button className='btn' data-bs-toggle="modal" data-bs-target="#modalforadd">+ Add New Admin</button> <span className="show">Show : <label>entries</label></span></span></h2>
                    <div className="table-responsive">
                        <table className="table usts">
                            <thead>
                                
                            </thead>
                            <DataTable
                                // pagination
                                columns={columns}
                                data={persons}
                            />
                            <tbody>
                                

                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-sm-5">
                                <p className="pb-0 pt-2">{page ? page : 1} of 1</p>
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


        {/* modal for add adminusers */}

        <div className="modal fade" id="modalforadd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing " >
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <h4>Name of Maintenance</h4> */}
<h4>Admin Information</h4>
                        <form onSubmit={submittemplate}>
                            <input type="hidden" name='id' onChange={inputsHandler}></input>
                            <div className="row">
                                <div className="col-6">
                                    <label>First Name*</label>
                                    <input className="form-control" type="text" name="adminname" onChange={inputsHandler} placeholder='Enter First Name' />
                                    {errorforadminname}
                                </div>
                                <div className="col-6">
                                    <label>Last Name*</label>
                                    <input className="form-control" type="text"  name="lname" onChange={inputsHandler} placeholder='Enter Last Name' />
                                    {errorforlname}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <label>Email*</label>
                                            <input className="form-control" type="text" name="email" placeholder='Enter Email' onChange={inputsHandler} />
                                            {errorforemail}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label>Mobile*</label>
                                    <input className="form-control" type="text" name="phone" placeholder='Enter Mobile' onChange={inputsHandler} />
                                    {errorforphone} 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Password*</label>
                                    <input className="form-control" type="text" name="password" placeholder='Enter Password' onChange={inputsHandler} />
                                    {errorforpassword}
                                </div>
                                <div className="col-6">
                                    <label>Confirm Password*</label>
                                    <input className="form-control" type="text" name="confirmpassword" placeholder='Enter Confirm Password' onChange={inputsHandler} />
                                    {errorforconfirmpassword}
                                </div>
                                </div>
                            <div className="dps mb-3">
                              <h4 className="mb-2">Access(add)*</h4>
                                <div className="form-check">
                                    
                                    <input className="form-check-input" type="checkbox" name="access" id="flexCheckDefault" value="Home Inspection"  onChange={inputsHandler} />
                                        <label className="form-check-label mt-0" for="flexCheckDefault">
                                            Home Inspection
                                        </label>
                                </div>
                                <div className="form-check">
                                    
                                    <input className="form-check-input" type="checkbox" name="access" id="flexCheckDefault" value="Users" onChange={inputsHandler} />
                                        <label className="form-check-label mt-0" for="flexCheckDefault">
                                            Users
                                        </label>
                                </div>
                                <div className="form-check">
                                    
                                    <input className="form-check-input" type="checkbox" value="Accounting" name="access" id="flexCheckDefault" onChange={inputsHandler} />
                                        <label className="form-check-label mt-0" for="flexCheckDefault">
                                            Accounting
                                        </label>
                                </div>
                                <div className="form-check">
                                    
                                    <input className="form-check-input" type="checkbox" name="access" value="CMS"  id="flexCheckDefault" onChange={inputsHandler} />
                                        <label className="form-check-label mt-0" for="flexCheckDefault">
                                            CMS
                                        </label>
                                </div>
                                <div className="form-check">
                                    
                                    <input className="form-check-input" name="access" type="checkbox" value="Super Admin" id="flexCheckDefault" onChange={inputsHandler} />
                                        <label className="form-check-label mt-0" for="flexCheckDefault">
                                            Super Admin
                                        </label>
                                </div>

                            </div>

                            <div className="modal-footer p-0">

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" >Save Changes(add)</button>

                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>


        {/* modal for update adminusers */}


        <div className="modal fade" id="modalforupdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing " >
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <h4>Name of Maintenance</h4> */}
                        <h4>Admin Infomation</h4>

                        <form>
                            <input type="hidden" name='id' onChange={inputsHandler}></input>
                            <div className="row">
                                <div className="col-6">
                                    <label>First Name*</label>
                                    <input className="form-control" type="text" name="fname" onChange={inputsHandler} />
                                </div>
                                <div className="col-6">
                                    <label>Last Name*</label>
                                    <input className="form-control" type="text" name="lname" onChange={inputsHandler} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <label>Email*</label>
                                            <input className="form-control" type="text" name="email" onChange={inputsHandler} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <label>Mobile*</label>
                                    <input className="form-control" type="text" name="phone" onChange={inputsHandler} />


                                </div>
                            </div>
                            
                            <div className="dps mb-3">
                                <h4 className="mb-2">Access*</h4>
                                <div className="form-check">

                                    
                                    <label className="form-check-label mt-0" for="flexCheckDefault"> 
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> Default checkbox
                                    </label>
                                    </div>
                             
  <div className="form-check">
                                    
                                    <label className="form-check-label mt-0" for="flexCheckDefault">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> Default checkbox
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer  p-0">

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>

                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>


        {/* modal for update password adminusers */}


        <div className="modal fade" id="modalforupdatepassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal" >
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <h4>Name of Maintenance</h4> */}

                        <form>
                            <input type="hidden" name='id' onChange={inputsHandler}></input>
                            <div className="row">
                                <div className="col-6">
                                    <label>Password*</label>
                                    <input className="form-control" type="text" name="fname" onChange={inputsHandler} placeholder='Enter Password' />
                                </div>
                                <div className="col-6">
                                    <label>Confirm Password*</label>
                                    <input className="form-control" type="text" name="lname" onChange={inputsHandler} placeholder='Enter Confirm Password' />
                                </div>
                            </div>
                            
                            <div className="modal-footer access">

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
export default Adminusers;


