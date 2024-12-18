import jwt from 'jsonwebtoken';
import User from '../server/models/User.js';

const CheckAuth = async(req, res, next) =>{
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password -token -confirmado");
            return next();
        }catch(error){
            const e = new Error('Token no identificado');
            return res.status(403).json({ msg: e.message });
        }

    }

    if(!token){
        const error = new Error('Token no válido o corrupto');
        return res.status(400).json({ msg: error.message });
    };

    next();

}
export default CheckAuth;