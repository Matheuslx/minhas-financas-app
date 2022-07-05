import localStrorageService from "./LocalStrorageService";

export const USUARIO_LOGADO = '_usuario_logado'


export default class AuthService{

    static isUsuarioAutenticado(){
        const usuario = localStrorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado(){
        localStrorageService.removerItem(USUARIO_LOGADO)
    }
    
    static obterUsuarioAutenticado(){
        return localStrorageService.obterItem(USUARIO_LOGADO)
    }

    static logar(usuario){
        localStrorageService.adicionarItem(USUARIO_LOGADO, usuario)

    }

}