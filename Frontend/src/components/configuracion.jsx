import { FaSave, FaTrashAlt, FaDownload } from "react-icons/fa";

const Configuracion = ()=>{
    return(
        <div className="" id="configuracion">
            <HeaderSettings />
            <div className="m-4 md:m-8 border-solid rounded-lg border-slate-500 border-2 md:border-4">
            <form className="m-4 md:m-8 p-2 md:p-4">
                <h2 className="text-3xl font-bold my-4">General</h2>
                <h3 className="text-2xl my-4">Edita tu información personal</h3>
                <label className="text-xl font-bold" for='name'>Tu nombre:</label>
                <input type="text" 
                className="h-10 w-full bg-slate-300 rounded-md p-4 outline-none my-4" id="name" />
                <label className="text-xl font-bold py-2" for='email'>Tu correo:</label>
                <input type="email" 
                className="h-10 w-full bg-slate-300 rounded-md p-4 outline-none my-4" id="email"/>
                <div className="md:flex justify-end my-4">
                    <button className="w-full md:w-44 flex items-center justify-center px-4 py-3 rounded-md border-2 border-solid border-slate-500 gap-3">Guardar <FaSave /> </button> 
                </div>
            </form>
            </div>
            <div className="m-4 md:m-8 border-solid rounded-lg border-slate-500 border-2 md:border-4">
            <form className="m-4 md:m-8 p-2 md:p-4">
                <h2 className="text-3xl font-bold my-4">Cuenta</h2>
                <h3 className="text-2xl my-4">Edita la información de la cuenta</h3>
                <label className="text-xl font-bold">Tu nombre:</label>
                <div>
                <button type="text" 
                className="h-10 w-full md:w-80 flex items-center justify-center font-bold bg-slate-300 rounded-md p-4 outline-none my-4 gap-4">Exportar enlaces <FaDownload /> </button>
                </div>
                <label className="text-xl font-bold py-2 w-full">Elimina la cuenta: </label>
                <div>
                <button className="w-full md:w-80 flex items-center justify-center gap-4 h-10 bg-red-500 text-white font-bold rounded-md p-4 outline-none my-4">Eliminar <FaTrashAlt /></button>
                </div>
            </form>
            </div>
        </div>

    )

};

export default Configuracion;