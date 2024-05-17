import { Link } from "react-router-dom";
import { FaCut } from "react-icons/fa";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import Swal from "sweetalert2";

const Home = ()=>{

    const [ originalUrl, setOriginalUrl ] = useState('');
    const [ shortLink, setShortLink ] = useState('');
    const [ error, setError ] = useState('');

    const readInput = (e)=>{
        setOriginalUrl(e.target.value);
    };

    const urlShort = async ()=>{
        try {
            const response = await fetch('https://shrtlnk.dev/api/v2/link', {
                method: 'POST',
                headers: {
                    'api-key': 'iDrrth2R8FDGRnTGRIupCRNIG3jhbZr5Gx7hHRpE2TV8H',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  url: originalUrl, //Link original tipado
                }),
              });

            if(!response.ok){
                throw new Error('Error al acortar el enlace');
            }

            const data = await response.json();
            setShortLink(data.shrtlnk);
            setError('');

        } catch (error) {
            setError('¡ERROR! Por favor, inténtalo de nuevamente.');
        }
    }

    const showAlerta = ()=>{
        Swal.fire({
            title : '¡Aviso!',
            text : 'Texto copiado correctamente.',
            icon : 'warning',
            confirmButtonText : 'Aceptar',
            customClass :{
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-confirm-button'
            }
        });
    };


    
    const copyLink = ()=>{
        navigator.clipboard.writeText(shortLink)
        .then(()=> showAlerta())
        .catch((error) => console.log('Error al copiar el enlace', error))
    }

    return(
        <div>
            <div className="my-36">
                <h1 className="text-6xl text-center my-8">
                    Gestor de Enlaces
                </h1>
                <h2 className="text-2xl md:text-3xl text-center mx-12">
                    Esta App esta diseñada para acortar tus links y te ayudará a administrar tus enlaces
                </h2>
            </div>
            <div className="mx-4 md:mx-28 lg:mx-96">
                <input 
                className="flex h-12 w-full bg-slate-200 outline-none p-3 rounded-md md:text-xl text-lg" 
                placeholder="Recorta tu url"
                type="texto"
                value={ originalUrl }
                onChange={ readInput }/>
                <div className="flex justify-end mt-3 md:mt-2">
                    <button className='flex items-center justify-center md:gap-3 gap-2 bg-slate-700 md:p-3 p-2 text-white rounded-lg font-bold'
                    onClick={ urlShort }
                    >
                        Acorta el Url 
                        <FaCut />
                    </button >
                </div>
                {shortLink && (
                <div className="flex w-full justify-center gap-3 mt-8 md:mt-3 items-center">
                    <p>URL acortada:</p>
                        <a href={ shortLink } target="_blank" rel="noopener noreferrer"><strong>{ shortLink }</strong></a>
                        <button 
                        className="bg-green-500 h-8 w-8 flex justify-center items-center rounded-md"
                        onClick={ copyLink }
                        ><FaClipboard /></button>
                </div>
                )}
                {error && <p className="bg-red-500 h-auto w-full md:w-[50%] mx-auto mt-3  p-2 text-white font-bold uppercase rounded-sm text-center">{error}</p>}
            </div>
            <div className="flex w-full justify-center items-center">
                <Link to="/dashboard" className="btn">Gestiona tus enlaces</Link>
                <Link to="https://github.com/Rob-Dev007/AppWebUrlShortener" 
                className="btn"
                target="_blank">Empieza en github</Link>
            </div>

        </div>
    )

};

export default Home;