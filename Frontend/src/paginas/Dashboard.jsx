import { ImFilesEmpty } from 'react-icons/im';
import { useState } from 'react';
import UseTheme from '../hooks/UseTheme';
import Alerta from '../helpers/Alerta'
import { FaSearch } from 'react-icons/fa';
import useUrl from '../hooks/useUrl';
import Urls from './Urls';
import clienteAxios from '../config/axios';

const Dashboard = ()=>{

    const [ mostrarForm, setMostrarForm ] = useState(false);
    const [ urlDestino, setUrlDestino ] = useState('');
    const [ customUrl, setCustomUrl ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ searchResults, setSearchResults ] = useState([]);
    const [ id, setId ] = useState(null);

    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();
    const { guardarUrl, urlRecortada, editarUrl } = useUrl();

    const handleSubmit = async e =>{
        e.preventDefault();

        if(!urlDestino){
            setAlerta({ 
                msg: 'URL es obligatorio',
                error : true 
            })
            return;
        };

        const datos = { urlDestino, customUrl, descripcion };
      
        if (id) {
          // Si hay un id, significa que estamos editando
          try {
            await editarUrl(id, datos); // Llama a la función para editar la URL
            setAlerta({ 
                msg: 'URL editada correctamente', 
                error: false 
            });
          } catch (error) {
            setAlerta({ 
                msg: 'Hubo un error al editar la URL', 
                error: true 
            });
          }
        } else {
            try {
                // Si no hay id, significa que estamos creando
                await guardarUrl(datos);
                setAlerta({
                    msg: 'Url creada correctamente',
                    error: true
                })
            } catch (error) {
                setAlerta({
                    msg: 'Error al crear la Url',
                    error: false
                })
            }
          
          
        }
      
        // Resetea el formulario
        setUrlDestino('');
        setCustomUrl('');
        setDescripcion('');
        setId(null);
        setMostrarForm(false);

        setAlerta({});
    }

    const mostrarFormEditar = (url) => {
        setId(url._id); // Establece el ID de la URL que quieres editar
        setUrlDestino(url.urlDestino || '');
        setCustomUrl(url.customUrl || '');
        setDescripcion(url.descripcion || '');
        setMostrarForm(true); 
    };

    const handleSearch = async e =>{

        e.preventDefault();

        if (!searchTerm.trim()) {
            setAlerta({
                msg: "El campo de búsqueda no puede estar vacío",
                error: true,
            });
            return; 
        }
    
        try {
            const { data } = await clienteAxios.get(`/urls/search`, {
                params: { search: searchTerm.trim() }, // Envía el término de búsqueda como parámetro.
                headers: {
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                },
            });
            setSearchResults(data); // Almacena los resultados en el estado.
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || "Error al buscar URLs",
                error: true,
            });
        }
        //setSearchResults([]);
    }

    const { msg } = alerta;

    return(
        <div className='container'>
            <div className='flex justify-between items-center mx-2 lg:mx-0'>
                <form className="input-container">
                    <input 
                    className= {`${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} input-box`} 
                    type="search" 
                    placeholder="Link personalizado"
                    onChange={ e=> setSearchTerm(e.target.value) }
                    value={ searchTerm }
                    />
                    <button 
                    type="submit" 
                    onSubmit={handleSearch} 
                    disabled={!searchTerm.trim()}
                    className={!searchTerm.trim() ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        <FaSearch className=""/>
                    </button>
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
            <div className='flex items-center flex-col gap-4 my-20 lg:my-24 lg:mx-0 mx-2'>
                <>
                    {searchTerm ? (
                        searchResults.length > 0 ? (
                            // Si hay un término de búsqueda y se encontraron resultados
                            urlRecortada.map((url) => (
                                    <Urls 
                                        key={ url._id }
                                        url={ url }
                                        mostrarFormEditar={ mostrarFormEditar }
                                    />
                            ))
                        ) : (
                            // Si hay un término de búsqueda pero no se encontraron resultados
                            <p>No se encontraron resultados para "{searchTerm}"</p>
                        )
                        ) : (
                         // Si no hay un término de búsqueda, muestra todos los elementos
                        urlRecortada.length > 0 ? (
                            <>
                                {urlRecortada.map((url) => (
                                    <Urls
                                        key={url._id}
                                        url={url}
                                        mostrarFormEditar={mostrarFormEditar}
                                    />
                                ))}
                            </>
                        ) : (
                            // Si no hay elementos para mostrar
                            <div className='flex flex-col items-center gap-4'>
                                <ImFilesEmpty className='text-6xl' />
                                <h2 className='text-2xl font-bold'>Sin enlaces por el momento</h2>
                                <button
                                    className='border-4 p-2 rounded-xl uppercase font-bold hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2'
                                    onClick={() => setMostrarForm(true)}
                                >
                                     Crear link
                                </button>
                            </div>
                        )
                    )}
                </>
            </div>
            {mostrarForm && 
            <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 mx-auto'>
                <div className= 'rounded-xl fixed inset-0 lg:flex mx-auto justify-center items-center z-50'>
                    <form 
                        className={`${mostrarForm ? 'block' : 'hidden'} ${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} flex flex-col gap-4 w-full md:w-3/4 lg:w-1/3 h-2/3 lg:h-3/5 px-4 py-8 rounded-xl mx-auto`}
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
                        value={id ? "Editar URL" : "Crear URL"}
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