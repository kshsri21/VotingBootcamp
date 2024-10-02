import { Link } from "react-router-dom";
import {toast} from "react-hot-toast"
import "./Navigation.css";
const Navigation = () =>{
    return(
    <header>
      <nav className="navbar">
        <ul className="navbar__list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register-voter">Register Voter</Link></li>
            <li><Link to="/register-candidate">Register Candidate</Link></li>
            <li><Link to="/voter-list">Voter List</Link></li>
            <li><Link to="/candidate-list">Candidate List</Link></li>
            <li><Link to="/election-commision">Election Commision</Link></li>
            <li><Link to="/token-marketplace">Token Marketplace</Link></li>
        </ul>
      </nav>
    </header>
    )
 
}
export default Navigation;