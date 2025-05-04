import React from "react";
import RegistrationForm from "../components/Registration/Registration";
import {Link} from "react-router-dom";

function Registration() {
    return (
        <div className="container-fluid px-0">
            {/* <h2>Registration Page</h2> */}
            {/* <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                Вернуться на главную
            </Link> */}
            <RegistrationForm />
        </div>
    );
}

export default Registration;
