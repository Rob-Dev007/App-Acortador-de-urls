import UseTheme from "../hooks/UseTheme";

const Input = ({ label,type, name, value, placeholder, changeEvent, as })=>{

    const { theme } = UseTheme();
    return (
        <div className="flex flex-col p-2 gap-1 rounded-xl">
            <label htmlFor={name} className="font-bold" >{ label }</label>
            <input 
                type={ as === 'input' ? type : undefined  } 
                className={`
                    ${theme === 'dark'
                        ? 'bg-transparent placeholder:text-darkTextSecondary border-gray-300 focus:border-gray-600 hover:border-b-gray-50'
                        : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'
                    }
                    w-full px-3 py-2 rounded-lg outline-none border-b-4 text-xl focus:border-b-4
                     ${as === "textarea" ? "min-h-[80px] resize-none overflow-hidden align-top" : ""}`}
                name={ name } value={ value } placeholder={ placeholder } onChange={ changeEvent }/>
        </div>
    )
}

export default Input; 