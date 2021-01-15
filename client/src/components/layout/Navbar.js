import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({title, icon}) => {
    return (
        <div className="navbar bg-primary">
            <h1><NavLink to="/"><i className={icon}/></NavLink> {title}</h1>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
};

export default Navbar;