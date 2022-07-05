import ApiService from "../apiService";
import erroValidacao from '../exception/erroValidacao';



export default class usuarioService extends ApiService {

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post("/autenticar", credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    validar(usuario){
        const erros = []
    
        if(!usuario.nome){
          erros.push("O campo Nome é obrigatório")
        }
    
        if(!usuario.email){
          erros.push("O campo Email é obrigatório")
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
          erros.push("Informe um Email válido!")
        }
    
        if(!usuario.senha || !usuario.senhaRepeticao){
          erros.push("Digite e confirme a senha!")
        }else if(usuario.senha !== usuario.senhaRepeticao){
          erros.push("As senhas digitadas não são iguais! Por favor digite novamente")
        }
    
        if(erros.length>0){
            throw new erroValidacao(erros)
        }
    
      }

    salvar(usuario){
        return this.post(';',usuario)
    }
}


