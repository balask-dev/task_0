import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function getCats() {
      const res = await axios.get("http://localhost:4000/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar" style={{borderRadius:"4px",width:"100px"}}>
      <div className="sidebarItem" >
        <span className=" " style={{marginTop:"7px",}}>ABOUT ME</span>
        <img className="img7" height="130px" width="130px"
          src="https://img.mensxp.com/media/content/2019/Sep/reasons-why-dulquer-salmaan-is-worth-all-the-hype-amp-deserves-to-be-b-towns-latest-youth-icon-740x500-4-1568898050.jpg?w=500&h=648"
          alt=""
        />
        <p>
          i am bala, space science and technology blogger...explorer
        </p>
      </div>
      <div className="sidebarItem">
        <span className=" " style={{marginBottom:"10px"}}>CATEGORY</span>
        <ul className="sidebarList">
          <div>Space and Technology - Electronics - Science</div>
         


          {cats.map((c) => (
            <Link to={`http://localhost:4000/api/categories/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
       
    </div>
  );
}
