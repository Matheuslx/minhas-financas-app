import React, { Component } from "react";
import currencyFormatter from "currency-formatter";


export default class LancamentosTable extends Component {
  render() {
    const { lancamentos } = this.props;
    const rows = lancamentos.map((lancamento) => {
      return (
        <tr key={lancamento.id}>
          <td>{lancamento.descricao}</td>
          <td>
            {currencyFormatter.format(lancamento.valor, { locale: "pt-BR" })}
          </td>
          <td>{lancamento.tipo}</td>
          <td>{lancamento.mes}</td>
          <td>{lancamento.status}</td>
          <td>
            <button
              onClick={(e) => this.props.alterarStatus(lancamento, "EFETIVADO")}
              disabled = {lancamento.status !== 'PENDENTE'}
              className="btn btn-success"
            >
              <i className="fa-solid fa-check"></i>
            </button>
            <button
              disabled = {lancamento.status !== 'PENDENTE'}
              onClick={(e) => this.props.alterarStatus(lancamento, "CANCELADO")}
              className="btn btn-primary"
            >
              <i class="fa-solid fa-x"></i>
            </button>
            <button
              className="btn btn-warning"
              onClick={(e) => this.props.editAction(lancamento)}
            >
              <i class="fa-solid fa-file-pen"></i>
            </button>
            <button
              className="btn btn-danger"
              onClick={(e) => this.props.deleteAction(lancamento)}
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col1">Descrição</th>
            <th scope="col1">Valor</th>
            <th scope="col1">Tipo</th>
            <th scope="col1">Mês</th>
            <th scope="col1">Situação</th>
            <th scope="col1">Ações</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
