import { FaGithub, FaLink, FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import DropDownBtn from './dropDownBtn';
import { Link } from 'react-router-dom';
import UseTheme from '../hooks/UseTheme';
import { useState } from 'react';

const Header = ( )=>{
    const [ open, setOpen] = useState(false);

    const toggleDropDown = ()=>{
        setOpen( (open) => !open )
    };

    const { theme, toggleTheme, detectSystem } = UseTheme();

    return(
        <header>
            <nav className={`bg-gradient-to-r from-stone-500 to-stone-800 h-8 w-full flex justify-between items-center py-8 px-3 md:p-8 text-white`}>
            <div className='flex items-center gap-3'>
                <Link to='/'><p>Small-link</p></Link>
                < FaLink />
            </div>
            <div className='flex md:justify-between gap-3 lg:gap-5 items-center'>
                <Link to='/login' className='font-bold text-sm md:text-lg hover:text-stone-200'>Sign In</Link>
                <Link to='/registrar' className='font-bold text-sm md:text-lg hover:text-stone-200'>Sign Up</Link>
                <Link to='/https://github.com/Rob-Dev007/AppWebUrlShortener' className='hover:text-stone-200 pointer'>
                    <FaGithub/>
                </Link>
                <h3 className='flex items-center gap-1 font-bold text-sm md:text-lg'>Theme 
                <span> 
                    <DropDownBtn 
                    open={ open } 
                    className={`${open ? 'menu-dropdown.active' : 'menu-dropdown.inactive' }`} 
                    toggle={ toggleDropDown } />
                </span>
                </h3>
                <div open={ open } className={`menu-dropdown ${open ? 'active' : 'inactive'} ${theme === 'dark' ? 'bg-stone-800' : 'bg-white' }`}>
                    <ul>
                    <li className="dropdown-list">
                    <button 
                    onClick={ toggleTheme } 
                    className='dropdown-a'><FaSun /> Light </button>
                    </li>
                    <hr />
                    <li className="dropdown-list">
                    <button 
                    onClick={ toggleTheme } 
                    className='dropdown-a'><FaMoon /> Dark </button>
                    </li>
                    <hr />
                    <li className="dropdown-list">
                    <button 
                    onClick={ detectSystem } 
                    className='dropdown-a'><FaDesktop /> System </button>
                    </li>
                    </ul> 
                </div>
            </div>
            </nav>
        </header>
    )

};

export default Header;