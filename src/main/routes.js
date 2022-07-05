import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import Login from '../views/Login'
import CadastroUsuario from '../views/CadastroUsuarios'
import Home from '../views/Home'
import ConsultaLancamento from '../views/ConsultaLancamento'
import CadastroLancamentos from '../views/lancamentos/CadastroLancamentos'
import AuthService from '../app/service/AuthService'
import { AuthConsumer } from './ProvedorAutenticacao'





function RotaAutenticada({ isUsuarioAutenticado,component:Component, ...props}){
    return(
        <Route {...props}  render ={(componentProps) =>{
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps}/>
                 )
            }else{
                return (
                    <Redirect to={{pathname: '/login', state: { from: componentProps.location} } }/>
                )
            }

        }} />
    )
}

function Rotas(props){
    return (
        <BrowserRouter>
            <Switch>
                <Route  path='/login' component = {Login}/>
                <Route path='/cadastro-usuario' component = {CadastroUsuario}/>


                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path = '/home' component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path = '/consulta-lancamentos' component={ConsultaLancamento} />
                {/* esse ":id" é a forma de passar variavel para uma rota */}
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path = '/cadastro-lancamentos/:id?' component={CadastroLancamentos} />
            </Switch>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        {   (context) => (<Rotas isUsuarioAutenticado = {context.isAutenticado}/>) }
    </AuthConsumer>
)