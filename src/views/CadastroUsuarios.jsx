import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import usuarioService from "../app/service/UsuarioService";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import { useParams } from "react-router-dom";

class CadastroUsuarios extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  constructor() {
    super();
    this.service = new usuarioService();
  }

  cancelar = () => {
    this.props.history.push("/login");
  };

  handleChangeNome = (e) => {
    this.setState({ nome: e.target.value });
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleChangeSenha = (e) => {
    this.setState({ senha: e.target.value });
  };

  handleChangeSenhaRepeticao = (e) => {
    this.setState({ senhaRepeticao: e.target.value });
  };

  cadastrar = () => {
    const { nome, email, senha, senhaRepeticao } = this.state;

    const usuario = {
      nome,
      email,
      senha,
      senhaRepeticao,
    };

    try {
      this.service.validar(usuario);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach((msg) => mensagemErro(msg));
      return false;
    }

    const mensagemCadastroSucesso =
      "Usuário cadastrado com sucesso! Faça o login para acessar o sistema.";
    this.service
      .salvar(usuario)
      .then((resp) => {
        mensagemSucesso(mensagemCadastroSucesso);
        this.props.history.push("/login");
      })
      .catch((err) => mensagemErro(err.response.data));
  };

  render() {
    return (
      <Card title="Cadastro de usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *">
                <input
                  value={this.state.nome}
                  placeholder="Digite seu nome"
                  className="form-control"
                  type="text"
                  name="nome"
                  id="inputNome"
                  onChange={this.handleChangeNome}
                />
              </FormGroup>

              <FormGroup label="Email: *">
                <input
                  className="form-control"
                  placeholder="Digite seu email"
                  value={this.state.email}
                  type="text"
                  name="email"
                  id="inputEmail"
                  onChange={this.handleChangeEmail}
                />
              </FormGroup>

              <FormGroup label="Senha: *">
                <input
                  className="form-control"
                  placeholder="Digite sua senha"
                  value={this.state.senha}
                  type="password"
                  name="email"
                  id="inputEmail"
                  onChange={this.handleChangeSenha}
                />
              </FormGroup>

              <FormGroup label="Repita a senha: ">
                <input
                  className="form-control"
                  placeholder="Repita sua senha"
                  value={this.state.senhaRepeticao}
                  type="password"
                  name="email"
                  id="inputEmail"
                  onChange={this.handleChangeSenhaRepeticao}
                />
              </FormGroup>
              <button onClick={this.cadastrar} className="btn btn-success">
                <i className="fa-solid fa-check"></i> Salvar
              </button>
              <button onClick={this.cancelar} className="btn btn-danger">
              <i className="fa-solid fa-x"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
//usando o withRouter, eu basicamente estou exportando meu componente com algumas funcionalidades a mais
export default withRouter(CadastroUsuarios);
