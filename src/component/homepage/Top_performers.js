import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Top_performers() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const sendDetailsToServer = async () => {
        // setError([]);
        let formdata = new FormData();
        formdata.append('email', state.email);
        formdata.append('password', state.password);
        axios.post("https://connectbiz.in/api/login", formdata)
            .then(function (response) {
                console.log('response', response.data);
                if (response.data.status == 'success') {
                    console.log("asdfsadfsdaf", response.data.data.usertype);
                    navigate('/Thankyou', { state: response.data.data.usertype })
                } 
            })
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        let errors = [];
        const isEmpty = Object.values(state).every(x => x === null || x === '');
        if (isEmpty == false) {
            sendDetailsToServer()
            // if (state.password === state.confirmPassword) {
            //     
            // } else {
            //     errors.push('password mismatch');
            // }
        }
        // setError(errors);
    }

    // const togglePassword=()=>
    // {
    //     alert("tasfa");
    //     setviewpassword(true);
    // }

    return (<>
        




        <section className="top_performers">
            <div className="container">
                <div className="heading text-center">
                    <h6>Trusted by top performers</h6>
                    <h1>The #1 CRM choice for growing teams and<br/>high-producing agents</h1>
                </div>

                {/* <div className="owl-carousel performers_carousel owl.carousel.min owl-theme"> */}
                    <OwlCarousel className='owl-carousel performers_carousel owl.carousel.min  owl-theme' loop margin={20} nav>
                    <div className="item">
                        <img src="asset/images/web1.png" alt="web" />
                    </div>
                    <div className="item">
                    
                        <img src="asset/images/web2.png" alt="web" />
                    </div>
                    <div className="item">
                        <img src="asset/images/web3.png" alt="web" />
                    </div>
                    <div className="item">
                        <img src="asset/images/web4.png" alt="web" />
                    </div>
                    <div className="item">
                        <img src="asset/images/web5.png" alt="web" />
                    </div>
                    <div className="item">
                        <img src="asset/images/web6.png" alt="web"/>
                    </div>
                    <div className="item">
                        <img src="asset/images/web7.png" alt="web" />
                    </div>
                    <div className="item">
                        <img src="asset/images/web1.png" alt="web" />
                    </div>
                    </OwlCarousel>
                {/* </div> */}
                <div className="text-center">
                    <a href="#">See real customer results <i className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </section>

        {/* <Forgotpassword /> */}
    </>)



}


export default Top_performers;


