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
        if(this.state.clase === 'hide'){
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
            <div className={`${this.props.orientacion + "Tarjeta"} divPelis`}>
                <img alt='' src={`https://image.tmdb.org/t/p/w342/${this.props.poster_path}`}/>
                <div className="dataContainer"> 
                <h1 className="tituloPeli">{this.props.title}</h1>
                <h4>{this.props.overview}</h4>
                <button onClick={() => this.props.eliminarPelicula(this.props.id)}>Eliminar</button>
                <button className='more' onClick={()=>this.mostrarDescripcion()}>{this.state.texto}</button>
                <h4 className={this.state.clase}>Fecha de estreno: {this.props.release_date}</h4>
                <h4 className={this.state.clase}>Calificacion: {this.props.vote_average}</h4>
                <h4 className={this.state.clase}>Lenguaje original: {this.props.original_language}</h4>
                </div>
               
            </div>
        )
    }
}