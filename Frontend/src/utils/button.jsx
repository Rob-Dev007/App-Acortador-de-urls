const Button = ({type, children, handleClick, disabled, className=''})=>{

    return(
            <button className={className} onClick={ handleClick } disabled={disabled} type={type}>{children}</button>
    )

}

export default Button;