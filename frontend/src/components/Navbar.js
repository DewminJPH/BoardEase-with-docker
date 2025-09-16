import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

function navbar(){
    return(
        <div>
          <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
          <></>
        </div>
    );
}
export default navbar;