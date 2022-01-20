import classNames from "classnames";
import { ReactComponent as Icon } from '../../assets/logo.svg';
import AuthContext from "../auth/context";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import './Header.css';
import NewAdvertPage from "../anuncios/NewAdvertsPage/NewAdvertsPage";

function Header({ className }) {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <p >Home</p>
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
        >
         <p>New Adverts</p> 
        </NavLink>
         {isLogged ? (
          <button className="btn btn-primary btn-lg btn-block"  onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <button
            variant="primary"
           className="btn btn-primary btn-lg btn-block" 
            as={Link}
            to="/login"
          >
            Log in
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
