import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import App from "./App";
import ContactState from "./context/contact/ContactState";

ReactDOM.render(
    <React.StrictMode>
        <ContactState>
            <Router>
                <App/>
            </Router>
        </ContactState>
    </React.StrictMode>,
    document.getElementById("root")
);
