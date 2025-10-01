import Button from "../utils/button";
import useUrl from "../hooks/useUrl";

const Pagination = ()=>{
    
    const { page, setPage, totalPages } = useUrl();

    const handleNext = ()=>{
        if(page < totalPages) setPage(page + 1)
    }

    const handlePrev = ()=>{
        if(page > 1) setPage(page - 1)
    }
    
    return(
        <div className="flex gap-2 items-center justify-center m-6 mb-12">
                <Button disabled={page === 1} className="flex items-center justify-center bg-cyan-600 p-2 text-white rounded-md text-sm hover:bg-cyan-500 transform duration-500 ease-out cursor-pointer backdrop-blur-md rounded-2xl shadow-lg" handleClick={()=>setPage(handlePrev)}>Prev</Button>
                <strong>Pág: {page} de {totalPages} páginas</strong>
                <Button className="flex items-center justify-center bg-cyan-600 p-2 text-white rounded-md text-sm hover:bg-cyan-500 transform duration-500 ease-out cursor-pointer backdrop-blur-md rounded-2xl shadow-lg" disabled={page === totalPages} handleClick={handleNext}>Next</Button>
        </div>
    )
}

export default Pagination;