import mongoose from "mongoose";
import shortid from "shortid";
import fechaFormateada from "../../helpers/formatearFecha.js";

const UrlSchema = mongoose.Schema({
    urlDestino: { 
        type: String, 
        required: true, 
        trim: true 
    },
    customUrl: {
        type: String,
        unique: true, 
        trim: true,
    },
    descripcion: String,
    clicks: { 
        type: Number, 
        default: 0 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    shortUrlId:{
        type: String,
        default: shortid.generate,
        unique:true
    }
},
{
    timestamps: true
}
);

const Url = mongoose.model('Url', UrlSchema);

export default Url; 