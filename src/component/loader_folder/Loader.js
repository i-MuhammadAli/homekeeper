import React from "react";
function Loader() {
    return (<div className="modal" id="modal-loading" style={{display:'block'}} data-backdrop="static">
        <div className="modal-dialog modal-sm">
            <div className="modal-content">
                <div className="modal-body text-center">
                    <div className="loading-spinner mb-2"></div>
                    <div>Loading</div>
                </div>
            </div>
        </div>
    </div>);
}
export default Loader;
