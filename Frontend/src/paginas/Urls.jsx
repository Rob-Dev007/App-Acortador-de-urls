import  { FaTrashAlt, FaCog, FaClipboard } from 'react-icons/fa';
import useUrl from '../hooks/useUrl';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { useState } from 'react';

const Urls = ({ url, mostrarFormEditar })=>{

    const { urlDestino, customUrl, descripcion, clicks: initialClicks, createdAt } = url;
    const { eliminarUrl } = useUrl();

    const [ clicks, setClicks ] = useState(initialClicks);
    

    const fechaFormateada = new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    
    const handleLinkClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            // Llama a la API para incrementar los clics
            const { data }  = await clienteAxios.get(`/urls/clicks/${ customUrl }`, config);

            //Actualizar el estado con el nuevo numero de clicks;
            setClicks(data.clicks);
        } catch (error) {
            console.error('Error al incrementar los clics:', error);
        }
    };

    const showAlert = ()=>{
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
    }

    const handleCopy = ()=>{
        navigator.clipboard.writeText(customUrl)
        .then(()=> showAlert())
        .catch((error) => console.log('Error al copiar el enlace', error))
    }

    const handleEdit = ()=>{
        mostrarFormEditar(url);
    }

    const handleDelete = (id)=>{
        Swal.fire({
            title: "¿Desea eliminar este elemento?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUrl(id);
                Swal.fire(
                    "Eliminado",
                    "La URL ha sido eliminada correctamente.",
                    "success"
                );
            }
        });
    }

    return(
        <div className='p-4 border-2 shadown-lg lg:w-1/2 w-full'>
            <div className='flex justify-between'>
                <a className='text-blue-400 font-bold' href={ urlDestino } target='_blank' onClick={ handleLinkClick } >
                    { customUrl }
                </a>
                
                <div className='flex justify-between gap-4'>
                    <p>Clicks: <strong>{ clicks }</strong></p>
                    <button onClick={ handleCopy }>
                        <FaClipboard />
                    </button>
                    <button  onClick={ ()=>handleDelete(url._id) }>
                        <FaTrashAlt className='text-red-500'/>
                    </button>
                    <button onClick={ handleEdit }>
                        <FaCog />
                    </button>
                </div>
            </div>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                <p className='my-4'> { urlDestino }</p>
                <div className='flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between'>
                    <p className='font-semibold'> { descripcion }</p>
                    <p> Creado el: <span className='font-thin'>{ fechaFormateada }</span></p>
                </div>
            </div>
        </div>
    )
};

export default Urls;