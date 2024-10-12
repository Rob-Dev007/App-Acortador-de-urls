import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropDownBtn = (props)=>{

    return(
        <>
            <button 
            className='flex items-center'
            open = { props.open }
            onClick ={ props.toggle}
            >
                { props.open ? <FaChevronUp /> : <FaChevronDown /> }
            </button>  
        </>

    )
};

export default DropDownBtn;