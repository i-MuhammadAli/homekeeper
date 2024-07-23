import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Googlerecaptcha = () => {

    function onChange(value) {
        console.log("Captcha value:", value);
    }

    return(
        <ReCAPTCHA
            sitekey="6LcJfkQpAAAAALzm3WqUIk9mns8ppGcKCleTK8JD"
            onChange={onChange}
        />
       
    );

}

export default Googlerecaptcha;