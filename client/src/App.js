import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import {Route, Switch} from "react-router-dom";
import "./App.css";

const App = () => {
    return (
        <>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                </Switch>
            </div>
        </>
    );
};

export default App;
