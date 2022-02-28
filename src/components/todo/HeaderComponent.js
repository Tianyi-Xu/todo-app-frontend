import { useNavigate, Link} from "react-router-dom";
import AuthenticationService from "./AuthenticationService";


const HeaderComponent = () => {
    const isUserLoggedIn = AuthenticationService.isLoggedIn();
    const username = AuthenticationService.getLoggedInUser()
    const navigate = useNavigate();  // rerender the page
    console.log(isUserLoggedIn);
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="" className="navbar-brand">
              Skye's Todo List
            </a>
          </div>
          <ul className="navbar-nav">
            {isUserLoggedIn && <li><Link className="nav-link" to= {`welcome/${username}`}> Home</Link></li>}
            {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
          {!isUserLoggedIn &&<li><Link className="nav-link" to="/login">Login</Link></li>}
          {isUserLoggedIn &&<li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
          </ul>
        </nav>
      </header>
    );
  };

  export default HeaderComponent;