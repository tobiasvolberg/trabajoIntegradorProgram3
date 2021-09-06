import React, { Component } from 'react'

export default class Pelis extends Component{
    constructor(props){
        super(props)
        this.state ={
            clase: 'hide',
            texto: 'ver mas'
        }
    }

    mostrarDescripcion(){
        if(this.state.clase == 'hide'){
            this.setState({
                clase: 'show',
                texto: 'Ver menos'
            })
        }else{
            this.setState({
                clase: 'hide',
                texto:'Ver mas'
            })
        }
    }

    render(){
        return(
            <div className='divPelis'>
                <img alt='' src={`https://image.tmdb.org/t/p/w500/${this.props.poster_path}`}/>
                <h1>{this.props.title}</h1>
                <button className='more' onClick={()=>this.mostrarDescripcion()}>{this.state.texto}</button>
                <h4 className={this.state.clase}>{this.props.overview}</h4>
            </div>
        )
    }
}