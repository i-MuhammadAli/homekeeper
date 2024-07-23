import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Passwordchanged = () => {


    return (<>
<Header />
        <section className="verify password_cng  text-center">
            <div className="container">
                <form>
                    <img src="asset/images/secf.png" alt="img" />
                    <h1>Password Changed!</h1>
                    <p>Your Password has been changed successfully</p>
                    {/* <button className="btn" type="submit">Go to Log In</button> */}
                    <Link className="btn" to="/login">Back to Log In</Link>
                    {/* <Link className="btn mt-2" to="/adminlogin">Go to Admin Login</Link> */}
                    
                </form>
            </div>
</section >

        <Footer /> </>);

}

export default Passwordchanged;