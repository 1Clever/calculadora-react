import React, {Component} from 'react'
import './Calculadora.css'
import Botao from '../componente/botao'
import Tela from '../componente/tela'

const estadoInicial = {
    valorDaTela:'0',
    limparTela:false,
    operacao:null,
    valores: [0,0],
    atual:0,

}

export default class Calculadora extends Component{

    state = {...estadoInicial}

    constructor(props){
        super(props)
        this.limparMemoria = this.limparMemoria.bind(this)
        this.colocarOperacao = this.colocarOperacao.bind(this)
        this.adicionarDigito = this.adicionarDigito.bind(this)
    }

    limparMemoria(){
        this.setState({...estadoInicial})

    }
    colocarOperacao(op){
        if(this.state.atual === 0){
            this.setState({op, atual:1,limparTela:true})
        }else{
            const final = op === "="
            const operacaoatual = this.state.op

            const valores = [...this.state.valores]
            try{
                valores[0] = eval(`${valores[0]} ${operacaoatual} ${valores[1]}`)
            } catch(e){
                valores[0] = this.state.valores[0]
            }
            valores[1] = 0

            this.setState({
                valorDaTela:valores[0],
                op: final ? null : op,
                atual: final ? 0 : 1,
                limparTela: !final,
                valores
            })
        }

    }
    adicionarDigito(n){
        if(n === '.' && this.state.valorDaTela.includes('.')){
            return
        }

        const limparTela = this.state.valorDaTela === '0' || this.state.limparTela
        const valorCorrente = limparTela ? '' : this.state.valorDaTela
        const valorDaTela = valorCorrente + n 
        this.setState({valorDaTela , limparTela:false})

        if( n !== '.'){
            const indice = this.state.atual
            const novoValor = parseFloat(valorDaTela)
            const valores = [...this.state.valores]
            valores[indice] = novoValor
            this.setState({valores})
            console.log(valores)
        }
    }
    render(){
        return(
            <div className="calculadora">
                <Tela value={this.state.valorDaTela}/>
                <Botao label='C' click={this.limparMemoria} triple/>
                <Botao label='/' click={this.colocarOperacao} operation/>
                <Botao label='7' click={this.adicionarDigito}/>
                <Botao label='8' click={this.adicionarDigito}/>
                <Botao label='9' click={this.adicionarDigito}/>
                <Botao label='*' click={this.colocarOperacao} operation/>
                <Botao label='4' click={this.adicionarDigito}/>
                <Botao label='5' click={this.adicionarDigito}/>
                <Botao label='6' click={this.adicionarDigito}/>
                <Botao label='-' click={this.colocarOperacao} operation/>
                <Botao label='1' click={this.adicionarDigito}/>
                <Botao label='2' click={this.adicionarDigito}/>
                <Botao label='3' click={this.adicionarDigito}/>
                <Botao label='+' click={this.colocarOperacao} operation/>
                <Botao label='0' click={this.adicionarDigito} double/>
                <Botao label='.' click={this.adicionarDigito} />
                <Botao label='=' click={this.colocarOperacao} operation/>
            </div>
        )
    }
}