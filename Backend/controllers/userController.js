import User from "../server/models/User.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarjwt.js";
import registroEmail from "../helpers/registroEmail.js";
import olvidePasswordEmail from "../helpers/olvidePasswordEmail.js";

const registrar = async (req, res)=>{
    const { nombres, apellidos, correo } = req.body;

    const usuarioRegistrado = await User.findOne({ correo });

    //Prevenir usuarios registrados
    if(usuarioRegistrado){
        const error = new Error('Usuario ya registrado');
        return res.status(404).json({ msg: error.message });
    };

    try{
        const user = new User(req.body);
        const usuarioGuardado = await user.save();

        //Enviar email
        registroEmail({
            nombres,
            apellidos,
            correo,
            token : usuarioGuardado.token
        })

        res.json(usuarioGuardado);
    }catch(error){
        console.log(error);
    };

};

const obtenerPerfil = (req, res)=>{
    const { user } = req;

    res.send({ user });
};

const confirmar = async(req, res)=>{
    const { token } = req.params;

    const confirmarUsuario = await User.findOne({ token });

    if(!confirmarUsuario){
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    };

    try{
        confirmarUsuario.token = null;
        confirmarUsuario.confirmado = true;
        await confirmarUsuario.save();

        res.json({ msg: 'Usuario confirmado correctamente' });
    }catch(error){
        console.log(error);
    };
};

const autenticar = async(req, res)=>{
    const { correo, password } = req.body;

    const user = await User.findOne({ correo });

    //Comprobar si usuario existe
    if(!user){
        const error = new Error('Usuario no existe');
        return res.status(400).json({ msg: error.message });
    };

    //Comprobar si usuario esta confirmado
    if(!user.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(400).json({ msg: error.message });
    };

    if(await user.comprobarPassword(password)){
        //Autenticar
        res.json({
            _id : user._id,
            nombres : user.nombres,
            apellidos : user.apellidos,
            token : generarJWT(user.id)
        });
    }else{
        const error = new Error('Password incorrecto');
        return res.status(404).json({ msg: error.message })
    };
};

const olvidePassword = async(req, res)=>{
    const { correo } = req.body;

    const correoExistente = await User.findOne({ correo });

    if(!correoExistente){
        const error = new Error('Correo no válido');
        return res.status(404).json({ msg: error.message })
    };

    try{
        correoExistente.token = generarId();
        await correoExistente.save();

        //Enviar email con instrucciones
        olvidePasswordEmail({
            nombres: correoExistente.nombres,
            apellidos: correoExistente.apellidos,
            correo,
            token : correoExistente.token
        })
        
        res.json({ msg: 'Se ha enviado un correo con las intrucciones para recuperar tu cuenta' });
    }catch(error){
        console.log(error);
    }
};

const comprobarToken = async(req, res)=>{
    const { token } = req.params;

    const comprobarTkn = await User.findOne({ token });

    if(comprobarTkn){
        //Token válido
        res.send('Token válido');
    }else{
        const error = new Error('Token no válido o inexistente');
        return res.status(404).json({ msg: error.message });
    }
};

const nuevoPassword = async(req, res)=>{
    const { password } = req.body;
    const { token } = req.params;

    const user = await User.findOne({ token });

    if(!user){
        const error = new Error('Token no válido o incorrecto');
        return res.status(404).json({ msg: error.message });
    };

    try{
        user.token = null;
        user.password = password;
        await user.save();
        res.json({ msg: 'Contraseña modificada correctamente' });
    }catch(error){
        console.log(error);
    }

};



export {
    registrar,
    obtenerPerfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
}