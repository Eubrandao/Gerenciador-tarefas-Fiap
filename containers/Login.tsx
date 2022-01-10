import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { LoginRequest } from "../types/LoginRequest";
import { LoginResponse } from "../types/LoginResponse";
import {Button, Modal, Form} from 'react-bootstrap'
import {Signup} from '../types/Signup'
import Swal from 'sweetalert2'


//Função de alerta em caso de sucesso
const successAlert = () => {
    Swal.fire({  
        title: 'Usuário criado com sucesso.',  
        text: 'Você já pode logar!',
        icon: 'success'
      }); 
}

//Função de alerta em caso de erro
const errorAlert = () => {
    Swal.fire({  
        title: 'Ops, você não preencheu os dados!',  
        icon: 'error'
      }); 
}

const noUserPass = () => {
    Swal.fire({  
        title: 'Ops, usuário ou senha não encontrados!',  
        icon: 'error'
      }); 
}


type LoginProps = {
    setToken(s: string) : void,
    name: string,
    email: string, 
    signupPassword: string,
    setName(s: string) : void,
    setEmail(s: string) : void,
    setSignupPassword(s: string) : void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {
 
   //Componentes de estado 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [msgError, setError] = useState('');


    //Função responsável pelo Login
    const doLogin = async () => {
        try {
            if (!login || !password) {
                 setError(errorAlert());
//                 setError('Ops, você não preencheu os dados!')
                return;
            }

            setError('');

            const body = {
                login,
                password
            };

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
                const loginResponse = result.data as LoginResponse;
                localStorage.setItem('accessToken', loginResponse.token);
                localStorage.setItem('userName', loginResponse.name);
                localStorage.setItem('userEmail', loginResponse.email);
                setToken(loginResponse.token);
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
//                 setError('Usuário ou senha incorretos');
                  setError(noUserPass());
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar login, tente novamenete');
        }
    }


    //Função responsável pelo registro de usuários
    const doSignup = async () => {
        try {
            if (!email || !name || !password) {
                setError('Favor preencher os dados');
                return;
            }

            setError('');

            const body = {
                email,
                name,
                password
            };

           

            console.log(body.name)

            const result = await executeRequest('signup', 'POST', body);
            if(result && result.data){
                
            }
            successAlert()
            handleClose()
            
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);   
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar login, tente novamenete');
        }
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {msgError && <p>{msgError}</p>}
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={login} onChange={evento => setLogin(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button onClick={doLogin}>Login</button>
                <p className="ncadastro">Ainda não tem cadastro?</p>
                <button onClick={handleShow}>Cadastrar</button>


      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
          {msgError && <p>{msgError}</p>}
        </Modal.Header>
        <Modal.Body><Form>
        <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Nome</Form.Label>
    <Form.Control type="text" placeholder="Digite seu nome"   onChange={e => setName(e.target.value)} />
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Digite seu email"   onChange={e => setEmail(e.target.value)} />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Senha</Form.Label>
    <Form.Control type="password" placeholder="Digite sue senha"    onChange={e => setPassword(e.target.value)}/>
  </Form.Group>
</Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
              <button id="btnCadastrar" onClick={doSignup}>
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
            </div>

        </div>
    )
}
