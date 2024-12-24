import  { FaTrashAlt, FaCog, FaClipboard } from 'react-icons/fa';
import useUrl from '../hooks/useUrl';
import Swal from 'sweetalert2';


const Urls = ({ url, mostrarFormEditar })=>{

    const { urlDestino, customUrl, descripcion } = url;
    const { eliminarUrl } = useUrl();
    
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
                <a className='text-blue-400 font-bold' href={ urlDestino } target='_blank'>
                { customUrl }
                </a>
                
                <div className='flex justify-between gap-4'>
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
                <div className='flex justify-between'>
                    <p className='font-semibold'> { descripcion }</p>
                </div>
            </div>
        </div>
    )
};

export default Urls;