import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LancamentoService from "../../app/service/LancamentoService";
import * as messages from '../../components/toastr'

import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import localStrorageService from "../../app/service/LocalStrorageService";


class CadastroLancamentos extends Component {
  state = {
    id: null,
    descricao: "",
    valor: "",
    mes: "",
    ano: "",
    tipo: "",
    status: "",
    usuario: null,
    atualizando: false
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  componentDidMount(){
    const params  = this.props.match.params
    if(params.id){
      this.service.obterPorId(params.id)
      .then(resp =>{
        this.setState({...resp.data, atualizando: true})
      })
      .catch(err => {
        messages.mensagemErro("Ocorreu um erro ao atualizar o lançamento! :(")
      })
    }
  }

  submit=()=>{
    const usuarioLogado = localStrorageService.obterItem("_usuario_logado")
    const {descricao, tipo, valor, mes, ano} = this.state

    const lancamento = {
      usuario: usuarioLogado.id,
      descricao,
      tipo,
      valor,
      mes,
      ano
    }

    try {
      this.service.validar(lancamento)
    } catch (erro) {
      const mensagens = erro.mensagens
      mensagens.forEach(msg => messages.mensagemErro(msg))
      return false
    }

    this.service.salvar(lancamento)
    .then(resp => {
      messages.mensagemSucesso("Lançamento salvo com sucesso!")
      this.props.history.push('consulta-lancamentos')
    })
    .catch(err => {
      messages.mensagemErro("Erro ao cadastrar lançamento!")
    })
  }

  atualizar=()=>{
    const {descricao, tipo, valor, mes, ano, id, usuario, status} = this.state

    const lancamento = {
      id,
      status,
      usuario: usuario.id,
      descricao,
      tipo,
      valor,
      mes,
      ano
    }

    this.service.atualizar(lancamento)
    .then(resp => {
      messages.mensagemSucesso("Lançamento atualizado com sucesso!")
      this.props.history.push('consulta-lancamentos')
    })
    .catch(err => {
      messages.mensagemErro("Erro ao atualizar lançamento!")
    })

    console.log(lancamento)
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };

  render() {
    const meses = this.service.obterListaMeses();
    const tipos = this.service.obterListaTipo();
    const titulo = this.state.atualizando? 'Atualizar lançamento' : 'Cadastrar lançamento'

    return (
      <Card title={titulo}>
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao" label="Descrição: *">
              <input
                type="text"
                className="form-control"
                name="descricao"
                value={this.state.descricao}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup label="Ano: *">
              <input
                type="text"
                name="ano"
                value={this.state.ano}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup label="Mês: *">
              <SelectMenu
                lista={meses}
                name="mes"
                value={this.state.mes}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup label="Valor: *">
              <input
                type="text"
                name="valor"
                value={this.state.valor}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup label="Tipo: *">
              <SelectMenu
                lista={tipos}
                name="tipo"
                value={this.state.tipo}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Status: *">
              <input
                type="text"
                name="status"
                value={this.state.status}
                className="form-control"
                disabled
              />
            </FormGroup>
          </div>
        </div>
        {
          this.state.atualizando? (
            
            <button onClick={this.atualizar} className="btn btn-warning">
              <i class="fa-solid fa-calendar-lines-pen"></i> Atualizar
            </button>
          ) : (

            <button onClick={this.submit} className="btn btn-success">Salvar</button>
          )
        }
        <button onClick={e => this.props.history.push("/consulta-lancamentos") }
        className="btn btn-danger">
          <i class="fa-solid fa-x"></i> Cancelar
          </button>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamentos);
