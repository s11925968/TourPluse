import React from "react";

function Loader() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col py-3">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
