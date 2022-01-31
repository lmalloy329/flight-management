import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container m-5 p-5">
    <div className="card bg-subtle shadow-lg m-5 p-5">
      <h1 className="text-center">404 - Not Found!</h1>
      <div className="row">
        <Link className="btn btn-personal col-4 offset-md-4" to="/">
          Go Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
