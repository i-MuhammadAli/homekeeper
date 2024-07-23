import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Footer from "../footer/Footer";
import Header from "../header/Header2";

import { setClientFirstName } from "../../store";

function AddClientInfo1({ onContinue }) {
  const dispatch = useDispatch();

  const { firstName } = useSelector((state) => {
    console.log(state);
    return state.clientForm.form;
  });

  console.log(firstName);

  const onFirstNameChange = (event) => {
    dispatch(setClientFirstName(event.target.value));
  };

  return (
    <>
      <Header />
      <section className="agent_dashboard add_client">
        <div className="container">
          <h3>
            <a href="/">
              <i className="fa-solid fa-arrow-left"></i>
            </a>{" "}
            Add/Edit Client
          </h3>
          <div className="strow">
            <form onSubmit={onContinue}>
              <input type="hidden" name="typepartner" value=""></input>
              <div className="row">
                <div className="col-sm-5">
                  <div className="form-group">
                    <label>
                      First Name <span>*</span> :
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="fname"
                      value={firstName}
                      onChange={onFirstNameChange}
                    />
                  </div>
                </div>
                <div className="col-sm-12 mt-4">
                  <button className="submit" type="submit">
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AddClientInfo1;
