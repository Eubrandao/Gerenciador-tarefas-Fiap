import mongoose, {Schema} from 'mongoose';

//Schema("Tabela") do Signup
const SignupSchema = new Schema({
    name : {type : String, required: true},
    email : {type : String, required : true},
    signupPassword : {type : String, required: true},
    
});

export const SignupModel = (mongoose.models.signups
    || mongoose.model('signups', SignupSchema));


    //Esse Schema foi utilizado apenas como teste, ele não está sendo utilizado.
    //O Cadastramento está sendo feito no Schema User