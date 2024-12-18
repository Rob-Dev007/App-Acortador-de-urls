import { ImFilesEmpty } from 'react-icons/im';
import { useState } from 'react';
import UseTheme from '../hooks/UseTheme';
import Alerta from '../helpers/Alerta'
import { FaSearch } from 'react-icons/fa';
import useUrl from '../hooks/useUrl';
import Urls from './Urls';

const Dashboard = ()=>{

    const [ mostrarForm, setMostrarForm ] = useState(false);
    const [ urlDestino, setUrlDestino ] = useState('');
    const [ customUrl, setCustomUrl ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');

    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();
    const { guardarUrl, urlRecortada } = useUrl();

    const handleSubmit = async e =>{
        e.preventDefault();

        if(!urlDestino){
            setAlerta({ 
                msg: 'URL es obligatorio',
                error : true 
            })
            return;
        };

        setAlerta({});
        guardarUrl({ urlDestino, customUrl, descripcion });
    }

    const { msg } = alerta;

    return(
        <div className='container mx-auto'>
            <div className='flex justify-between items-center mx-2'>
                <form className="input-container">
                    <input 
                    className= {`${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} input-box`} 
                    type="search" 
                    placeholder="Encuentra tu link"
                    />
                    <FaSearch className="input-icon"/>
                </form>
                <div>
                    <button 
                    className='p-2 border-2 font-bold rounded-xl'
                    onClick={ ()=> setMostrarForm(true) }
                    >
                        Crear link
                    </button>
                </div>
            </div>
            <div className='flex items-center flex-col gap-4 my-20 lg:my-44'>
                <>
                { urlRecortada.length ? 
                (<>
                 {urlRecortada.map(url=>(
                    <Urls 
                        key={ url._id }
                        url={ url }
                    />
                 ))  
                }
                </>) :
                (<>
                    <div className='flex flex-col items-center gap-4'>
                        <ImFilesEmpty className='text-6xl'/>
                        <h2 className='text-2xl font-bold'>Sin enlaces por el momento</h2>
                        <button 
                            className='border-4 p-2 rounded-xl uppercase font-bold hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2'
                            onClick={ ()=> setMostrarForm(true) }
                        >
                            Crear link
                        </button>
                    </div>
                </>)
                }
                </>
            </div>
            {mostrarForm && 
            <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40'>
                <div className= 'rounded-xl fixed inset-0 flex justify-center items-center z-50'>
                    <form 
                        className={`${mostrarForm ? 'block' : 'hidden'} ${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} flex flex-col gap-4 w-full md:w-3/4 lg:w-1/3 h-2/3 lg:h-3/5 px-4 py-8 rounded-xl mx-1`}
                        onSubmit={ handleSubmit }
                     >
                    <label 
                    className='font-bold uppercase'
                    htmlFor="Url destino">
                        Url Destino
                    </label>
                    <input 
                    id='Url destino'
                    type="text"
                    value={ urlDestino }
                    onChange={ e => setUrlDestino(e.target.value) }
                    placeholder='Ingresa el enlace a recortar'
                    className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 `}
                    />
                    <label 
                    className='font-bold uppercase'
                    htmlFor="shortUrl">
                        Alias Url (Opcional)
                    </label>
                    <input  
                        id='shortUrl'
                        type="text"
                        defaultValue={ customUrl }
                        onChange={ e => setCustomUrl(e.target.value)}
                        placeholder='Personaliza tu URL recortado'
                        className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 `}
                    />
                    <label
                    className='font-bold uppercase'
                    >
                        Descripcion (Opcional)
                    </label>
                    <textarea
                    value={ descripcion }
                    onChange={ e => setDescripcion(e.target.value) }
                    placeholder='Ingresa una descripcion de tu URL'
                    className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 resize-none h-44`}
                    ></textarea>
                    <div className='flex justify-between'>
                        <button
                        className="block text-center mt-3 text-lg rounded-full border-4 px-4 hover:bg-red-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2" 
                        onClick={ ()=> setMostrarForm(false) }
                        >
                            Cancelar 
                        </button>
                        <input
                        className='hover:text-gray-400 font-black cursor-pointer'
                        type="submit"
                        value="Crear Url"
                        />
                    </div>
                    </form>
                </div>
                    { msg && 
                        <Alerta 
                            alerta = { alerta }
                        />
                        
                    }
                    
            </div>
            }
        </div>
    )
};

export default Dashboard