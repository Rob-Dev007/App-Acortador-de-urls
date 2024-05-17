
import { FaGithub, FaLink, FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import DropDownBtn from './dropDownBtn';
import { Link } from 'react-router-dom';
import  { useTheme }  from './themeProvider';
import { useState } from 'react';

const Header = ( )=>{
    const [ open, setOpen] = useState(false);

    const toggleDropDown = ()=>{
        setOpen( (open) => !open )
    };

    const { setTheme } = useTheme();

    const lightTheme = ()=>{
        setTheme('light');

        console.log('El tema es claro')
    };

    const darkTheme = ()=>{
        setTheme('dark');
        console.log('El tema es oscuro')
    };

    const setSystemTheme = ()=>{
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemPreference);
        console.log('El tema es del sistema')
    };



    return(
        <div >
            <nav className={`bg-slate-500 h-8 w-full flex justify-between items-center py-8 px-3 md:p-8 text-white`}>
            <div className='flex items-center gap-3'>
                <Link to='/'><p>Small-link</p></Link>
                < FaLink />
            </div>
            <div className='flex justify-between gap-5 items-center'>
                <h3 className='font-bold'>Sign In</h3>
                <FaGithub />
                <h3 className='flex items-center gap-1 font-bold'>Theme 
                <span> 
                    <DropDownBtn 
                    className={`${open ? 'menu-dropdown.active' : 'menu-dropdown.inactive' }`} 
                    open={ open } 
                    toggle={ toggleDropDown } />
                </span>
                </h3>
                <div open={ open } className={`menu-dropdown ${open ? 'active' : 'inactive'}`}>
                    <ul>
                    <li className="dropdown-list">
                    <button 
                    onClick={ lightTheme } 
                    className='dropdown-a'><FaSun /> Light </button>
                    </li>
                    <hr />
                    <li className="dropdown-list">
                    <button 
                    onClick={ darkTheme } 
                    className='dropdown-a'><FaMoon /> Dark </button>
                    </li>
                    <hr />
                    <li className="dropdown-list">
                    <button 
                    onClick={ setSystemTheme } 
                    className='dropdown-a'><FaDesktop /> System </button>
                    </li>
                    </ul> 
                </div>
            </div>
            </nav>
        </div>
    )

};

export default Header;