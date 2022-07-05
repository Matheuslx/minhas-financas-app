import { Component } from "react";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";
import { withRouter } from "react-router-dom";
import axios from "axios";
import UsuarioService from "../app/service/UsuarioService";
import LocalStrorageService from "../app/service/LocalStrorageService";
import { mensagemErro } from "../components/toastr";
import { AuthContext } from "../main/ProvedorAutenticacao";

class Login extends Component {
  state = {
    email: "",
    senha: "",
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    const usuario = {
      email: this.state.email,
      senha: this.state.senha,
    };

    this.service
      .autenticar(usuario)
      .then((resp) => {
        this.context.iniciarSessao(resp.data)
        this.props.history.push("/home");
      })
      .catch((err) => mensagemErro(err.response.data));
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuario");
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleChangeSenha = (e) => {
    this.setState({ senha: e.target.value });
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: "relative", left: "300px" }}
        >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Email: *">
                        <input
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChangeEmail}
                          className="form-control"
                          placeholder="Digite seu email"
                        />
                      </FormGroup>
                      <FormGroup label="Senha: *">
                        <input
                          type="password"
                          value={this.state.senha}
                          onChange={this.handleChangeSenha}
                          placeholder="Digite sua senha"
                          className="form-control"
                        />
                      </FormGroup>
                      <button onClick={this.entrar} className="btn btn-success">
                        <i className="fa-solid fa-right-to-bracket"></i> Entrar
                      </button>
                      <button
                        onClick={this.prepareCadastrar}
                        className="btn btn-danger"
                      >
                       <i className="fa-solid fa-plus"></i> Cadastrar
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext

export default withRouter(Login);
