import React from 'react';
import { useLocation } from 'react-router-dom';

 const Thankyou =()=>  {
     const state=useLocation();
     console.log("thankyouu",state.state);
     var type=state.state;
 
        return (
         
            <h1>Login Successfull <span>{type}</span></h1>
         
        );
   
}

export default Thankyou;