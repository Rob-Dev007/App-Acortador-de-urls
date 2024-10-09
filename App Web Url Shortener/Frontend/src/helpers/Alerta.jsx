const Alerta = ({ alerta })=>{
    return(
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600' } bg-gradient-to-r uppercase font-bold p-2 rounded text-center text-white`}>
            { alerta.msg }
        </div>
    )
};

export default Alerta;