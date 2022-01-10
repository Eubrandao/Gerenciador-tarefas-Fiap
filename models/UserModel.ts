import mongoose, {Schema} from 'mongoose';

//Schema("Tabela de usuários"), aqui fazemos o cadastramento e o login
const UserSchema = new Schema({
    name : {type : String, required: true},
    email : {type : String, required: true},
    password : {type : String, required: true},
});

export const UserModel = (mongoose.models.users 
    || mongoose.model('users', UserSchema));