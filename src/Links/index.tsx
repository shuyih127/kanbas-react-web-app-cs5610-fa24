import { Link } from "react-router-dom";

export default function Links(){
    return(
        <div>
            <Link to="/Labs">Landing Page</Link>
            <h1>
                Links to all relevant source code repositories
            </h1>
            <h3>Github repository
                <a href="https://github.com/shuyih127/kanbas-react-web-app-cs5610-fa24" id="wd-github">Click here</a>
            </h3>
            <h4>
                Code for A1 is all based on lecture videos.
            </h4>
        </div>


    );
}