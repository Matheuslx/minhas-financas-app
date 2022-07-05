import axios from "axios";
import React, { Component } from "react";
import './home.css'
import UsuarioService from "../app/service/UsuarioService";
import localStrorageService from "../app/service/LocalStrorageService";
export default class Home extends Component {


  state = {
    saldo: 0,
  };

  constructor(){
    super()
    this.usuarioService = new UsuarioService()
  }

  componentDidMount(){
    const usuarioLogado = localStrorageService.obterItem('_usuario_logado')
    this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
    .then(resp =>{
      this.setState({saldo: resp.data})
    })
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
        <hr className="my-4" />
        <p>
          E essa é sua área administrativa, utilize um dos menus ou botões
          abaixo para navegar pelo sistema.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="/cadastro-usuario"
            role="button"
          >
            <i className="fa fa-users"></i> Cadastrar Usuário
          </a>
          <a
            className="btn btn-danger btn-lg"
            href="/cadastro-lancamentos"
            role="button"
          >
            <i className="fa fa-users"></i> Cadastrar Lançamento
          </a>
        </p>
      </div>
    );
  }
}


