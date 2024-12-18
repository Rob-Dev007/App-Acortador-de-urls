import mongoose from "mongoose";
import shortid from "shortid";

const UrlSchema = mongoose.Schema({
    urlDestino: { 
        type: String, 
        required: true, 
        trim: true 
    },
    customUrl: String,
    descripcion: String,
    clicks: { 
        type: Number, 
        default: 0 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
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