import  { FaTrashAlt, FaCog, FaClipboard } from 'react-icons/fa';


const Urls = ({ url })=>{

    const { urlDestino, customUrl, descripcion, _id } = url;
    
    return(
        <div className='p-4 border-2 mx-2 lg:mx-auto shadown-lg lg:w-1/2'>
            <div className='flex justify-between'>
                <a className='text-blue-400' href={ urlDestino } target='_blank'>
                { customUrl }
                </a>
                
                <div className='flex justify-between gap-4'>
                    <button>
                        <FaClipboard />
                    </button>
                    <button>
                        <FaTrashAlt className='text-red-500'/>
                    </button>
                    <button>
                        <FaCog />
                    </button>
                </div>
            </div>
            <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                <p className='my-4'> { urlDestino }</p>
                <div className='flex justify-between'>
                    <p className='font-semibold'> { descripcion }</p>
                </div>
            </div>
        </div>
    )
};

export default Urls;