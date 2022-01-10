import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { Signup } from '../../types/Signup';
import { connectDb} from '../../middlewares/connectDb';
import { SignupModel } from '../../models/SignupModel';
import { UserModel } from '../../models/UserModel';
import md5 from 'md5'


//Função de cadastramento de usuários
const signupEndpoint = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    if(req.method === 'POST'){
        const body = req.body as Signup;
        return await saveSignup(req,res)
    }

    return res.status(405).json({ error : 'Metodo infomado não é valido'});
}


//Algumas Validações no formulário
const validateSignup = (body: Signup) =>{
    if(!body.name || body.name.length < 2){
        return 'Nome inválido'
    }

    if(!body.email || body.email.length < 5){
        return 'Email inválido'
    }

    if(!body.password || body.password.length < 4){
        return 'Senha inválida'
    }
}

//Função para salvar o usuário criado
const saveSignup = async(req:NextApiRequest, res:NextApiResponse)=>{
    const body = req.body as Signup

    const errorMsg = validateSignup(body)
    if(errorMsg){
        return res.status(400).json({error: errorMsg})
    }

    
    const user = {
        name : body.name,
        email : body.email,
        password : md5(body.password)
    }

    console.log(user)

        await UserModel.create(user);
        return res.status(200).json({ msg : 'Usuario Criado'});

}

export default connectDb(signupEndpoint);