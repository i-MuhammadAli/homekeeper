import ReactDOM from 'react-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Googlerecaptcha from './Googlerecaptcha';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import $ from "jquery";
import Sendotp from '../homepage/sendotp';

function Registertitlecompany() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        company: "",
        phone: "",
        cellnumber: "",
        confirmPassword: "",
        type: "",
    })

    var md5 = require('md5');
    var CryptoJS = require("crypto-js");
    const [eError, setEmailError] = useState('')

    const [profilephoto, setFile] = useState()
    const [imagetrue, setimagetrue] = useState()

    const [ephoneerror, setPhoneError] = useState('')

    const [error, setError] = useState([]);

    const [checkedbox, setCheckedbox] = useState(false);

    const [imageerrorforsize, setimageerrorforsize] = useState('');
    const [usphone, setusphone] = useState('')
    const [errorforusphone, setstateforuserror] = useState('')
    const [otpstatus, setotptrue] = useState(0); 
    const [errorforconfirmpassowrd, setErrorforconfirmpassword] = useState('');
    const [tryformeemail, Setstatefortryforme] = useState('');
    const [setnameerror, setstatenameerror] = useState('');
    const [Errorforempty, setErrorforempty] = useState('');
    const [Errorforempty1, setErrorforempty1] = useState('');
    const [errorforpasswordcombination, seterrorforpasswordcombination] = useState('');
    const [errorforpasswordcombination1, seterrorforpasswordcombination1] = useState('');
    const [messageforname, setmessageforname] = useState('');
    const [messageforcompany, setmessageforcompanyname] = useState('');
    const [messageforcellnumber, setmessageforcellnumber] = useState('');
    const [messageforemail, setmessageforemail] = useState('');
    const [messageforpassword, setmessageforpassword] = useState('');
    const [messageforconfirmpassword, setmessageforconfirmpassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name == 'email' && value != '') {
            localStorage.removeItem('tryforfreeemail');
            Setstatefortryforme('')
        }

        if (name == 'phone' && value.length > 12) {

            return;
        }

        

        if (name == 'phone') {
            let newy = value;
            if (value == '123-456-7890' || value == '000-000-0000' || value == '111-111-1111' || value == '222-222-2222' || value == '333-333-3333' || value == '444-444-4444' || value == '555-555-5555' || value == '666-666-6666' || value == '777-777-7777' || value == '888-888-8888' || value == '999-999-9999') {
                // alert("wrong")
                setstateforuserror("Not Valid Mobile Number")
                return false;
            }

            var pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if (pattern.test(value)) {
                setstateforuserror("");
            }
            else {
                setstateforuserror("Not Valid Mobile Number")
                console.log("test failed");
            }


            if (e.keyCode != 8 && e.keyCode != undefined) {
                if (value.length == 3 || value.length == 7) {
                    let cs = '-';
                    let ts = value;
                    newy = ts + cs;

                }
            }
            if (name == 'phone' && value.length == 10) {
                let isnum = /^[0-9]+$/.test(value);
                if (isnum == true) {
                    newy = [value.slice(0, 3), value.slice(3, 6), value.slice(6, 10)].join('-');
                }
                // setusphone(phone);
            }
            setusphone(newy);
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (e.target.files) {
            const image = e.target.files[0];
            setFile(image)
            // console.log("imagechange", image)

            if (!image) {
                // console.log('image is required');
                return false;
            }
            if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                console.log('select valid image.');
                setimageerrorforsize("Please Select Valid Image")
                setimagetrue("false")
                return false;
            }
            // console.log("image name with size",image.size)
            if (image.size > 5000000) {
                // console.log("image size greater than size")
                setimageerrorforsize("Image Not be greater than 5 Mb")
                setimagetrue("false")
            }

            else {
                setimagetrue("true")
                // console.log("please verify")
                setimageerrorforsize("")
            }

        }
    }


    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    const handleChangepassword = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const [viewpassword, setviewpassword] = useState(false);
    const [viewpassword1, setviewpassword1] = useState(false);


    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setviewpassword(!viewpassword);

    };



    const checkboxclick = () => {
        setCheckedbox(!checkedbox)
    }


    const togglePassword1 = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown

        setviewpassword1(!viewpassword1);
    };



    //  const handleSubmitClick = (e) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {

        console.log(data);


        if (data.password == data.confirmPassword) {
            if (data.password.length >= 7) {

                // if (data.phone.length > 11) {
                //     console.log('Please enter valid Phone');
                // }
                // if (data.phone.length < 10) {
                //     console.log('Please enter valid Phone');
                // }
                if (state.password && state.password.length >= 7 && state.password.length <= 18 && data.phone.length == 12) {
                    var phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
                    if (phone_pattern.test(data.phone)) {
                        // console.log("testpass");
                        setstateforuserror("");
                    }
                    else {
                        setstateforuserror("Not Valid Mobile Number")
                        return false;
                    }
                    setErrorforempty("");
                    setErrorforconfirmpassword("");
                    if (state.name && state.name != "") {
                        var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
                        if (pattern.test(state.name)) {
                            if(state.name.length>2)
                            {
                                setstatenameerror("");
                                var passwordpattern = /^\w[a-zA-Z0-9.]*$/
                                if (passwordpattern.test(state.password)) {
                                    console.log("not")
                                }
                                else {
                                    
                                    sendDetailsToServer();
                                }
                            }
                        }
                        else {
                            setstatenameerror("Kindly Check your Name");
                        }
                    }
                }
                else {
                    setstateforuserror("Not Valid Mobile Number")
                }

            }
            // else {
            //     setErrorforconfirmpassword('Password Should atleast 7 character Long');
            // }

        }
        else {
            setErrorforconfirmpassword('Confirm password not match');
        }
    };

    const sendDetailsToServer = async () => {
        var stateemail = $('#emailtype').val();

        
        // alert(state.email)
        var ciphertext = CryptoJS.AES.encrypt(state.phone, 'secret key 123').toString();
        const hashedPassword = md5(state.password)
        if (profilephoto && imagetrue == "true" || !profilephoto) {
        // alert('hiii');
        //setError([]);
        let formdata = new FormData();
        if(state.email=='')
        {
            formdata.append('email', stateemail);
        }
        else{
            formdata.append('email', state.email);
        }
        
        formdata.append('name', state.name);
        formdata.append('type', "titlecompany");
        formdata.append('password', hashedPassword);
        formdata.append('company', state.company);
        // formdata.append('confirmPassword', state.confirmPassword);
        formdata.append('cellnumber', state.phone);
        if(profilephoto)
        {
            formdata.append('profileimage', profilephoto);
        }
            $('.addclass').hide()
            $('#buttonreplacement').show()
        axios.post("https://admin.myhomekeeper.co/api/homekeeperregister", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    localStorage.removeItem('tryforfreeemail');
                    setotptrue(1)
                    const lastinsertedid = response.data.insertedid;
                    localStorage.setItem('token-info', lastinsertedid);
                    localStorage.setItem('token-type', "titlecompany")
                    // alert(response.data.message);

                    // navigate('/Thankyou');
                    // navigate('/Thankyouvalidate')
                } else {
                    setError(response.data.errors);
                    console.log('under error', error);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
        } 
    }
    useEffect(() => {

        var stateemail = $('#emailtype').val();
        
        if (state.email && state.email != "" || tryformeemail != '') {
            // alert(state.email)
            setmessageforemail('')
            let email = ValidateEmail(state.email || tryformeemail);
            if (email == true) {
                setEmailError('');
            } else {
                setEmailError('Please enter valid email');
            }
        }
        else {
            setmessageforemail('Email Field is Required')
            setEmailError('')
        }
        // if (state.phone && state.phone != '') {
        //     if (state.phone.length > 11) {
        //         setPhoneError('Please enter valid Phone');
        //     }
        //     if (state.phone.length < 10) {
        //         setPhoneError('Please enter valid Phone');
        //     }
        //     var pattern = /^((?![0-5])[0-9]{10})$/;

        //     if (pattern.test(state.phone)) {
        //         // if ((state.phone.startsWith("0") !== true)) {
        //         console.log("correct")
        //         setPhoneError('');
        //     }
        //     else {
        //         console.log("not correct")
        //     }
        // }

        if (state.phone && state.phone != '') {
            setmessageforcellnumber('')
        }
        else {
            setmessageforcellnumber('Phone Number is Required')
            setstateforuserror('')
        }

        if (state.name && state.name != "") {
            setmessageforname('');
            var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
            if (pattern.test(state.name)) {
                 if (state.name.length > 2) 
                 {
                setstatenameerror("");
                 }
                 else
                 {
                     setstatenameerror("Kindly Check your Name");
                 }
            }
            else {
                console.log("name is not correct");
                setstatenameerror("Kindly Check your Name");
            }
        }
        else {
            setstatenameerror("");
            setmessageforname('Name Field is Required')
        }

        // var pattern = /^\(\d{3}\)\s*\d{3}(?:-|\s*)\d{4}$/
        // if (pattern.test(string)) {
        //     // string looks like a good (US) phone number with optional area code, space or dash in the middle
        // }

        if (state.company && state.company != '') {
            setmessageforcompanyname('')
        }
        else {
            setmessageforcompanyname('Password Field is Required')
        }

        if (state.password == state.confirmPassword && state.confirmPassword != '') {
            setErrorforconfirmpassword('');
        }
        else {
            if (state.confirmPassword != '') {
                setErrorforconfirmpassword('confirm password not match');
            }
            else {
                setErrorforconfirmpassword('')
            }

        }

        if (state.password && state.password != '') {
            setmessageforpassword('')
        }
        else {
            setmessageforpassword('Password Field is Required')
            setErrorforempty('')
            seterrorforpasswordcombination('')
        }
        if (state.confirmPassword && state.confirmPassword != '') {
            setmessageforconfirmpassword('')
            seterrorforpasswordcombination1('')
        }
        else {
            setErrorforempty1('')
            setmessageforconfirmpassword('Password Field is Required')
        }


        if (state.password && state.password.length <= 7) {
            setErrorforempty("Password Should Greater than 7 characters");
        }
        if (state.password && state.password.length >= 18) {
            setErrorforempty("Password Should less than 18 characters");
        }
        if (state.password && state.password.length >= 7 && state.password.length <= 18) {
            var passwordpattern = /^\w[a-zA-Z0-9.]*$/

            if (passwordpattern.test(state.password)) {
                seterrorforpasswordcombination("Required Strong Password")
                setErrorforempty("");
            }
            else {
                if (/[A-Z]/g.test(state.password) == false) {
                    seterrorforpasswordcombination("Required Strong Password")
                    setErrorforempty("");
                }
                else {
                    if (/\d/g.test(state.password) == false) {
                        seterrorforpasswordcombination("Required Strong Password")
                        setErrorforempty("");
                    }
                    else {
                        setErrorforempty("");
                        seterrorforpasswordcombination("");
                    }

                }

            }
        }



        if (state.confirmPassword && state.confirmPassword.length <= 7) {
            setErrorforempty1("Password Should Greater than 7 characters");
        }
        if (state.confirmPassword && state.confirmPassword.length >= 18) {
            setErrorforempty1("Password Should less than 18 characters");
        }
        if (state.confirmPassword && state.confirmPassword.length >= 7 && state.confirmPassword.length <= 18) {
            var passwordpattern = /^\w[a-zA-Z0-9.]*$/

            if (passwordpattern.test(state.confirmPassword)) {
                seterrorforpasswordcombination1("Required Strong Password")
                setErrorforempty1("");
            }
            else {
                if (/[A-Z]/g.test(state.confirmPassword) == false) {
                    seterrorforpasswordcombination1("Required Strong Password")
                    setErrorforempty1("");
                }
                else {
                    if (/\d/g.test(state.confirmPassword) == false) {
                        seterrorforpasswordcombination1("Required Strong Password")
                        setErrorforempty1("");
                    }
                    else {
                        setErrorforempty1("");
                        seterrorforpasswordcombination1("");
                    }

                }

            }
        }
        if (localStorage.getItem('tryforfreeemail')) {
            console.log('sessionfortryforme', localStorage.getItem('tryforfreeemail'));
            Setstatefortryforme(localStorage.getItem('tryforfreeemail'))
        }
    });

    const showtextgpassword = () => {
        //     const [values, setValues] = React.useState({
        //         password: "",
        //         showPassword: false,

        //     });
    }
    //     const handleClickShowPassword = () => {
    //         setValues({ ...values, showPassword: !values.showPassword });
    //     };

    return (<>
        <Header />
        <section className="login register lenderReg">
            <div className="container">



                <form className="text-start" onSubmit={handleSubmit(onSubmit)}>





                    <h1>Register as Title Company</h1>
                    <div className="form-signin">
                        {error.length > 0 ? <div>

                            {error.map((user, i) => (
                                // <li className="user">{user}</li>
                                <span className="errormessageforalreadyuser">{user}</span>
                            ))}

                        </div> : ""}
                        <h4>Personal Information</h4>


                        <input type="hidden" name="type" className="form-control"
                            value="titlecompany"
                        />


                        <div className="form-group">
                            <label className="st">Full Name<span>*</span>: </label>
                            <input type="text" className="form-control" placeholder="Enter your Name" {...register("name", { required: "Name Field is Required" })} onChange={handleChange} />

                            <ErrorMessage
                                errors={errors}
                                name="name"
                                render={({ message }) => <>{messageforname ? <span className='errormessage'>{messageforname}</span> : ""}</>}
                            />
                            {setnameerror && setnameerror!=='' ?<span className='errormessage'>{setnameerror}</span>:""}
                            
                        </div>

                        <div className="form-group">
                            <label className="st">Company Name<span>*</span>:</label>
                            <input type="text" name="company" className="form-control" placeholder="Enter your Company name" {...register("company", { required: "Company field is Required" })}
                                value={state.company}
                                onChange={handleChange} />
                            <ErrorMessage
                                errors={errors}
                                name="company"
                                render={({ message }) => <>{messageforcompany ? <span className='errormessage'>{messageforcompany}</span> : ""}</>}
                            />
                        </div>

                        <div className="form-group">
                            <label className="st">Email<span>*</span>: </label>
                            <input type="email" className="form-control" id="emailtype" placeholder="Enter your Email" name="email" {...register("email", { required: "Email field is Required" })}
                                value={tryformeemail ? tryformeemail : state.email}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <>{messageforemail ? <span className='errormessage'>{messageforemail}</span> : ""}</>}
                            />
                            {eError && eError !== '' ? <span className='errormessage'>{eError}</span> : ""}
                        </div>

                        

                        <div className="form-group">
                            <label className="st">Mobile Number<span>*</span>: </label>

                            <input type="text" className="form-control inputnumber" placeholder="Enter your Mobile number" name="phone" {...register("phone", { required: "Phone Number is Required" })}
                                value={usphone ? usphone : ""}
                                onKeyDown={handleChange}
                                onChange={handleChange} />
                            <ErrorMessage
                                errors={errors}
                                name="phone"
                                render={({ message }) => <>{messageforcellnumber ? <span className='errormessage'>{messageforcellnumber}</span> : ""}</>}
                            />
                            {ephoneerror && ephoneerror !== '' ? <span className='errormessage'>{ephoneerror}</span> : ""}
                            {errorforusphone ? <span className='errormessage'>{errorforusphone}</span> : ""}

                        </div>

                        <div className="form-group">
                            <label className="st">Password<span>*</span>: </label>
                            <span className="password d-block">

                                <input type={viewpassword ? "text" : "password"} id="password" className="form-control" placeholder="Enter your Password" name="password" {...register("password", { required: "Password Field is required" })}

                                    value={state.password}
                                    onChange={handleChange}
                                />
                               
                                <i className={viewpassword ? "far fa-eye" : "fa fa-eye-slash"} onClick={togglePassword}></i>
                            </span>
                             <ErrorMessage
                                    errors={errors}
                                    name="password"
                                render={({ message }) => <>{messageforpassword ? <span className='errormessage'>{messageforpassword}</span> : ""}</>}
                                />
                             {Errorforempty && Errorforempty !=='' ? <span className="errormessageforlogin">{Errorforempty}</span>: ""}   

                            {errorforpasswordcombination && errorforpasswordcombination !== '' ? <span className='errormessageforlogin'>{errorforpasswordcombination}</span> : ""}
                            
                        </div>
                        <div className="form-group">
                            <label className="st">Confirm Password <span>*</span>: </label>
                            <span className="password d-block">
                                <input type={viewpassword1 ? "text" : "password"} id="confirmPassword" className="form-control" placeholder="Enter your Confirm Password"
                                    name="confirmPassword" {...register("confirmPassword", { required: "Confirm Password is Required" })}
                                    value={state.confirmPassword}
                                    onChange={handleChange} />
                                <i className={viewpassword1 ? "far fa-eye" : "fa fa-eye-slash"} onClick={togglePassword1}></i>
                            </span>
                            
                            <ErrorMessage
                                errors={errors}
                                name="confirmPassword"
                                render={({ message }) => <>{messageforconfirmpassword ? <span className='errormessage'>{messageforconfirmpassword}</span> : ""}</>}
                            />
                            {errorforconfirmpassowrd && errorforconfirmpassowrd !== '' ? <span className='errormessage'>{errorforconfirmpassowrd}</span> : ""}

                            {Errorforempty1 && Errorforempty1 !== '' ? <span className="errormessageforlogin">{Errorforempty1}</span> : ""}
                            {errorforpasswordcombination1 && errorforpasswordcombination1 !== '' ? <span className='errormessageforlogin'>{errorforpasswordcombination1}</span> : ""}



                        </div>

                        <div className="form-group">
                     
                            <label className="st">Profile Photo : </label>
                           {/* <input type="file" className="form-control" placeholder="Cell number" onChange={handleChange} />*/}


  <div className="input-group custom-file-button">
    <span className="input-group-text" for="inputGroupFile">Choose</span>
     <input type="file" className="form-control" placeholder="Cell number" onChange={handleChange} />
  </div>


                           {imageerrorforsize && imageerrorforsize !=='' ? <span className="errormessageforlogin">{imageerrorforsize}</span>: ""} 
                            
                               <p className="mb-0">*Optional to add your Profit & Upload up to 5 MB</p>
                        </div>

                        <div className="form-group">

                            <div className="checkbox">
                                <label><input type="checkbox" checked={checkedbox} className='checkboxclick' onClick={checkboxclick} value="remember-me" />
                                    I agree to the <Link className="tnc" to="/termsandcondition">Terms of Service </Link>
                                    and <Link className="privacy" to="/privacypolicy">Privacy Policy </Link></label>
                            </div>

                            <div className='googlerecaptcha'>

                            </div>
                            {/* <img src="asset/images/robot.jpg" className="img"/> */}
                            <Googlerecaptcha />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-6">
                            <p className="mt-0">** Contrary to popular belief, Lorem lpsum is not simply random text.<br />
                                It has roots in a piece of classNameical Latin literature</p>
                        </div>
                        <div className="col-sm-6">
                            <button className={checkedbox ? 'btn addclass' : 'btn notactive'} type={checkedbox ? 'submit' : 'button'}>Create an Account</button>
                            <div id="buttonreplacement" style={{ marginLeft: "30px" }}>
                                <img src="//www.willmaster.com/images/preload.gif" alt="loading..." />
                            </div>
                            {otpstatus == 1 ? <Sendotp /> : ""}
                        </div>
                    </div>

                </form>
            </div>
        </section>
        <Footer />
    </>)



}


export default Registertitlecompany;


