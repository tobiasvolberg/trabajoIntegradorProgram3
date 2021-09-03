import React, { Component } from 'react'

export default class Pelis extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <img alt='20' src={`https://image.tmdb.org/t/p/w500/${this.props.backdrop_path}`}/>
                <h1>{this.props.title}</h1>
                <h4>{this.props.overview}</h4>
            </div>
        )
    }
}