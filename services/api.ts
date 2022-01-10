import axios, {Method} from "axios";


//API principal que conectará o FRONT ao BACK através do Axios.
export const executeRequest = (endpoint: string, method : Method, body? : any) => {


    const headers = {'Content-Type' : 'application/json'} as any;
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        headers['Authorization'] = 'Bearer ' + accessToken;
    }

    const URL = 'http://localhost:3000/api/' + endpoint;
    console.log(`executando: ${URL}, método: ${method}, body: ${body}, header: ${headers}`);
    return axios.request({
        url: URL,
        method,
        data: body? body : '',
        headers,
        timeout: 30000
    })
}