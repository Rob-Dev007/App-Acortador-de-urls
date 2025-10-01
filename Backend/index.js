import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './server/config/db.js';
import userRoutes from './server/routes/userRoutes.js';
import urlRoutes from './server/routes/urlRoutes.js';
import publicRoutes from './server/routes/publicRoutes.js';

const app = express();

app.use(express.json());
dotenv.config();

//Conectar base de datos
connectDB();

const dominiosPermitidos = [process.env.URL_BACKEND , process.env.URL_FRONTEND];

const corsOptions = {
    origin: function(origin, callback){
        if(!origin || dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request esta permitido
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use('/api/user', userRoutes);
app.use('/api/urls', urlRoutes);

//Rutas públicas para las url generadas sin login
app.use('/api', publicRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Conección exitosa en el puerto ${PORT}`)
});