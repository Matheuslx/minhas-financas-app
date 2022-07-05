import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LancamentoService from "../app/service/LancamentoService";
import LocalStorageService from "../app/service/LocalStrorageService";
import * as messages from "../components/toastr";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";
import SelectMenu from "../components/SelectMenu";
import LancamentosTable from "./lancamentos/LancamentosTable";
import Swal from "sweetalert2";

class ConsultaLancamentos extends Component {
  constructor() {
    super();
    this.service = new LancamentoService();
  }

  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    lancamentos: [],
  };

  buscar = () => {
    if (!this.state.ano) {
      messages.mensagemErro("O preenchimento do campo Ano é obrigatorio.");
      return false;
    }

    const usuarioLogadoJSON = localStorage.getItem("_usuario_logado");
    const usuarioLogado = JSON.parse(usuarioLogadoJSON);

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id,
    };

    
    this.service
      .consultar(lancamentoFiltro)
      .then((res) => {
        if (res.data[0] == null) {
          messages.mensagemAlerta(
            "Nenhum lançamento encontrado para os filtros passados!"
          );
        }
        this.setState({ lancamentos: res.data });
      })
      .catch((err) => {
    
      });
  };

  editar = (lancamento) => {
    this.props.history.push(`/cadastro-lancamentos/${lancamento.id}`)
  };

  deletar = (lancamento) => {
    Swal.fire({
      title: "Tem certeza que quer deletar o lançamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service
          .deletar(lancamento.id)
          .then((resp) => {
            messages.mensagemSucesso("Lançamento deletado com sucesso!");
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            lancamentos.splice(index, 1);
            this.setState(lancamentos);
          })
          .catch((err) => {
            messages.mensagemErro(
              "Ocorreu um erro ao deletar o lançamento! :("
            );
          });
      }
    });
  };

  atulizarStatus= (lancamento, status)=>{
    this.service.atualizarStatus(lancamento.id, status)
    .then(resp => {
      const lancamentos = this.state.lancamentos
      const index = lancamentos.indexOf(lancamento)
      if(index !== -1){
        lancamento['status'] = status
        lancamentos[index] = lancamento
        this.setState(lancamento)
      }

      messages.mensagemSucesso("Status atualizado!")
    })

  }

  render() {
    const meses = this.service.obterListaMeses();

    const tipos = this.service.obterListaTipo();

    return (
      <Card title="Consulta Lançamentos">
        <div className="row">
          <div className="col-md-6">
            <FormGroup label="Ano: *" htmlFor="inputAno">
              <input
                type="text"
                className="form-control m-1"
                id="inputAno"
                value={this.state.ano}
                onChange={(e) => this.setState({ ano: e.target.value })}
                placeholder="Digite o Ano..."
              />
            <FormGroup label="Descrição:" htmlFor="inputDescricao">
              <input
                type="text"
                className="form-control m-1"
                id="inputDescricao"
                value={this.state.descricao}
                onChange={(e) => this.setState({ descricao: e.target.value })}
                placeholder="Digite a descrição..."
              />
            </FormGroup>
            </FormGroup>
            <FormGroup label="Mês:" htmlFor="inputMes">
              <SelectMenu
                lista={meses}
                className="form-control m-1"
                id="inputMes"
                value={this.state.mes}
                onChange={(e) => this.setState({ mes: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Tipo:" htmlFor="inputTipo">
              <SelectMenu
                lista={tipos}
                className="form-control m-1"
                id="inputTipo"
                value={this.state.tipo}
                onChange={(e) => this.setState({ tipo: e.target.value })}
              />
            </FormGroup>

            <button
              onClick={this.buscar}
              type="button"
              className="btn btn-success "
            >
              <i className="fa-solid fa-magnifying-glass"></i> Buscar
            </button>
            <button onClick={e => this.props.history.push('cadastro-lancamentos')} type="button" className="btn btn-danger ">
            <i className="fa-solid fa-plus"></i> Cadastrar
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentosTable
                alterarStatus = {this.atulizarStatus}
                lancamentos={this.state.lancamentos}
                deleteAction={this.deletar}
                editAction={this.editar}
              />
            </div>
          </div>
        </div>

      </Card>
    );
  }
}

export default withRouter(ConsultaLancamentos);
