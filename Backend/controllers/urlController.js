import Url from "../server/models/Url.js";
import shortid from "shortid";
import mongoose from "mongoose";

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
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id proporcionado no es válido.' });
    }


    try{
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

        const urlActualizado = await url.save();
        return res.json(urlActualizado); 
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const eliminarUrl = async(req, res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id proporcionado no es válido.' });
    }

    try {
        const url = await Url.findByIdAndDelete(id);
        await url.deleteOne();

        if(!url){
            const error = new Error('No encontrado');
            return res.status(404).json({ msg: error.message })
        }
    
        if(url.userId._id.toString() !== req.user._id.toString()){
            return res.json({msg: 'Acción no permitida'});
        };

        res.json({ msg: 'Url eliminado correctamente' });
    } catch (error) {
        console.log(error);
    }
}


const shortenUrlPublic = async(req, res)=>{
    const { urlDestino } = req.body;

    if(!urlDestino){
        const error = new Error('La url es obligatoria');
        return res.status(400).json({ msg: error.message });
    }

    try{
        const shortUrlId = shortid.generate();

        const shortUrl = `${process.env.URL_FRONTEND}/${shortUrlId}`;

        res.status(201).json({
            message: 'URL recortada con éxito',
            urlDestino,
            shortUrl
        });
    }catch(error){
        console.log(error);
    }
}


export {
    agregarUrl,
    obtenerUrls,
    obtenerUrl,
    actualizarUrl,
    eliminarUrl,
    shortenUrlPublic
}