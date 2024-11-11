import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:4000/images/"

  function handleLogout(){
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <img style={{height:"40px",widthp:"40px",paddingLeft:"30px"}} src="data:image/png;base64,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" alt="" />
      <div className="top" style={{marginLeft:"20px"}}>
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              BLOGS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              WRITERS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
