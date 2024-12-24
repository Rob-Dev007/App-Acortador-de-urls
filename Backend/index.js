import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './server/config/db.js';
import userRoutes from './server/routes/userRoutes.js';
import urlRoutes from './server/routes/urlRoutes.js'

const app = express();

app.use(express.json());
dotenv.config();

//Conectar base de datos
connectDB();

const dominiosPermitidos = [process.env.URL_FRONTEND];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request esta permitido
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use('/api/user', userRoutes);
app.use('/api/urls', urlRoutes);
app.use('/api/public', urlRoutes);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () =>{
    console.log(`Conección exitosa en el puerto ${PORT}`)
});