import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../../helpers/generarId.js"

const userSchema = mongoose.Schema({
    nombres:{
        type : String,
        required : true,
        trim: true
    },
    apellidos:{
        type : String,
        required : true,
        trim: true
    },
    correo:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type : String,
        required : true,
    },
    token:{
        type : String,
        default : generarId(),
    },
    confirmado:{
        type : Boolean,
        default : false
    },
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.comprobarPassword= async function (passwordForm){
    return bcrypt.compare(passwordForm, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;