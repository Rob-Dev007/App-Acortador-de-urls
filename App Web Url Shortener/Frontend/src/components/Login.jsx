import { Link } from "react-router-dom";
import { useState } from "react";


const Login = ()=>{

    const [ correo, setCorreo] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
    };
    return(
        <div id="login" className="container mx-auto md:grid grid-col justify-center items-center">
            <form 
            onSubmit={ handleSubmit }
            className="flex flex-col px-4 py-8 w-[440px] gap-2 shadow-xl rounded-xl">
                <label className="font-bold">Correo</label>
                <input 
                type="email"
                name="correo"
                value={ correo }
                onChange={ e => { setCorreo(e.target.value) } }
                placeholder="Ingresa tu email"
                className="p-2 rounded outline-none border-b-4 border-b-black text-xl placeholder:text-xl"
                />
                <label className="font-bold">Contraseña</label>
                <input 
                type="password"
                name="password"
                value={ password }
                onChange={ e => { setPassword(e.target.value) } }
                placeholder="Ingresa tu contraseña"
                className="p-2 rounded outline-none border-b-4 border-b-black text-xl placeholder:text-xl"
                />
                <input 
                type="submit"
                value="Registrate"
                className="my-3 border-2 rounded"
                />
                <div className="flex gap-4">
                    <Link className="text-sm" to='/registrar'>¿No tienes una cuenta? <strong> Registrate</strong></Link>
                    <Link className="text-sm"to='/olvide-password'>¿Olvidaste tu contraseña? <strong>Recuperala</strong></Link>
                </div>
            </form>
        </div>
    )

};

export default Login;