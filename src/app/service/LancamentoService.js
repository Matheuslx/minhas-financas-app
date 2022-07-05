import ApiService from '../apiService'
import erroValidacao from '../exception/erroValidacao';


export default class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return [
            { label: "Selecione", value: "" },
            { label: "Janeiro", value: 1 },
            { label: "Fevereiro", value: 2 },
            { label: "Março", value: 3 },
            { label: "Abril", value: 4 },
            { label: "Maio", value: 5 },
            { label: "Junho", value: 6 },
            { label: "Julho", value: 7 },
            { label: "Agosto", value: 8 },
            { label: "Setembro", value: 9 },
            { label: "Outubro", value: 10 },
            { label: "Novembro", value: 11 },
            { label: "Dezembro", value: 12 },
          ]
    }

    obterListaTipo(){
        return [
            { label: "Selecione", value: "" },
            { label: "Despesa", value: "DESPESA" },
            { label: "Receita", value: "RECEITA" },
          ];
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    validar(lancamento){
        const erros = []

        if(!lancamento.descricao){
            erros.push("Informe a descrição do lançamento!")
        }
        if(!lancamento.ano){
            erros.push("Informe o ano do lançamento!")
        }
        if(!lancamento.mes){
            erros.push("Informe o mes do lançamento!")
        }
        if(!lancamento.valor){
            erros.push("Informe o valor do lançamento!")
        }

        if(!lancamento.tipo){
            erros.push("Informe o tipo do lançamento!")
        }
        if(erros.length>0){
            throw new erroValidacao(erros)
        }

    }

    salvar(lancamento){
        return this.post('/', lancamento)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
    }
    
    atualizarStatus(id, status){
        return this.put(`/${id}/atualizar-status`,  {status})
    }

    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }
        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }
        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }
        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }
        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }
        return this.get(params)
    }

    deletar(id){
       return this.delete(`/${id}`)
    }
}