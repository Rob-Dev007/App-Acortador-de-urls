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

       res.status(200).json({ clicks: url.clicks, urlDestino: url.urlDestino })
       //return res.redirect(url.urlDestino);
    } catch (error) {
        res.status(500).json({ msg: "Error al incrementar clicks", error });
        console.log(`Buscando URL con shortUrlId: ${req.params.shortUrlId}`);
    }
};

const urlStorage = {};

const shortenUrlPublic = async(req, res)=>{

  const { urlDestino } = req.body;

  try {
    const shortUrlId = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/api/${shortUrlId}`;

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

    const originalUrl = urlStorage[shortUrlId];

    if (!originalUrl) {
        return res.status(400).json({ msg: "El parámetro shortUrlId es obligatorio" });
      }
    
    try {
        return res.redirect(originalUrl);

    } catch (error) {
        console.log(error);
    }
}

const pagination = async (req, res) => {

  const { search = "", page = 1, limit = 8 } = req.query;

  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 && Number(limit) <= 50 ? Number(limit) : 8;
  const skip = (safePage - 1) * safeLimit;

  //Filtro: usuario logueado + customUrl 

  try {

    let filter = { userId: req.user._id }

    if(search && search.trim() !== ''){
        filter.$or = [
                { customUrl: {$regex: search, $options: "i"} }
        ]
    }
    const total = await Url.countDocuments(filter);

    console.log(total);

    const urls = await Url.find(filter)
      .skip(skip)
      .limit(safeLimit)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      urls,
      total,
      totalPages: Math.ceil(total / safeLimit),
      currentPage: safePage,
      hasPrevPage: safePage > 1,
      hasNextPage: safePage < Math.ceil(total / safeLimit),
      pageSize: safeLimit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la búsqueda con paginación", 
    details: error.message  });
  }
};


export {
    agregarUrl,
    obtenerUrl,
    actualizarUrl,
    eliminarUrl,
    incrementarClicks,
    shortenUrlPublic,
    redirectPublic,
    pagination
}