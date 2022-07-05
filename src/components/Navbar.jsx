import React, { Component } from 'react'
import AuthService from '../app/service/AuthService'
import { AuthConsumer } from '../main/ProvedorAutenticacao'
import NavbarItem from './NavbarItem'



function Navbar  (props){

  const deslogar = () =>{
    AuthService.removerUsuarioAutenticado()
  }

  const isUsuarioAutenticado = ()=>{
    return AuthService.isUsuarioAutenticado()
  }

  
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="/home" className="navbar-brand">Minhas Finanças</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav">
            <NavbarItem render={props.isUsuarioAutenticado} href="/home" label = "Home"/>
            <NavbarItem render={props.isUsuarioAutenticado} href="/cadastro-usuario" label = "Usuario"/>
            <NavbarItem render={props.isUsuarioAutenticado} href="/consulta-lancamentos" label = "Lançamentos"/>
            <NavbarItem render={props.isUsuarioAutenticado} onClick={deslogar} href="/login" label = "Sair"/>

          </ul>
  
          </div>
        </div>
      </div>
    )
}

export default () => (
  <AuthConsumer>
    {(context) => (
      <Navbar isUsuarioAutenticado={context.isAutenticado}/>
    )}
  </AuthConsumer>
)
