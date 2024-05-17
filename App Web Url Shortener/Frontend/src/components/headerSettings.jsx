import { Link } from "react-router-dom";
import { FaSearch, FaLink, FaCog} from "react-icons/fa";

const HeaderSettings = ()=>{
    return(
        <div className="my-12" id='dashboard'>
        <nav className="flex justify-center">
            <ul className="flex py-3 gap-8">
                <li>
                    <Link className="font-bold text-xl flex items-center justify-center gap-1 underline-hover" to='/dashboard'>Enlaces <FaLink /></Link>
                </li>
                <li>
                    <Link className="font-bold text-xl flex items-center justify-center gap-1 underline-hover" to="/dashboard/configuracion" >Configuración <FaCog /></Link>
                </li>
            </ul>
        </nav>
        <div className="input-container">
        <input 
        className="input-box"
        type="search" 
        placeholder="Encuentra tu link"
        />
        <FaSearch className="input-icon"/>
        </div>
        </div>
    )
};

export default HeaderSettings;