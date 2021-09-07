import React, { Component } from 'react'

export default class FiltroPorNombre extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }

    prevenirSubmit(evento){
        evento.preventDefault()
    }

    capturaInput(evento){
        console.log(evento.target.value);
        this.setState({
            value: evento.target.value
        },
        ()=>this.props.filtrarPorNombre(this.state.value)
        )
    }

    render(){
        return(
            <form onSubmit={(evento)=>this.prevenirSubmit(evento)}>
                <label>Title:</label>
                <input type='text' onChange={(evento)=> this.capturaInput(evento)}></input>
            </form>
        )
    }
}