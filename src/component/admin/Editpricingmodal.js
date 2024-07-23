import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function Editpricingmodal() {
    return (<>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Pricing</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4>Coustomer Information</h4>

                        <form>
                            <div className="row">
                                <div className="col-12">
                                    <label>Pricing Name</label>
                                    <input className="form-control" type="text" name=""/>
                                </div>
                                <div className="col-6">
                                    <label>Pricing Amount</label>
                                    <input className="form-control" type="text" name=""/>
                                </div>
                                <div
                                    className="col-6">
                                    <label>User Count</label>
                                    <input className="form-control" type="text" name=""/>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Editpricingmodal;




