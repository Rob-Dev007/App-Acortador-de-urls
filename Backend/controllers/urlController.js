import Url from "../server/models/Url.js";
import shortid from "shortid";
import mongoose from "mongoose";

const agregarUrl = async(req, res)=>{

    const { urlDestino, customUrl } = req.body;

    const url = await Url.findOne({ urlDestino, customUrl, userId: req.user._id });

    if(url){
        const error = new Error('Url ya existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const shortUrlId = customUrl || shortid.generate(); // Genera un alias único si no se proporciona uno
        const newUrl = new Url({
            ...req.body,
            userId : req.user._id,
            customUrl:  shortUrlId
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

const incrementarClicks = async (req, res) => {
    const { customUrl } = req.params;

    try {
        const url = await Url.findOneAndUpdate(
            {
                $or: [
                  { customUrl }, // Busca como alias personalizado
                  { shortUrlId: customUrl }, // Busca como shortUrlId generado automáticamente
                ],
            },
            { $inc: { clicks: 1 } }, // Incrementa el campo clicks en 1
            { new: true } //Devuelve el elemento actualizado
        );

        if (!url) {
            return res.status(404).json({ msg: "URL no encontrada" });
        }

       res.status(200).json({ msg: 'Url actualizado correctamente', clicks: url.clicks })
    } catch (error) {
        res.status(500).json({ msg: "Error al incrementar clicks", error });
        console.log(`Buscando URL con shortUrlId: ${req.params.shortUrlId}`);
    }

    console.log(`Buscando URL con shortUrlId: ${req.params.shortUrlId}`);
};

const searchUrl = async (req, res) => {
    const { search } = req.query; // Recibe el término de búsqueda como un parámetro de consulta.

    try {
        const urls = await Url.find({
            $or: [
                { customUrl: { $regex: search, $options: "i" } },
            ],
            userId: req.user._id, // Asegura que la búsqueda sea del usuario autenticado.
        });

        if (!urls.length) {
            return res.status(404).json({ msg: "No se encontraron resultados" });
        }

        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const urlStorage = {};

const shortenUrlPublic = async(req, res)=>{
  const { urlDestino } = req.body;

  try {
    const shortUrlId = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortUrlId}`;

    urlStorage[shortUrlId] = urlDestino;

    res.status(201).json({
        msg: 'Url recortada con éxito',
        shortUrl
    });


  } catch (error) {
    console.log(error);
  }
}

const redirectPublic = async(req, res)=>{
    const { shortUrlId } = req.params; 
    try {
        const urlDestino = urlStorage[shortUrlId];

        if(urlDestino){
            return res.redirect(urlDestino);
        }

        res.status(404).json('Url no encontrada');
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
    incrementarClicks,
    searchUrl,
    shortenUrlPublic,
    redirectPublic,
}