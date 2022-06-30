import { Component } from "react";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";

class Login extends Component {

    state = {
        email: '',
        senha: ''
    }
    entrar = ()=>{
        console.log(`Email: ${this.state.email}`);
        console.log(`Senha: ${this.state.senha}`);
    }

    handleChangeEmail=(e)=>{
        this.setState({email: e.target.value})
    }

    handleChangeSenha=(e)=>{
        this.setState({senha: e.target.value})
    }

  render() {
    return (
      <div className="container">
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
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            className="form-control"
                            placeholder="Digite seu email"
                          />
                        </FormGroup>
                        <FormGroup label="Senha: *">
                            <input type="password"
                            value={this.state.senha}
                            onChange={this.handleChangeSenha}
                            placeholder="Digite sua senha"
                            className="form-control" />
                        </FormGroup>
                        <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                        <button className="btn btn-danger">Cadastrar</button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
