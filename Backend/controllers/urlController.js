import Url from "../server/models/Url.js";
import shortid from "shortid";

const agregarUrl = async(req, res)=>{

    const { urlDestino } = req.body;

    const url = await Url.findOne({ urlDestino });

    if(url){
        const error = new Error('Url ya existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const newUrl = new Url({
            ...req.body,
            userId : req.user._id,
            shortUrlId: shortid.generate()
        });

        const urlGuardado = await newUrl.save();
        res.json(urlGuardado);
    } catch (error) {
        console.log(error);
    }

};

const obtenerUrls = async(req, res)=>{
    const urls = await Url.find()
    .where('userId')
    .equals(req.user);

    res.json(urls);
}

const obtenerUrl = async (req, res)=>{
    const { id } = req.params;
    
    const url = await Url.findById( id );

    if(!url){
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(url.userId._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no permitida'});
    };

    res.json(url);

}

const actualizarUrl = async(req, res)=>{
    const { id } = req.params;
    
    const url = await Url.findById( id );

    if(!url){
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(url.userId._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no permitida'});
    };
    
    //Actualizar url

    url.urlDestino = req.body.urlDestino || url.urlDestino;
    url.customUrl = req.body.customUrl || url.customUrl;
    url.descripcion = req.body.descripcion || url.descripcion;
    url.createdAt = req.body.createdAt || url.createdAt;

    try{
        const urlActualizado = await url.save();
        return res.json(urlActualizado); 
    }catch(error){
        console.log(error)
    }
        

}

const eliminarUrl = async(req, res)=>{
    const { id } = req.params;
    
    const url = await Url.findById( id );

    if(!url){
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(url.userId._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no permitida'});
    };

    try {
        await url.deleteOne();
        res.json({ msg: 'Url eliminado correctamente' });
    } catch (error) {
        console.log(error);
    }
}



export {
    agregarUrl,
    obtenerUrls,
    obtenerUrl,
    actualizarUrl,
    eliminarUrl,
}